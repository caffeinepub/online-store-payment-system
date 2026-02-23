import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Store, Lock } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navigation() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg hover:text-primary transition-colors">
            <Store className="h-6 w-6 text-primary" />
            <span>Shop Simulator</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Store
            </Link>
            <Link 
              to="/admin" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Lock className="h-4 w-4" />
              Admin
            </Link>
            <button
              onClick={() => navigate({ to: '/cart' })}
              className="relative flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
