# Git Commands для загрузки проекта на GitHub
# Выполняйте команды последовательно в PowerShell

# 1. Добавить README
git add README.md
git commit -m "docs: create comprehensive README in Russian

- Complete project documentation
- Installation and setup instructions
- Demo credentials and access guide
- Project structure overview
- Context API documentation
- Deployment instructions
- Troubleshooting section
- Future roadmap"

# 2. Добавить типы и данные
git add src/types.ts src/data/products.ts
git commit -m "feat: add product types and sample data

- Add User, Order, CartItem interfaces to types.ts
- Create products.ts with 8 sample products
- Products include toys, beanies, and accessories categories"

# 3. Добавить контексты
git add src/context/
git commit -m "feat: add context providers for state management

- CartContext: shopping cart with localStorage persistence
- ProductsContext: product CRUD operations
- AuthContext: user authentication and authorization
- OrdersContext: order management and history"

# 4. Добавить вспомогательные компоненты
git add src/components/ProtectedRoute.tsx src/components/ScrollToTop.tsx
git commit -m "feat: add utility components

- ProtectedRoute: route protection with auth check
- ScrollToTop: auto-scroll on navigation
- Support for admin-only routes"

# 5. Добавить страницы авторизации и профиля
git add src/pages/LoginPage.tsx src/pages/RegisterPage.tsx src/pages/ProfilePage.tsx src/pages/OrdersPage.tsx
git commit -m "feat: add authentication and user profile pages

- LoginPage: user login with demo credentials
- RegisterPage: user registration with validation
- ProfilePage: user profile with edit functionality
- OrdersPage: order history with status tracking
- All text in English"

# 6. Добавить страницы товаров
git add src/pages/ProductListingPage.tsx src/pages/ProductDetailPage.tsx src/pages/CartPage.tsx
git commit -m "feat: add e-commerce product pages

- ProductListingPage: catalog with filters and sorting
- ProductDetailPage: product details with gallery
- CartPage: shopping cart with quantity management
- Category filtering from URL params
- Auto-scroll to top on category change"

# 7. Добавить страницы checkout
git add src/pages/CheckoutShippingPage.tsx src/pages/CheckoutPaymentPage.tsx
git commit -m "feat: add checkout flow pages

- CheckoutShippingPage: shipping info and delivery options
- CheckoutPaymentPage: payment method and order confirmation
- Order creation on successful payment
- Integration with OrdersContext
- Progress indicator for checkout steps"

# 8. Добавить админ-панель
git add src/pages/AdminDashboard.tsx
git commit -m "feat: add admin dashboard for product management

- Full CRUD operations for products
- Statistics by category
- Product form with image URLs
- Admin-only access with ProtectedRoute
- Table view with edit/delete actions"

# 9. Обновить Header и Footer
git add src/components/Header.tsx src/components/Footer.tsx
git commit -m "feat: update Header and Footer components

Header:
- Add Login/Register buttons
- User dropdown menu with avatar
- Cart icon with item counter
- Mobile responsive menu
- All text in English

Footer:
- Add admin panel link
- Update navigation links"

# 10. Обновить HomePage
git add src/pages/HomePage.tsx
git commit -m "feat: redesign HomePage for e-commerce

- Hero section with CTA
- Category grid with navigation
- Featured products section
- Customer reviews
- Newsletter CTA
- All sections responsive"

# 11. Обновить App.tsx
git add src/App.tsx
git commit -m "feat: integrate all contexts and routes

- Wrap app with AuthProvider, ProductsProvider, OrdersProvider
- Add ScrollToTop component
- Add all e-commerce routes
- Add protected routes for profile, orders, admin
- Lazy load all pages for better performance"

# 12. Отправить на GitHub
git push origin main

# Готово! ✅
