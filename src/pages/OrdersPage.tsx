import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { getOrdersByUserId } = useOrders();

  if (!user) {
    return null;
  }

  const orders = getOrdersByUserId(user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменён';
      default:
        return status;
    }
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link to="/profile" className="hover:text-white">Профиль</Link></li>
            <li>/</li>
            <li className="text-white">Заказы</li>
          </ol>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Мои заказы</h1>
          <Link
            to="/shop"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-pink-500/30"
          >
            Продолжить покупки
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-2">У вас ещё нет заказов</h2>
            <p className="text-gray-400 mb-6">Начните делать покупки прямо сейчас!</p>
            <Link
              to="/shop"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-pink-500/30"
            >
              Перейти в магазин
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">Заказ #{order.id}</h3>
                        <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Итого</p>
                      <p className="text-2xl font-bold text-amber-400">{order.total.toFixed(2)}€</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.product.imageUrl[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23333" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3E?%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <div className="flex-grow">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-white hover:text-pink-400 font-medium transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-gray-400 text-sm">Количество: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4 className="text-white font-medium mb-2">Адрес доставки:</h4>
                    <p className="text-gray-400 text-sm">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      <br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex gap-4">
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Подробнее
                  </button>
                  {order.status === 'pending' && (
                    <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-lg font-medium transition-colors">
                      Отменить заказ
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Повторить заказ
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
