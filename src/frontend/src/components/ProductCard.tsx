import { useState } from 'react';
import type { Item } from '../backend';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  item: Item;
}

export default function ProductCard({ item }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imageUrl = item.image ? item.image.getDirectURL() : '/assets/generated/placeholder-product.dim_300x300.png';

  return (
    <div className="group bg-card rounded-lg border shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${(Number(item.price) / 100).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
