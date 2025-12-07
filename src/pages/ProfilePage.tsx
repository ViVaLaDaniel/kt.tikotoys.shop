import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальности здесь был бы API запрос на обновление профиля
    alert('Profile updated! (demo)');
    setIsEditing(false);
  };

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li className="text-white">Profile</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
                {user.isAdmin && (
                  <span className="inline-block bg-pink-500/20 text-pink-400 text-xs px-3 py-1 rounded-full mt-2">
                    👑 Administrator
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-3 bg-pink-500/20 text-pink-400 rounded-xl font-medium"
                >
                  👤 Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-xl font-medium transition-colors"
                >
                  📦 My Orders
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-xl font-medium transition-colors"
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded-xl font-medium transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-pink-400 hover:text-pink-300 text-sm font-medium"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl font-bold transition-all"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: user.name, email: user.email });
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Name</label>
                    <p className="text-white text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Email</label>
                    <p className="text-white text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Registration Date</label>
                    <p className="text-white text-lg">
                      {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-gray-400 text-sm">Total Orders</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-gray-400 text-sm">Wishlist</div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Security</h2>
              <button className="text-pink-400 hover:text-pink-300 text-sm font-medium">
                🔑 Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
