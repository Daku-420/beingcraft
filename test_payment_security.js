import express from 'express';
import crypto from 'node:crypto';
import http from 'node:http';
import { apiRouter } from './server/apiRouter.ts';
import { paymentService } from './server/paymentService.ts';

const app = express();
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use('/api', apiRouter);

const server = http.createServer(app);

async function runTests() {
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  console.log(`\n======================================================`);
  console.log(` RUNNING PAYMENT SECURITY & VERIFICATION TEST SUITE `);
  console.log(` Target: ${baseUrl}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: Config Endpoint
    // ----------------------------------------------------
    console.log('--- TEST 1: Payment Configuration Endpoint ---');
    const configRes = await fetch(`${baseUrl}/payment/config`);
    const configData = await configRes.json();
    assert(configRes.ok, 'Config endpoint returns 200 OK');
    assert(configData.success === true, 'Config success is true');
    assert(configData.paymentMode === 'test', 'Payment mode is TEST (sandbox)');
    assert(typeof configData.keySecret === 'undefined', 'CRITICAL SECURITY: Secret keys are NEVER exposed to client');

    // ----------------------------------------------------
    // TEST 2: Authoritative Server-side Price Calculation
    // Client sends an item from catalog. Total must be calculated by server.
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Server-side Order Creation & Price Calculation ---');
    const orderPayload = {
      customer: {
        fullName: 'Test Customer',
        phone: '9876543210',
        email: 'test@example.com',
      },
      shippingAddress: {
        fullName: 'Test Customer',
        phone: '9876543210',
        email: 'test@example.com',
        addressLine1: '404 Guild St',
        city: 'Moradabad',
        state: 'Uttar Pradesh',
        pincode: '244001',
      },
      items: [
        {
          productId: 'prod-001', // Price in catalog is ₹2,899
          quantity: 1,
        },
      ],
      paymentMethod: 'upi',
      upiVpa: 'customer@okhdfcbank',
    };

    const createRes = await fetch(`${baseUrl}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    const createData = await createRes.json();

    assert(createRes.status === 201, 'Order creation returns 201 Created');
    assert(createData.success === true, 'Order created successfully');
    assert(createData.paymentStatus === 'PAYMENT_INITIATED', 'Initial payment status is PAYMENT_INITIATED (NOT PAID!)');
    assert(createData.order.orderStatus === 'Processing', 'Order status is Processing (NOT Confirmed/Paid)');
    assert(createData.amount === 2899, 'Amount calculated authoritatively as ₹2,899 from catalog');
    assert(createData.amountPaise === 289900, 'Amount in paise is 289900');
    assert(Boolean(createData.gatewayOrderId), 'Gateway order ID was created');

    const orderId = createData.orderId;
    const gatewayOrderId = createData.gatewayOrderId;

    // ----------------------------------------------------
    // TEST 3: Status Query Before Payment
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Authoritative Status Query for Unpaid Order ---');
    const statusBefore = await (await fetch(`${baseUrl}/orders/${orderId}/payment-status`)).json();
    assert(statusBefore.paymentStatus === 'PAYMENT_INITIATED', 'Server status confirms PAYMENT_INITIATED before payment');
    assert(statusBefore.orderStatus === 'Processing', 'Order is still unconfirmed before payment');

    // ----------------------------------------------------
    // TEST 4: Invalid / Tampered Signature Rejection
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Tampered / Invalid Signature Rejection ---');
    const badVerifyRes = await fetch(`${baseUrl}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        gatewayOrderId,
        paymentId: 'pay_hacker_id',
        signature: 'FAKED_TAMPERED_SIGNATURE_123',
        mockSignatureToken: 'INVALID_TOKEN',
      }),
    });
    const badVerifyData = await badVerifyRes.json();
    assert(badVerifyRes.status === 400, 'Server rejects tampered verification with 400 Bad Request');
    assert(badVerifyData.paymentStatus === 'FAILED', 'Payment status marked as FAILED upon tamper attempt');

    const statusAfterTamper = await (await fetch(`${baseUrl}/orders/${orderId}/payment-status`)).json();
    assert(statusAfterTamper.paymentStatus === 'FAILED', 'Authoritative status in database reflects FAILED');

    // ----------------------------------------------------
    // TEST 5: Legitimate Server Verification
    // Create new order to test legitimate verification
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Legitimate Server Cryptographic Verification ---');
    const create2 = await (
      await fetch(`${baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })
    ).json();

    const legitimatePaymentId = `pay_test_${Date.now()}`;
    const verifySuccessRes = await fetch(`${baseUrl}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: create2.orderId,
        gatewayOrderId: create2.gatewayOrderId,
        paymentId: legitimatePaymentId,
        signature: `sig_test_${Date.now()}`,
        mockSignatureToken: create2.mockSignatureToken,
      }),
    });
    const verifySuccessData = await verifySuccessRes.json();

    assert(verifySuccessRes.ok, 'Legitimate verification returns 200 OK');
    assert(verifySuccessData.success === true, 'Verification success is true');
    assert(verifySuccessData.paymentStatus === 'SUCCESS', 'Payment status is now SUCCESS');
    assert(verifySuccessData.order.orderStatus === 'Confirmed', 'Order status is now Confirmed');
    assert(verifySuccessData.order.transactionId === legitimatePaymentId, 'Transaction ID recorded');

    // Verify confirmation endpoint
    const statusConfirmed = await (await fetch(`${baseUrl}/orders/${create2.orderId}/payment-status`)).json();
    assert(statusConfirmed.paymentStatus === 'SUCCESS', 'Order confirmation endpoint reports SUCCESS (PAID)');

    // ----------------------------------------------------
    // TEST 6: Double-Payment / Replay Attack Prevention
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Replay Attack / Double-Payment Prevention ---');
    const replayRes = await fetch(`${baseUrl}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: create2.orderId,
        gatewayOrderId: create2.gatewayOrderId,
        paymentId: legitimatePaymentId,
        signature: `sig_test_${Date.now()}`,
        mockSignatureToken: create2.mockSignatureToken,
      }),
    });
    const replayData = await replayRes.json();
    assert(replayData.success === true, 'Replay call handled idempotently without re-processing');

    // ----------------------------------------------------
    // TEST 7: Payment Cancellation
    // ----------------------------------------------------
    console.log('\n--- TEST 7: Payment Cancellation Handling ---');
    const create3 = await (
      await fetch(`${baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })
    ).json();

    const cancelRes = await fetch(`${baseUrl}/payment/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: create3.orderId,
        reason: 'Customer closed payment gateway modal',
      }),
    });
    const cancelData = await cancelRes.json();
    assert(cancelData.paymentStatus === 'CANCELLED', 'Server marks paymentStatus as CANCELLED');

    const statusCancelled = await (await fetch(`${baseUrl}/orders/${create3.orderId}/payment-status`)).json();
    assert(statusCancelled.paymentStatus === 'CANCELLED', 'Status query returns CANCELLED');

    // ----------------------------------------------------
    // TEST 8: Cash on Delivery
    // ----------------------------------------------------
    console.log('\n--- TEST 8: Cash on Delivery (COD) Flow ---');
    const codPayload = { ...orderPayload, paymentMethod: 'cod' };
    const codRes = await (
      await fetch(`${baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(codPayload),
      })
    ).json();

    assert(codRes.order.paymentStatus === 'PENDING', 'COD payment status is PENDING (not paid!)');
    assert(codRes.order.orderStatus === 'Confirmed', 'COD order status is Confirmed for delivery');

    // ----------------------------------------------------
    // TEST 9: Webhook Signature Verification & Idempotency
    // ----------------------------------------------------
    console.log('\n--- TEST 9: Webhook HMAC Signature & Idempotency ---');
    const webhookSecret = 'beingcraft_webhook_secret_2026';
    process.env.RAZORPAY_WEBHOOK_SECRET = webhookSecret;
    paymentService.reloadConfig();
    const create4 = await (
      await fetch(`${baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })
    ).json();

    const webhookPayload = JSON.stringify({
      event: 'payment.captured',
      event_id: `evt_${Date.now()}`,
      payload: {
        payment: {
          entity: {
            id: `pay_webhook_${Date.now()}`,
            order_id: create4.gatewayOrderId,
            amount: create4.amountPaise,
            status: 'captured',
          },
        },
      },
    });

    const validSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(webhookPayload)
      .digest('hex');

    // 9a: Bad signature
    const badWebhookRes = await fetch(`${baseUrl}/payment/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': 'BAD_SIGNATURE',
      },
      body: webhookPayload,
    });
    assert(badWebhookRes.status === 400, 'Webhook rejects invalid signature with 400');

    // 9b: Good signature
    const goodWebhookRes = await fetch(`${baseUrl}/payment/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: webhookPayload,
    });
    const goodWebhookData = await goodWebhookRes.json();
    assert(goodWebhookRes.ok, 'Webhook with valid HMAC signature succeeds');
    assert(goodWebhookData.status === 'processed', 'Webhook status is processed');

    // Check order status
    const statusWebhook = await (await fetch(`${baseUrl}/orders/${create4.orderId}/payment-status`)).json();
    assert(statusWebhook.paymentStatus === 'SUCCESS', 'Order marked SUCCESS via webhook capture');

    // 9c: Duplicate event (Idempotency)
    const duplicateWebhookRes = await fetch(`${baseUrl}/payment/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: webhookPayload,
    });
    const duplicateData = await duplicateWebhookRes.json();
    assert(duplicateData.status === 'already_processed', 'Duplicate webhook event is skipped idempotently');

    // ----------------------------------------------------
    // TEST 10: Production Mode Rejection of Incomplete Credentials
    // ----------------------------------------------------
    console.log('\n--- TEST 10: Production Mode Security Constraints ---');
    process.env.PAYMENT_MODE = 'production';
    process.env.RAZORPAY_KEY_ID = '';
    process.env.RAZORPAY_KEY_SECRET = '';
    paymentService.reloadConfig();

    const prodCreateRes = await fetch(`${baseUrl}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    const prodCreateData = await prodCreateRes.json();
    assert(prodCreateRes.status === 400, 'Production mode halts order creation when live gateway credentials missing');
    assert(prodCreateData.success === false, 'Production mode returns success: false');
    assert(prodCreateData.error.includes('Production payment gateway is not properly configured'), 'Explicit production security error returned');

    console.log(`\n======================================================`);
    console.log(` TEST RESULTS: ${passed} PASSED, ${failed} FAILED `);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error('Test error:', err);
    failed++;
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
