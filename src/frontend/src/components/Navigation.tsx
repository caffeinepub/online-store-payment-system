import { Link } from '@tanstack/react-router';
import { ShoppingCart, Settings } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navigation() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold hover:text-primary transition-colors">
            Checkout
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="relative flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
