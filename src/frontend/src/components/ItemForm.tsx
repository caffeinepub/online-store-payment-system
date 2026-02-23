import { useState } from 'react';
import { useAddItem } from '../hooks/useItems';
import { ExternalBlob } from '../backend';
import { Loader2, Upload, Plus } from 'lucide-react';

export default function ItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const addItemMutation = useAddItem();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const priceInCents = BigInt(Math.round(parseFloat(price) * 100));
      const id = crypto.randomUUID();

      let imageBlob: ExternalBlob;
      
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else {
        // Use placeholder image
        const response = await fetch('/assets/generated/placeholder-product.dim_300x300.png');
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array);
      }

      await addItemMutation.mutateAsync({
        id,
        name,
        description,
        price: priceInCents,
        image: imageBlob
      });

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setImagePreview('');
      setUploadProgress(0);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus className="h-5 w-5 text-primary" />
        Add New Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Product Image
          </label>
          <div className="flex items-start gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed rounded-md p-4 hover:border-primary transition-colors text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {imageFile ? imageFile.name : 'Click to upload image'}
                </p>
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="w-24 h-24 rounded-md overflow-hidden border">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={addItemMutation.isPending}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {addItemMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding Item...
            </>
          ) : (
            'Add Item'
          )}
        </button>
      </form>
    </div>
  );
}
