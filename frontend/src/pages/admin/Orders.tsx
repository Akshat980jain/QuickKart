import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Printer, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle,
  FileText
} from 'lucide-react';
import { MOCK_ADMIN_ORDERS, AdminOrder } from '../../data/mockExtraPagesData';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
      case 'Processing':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
      case 'Pending':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400';
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a]">Order Fulfillment Center</span>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-1">Master Orders Queue</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#00241a] text-white">
              {orders.length} Total Orders
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search order #, customer, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] text-xs focus:outline-none focus:ring-2 focus:ring-[#fd6c1a]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-[#00241a] text-white dark:bg-[#234e40]'
                    : 'bg-white dark:bg-[#1c2722] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2e3a35]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-[#1c2722] rounded-2xl border border-gray-200 dark:border-[#2e3a35] shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2e3a35] bg-[#f8f9fa] dark:bg-[#0e1512] font-semibold text-gray-500 uppercase">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Value</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e3a35]">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-[#2e3a35]/40 transition-colors">
                  <td className="p-4 font-bold text-[#00241a] dark:text-[#a3d0be]">{o.orderNumber}</td>
                  <td className="p-4">
                    <div className="font-semibold text-[#191c1d] dark:text-white">{o.customerName}</div>
                    <div className="text-gray-400 text-[11px]">{o.customerEmail}</div>
                  </td>
                  <td className="p-4 text-gray-500">{o.date}</td>
                  <td className="p-4 font-bold">₹{o.total.toLocaleString()}</td>
                  <td className="p-4 text-gray-500">{o.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-[#2e3a35] hover:bg-gray-100 dark:hover:bg-[#2e3a35]"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal Drawer */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] max-w-lg w-full space-y-6 shadow-2xl relative">
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-[#2e3a35] pb-4">
                <div>
                  <h3 className="font-headline font-bold text-xl">{selectedOrder.orderNumber}</h3>
                  <p className="text-xs text-gray-400">Placed on {selectedOrder.date}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-500 text-sm font-bold">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h5 className="font-semibold text-gray-400 uppercase mb-1">Shipping Address</h5>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-gray-500">{selectedOrder.shippingAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <h5 className="font-semibold text-gray-400 uppercase mb-1">Update Status</h5>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as AdminOrder['status'])}
                      className="w-full p-2 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] font-semibold text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-400 uppercase mb-1">Tracking Number</h5>
                    <p className="font-mono text-xs text-[#fd6c1a]">{selectedOrder.trackingNumber || 'Not assigned'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-[#2e3a35]">
                <button
                  onClick={() => alert(`Printing Shipping Invoice for ${selectedOrder.orderNumber}`)}
                  className="w-full py-2.5 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e] flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrders;
