import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Scroll to top when the component mounts or the product ID changes
    window.scrollTo(0, 0);
    // Reset state for new product page
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brown-dark mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-salmon hover:opacity-80">
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

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-brown-light">
            <li><Link to="/" className="hover:text-brown-dark">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-brown-dark">Shop</Link></li>
            <li>/</li>
            <li className="text-brown-dark font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="bg-moccasin/50 rounded-3xl overflow-hidden aspect-square border border-sand/50">
              <img src={product.imageUrl[currentImageIndex]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.imageUrl.length > 1 && (
              <div className="flex gap-3">
                {product.imageUrl.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-salmon shadow-lg shadow-sand/30'
                        : 'border-sand/50 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block bg-sand/20 text-sand text-sm px-3 py-1 rounded-full mb-3">
                {product.category?.charAt(0).toUpperCase()}{product.category?.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-brown-dark mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-brown-light">({product.reviewCount} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-salmon">{product.price}{product.currency}</span>
                <span className="text-xl text-brown-light/70 line-through">{Math.round(product.price * 1.3)}{product.currency}</span>
                <span className="bg-green-500/10 text-green-600 text-sm px-2 py-1 rounded">-30%</span>
              </div>
            </div>

            <p className="text-brown-light leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-moccasin/50 rounded-xl p-4"><span className="text-salmon text-sm">✨ Handmade</span><p className="text-brown-light text-sm mt-1">Made with love</p></div>
              <div className="bg-moccasin/50 rounded-xl p-4"><span className="text-salmon text-sm">🧶 Premium Yarn</span><p className="text-brown-light text-sm mt-1">Hypoallergenic</p></div>
              <div className="bg-moccasin/50 rounded-xl p-4"><span className="text-salmon text-sm">🚚 Free Shipping</span><p className="text-brown-light text-sm mt-1">Orders over 50€</p></div>
              <div className="bg-moccasin/50 rounded-xl p-4"><span className="text-salmon text-sm">↩️ 30 Days Return</span><p className="text-brown-light text-sm mt-1">Easy returns</p></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-brown-light">Quantity:</span>
                <div className="flex items-center bg-moccasin/50 rounded-xl border border-sand/50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-brown-dark hover:bg-sand/30 rounded-l-xl transition">−</button>
                  <span className="px-4 py-2 text-brown-dark font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-brown-dark hover:bg-sand/30 rounded-r-xl transition">+</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleAddToCart} className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-cream-bg text-brown-dark hover:bg-sand/50 border-2 border-sand'
                }`}>
                  {addedToCart ? (
                    <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Added!</>
                  ) : (
                    <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> Add to Cart</>
                  )}
                </button>
                <button onClick={handleBuyNow} className="flex-1 bg-sand hover:bg-salmon text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-sand/40">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-brown-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group bg-moccasin/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-sand/20 transition-all duration-300 border border-sand/30 hover:border-salmon/30">
                  <img src={p.imageUrl[0]} alt={p.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4">
                    <h3 className="text-brown-dark font-medium mb-2 group-hover:text-salmon transition-colors">{p.name}</h3>
                    <span className="text-salmon font-bold">{p.price}{p.currency}</span>
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
