import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { Product } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: '€',
    imageUrl: '',
    description: '',
    rating: '4.5',
    reviewCount: '0',
    category: 'toys' as 'toys' | 'beanies' | 'accessories',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      currency: formData.currency,
      imageUrl: formData.imageUrl.split(',').map(s => s.trim()),
      description: formData.description,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      category: formData.category,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }

    handleCancel();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      currency: product.currency,
      imageUrl: product.imageUrl.join(', '),
      description: product.description,
      rating: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      category: product.category || 'toys',
    });
    setIsAddingProduct(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      currency: '€',
      imageUrl: '',
      description: '',
      rating: '4.5',
      reviewCount: '0',
      category: 'toys',
    });
  };

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-brown-dark mb-2">📦 Админ-панель</h1>
            <p className="text-brown-light">Управление товарами магазина</p>
          </div>
          {!isAddingProduct && (
            <button
              onClick={() => setIsAddingProduct(true)}
              className="bg-sand hover:bg-salmon text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sand/40 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Добавить товар
            </button>
          )}
        </div>

        {isAddingProduct && (
          <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand mb-8">
            <h2 className="text-2xl font-bold text-brown-dark mb-6">{editingProduct ? '✏️ Редактировать товар' : '➕ Новый товар'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brown-light text-sm mb-2">Название товара *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" placeholder="Например: Stitch Amigurumi" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Категория *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none">
                    <option value="toys">Toys (Игрушки)</option>
                    <option value="beanies">Beanies (Шапки)</option>
                    <option value="accessories">Accessories (Аксессуары)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Цена *</label>
                  <div className="flex gap-2">
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="flex-grow bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" placeholder="49.95" />
                    <select name="currency" value={formData.currency} onChange={handleInputChange} className="bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none">
                      <option value="€">€</option>
                      <option value="$">$</option>
                      <option value="£">£</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Рейтинг (0-5) *</label>
                  <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} required step="0.1" min="0" max="5" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Количество отзывов *</label>
                  <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleInputChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">URL изображений (через запятую) *</label>
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" placeholder="/images/toy1.webp, /images/toy2.webp" />
                  <p className="text-brown-light/70 text-xs mt-1">Можно указать несколько через запятую</p>
                </div>
              </div>
              <div>
                <label className="block text-brown-light text-sm mb-2">Описание *</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={4} className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" placeholder="Подробное описание товара..."></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-sand hover:bg-salmon text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sand/40">{editingProduct ? 'Сохранить изменения' : 'Добавить товар'}</button>
                <button type="button" onClick={handleCancel} className="flex-1 bg-moccasin hover:bg-sand/50 text-brown-dark py-3 px-6 rounded-xl font-bold transition-colors">Отмена</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-sand/80 to-salmon/80 backdrop-blur-sm border border-sand rounded-2xl p-6">
            <div className="text-3xl mb-2">🛍️</div>
            <div className="text-2xl font-bold text-brown-dark">{products.length}</div>
            <div className="text-brown-light text-sm">Всего товаров</div>
          </div>
          <div className="bg-gradient-to-br from-sand/80 to-salmon/80 backdrop-blur-sm border border-sand rounded-2xl p-6">
            <div className="text-3xl mb-2">🧸</div>
            <div className="text-2xl font-bold text-brown-dark">{products.filter(p => p.category === 'toys').length}</div>
            <div className="text-brown-light text-sm">Игрушки</div>
          </div>
          <div className="bg-gradient-to-br from-sand/80 to-salmon/80 backdrop-blur-sm border border-sand rounded-2xl p-6">
            <div className="text-3xl mb-2">🧢</div>
            <div className="text-2xl font-bold text-brown-dark">{products.filter(p => p.category === 'beanies').length}</div>
            <div className="text-brown-light text-sm">Шапки</div>
          </div>
        </div>

        <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl border border-sand overflow-hidden">
          <div className="p-6 border-b border-sand">
            <h2 className="text-xl font-bold text-brown-dark">Все товары</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-brown-light">Товар</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-brown-light">Категория</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-brown-light">Цена</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-brown-light">Рейтинг</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-brown-light">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-sand/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-cream-bg" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect fill="%23FFF5E1" width="48" height="48"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23A0522D" font-size="20"%3E?%3C/text%3E%3C/svg%3E'; }} />
                        <div>
                          <div className="text-brown-dark font-medium">{product.name}</div>
                          <div className="text-brown-light text-sm line-clamp-1">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${product.category === 'toys' ? 'bg-salmon/20 text-salmon' : 'bg-sand/30 text-brown-light'}`}>
                        {product.category === 'toys' && '🧸 Игрушки'}
                        {product.category === 'beanies' && '🧢 Шапки'}
                        {product.category === 'accessories' && '🎀 Аксессуары'}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="text-salmon font-bold">{product.price}{product.currency}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-brown-dark">⭐ {product.rating}</span>
                        <span className="text-brown-light/70 text-sm">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(product)} className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-3 py-2 rounded-lg transition-colors" title="Редактировать"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        <button onClick={() => handleDelete(product.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-2 rounded-lg transition-colors" title="Удалить"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brown-light text-lg">Товаров пока нет. Добавьте первый!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
