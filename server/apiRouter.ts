import { Router, type Request, type Response } from 'express';
import { paymentService } from './paymentService.ts';

export const apiRouter: Router = Router();

// 1. Get Payment Configuration (Safe public config only)
apiRouter.get('/payment/config', (_req: Request, res: Response) => {
  try {
    const config = paymentService.getConfig();
    res.json({
      success: true,
      ...config,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Create Order & Initialize Gateway Transaction
apiRouter.post('/payment/create-order', async (req: Request, res: Response) => {
  try {
    const { customer, shippingAddress, items, paymentMethod, couponCode, upiVpa } = req.body;

    if (!customer || !shippingAddress || !items || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required checkout information (customer, shippingAddress, items, paymentMethod).',
      });
    }

    const result = await paymentService.createOrder({
      customer,
      shippingAddress,
      items,
      paymentMethod,
      couponCode,
      upiVpa,
    });

    res.status(201).json({
      success: true,
      order: result.order,
      orderId: result.order.id,
      orderNumber: result.order.orderNumber,
      gatewayOrderId: result.gatewayOrderId,
      amount: result.amount,
      amountPaise: result.amountPaise,
      currency: result.currency,
      keyId: result.keyId,
      paymentMode: result.paymentMode,
      paymentStatus: result.order.paymentStatus,
      mockSignatureToken: result.mockSignatureToken,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('[API /payment/create-order] Error:', error.message);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create order',
    });
  }
});

// 3. Cryptographic Server-side Payment Verification
apiRouter.post('/payment/verify', async (req: Request, res: Response) => {
  try {
    const { orderId, gatewayOrderId, paymentId, signature, mockSignatureToken } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'Order ID is required for verification.',
      });
    }

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment ID is required for verification.',
      });
    }

    const verificationResult = await paymentService.verifyPayment({
      orderId,
      gatewayOrderId: gatewayOrderId || '',
      paymentId,
      signature: signature || '',
      mockSignatureToken,
    });

    res.json(verificationResult);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('[API /payment/verify] Verification failed:', error.message);
    res.status(400).json({
      success: false,
      paymentStatus: 'FAILED',
      error: error.message || 'Payment verification failed',
    });
  }
});

// 4. Cancel In-Progress Payment
apiRouter.post('/payment/cancel', (req: Request, res: Response) => {
  try {
    const { orderId, reason } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, error: 'Order ID required.' });
    }

    const order = paymentService.cancelPayment(orderId, reason);
    res.json({
      success: true,
      paymentStatus: 'CANCELLED',
      order,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. Query Order Payment Status (used by OrderConfirmationPage)
apiRouter.get('/orders/:orderId/payment-status', (req: Request, res: Response) => {
  try {
    const orderIdParam = req.params.orderId;
    const orderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
    const order = paymentService.getOrderPaymentStatus(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found in official records.',
      });
    }

    res.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      amount: order.total,
      currency: 'INR',
      transactionId: order.transactionId,
      verifiedAt: order.verifiedAt,
      failureReason: order.failureReason,
      order,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Payment Webhook Endpoint
apiRouter.post('/payment/webhook', async (req: Request, res: Response) => {
  try {
    const signature = (req.headers['x-razorpay-signature'] as string) || '';
    const rawBody = (req as any).rawBody || req.body;

    const result = await paymentService.handleWebhook(
      typeof rawBody === 'string' || Buffer.isBuffer(rawBody) ? rawBody : JSON.stringify(rawBody),
      signature
    );

    res.json({ success: true, ...result });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('[API Webhook Error]:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// 7. Get All Orders (Admin)
apiRouter.get('/orders', (_req: Request, res: Response) => {
  try {
    const orders = paymentService.getAllOrders();
    res.json({ success: true, orders });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Update Order Status (Admin)
apiRouter.patch('/orders/:orderId/status', (req: Request, res: Response) => {
  try {
    const orderIdParam = req.params.orderId;
    const orderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
    const { status } = req.body;
    const updated = paymentService.updateOrderStatus(orderId, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order: updated });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ success: false, error: error.message });
  }
});

// 9. Clear All Orders (Admin)
apiRouter.delete('/orders/all', (_req: Request, res: Response) => {
  try {
    paymentService.clearAllOrders();
    res.json({ success: true, message: 'All orders cleared.' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ success: false, error: error.message });
  }
});

// 10. Delete Single Order (Admin)
apiRouter.delete('/orders/:orderId', (req: Request, res: Response) => {
  try {
    const orderIdParam = req.params.orderId;
    const orderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
    const deleted = paymentService.deleteOrder(orderId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ success: false, error: error.message });
  }
});
