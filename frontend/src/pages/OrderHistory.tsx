import React from 'react';
import { useAuth } from '../hooks/useAuth';

const OrderHistory = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {!user ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">Please log in to view your order history.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <p className="text-gray-600">Your past orders will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;