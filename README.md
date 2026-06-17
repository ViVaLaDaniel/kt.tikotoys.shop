# KT.TikoToys — Bespoke Handmade Knitted Toys & Gift Boxes

A highly optimized, animated portfolio showcase and lead generation platform for **KT.TikoToys** (`kt.tikotoys.shop`). Hand-knitted by Yulia in San Pedro Alcántara / Marbella, Spain, and shipped worldwide.

---

## ✨ Key Features

- **Redesigned Lead-Generation Flow**: Shipped a custom inquiry list flow. Customers select amigurumi toys and curated gift boxes (€500 and €1000 sets) and submit an inquiry, generating a pre-filled WhatsApp message directly to Yulia (`+34 642 841 240`) to coordinate customizations and shipping.
- **Advanced Interactive Gallery Filters**: Browse the collection with smooth transitions (using **Framer Motion**) and filter by Category (Toys, Boxes, Beanies, Accessories), Size (Small, Medium, Large), and Color (Pink, Blue, Beige, Gray, Pastel).
- **Floating Contact Hub**: Persistent, pulsing WhatsApp and TikTok contact buttons for friction-free client communications.
- **Aggressive SEO & Microdata**: Fully optimized metadata descriptions, keywords, OpenGraph previews, and `Schema.org/LocalBusiness` structured JSON-LD data for high indexing performance.
- **Spain to Worldwide Shipping**: Clear local branding highlighting Marbella, Spain craft roots and worldwide tracked delivery.

---

## ⚡ Performance Optimizations

To achieve a near **100% user experience and PageSpeed rating** on mobile and desktop, we implemented:
1. **Code Splitting (Manual Chunks)**: Configured Vite/Rollup in `vite.config.ts` to separate heavy dependencies (`react-icons`, `framer-motion`, `react-router-dom`) into smaller dynamic files, slashing initial page load weight.
2. **Auto-Format Images**: Optimized all Unsplash image URLs in `src/data/products.ts` to request highly compressed formats (`q=70&auto=format`) and reduced dimensions (`w=500`), saving up to 70% bandwidth.
3. **Image Lazy Loading**: Added `loading="lazy"` to all image tags below the fold to avoid loading off-screen assets until they are visible to the user.
4. **Non-Blocking Font Rendering**: Utilized `font-display: swap` for Google Fonts in `index.html` to eliminate render-blocking delay.

---

## 📂 Project Structure

```
Cards/
├── docs/               # Strategic planning documents
│   └── strategy.md     # Business architecture, TikTok marketing & operations
├── src/
│   ├── components/     # Animated components (FloatingContact, Snowflakes, etc.)
│   ├── context/        # Cart and Products global React state
│   ├── data/           # Optimized products data and customer reviews
│   ├── pages/          # Pages (HomePage, ProductListingPage, CartPage, etc.)
│   ├── styles/         # Global styling and tailwind stylesheets
│   └── App.tsx         # simplified routing configuration
├── index.html          # Google Fonts & LocalBusiness SEO metadata
├── vite.config.ts      # Rollup bundle code-splitting rules
└── tailwind.config.js  # Pastel styling token configuration
```

---

## 🚀 Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run in development mode:
   ```sh
   npm run dev
   ```
3. Compile production-optimized build:
   ```sh
   npm run build
   ```

---

## 📜 Business & Operational Strategy

For detailed plans on TikTok video hooks, local SEO Marbella setups, and Yulia's crafting/shipping checklists, refer to:
👉 [docs/strategy.md](file:///c:/Users/wiwal/GIT/kt.tikotoys.shop/Cards/docs/strategy.md)
