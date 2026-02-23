import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { useProcessPayment } from '../hooks/useItems';
import { Loader2, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const processPaymentMutation = useProcessPayment();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: '/cart' });
    }
  }, [items, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate payment processing with progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Process each item payment
      for (const item of items) {
        await processPaymentMutation.mutateAsync(item.id);
      }

      clearInterval(progressInterval);
      setProgress(100);

      // Wait a moment to show 100%
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear cart and navigate to success
      clearCart();
      navigate({ to: '/payment-success' });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const total = getCartTotal() / 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-card rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${((Number(item.price) * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Simulated Payment
          </h2>
          <div className="bg-muted/50 rounded-md p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              This is a simulated payment system using fake cash. No real transactions will be processed.
            </p>
          </div>

          {isProcessing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Processing payment...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay Now ${total.toFixed(2)}
              </>
            )}
          </button>
        </div>

        <button
          onClick={() => navigate({ to: '/cart' })}
          disabled={isProcessing}
          className="w-full px-6 py-3 border rounded-md hover:bg-accent transition-colors font-medium disabled:opacity-50"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
