import { useCart } from '../hooks/useCart';
import { useNavigate } from '@tanstack/react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Add some items to your cart to get started
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => {
              const imageUrl = item.image ? item.image.getDirectURL() : '/assets/generated/placeholder-product.dim_300x300.png';
              const itemTotal = Number(item.price) * item.quantity / 100;
              
              return (
                <div key={item.id} className="bg-card rounded-lg border p-3 flex gap-3">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-7 w-7 rounded-md border hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-medium w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 rounded-md border hover:bg-accent transition-colors flex items-center justify-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-bold">${itemTotal.toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-4 sticky top-20">
              <h2 className="text-lg font-bold mb-3">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${(getCartTotal() / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(getCartTotal() / 100).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate({ to: '/checkout' })}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium mb-2 text-sm"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => navigate({ to: '/' })}
                className="w-full px-4 py-2 border rounded-md hover:bg-accent transition-colors font-medium text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
