import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Your simulated order has been processed successfully
        </p>
        
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="text-xs text-muted-foreground mb-1">Order Number</div>
          <div className="text-xl font-bold text-primary mb-3">{orderNumber}</div>
          <div className="text-xs text-muted-foreground">
            This is a simulated transaction. No real payment was processed.
          </div>
        </div>
        
        <button
          onClick={() => navigate({ to: '/' })}
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <ShoppingBag className="h-5 w-5" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
