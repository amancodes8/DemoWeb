import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import initialProductsData from '../data/productsData.json';

export const defaultConfig = {
  filterShape: 'Round',
  filterColor: '#d4af37',
  wrapperColor: '#121215',
  wrapperTexture: 'Leather',
  wrapperPattern: 'Gold Rings',
  bandColor: '#ffd700',
  bandType: 'Gold',
  logoText: 'VOLUTE PRIVÉ',
  paperTexture: 'Luxury',
  tipDesign: 'Diamond',
  length: 88,
  radius: 4,
  roughness: 0.25,
  metalness: 0.85,
  opacity: 1.0,
  reflection: 0.9,
  bump: 0.4,
  ambientOcclusion: 0.8,
  wireframe: false,
  exploded: false,
  crossSection: false,
  lightingPreset: 'Studio Gold',
};

export const useStore = create(
  persist(
    (set, get) => ({
      // 1. User & Portal State
      userRole: 'customer',
      setUserRole: (role) => set({ userRole: role }),

      /** Active Delivery Location */
      deliveryLocation: 'Bandra West, Mumbai',
      setDeliveryLocation: (loc) => set({ deliveryLocation: loc }),

      // 2. Dynamic Products Catalog (CRUD)
      products: initialProductsData,

      /** Add a new product created by a Brand Partner */
      addProduct: (newProd) => {
        const fullProduct = {
          id: `prod-${Date.now()}`,
          rating: 5.0,
          reviewsCount: 1,
          isNew: true,
          isFeatured: true,
          colors: newProd.colors || { wrapper: '#121215', filter: '#d4af37', band: '#ffd700', tip: '#000000' },
          specs: newProd.specs || { length: '84mm', diameter: '7.8mm', filterType: 'Silk Core', paperType: 'Organic Linen', origin: 'India Atelier' },
          '3dModelPreset': newProd['3dModelPreset'] || { filterShape: 'Round', filterColor: '#d4af37', wrapperColor: '#121215', wrapperTexture: 'Leather', bandColor: '#ffd700', metalness: 0.8, roughness: 0.2 },
          ...newProd,
        };
        set((state) => ({ products: [fullProduct, ...state.products] }));
        get().addNotification(`Product "${newProd.name}" published to Store!`, 'success');
      },

      /** Update an existing product's specs or 3D materials */
      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedFields } : p
          ),
        }));
        get().addNotification(`Product "${updatedFields.name || id}" successfully updated!`, 'success');
      },

      /** Delete a product from the catalog */
      deleteProduct: (id) => {
        const itemToDelete = get().products.find((p) => p.id === id);
        const itemName = itemToDelete ? itemToDelete.name : 'Product';
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
        get().addNotification(`Deleted "${itemName}" from catalog`, 'info');
      },

      // 3. Brand Authentication State
      brandAuth: {
        isLoggedIn: false,
        brandId: null,
        brandName: '',
      },

      loginBrand: (brandId, brandName) => {
        set({
          brandAuth: { isLoggedIn: true, brandId, brandName },
          userRole: 'brand',
        });
        get().addNotification(`Logged in as Brand Partner "${brandName}"`, 'success');
      },

      logoutBrand: () => {
        set({
          brandAuth: { isLoggedIn: false, brandId: null, brandName: '' },
          userRole: 'customer',
        });
        get().addNotification('Logged out from Brand Portal', 'info');
      },

      // 4. Customer Orders & Delivery Tracker State
      customerOrders: [
        {
          id: 'ORD-98214',
          date: '2026-08-01',
          items: [{ name: 'Volute Gold Leaf No.1', qty: 2, price: 4200 }],
          total: 8400,
          status: 'OUT FOR DELIVERY',
          estimatedDeliveryTime: '6 mins away',
          driverName: 'Vikram Singh',
          driverPhone: '+91 98200 12345',
          deliveryAddress: 'Bandra West, Mumbai',
        },
      ],

      addOrder: (order) => {
        set((state) => ({
          customerOrders: [order, ...state.customerOrders],
        }));
      },

      // 5. Shopping Cart State
      cart: [],
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),

      addToCart: (item) => {
        const { cart, addNotification } = get();
        const existingIndex = cart.findIndex((c) => c.id === item.id);
        if (existingIndex > -1) {
          const updated = [...cart];
          updated[existingIndex].qty += item.qty || 1;
          set({ cart: updated, cartOpen: true });
        } else {
          const newItem = {
            id: item.id || `cart-${Date.now()}`,
            productId: item.productId || item.id,
            name: item.name,
            price: item.price,
            qty: item.qty || 1,
            image: item.image,
            customConfig: item.customConfig || null,
          };
          set({ cart: [...cart, newItem], cartOpen: true });
        }
        addNotification(`Added "${item.name}" to cart`, 'success');
      },

      removeFromCart: (id) => {
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
      },

      updateCartQty: (id, qty) => {
        if (qty <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, qty } : item)),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // 6. Wishlist State
      wishlist: ['volute-gold-leaf-no1', 'volute-obsidian-slims'],
      toggleWishlist: (productId, name = 'Item') => {
        const { wishlist, addNotification } = get();
        const exists = wishlist.includes(productId);
        if (exists) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
          addNotification(`Removed "${name}" from Wishlist`, 'info');
        } else {
          set({ wishlist: [...wishlist, productId] });
          addNotification(`Saved "${name}" to Wishlist`, 'success');
        }
      },

      // 7. 3D Configurator State (Brand Admin)
      configurator: { ...defaultConfig },
      setConfiguratorParam: (key, value) =>
        set((state) => ({
          configurator: { ...state.configurator, [key]: value },
        })),
      resetConfigurator: () => set({ configurator: { ...defaultConfig } }),
      loadConfigPreset: (presetObj) =>
        set((state) => ({
          configurator: { ...state.configurator, ...presetObj },
        })),

      // 8. Search & Filter State
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      activeCategory: 'All',
      setActiveCategory: (cat) => set({ activeCategory: cat }),

      // 9. Toast Notification System
      notifications: [],
      addNotification: (message, type = 'success') => {
        const id = Date.now();
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeNotification(id);
        }, 4000);
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'volute-store-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        brandAuth: state.brandAuth,
        cart: state.cart,
        wishlist: state.wishlist,
        customerOrders: state.customerOrders,
        deliveryLocation: state.deliveryLocation,
      }),
    }
  )
);
