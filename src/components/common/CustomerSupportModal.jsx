import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Headset, ShieldCheck, CheckCircle2, Clock, HelpCircle, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CustomerSupportModal({ isOpen, onClose }) {
  const { customerOrders, addNotification } = useStore();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'faqs' | 'ticket'
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'concierge',
      name: 'Jean-Pierre (Geneva Concierge)',
      text: 'Greetings. Welcome to VOLUTE Bespoke Support. How may I assist you with your 10-minute speed allocation or custom cigarette order today?',
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [ticketForm, setTicketForm] = useState({
    orderId: customerOrders[0]?.id || '',
    subject: 'Speed Delivery Inquiry',
    description: '',
  });

  const faqs = [
    {
      q: 'How does 10-Minute Express Delivery work?',
      a: 'Our high-speed luxury couriers are dispatched immediately from local city ateliers in Mayfair, Paris, Zurich, and Tokyo upon order placement.',
    },
    {
      q: 'Can I edit 3D specifications after placing an order?',
      a: 'Custom 3D engraved monograms and material specs are locked into production within 2 minutes of checkout.',
    },
    {
      q: 'What leaf blends and tobacco materials are used?',
      a: 'We exclusively source hand-selected Virginia Bright, Turkish Oriental, and Cuban-Seed Dominican leaf paired with 24K edible gold leaf filigree.',
    },
    {
      q: 'What is the return & guarantee policy?',
      a: 'Every VOLUTE allocation box arrives with a tamper-evident Geneva seal. Unopened allocations enjoy a 30-day complimentary exchange guarantee.',
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'You',
      text: inputMessage,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const userQuery = inputMessage.toLowerCase();
    setInputMessage('');

    // Instant AI Concierge response logic
    setTimeout(() => {
      let botReply = "Thank you for reaching out. A dedicated Geneva Concierge representative will review your request shortly.";
      if (userQuery.includes('order') || userQuery.includes('delivery') || userQuery.includes('track')) {
        botReply = "Your recent allocation order is being dispatched via express courier. You can check live 10-minute status on your Orders page.";
      } else if (userQuery.includes('blend') || userQuery.includes('gold') || userQuery.includes('tobacco')) {
        botReply = "All VOLUTE creations use 100% organic cured Virginia & Oriental leaves with 24K edible gold filigree and Japanese silk filters.";
      } else if (userQuery.includes('custom') || userQuery.includes('3d') || userQuery.includes('monogram')) {
        botReply = "You can design bespoke cigarette filters, casings, and laser monograms live in our 3D Studio prior to ordering.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'concierge',
          name: 'Jean-Pierre (Geneva Concierge)',
          text: botReply,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    addNotification(`Support Ticket #${Math.floor(10000 + Math.random() * 90000)} created. Response expected within 15 mins.`, 'success');
    setTicketForm({ orderId: '', subject: 'Speed Delivery Inquiry', description: '' });
    setActiveTab('chat');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-xl bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px] relative"
        >
          {/* Header */}
          <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Headset className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
                  VOLUTE 24/7 Concierge Support
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Response Time: &lt; 2 Mins
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-900 bg-zinc-900/50 text-xs font-semibold uppercase">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'chat'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Live Concierge Chat
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'faqs'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Instant FAQs
            </button>

            <button
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'ticket'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Submit Ticket
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === 'chat' && (
              <div className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="text-[10px] text-zinc-500 mb-1">{msg.name}</span>
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-zinc-900">
                  <input
                    type="text"
                    placeholder="Type your inquiry..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl font-bold text-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3 text-xs">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl border border-zinc-800 space-y-1.5">
                    <h4 className="font-serif-luxury font-bold text-amber-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {faq.q}
                    </h4>
                    <p className="text-zinc-400 leading-relaxed pl-5">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'ticket' && (
              <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-400 uppercase font-semibold block mb-1">Order Allocation ID</label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-9842"
                    value={ticketForm.orderId}
                    onChange={(e) => setTicketForm({ ...ticketForm, orderId: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-semibold block mb-1">Subject</label>
                  <select
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Speed Delivery Inquiry">Speed Delivery Inquiry</option>
                    <option value="Custom 3D Specification">Custom 3D Specification</option>
                    <option value="Damaged Box Guarantee">Damaged Box Guarantee</option>
                    <option value="Special Atelier Request">Special Atelier Request</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-semibold block mb-1">Detailed Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your request in detail..."
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold uppercase text-xs shadow-lg shadow-amber-500/20"
                >
                  Submit Concierge Ticket
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
