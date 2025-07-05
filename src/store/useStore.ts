
import { create } from 'zustand';
import { Customer, Product, Order, Box } from '@/lib/schema';

interface AppState {
  customers: Customer[];
  products: Product[];
  orders: Order[];
  boxes: Box[];
  selectedProducts: string[];
  
  // Actions
  setCustomers: (customers: Customer[]) => void;
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  setBoxes: (boxes: Box[]) => void;
  toggleProductSelection: (productId: string) => void;
  clearSelectedProducts: () => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  customers: [],
  products: [],
  orders: [],
  boxes: [],
  selectedProducts: [],
  isLoading: false,
  
  setCustomers: (customers) => set({ customers }),
  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders }),
  setBoxes: (boxes) => set({ boxes }),
  
  toggleProductSelection: (productId) => {
    const { selectedProducts } = get();
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];
    set({ selectedProducts: newSelection });
  },
  
  clearSelectedProducts: () => set({ selectedProducts: [] }),
  setLoading: (isLoading) => set({ isLoading }),
}));
