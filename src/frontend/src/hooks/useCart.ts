import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Item } from '../backend';

interface CartItem extends Item {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: Item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }]
          };
        });
      },
      
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId)
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      }
    }),
    {
      name: 'shop-cart-storage'
    }
  )
);
