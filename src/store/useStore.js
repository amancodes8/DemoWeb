import { create } from 'zustand';
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


export const useStore = create((set, get) => ({

  // 1. User & Portal State
 
  userRole: 'customer',
  setUserRole: (role) => set({ userRole: role }),

  /** Active Delivery Location */
  deliveryLocation: 'Bandra West, Mumbai',
  setDeliveryLocation: (loc) => set({ deliveryLocation: loc }),

  // ==========================================
  // 2. Dynamic Products Catalog (CRUD)
  // ==========================================
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

  // ==========================================
  // 3. Brand Authentication State
  // ==========================================
  brandAuth: {
    isLoggedIn: false,
    brandId: null,
    brandName: '',
  },

  /** Log in as a Brand Partner */
  loginBrand: (brandId, brandName) => {
    set({
      brandAuth: { isLoggedIn: true, brandId, brandName },
      userRole: 'brand',
    });
    get().addNotification(`Logged in as Brand Partner "${brandName}"`, 'success');
  },

  /** Log out from Brand Partner Portal */
  logoutBrand: () => {
    set({
      brandAuth: { isLoggedIn: false, brandId: null, brandName: '' },
      userRole: 'customer',
    });
    get().addNotification('Logged out from Brand Portal', 'info');
  },

  // ==========================================
  // 4. Customer Orders & Live Express Tracking
  // ==========================================
  customerOrders: [
    {
      id: 'ORD-9842',
      date: 'Today, 14:45',
      items: [
        { name: 'VOLUTE Gold Leaf No. 1', qty: 1, price: 350.00, image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop' }
      ],
      total: 399.00,
      status: 'Out for Delivery', // 'Placed' | 'In Atelier' | 'Out for Delivery' | 'Delivered'
      estimatedMins: 6,
      riderName: 'Ramesh (Express Delivery Executive)',
      rating: 5,
      review: 'Super fast 10-min delivery in Bandra! Great quality product.',
    }
  ],

  /** Add a new customer order and trigger simulated live delivery status updates */
  addCustomerOrder: (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just Now',
      items: orderData.items,
      total: orderData.total,
      status: 'Placed',
      estimatedMins: 10,
      riderName: 'Suresh (Express Delivery Partner)',
      rating: null,
      review: null,
    };
    set((state) => ({ customerOrders: [newOrder, ...state.customerOrders] }));

    // Simulate status progression (Placed -> In Atelier -> Out for Delivery)
    setTimeout(() => {
      get().updateOrderStatus(newOrder.id, 'In Atelier', 8);
    }, 5000);
    setTimeout(() => {
      get().updateOrderStatus(newOrder.id, 'Out for Delivery', 4);
    }, 12000);
  },

  updateOrderStatus: (orderId, status, mins) => {
    set((state) => ({
      customerOrders: state.customerOrders.map((o) =>
        o.id === orderId ? { ...o, status, estimatedMins: mins } : o
      ),
    }));
    get().addNotification(`Order ${orderId} Status Updated: "${status}"`, 'info');
  },

  rateOrder: (orderId, rating, reviewText) => {
    set((state) => ({
      customerOrders: state.customerOrders.map((o) =>
        o.id === orderId ? { ...o, rating, review: reviewText } : o
      ),
    }));
    get().addNotification('Thank you for rating your delivery!', 'success');
  },

  // ==========================================
  // 5. Shopping Cart State
  // ==========================================
  cart: [
    {
      id: 'cart-1',
      productId: 'volute-gold-leaf-no1',
      name: 'VOLUTE Gold Leaf No. 1',
      price: 350.00,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop',
      customConfig: null
    }
  ],
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),

  addToCart: (item) => {
    const { cart, addNotification } = get();
    const existingIndex = cart.findIndex((i) => i.productId === item.productId && JSON.stringify(i.customConfig) === JSON.stringify(item.customConfig));
    
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += (item.qty || 1);
      set({ cart: updatedCart, cartOpen: true });
    } else {
      const newItem = {
        id: `cart-${Date.now()}`,
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

  // ==========================================
  // 6. Wishlist State
  // ==========================================
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

  // ==========================================
  // 7. 3D Configurator State (Brand Admin)
  // ==========================================
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

  // ==========================================
  // 8. Search & Filter State
  // ==========================================
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeCategory: 'All',
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  // ==========================================
  // 9. Toast Notification System
  // ==========================================
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
}));
