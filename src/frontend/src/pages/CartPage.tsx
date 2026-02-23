import { useCart } from '../hooks/useCart';
import { useNavigate } from '@tanstack/react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart to get started
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const imageUrl = item.image ? item.image.getDirectURL() : '/assets/generated/placeholder-product.dim_300x300.png';
            const itemTotal = Number(item.price) * item.quantity / 100;
            
            return (
              <div key={item.id} className="bg-card rounded-lg border p-4 flex gap-4">
                <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-md border hover:bg-accent transition-colors flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-md border hover:bg-accent transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">${itemTotal.toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${(getCartTotal() / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-primary">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${(getCartTotal() / 100).toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate({ to: '/checkout' })}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium mb-3"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={() => navigate({ to: '/' })}
              className="w-full px-6 py-3 border rounded-md hover:bg-accent transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
