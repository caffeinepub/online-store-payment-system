import { useItems } from '../hooks/useItems';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

export default function StorefrontPage() {
  const { data: items, isLoading } = useItems();

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <img 
          src="/assets/generated/hero-banner.dim_1200x400.png" 
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Welcome to Shop Simulator
            </h1>
            <p className="text-lg text-foreground/80">
              Discover amazing products with simulated payments
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : items && items.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-8">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
