import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Clock, 
  User, 
  CheckCircle, 
  AlertTriangle,
  Send
} from 'lucide-react';
import { MOCK_SUPPORT_TICKETS, SupportTicket } from '../../data/mockExtraPagesData';

const AdminSupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(MOCK_SUPPORT_TICKETS[0]);
  const [replyMessage, setReplyMessage] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyMessage.trim() && selectedTicket) {
      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved', messagesCount: t.messagesCount + 1 } : t));
      setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
      setReplyMessage('');
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a]">Customer Helpdesk</span>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl mt-1">Support Ticket Queue</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Ticket Queue List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-headline font-semibold text-lg">Inbound Tickets ({tickets.length})</h3>
            <div className="space-y-3">
              {tickets.map((t) => {
                const isSelected = selectedTicket?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicket(t)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#1c2722] border-[#fd6c1a] shadow-md ring-2 ring-[#fd6c1a]/20'
                        : 'bg-white/60 dark:bg-[#1c2722]/60 border-gray-200 dark:border-[#2e3a35]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-[#00241a] dark:text-[#a3d0be]">{t.ticketId}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        t.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{t.subject}</h4>
                    <p className="text-xs text-gray-500 mb-3">{t.customerName} ({t.email})</p>
                    <div className="flex justify-between text-[11px] text-gray-400 border-t border-gray-100 dark:border-[#2e3a35] pt-2">
                      <span>Status: <strong className="text-[#191c1d] dark:text-white">{t.status}</strong></span>
                      <span>{t.lastUpdated}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Thread & Action Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
            {selectedTicket ? (
              <>
                <div className="border-b border-gray-100 dark:border-[#2e3a35] pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#fd6c1a]">{selectedTicket.ticketId}</span>
                      <h3 className="font-headline font-bold text-xl">{selectedTicket.subject}</h3>
                    </div>
                    <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-[#00241a] text-white">
                      {selectedTicket.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">From: {selectedTicket.customerName} ({selectedTicket.email})</p>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto p-4 bg-[#f8f9fa] dark:bg-[#0e1512] rounded-2xl border border-gray-100 dark:border-[#2e3a35] text-xs">
                  <div className="bg-white dark:bg-[#1c2722] p-4 rounded-xl border border-gray-200 dark:border-[#2e3a35]">
                    <p className="font-bold mb-1">{selectedTicket.customerName}</p>
                    <p className="text-gray-600 dark:text-gray-300">Hello support team, I would like to request assistance regarding {selectedTicket.subject.toLowerCase()}.</p>
                    <span className="text-[10px] text-gray-400 block mt-2">{selectedTicket.createdAt}</span>
                  </div>
                </div>

                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Type official support reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#0e1512] border border-gray-200 dark:border-[#2e3a35] text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00241a] text-white text-xs font-semibold hover:bg-[#0d3b2e] flex items-center justify-center gap-2"
                  >
                    Send Reply & Resolve Ticket <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            ) : (
              <p className="text-center text-gray-400 text-sm py-12">Select a ticket from the queue to view details.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSupportTickets;
