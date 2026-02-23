import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="h-24 w-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your simulated order has been processed successfully
        </p>
        
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="text-sm text-muted-foreground mb-2">Order Number</div>
          <div className="text-2xl font-bold text-primary mb-4">{orderNumber}</div>
          <div className="text-sm text-muted-foreground">
            This is a simulated transaction. No real payment was processed.
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
