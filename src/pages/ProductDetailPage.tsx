import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-pink-500 hover:text-pink-400">
            ← Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  // Похожие товары (та же категория)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li>/</li>
            <li className="text-white">{product.name}</li>
          </ol>
        </nav>

        {/* Основной контент */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-3xl overflow-hidden aspect-square">
              <img
                src={product.imageUrl[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Миниатюры */}
            {product.imageUrl.length > 1 && (
              <div className="flex gap-3">
                {product.imageUrl.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-pink-500 shadow-lg shadow-pink-500/30'
                        : 'border-gray-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-pink-500/20 text-pink-400 text-sm px-3 py-1 rounded-full mb-3">
                {product.category?.charAt(0).toUpperCase()}{product.category?.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-amber-400">
                  {product.price}{product.currency}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {Math.round(product.price * 1.3)}{product.currency}
                </span>
                <span className="bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded">
                  -30%
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <span className="text-pink-400 text-sm">✨ Handmade</span>
                <p className="text-gray-400 text-sm mt-1">Made with love</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <span className="text-pink-400 text-sm">🧶 Premium Yarn</span>
                <p className="text-gray-400 text-sm mt-1">Hypoallergenic</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <span className="text-pink-400 text-sm">🚚 Free Shipping</span>
                <p className="text-gray-400 text-sm mt-1">Orders over 50€</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <span className="text-pink-400 text-sm">↩️ 30 Days Return</span>
                <p className="text-gray-400 text-sm mt-1">Easy returns</p>
              </div>
            </div>

            {/* Количество и кнопки */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Quantity:</span>
                <div className="flex items-center bg-gray-800 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-white hover:bg-gray-700 rounded-l-xl transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-white hover:bg-gray-700 rounded-r-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-pink-500/30"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-gray-800/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300"
                >
                  <img
                    src={p.imageUrl[0]}
                    alt={p.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 group-hover:text-pink-400 transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-amber-400 font-bold">{p.price}{p.currency}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
