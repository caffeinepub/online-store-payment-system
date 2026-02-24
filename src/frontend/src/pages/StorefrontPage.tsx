import { useItems } from '../hooks/useItems';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

export default function StorefrontPage() {
  const { data: items, isLoading } = useItems();

  return (
    <div className="px-4 py-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
