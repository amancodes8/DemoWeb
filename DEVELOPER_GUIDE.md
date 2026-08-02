# 🚀 VOLUTE Cigarettes - Developer & Maintainer Guide

Welcome to the **VOLUTE Cigarettes** luxury e-commerce and 3D product management codebase! This document serves as a complete technical guide for present and future developers working on this project.

---

## 📐 Technology Stack

- **Framework**: React 18 (Vite)
- **Styling**: TailwindCSS 3 + Vanilla CSS (`index.css`)
- **3D Rendering**: Three.js + `@react-three/fiber` + `@react-three/drei` (WebGL PBR Shader rendering)
- **State Management**: Zustand (`src/store/useStore.js`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis Smooth Scroll

---

## 📁 Directory & File Architecture

```
src/
├── App.jsx                     # Root application wrapper & provider tree
├── main.jsx                    # Vite entry point
├── index.css                   # Global CSS tokens, custom scrollbars, glassmorphism utilities
│
├── data/
│   └── productsData.json       # Initial JSON catalog of luxury cigarette products
│
├── store/
│   └── useStore.js             # Global Zustand store (Products, Cart, Wishlist, Brand Auth, Orders)
│
├── routes/
│   └── AppRoutes.jsx           # Application route definitions (Customer Store vs Brand Admin)
│
├── components/
│   ├── cards/
│   │   └── ExpressCard.jsx     # 10-Min Express Product Card (+/- quantity controls, quick view)
│   │
│   ├── common/
│   │   ├── Navbar.jsx          # Dual-mode header, search bar, location picker, brand auth status
│   │   ├── Footer.jsx          # Luxury footer with links & newsletter form
│   │   ├── CartDrawer.jsx      # Slide-over shopping cart, promo code, and checkout flow
│   │   ├── CustomerSupportModal.jsx # 24/7 AI Concierge, live chat, ticket submission
│   │   ├── OrderTrackerModal.jsx    # Real-time order progress timeline modal
│   │   ├── SmokeCanvas.jsx     # HTML5 Canvas ambient smoke background effect
│   │   └── LuxuryNotification.jsx  # Floating toast notifications
│   │
│   └── three/
│       ├── ProductViewer3D.jsx # Interactive WebGL 3D cigarette model canvas (Customer & Admin)
│       ├── Hero3DCanvas.jsx    # Hero section interactive floating cigarette model
│       └── ExplodedCigarette3D.jsx # Exploded 3D layer breakdown component
│
└── pages/
    ├── Home.jsx                # Landing page (Hero, 3D showcases, featured products)
    ├── Products.jsx            # Product catalog page with search, category & brand filter
    ├── ProductDetail.jsx       # Single product view with interactive 3D WebGL model
    ├── Wishlist.jsx            # Saved wishlist items page
    ├── About.jsx               # Brand heritage & craftsmanship page
    ├── NotFound.jsx            # 404 error page
    │
    ├── customer/
    │   └── CustomerOrders.jsx  # Live delivery tracking dashboard & ratings
    │
    └── brand/
        ├── BrandLogin.jsx      # Brand Partner login portal (`VOLUTE PRIVÉ`, `VOLUTE HERBAL`, etc.)
        ├── BrandDashboard.jsx  # Brand admin console (manage brand-specific catalog, edit, delete)
        └── BrandAddProduct.jsx # Product creation form with real-time 3D material customizer
    ├── ProductEditor.jsx       # Edit product specs & live 3D material colors
```

---

## 🔑 Key Architectural Concepts

### 1. Dual-Portal Architecture
The application runs two seamless modes:
- **Customer Mode**: Fast 10-minute e-commerce experience (Search, Brand Filter, instant `+`/`-` quantity controls, checkout, live tracking, 24/7 support).
- **Brand Partner Mode**: Unlocked upon logging in at `/brand/login`. Brands see only their own listed products on `BrandDashboard.jsx` and can create/edit products with live 3D material customizers.

### 2. State Management (`useStore.js`)
All dynamic data is stored in Zustand (`useStore.js`).
> ⚠️ **Important**: When rendering product catalog data, **always destructure `products` from `useStore()`** rather than importing `productsData.json` directly. This guarantees that edits made in the Brand Admin portal instantly re-render on customer pages without requiring a page reload.

#### Key Store Actions:
- `addProduct(newProduct)`: Adds a brand product with default 3D parameters.
- `updateProduct(id, fields)`: Updates product specs and 3D material presets in real time.
- `deleteProduct(id)`: Deletes a product from the dynamic store.
- `addToCart(item)` / `updateCartQty(id, qty)`: Manages cart state.
- `loginBrand(brandId, brandName)` / `logoutBrand()`: Manages brand authentication state.

### 3. WebGL 3D Model Rendering (`ProductViewer3D.jsx`)
- The 3D cigarette models are generated parametrically in Three.js using standard geometry shapes (cylinders, rings, metallic materials).
- Material properties (`wrapperColor`, `filterColor`, `bandColor`, `metalness`, `roughness`) are read dynamically from `product.colors` and `product['3dModelPreset']`.

---

## 🛠️ How to Add or Edit Features

### Adding a New Brand
Add the brand preset to `presetBrands` in `src/pages/brand/BrandLogin.jsx`:
```js
{ id: 'VOLUTE-NEWBRAND-05', name: 'VOLUTE NEW BRAND' }
```

### Adding a New Product Category
Add the category name to `categories` in `src/pages/Products.jsx` and `src/pages/brand/BrandAddProduct.jsx`:
```js
const categories = ['All', 'Cigarettes', 'Slims', 'Botanical', 'Flavored', 'Cigarillos', 'New Category'];
```

---

## ⚡ Build & Verification Commands

```bash
# Start local development server (runs on http://localhost:3000)
npm run dev

# Run production build validation
npm run build
```
