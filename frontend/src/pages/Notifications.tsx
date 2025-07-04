import React, { useState } from 'react';
import { Bell, Package, Heart, Tag, CheckCircle, X, Filter, Search } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on its way!',
      time: '2 hours ago',
      read: false,
      icon: Package
    },
    {
      id: 2,
      type: 'wishlist',
      title: 'Price Drop Alert',
      message: 'Item in your wishlist is now 30% off - Limited time offer!',
      time: '4 hours ago',
      read: false,
      icon: Heart
    },
    {
      id: 3,
      type: 'deal',
      title: 'Flash Sale Started',
      message: 'Don\'t miss out! Flash sale on electronics - Up to 50% off',
      time: '6 hours ago',
      read: true,
      icon: Tag
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #12340 has been delivered successfully.',
      time: '1 day ago',
      read: true,
      icon: CheckCircle
    },
    {
      id: 5,
      type: 'deal',
      title: 'New Arrival',
      message: 'Check out the latest smartphones just added to our collection!',
      time: '2 days ago',
      read: false,
      icon: Bell
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notif.read) ||
                         (filter === 'read' && notif.read) ||
                         notif.type === filter;
    
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getTypeColor = (type) => {
    switch(type) {
      case 'order': return 'text-blue-500';
      case 'wishlist': return 'text-red-500';
      case 'deal': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="mr-3 text-blue-500" size={28} />
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="ml-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Mark All as Read
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={18} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="order">Orders</option>
                <option value="wishlist">Wishlist</option>
                <option value="deal">Deals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Bell className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500 text-lg">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
                    notification.read ? 'border-gray-300' : 'border-blue-500'
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        notification.read ? 'bg-gray-100' : 'bg-blue-50'
                      }`}>
                        <IconComponent 
                          className={getTypeColor(notification.type)} 
                          size={20} 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className={`mt-1 ${
                          notification.read ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <span className="text-sm text-gray-400 mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete notification"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;