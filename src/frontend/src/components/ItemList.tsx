import { useItems, useDeleteItem } from '../hooks/useItems';
import { Loader2, Package, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export default function ItemList() {
  const { data: items, isLoading } = useItems();
  const deleteItem = useDeleteItem();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      setDeletingId(id);
      try {
        await deleteItem.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('Failed to delete item. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Package className="h-5 w-5 text-primary" />
        Current Items
      </h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : items && items.length > 0 ? (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {items.map((item) => {
            const imageUrl = item.image ? item.image.getDirectURL() : '/assets/generated/placeholder-product.dim_300x300.png';
            const isDeleting = deletingId === item.id;
            
            return (
              <div key={item.id} className="flex gap-4 p-4 border rounded-md hover:bg-accent/50 transition-colors">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-primary mt-1">
                    ${(Number(item.price) / 100).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.name)}
                    disabled={isDeleting}
                    className="flex-shrink-0"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No items added yet</p>
        </div>
      )}
    </div>
  );
}
