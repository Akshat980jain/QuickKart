import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Thank you for your order!</h1>
      <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully. You will receive a confirmation email soon.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccess; 