import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    configuration: {
        processor: string;
        ram: string;
        storage: string;
    };
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    toggleCart: (open?: boolean) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => {
                const currentItems = get().items;
                const existing = currentItems.find(i => i.id === newItem.id);

                if (existing) {
                    set({
                        items: currentItems.map(i =>
                            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                        isOpen: true
                    });
                } else {
                    set({ items: [...currentItems, newItem], isOpen: true });
                }
            },
            removeItem: (id) => set({
                items: get().items.filter(i => i.id !== id)
            }),
            updateQuantity: (id, delta) => set({
                items: get().items.map(i =>
                    i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
                )
            }),
            toggleCart: (open) => set((state) => ({
                isOpen: open !== undefined ? open : !state.isOpen
            })),
            clearCart: () => set({ items: [] }),
            getTotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        }),
        {
            name: 'ention-cart-storage',
        }
    )
);
