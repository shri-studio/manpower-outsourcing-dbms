import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Building2, 
  UserPlus, 
  LogOut, 
  Plus, 
  ShieldCheck, 
  LayoutDashboard,
  Briefcase,
  CheckCircle2,
  Clock,
  FileUp,
  Heart,
  FileText,
  Download,
  Search,
  Edit,
  Trash2,
  UserCircle,
  ChevronDown
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { User, Client, Employee, Dependant, Company } from './types';

// Components
const LandingPage = ({ onGoToLogin }: { onGoToLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#94A3B8] font-sans selection:bg-[#3B82F6]/30 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center border border-[#3B82F6]/20">
              <ShieldCheck className="text-[#3B82F6] w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Manpower Outsourcing DBMS</span>
          </div>
          <button 
            onClick={onGoToLogin}
            className="px-8 py-2.5 border border-[#3B82F6] text-[#3B82F6] rounded-full font-semibold hover:bg-[#3B82F6] hover:text-white transition-all duration-300"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3B82F6 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            Workforce Management Platform
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
          >
            Manage Your Workforce<br />With Confidence
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#94A3B8] mb-12 max-w-2xl leading-relaxed"
          >
            The all-in-one platform for outsourcing companies to manage 
            employees, clients, contracts and insurance — all in one place.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onGoToLogin}
            className="group relative px-10 py-4 bg-[#3B82F6] text-white rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Get Started <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need, nothing you don't</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-[#3B82F6]" />,
                title: "Employee Management",
                desc: "Track personal details, documents, salary, insurance and dependants in one place."
              },
              {
                icon: <Building2 className="w-8 h-8 text-[#3B82F6]" />,
                title: "Client Management",
                desc: "Manage client companies, contacts, contracts and assigned workforce effortlessly."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#3B82F6]" />,
                title: "Insurance & Documents",
                desc: "Keep insurance records, expiry dates and important documents organized and accessible."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-[#111827] rounded-3xl border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 group"
              >
                <div className="mb-8 p-4 bg-[#3B82F6]/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Up and running in minutes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                title: "Admin Setup",
                desc: "Admin account created by platform"
              },
              {
                num: "02",
                title: "Add Your Data",
                desc: "Import clients and employees"
              },
              {
                num: "03",
                title: "Manage Everything",
                desc: "Full control from one dashboard"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-5xl font-bold text-[#3B82F6]/20 mb-6 font-mono">{step.num}</span>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to streamline your workforce?</h2>
            <p className="text-xl text-[#94A3B8] mb-12">Join companies already managing their manpower smarter.</p>
            <button 
              onClick={onGoToLogin}
              className="group relative px-10 py-4 bg-[#3B82F6] text-white rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Get Started <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <span className="font-bold text-white">Manpower Outsourcing DBMS</span>
            <button 
              onClick={onGoToLogin}
              className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors font-medium"
            >
              Login
            </button>
          </div>
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-sm text-[#94A3B8]/50 uppercase tracking-widest">
              crafted by <span className="text-[#94A3B8]">shri Studio</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = ({ onLogin, isMaster = false }: { onLogin: (user: User, token: string) => void, isMaster?: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, isMaster }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.user, data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className={`w-16 h-16 ${isMaster ? 'bg-purple-600' : 'bg-blue-600'} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {isMaster ? 'Master Access' : 'Manpower Portal'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all bg-gray-50/50"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all bg-gray-50/50"
              placeholder="••••••••"
              required={!isMaster}
            />
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100"
            >
              {error}
            </motion.p>
          )}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full ${isMaster ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          <div className="text-center">
            <button 
              type="button"
              onClick={() => window.location.href = '/forgot-password'}
              className="text-xs font-semibold text-gray-400 hover:text-blue-600 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const SetPasswordPage = ({ email, onComplete }: { email: string, onComplete: (user: User, token: string) => void }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        onComplete(data.user, data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Set Your Password</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">Please set a secure password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all bg-gray-50/50"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all bg-gray-50/50"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100"
            >
              {error}
            </motion.p>
          )}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Set Password & Continue'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Forgot Password</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">Enter your email to receive a reset link</p>
        </div>

        {message ? (
          <div className="text-center space-y-6">
            <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl border border-blue-100 font-medium">
              {message}
            </div>
            <button 
              onClick={() => window.location.href = '/login'}
              className="text-blue-600 font-bold hover:underline"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all bg-gray-50/50"
                placeholder="name@company.com"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="text-center">
              <button 
                type="button"
                onClick={() => window.location.href = '/login'}
                className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-bold">Invalid reset link</p>
          <button onClick={() => window.location.href = '/forgot-password'} className="text-blue-600 font-bold hover:underline">
            Request a new link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">Enter your new secure password</p>
        </div>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 font-medium text-center">
            {message}. Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all bg-gray-50/50"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all bg-gray-50/50"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const SuperAdminDashboard = ({ user, token, onLogout }: { user: User, token: string, onLogout: () => void }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyEmail, setNewCompanyEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    const res = await fetch('/api/superadmin/companies', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setCompanies(data);
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/superadmin/companies', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ company_name: newCompanyName, email: newCompanyEmail }),
    });
    if (res.ok) {
      setNewCompanyName('');
      setNewCompanyEmail('');
      setShowAddCompany(false);
      fetchCompanies();
    }
    setLoading(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/superadmin/admins', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        name: newAdminName, 
        email: newAdminEmail, 
        company_id: selectedCompanyId 
      }),
    });
    if (res.ok) {
      setNewAdminName('');
      setNewAdminEmail('');
      setSelectedCompanyId('');
      setShowAddAdmin(false);
    }
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-gray-900">Master Console</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">{user.name}</span>
          <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Companies Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Companies</h2>
              <button 
                onClick={() => setShowAddCompany(true)}
                className="p-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {companies.map(c => (
                <div key={c.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{c.name}</h3>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  <Building2 size={16} className="text-gray-300" />
                </div>
              ))}
              {companies.length === 0 && <p className="text-sm text-gray-400 italic">No companies added yet</p>}
            </div>
          </section>

          {/* Admins Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Company Admins</h2>
              <button 
                onClick={() => setShowAddAdmin(true)}
                className="p-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <UserPlus size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-400 italic">Assign administrators to companies. They will receive credentials via email.</p>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showAddCompany && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Add New Company</h3>
              <form onSubmit={handleAddCompany} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Company Name</label>
                  <input type="text" value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all" placeholder="Acme Corp" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Official Email</label>
                  <input type="email" value={newCompanyEmail} onChange={(e) => setNewCompanyEmail(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all" placeholder="admin@acme.com" required />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddCompany(false)} className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 px-4 py-3 rounded-2xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">Create</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showAddAdmin && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Add Company Admin</h3>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Admin Name</label>
                  <input type="text" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Admin Email</label>
                  <input type="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all" placeholder="john@acme.com" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Assign Company</label>
                  <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(Number(e.target.value))} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all bg-white" required>
                    <option value="">Select Company</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddAdmin(false)} className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 px-4 py-3 rounded-2xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">Create</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminDashboard = ({ user, token, onLogout }: { user: User, token: string, onLogout: () => void }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });
    if (res.ok) {
      setNewName('');
      setNewEmail('');
      setShowAddUser(false);
      fetchUsers();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <nav className="bg-white border-b border-black/5 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-semibold tracking-tight">Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">{user.name}</span>
          <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">User Management</h2>
            <p className="text-gray-500 mt-1">Create and manage staff access codes</p>
          </div>
          <button 
            onClick={() => setShowAddUser(true)}
            className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-black/90 transition-all"
          >
            <UserPlus size={18} />
            Add Staff
          </button>
        </div>

        <div className="grid gap-4">
          {users.map((u) => (
            <motion.div 
              key={u.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-2xl border border-black/5 flex justify-between items-center shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{u.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">ID: {u.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Email</span>
                <code className="bg-gray-50 px-3 py-1 rounded-lg text-sm font-mono border border-gray-100">{u.email}</code>
              </div>
            </motion.div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <Users className="mx-auto text-gray-300 mb-2" size={40} />
              <p className="text-gray-400 text-sm">No staff members found</p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showAddUser && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-6">Add New Staff</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                    placeholder="staff@company.com"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const COUNTRY_CODES = [
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+965", country: "Kuwait" },
  { code: "+968", country: "Oman" },
  { code: "+974", country: "Qatar" },
  { code: "+973", country: "Bahrain" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+880", country: "Bangladesh" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+977", country: "Nepal" },
  { code: "+63", country: "Philippines" },
  { code: "+20", country: "Egypt" },
  { code: "+962", country: "Jordan" },
  { code: "+961", country: "Lebanon" },
  { code: "+212", country: "Morocco" },
  { code: "+216", country: "Tunisia" },
  { code: "+249", country: "Sudan" },
  { code: "+254", country: "Kenya" },
  { code: "+251", country: "Ethiopia" },
  { code: "+256", country: "Uganda" },
  { code: "+234", country: "Nigeria" },
  { code: "+233", country: "Ghana" },
  { code: "+27", country: "South Africa" },
  { code: "+44", country: "UK" },
  { code: "+1", country: "USA/Canada" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+62", country: "Indonesia" },
  { code: "+60", country: "Malaysia" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+90", country: "Turkey" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+93", country: "Afghanistan" },
  { code: "+355", country: "Albania" },
  { code: "+213", country: "Algeria" },
  { code: "+376", country: "Andorra" },
  { code: "+244", country: "Angola" },
  { code: "+1-268", country: "Antigua and Barbuda" },
  { code: "+54", country: "Argentina" },
  { code: "+374", country: "Armenia" },
  { code: "+297", country: "Aruba" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+994", country: "Azerbaijan" },
  { code: "+1-242", country: "Bahamas" },
  { code: "+973", country: "Bahrain" },
  { code: "+880", country: "Bangladesh" },
  { code: "+1-246", country: "Barbados" },
  { code: "+375", country: "Belarus" },
  { code: "+32", country: "Belgium" },
  { code: "+501", country: "Belize" },
  { code: "+229", country: "Benin" },
  { code: "+975", country: "Bhutan" },
  { code: "+591", country: "Bolivia" },
  { code: "+387", country: "Bosnia and Herzegovina" },
  { code: "+267", country: "Botswana" },
  { code: "+55", country: "Brazil" },
  { code: "+673", country: "Brunei" },
  { code: "+359", country: "Bulgaria" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+257", country: "Burundi" },
  { code: "+855", country: "Cambodia" },
  { code: "+237", country: "Cameroon" },
  { code: "+1", country: "Canada" },
  { code: "+238", country: "Cape Verde" },
  { code: "+236", country: "Central African Republic" },
  { code: "+235", country: "Chad" },
  { code: "+56", country: "Chile" },
  { code: "+86", country: "China" },
  { code: "+57", country: "Colombia" },
  { code: "+269", country: "Comoros" },
  { code: "+242", country: "Congo" },
  { code: "+506", country: "Costa Rica" },
  { code: "+385", country: "Croatia" },
  { code: "+53", country: "Cuba" },
  { code: "+357", country: "Cyprus" },
  { code: "+420", country: "Czech Republic" },
  { code: "+45", country: "Denmark" },
  { code: "+253", country: "Djibouti" },
  { code: "+1-767", country: "Dominica" },
  { code: "+1-809", country: "Dominican Republic" },
  { code: "+593", country: "Ecuador" },
  { code: "+20", country: "Egypt" },
  { code: "+503", country: "El Salvador" },
  { code: "+240", country: "Equatorial Guinea" },
  { code: "+291", country: "Eritrea" },
  { code: "+372", country: "Estonia" },
  { code: "+251", country: "Ethiopia" },
  { code: "+679", country: "Fiji" },
  { code: "+358", country: "Finland" },
  { code: "+33", country: "France" },
  { code: "+241", country: "Gabon" },
  { code: "+220", country: "Gambia" },
  { code: "+995", country: "Georgia" },
  { code: "+49", country: "Germany" },
  { code: "+233", country: "Ghana" },
  { code: "+30", country: "Greece" },
  { code: "+1-473", country: "Grenada" },
  { code: "+502", country: "Guatemala" },
  { code: "+224", country: "Guinea" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+592", country: "Guyana" },
  { code: "+509", country: "Haiti" },
  { code: "+504", country: "Honduras" },
  { code: "+852", country: "Hong Kong" },
  { code: "+36", country: "Hungary" },
  { code: "+354", country: "Iceland" },
  { code: "+91", country: "India" },
  { code: "+62", country: "Indonesia" },
  { code: "+98", country: "Iran" },
  { code: "+964", country: "Iraq" },
  { code: "+353", country: "Ireland" },
  { code: "+972", country: "Israel" },
  { code: "+39", country: "Italy" },
  { code: "+1-876", country: "Jamaica" },
  { code: "+81", country: "Japan" },
  { code: "+962", country: "Jordan" },
  { code: "+7", country: "Kazakhstan" },
  { code: "+254", country: "Kenya" },
  { code: "+686", country: "Kiribati" },
  { code: "+965", country: "Kuwait" },
  { code: "+996", country: "Kyrgyzstan" },
  { code: "+856", country: "Laos" },
  { code: "+371", country: "Latvia" },
  { code: "+961", country: "Lebanon" },
  { code: "+266", country: "Lesotho" },
  { code: "+231", country: "Liberia" },
  { code: "+218", country: "Libya" },
  { code: "+423", country: "Liechtenstein" },
  { code: "+370", country: "Lithuania" },
  { code: "+352", country: "Luxembourg" },
  { code: "+853", country: "Macau" },
  { code: "+389", country: "Macedonia" },
  { code: "+261", country: "Madagascar" },
  { code: "+265", country: "Malawi" },
  { code: "+60", country: "Malaysia" },
  { code: "+960", country: "Maldives" },
  { code: "+223", country: "Mali" },
  { code: "+356", country: "Malta" },
  { code: "+692", country: "Marshall Islands" },
  { code: "+222", country: "Mauritania" },
  { code: "+230", country: "Mauritius" },
  { code: "+52", country: "Mexico" },
  { code: "+691", country: "Micronesia" },
  { code: "+373", country: "Moldova" },
  { code: "+377", country: "Monaco" },
  { code: "+976", country: "Mongolia" },
  { code: "+382", country: "Montenegro" },
  { code: "+212", country: "Morocco" },
  { code: "+258", country: "Mozambique" },
  { code: "+95", country: "Myanmar" },
  { code: "+264", country: "Namibia" },
  { code: "+674", country: "Nauru" },
  { code: "+977", country: "Nepal" },
  { code: "+31", country: "Netherlands" },
  { code: "+64", country: "New Zealand" },
  { code: "+505", country: "Nicaragua" },
  { code: "+227", country: "Niger" },
  { code: "+234", country: "Nigeria" },
  { code: "+683", country: "Niue" },
  { code: "+672", country: "Norfolk Island" },
  { code: "+850", country: "North Korea" },
  { code: "+47", country: "Norway" },
  { code: "+968", country: "Oman" },
  { code: "+92", country: "Pakistan" },
  { code: "+680", country: "Palau" },
  { code: "+507", country: "Panama" },
  { code: "+675", country: "Papua New Guinea" },
  { code: "+595", country: "Paraguay" },
  { code: "+51", country: "Peru" },
  { code: "+63", country: "Philippines" },
  { code: "+48", country: "Poland" },
  { code: "+351", country: "Portugal" },
  { code: "+1-787", country: "Puerto Rico" },
  { code: "+974", country: "Qatar" },
  { code: "+262", country: "Reunion" },
  { code: "+40", country: "Romania" },
  { code: "+7", country: "Russia" },
  { code: "+250", country: "Rwanda" },
  { code: "+685", country: "Samoa" },
  { code: "+378", country: "San Marino" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+221", country: "Senegal" },
  { code: "+381", country: "Serbia" },
  { code: "+248", country: "Seychelles" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+65", country: "Singapore" },
  { code: "+421", country: "Slovakia" },
  { code: "+386", country: "Slovenia" },
  { code: "+677", country: "Solomon Islands" },
  { code: "+252", country: "Somalia" },
  { code: "+27", country: "South Africa" },
  { code: "+34", country: "Spain" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+249", country: "Sudan" },
  { code: "+597", country: "Suriname" },
  { code: "+268", country: "Swaziland" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+963", country: "Syria" },
  { code: "+886", country: "Taiwan" },
  { code: "+992", country: "Tajikistan" },
  { code: "+255", country: "Tanzania" },
  { code: "+66", country: "Thailand" },
  { code: "+228", country: "Togo" },
  { code: "+676", country: "Tonga" },
  { code: "+1-868", country: "Trinidad and Tobago" },
  { code: "+216", country: "Tunisia" },
  { code: "+90", country: "Turkey" },
  { code: "+993", country: "Turkmenistan" },
  { code: "+688", country: "Tuvalu" },
  { code: "+256", country: "Uganda" },
  { code: "+380", country: "Ukraine" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
  { code: "+598", country: "Uruguay" },
  { code: "+998", country: "Uzbekistan" },
  { code: "+678", country: "Vanuatu" },
  { code: "+58", country: "Venezuela" },
  { code: "+84", country: "Vietnam" },
  { code: "+681", country: "Wallis and Futuna" },
  { code: "+967", country: "Yemen" },
  { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" }
].sort((a, b) => a.country.localeCompare(b.country));

const SearchableSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Search...", 
  label 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void,
  placeholder?: string,
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white cursor-pointer flex justify-between items-center"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text"
                  autoFocus
                  placeholder="Type to filter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border-none focus:ring-0 outline-none"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => (
                  <div 
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${value === opt ? 'bg-black text-white' : 'text-gray-700'}`}
                  >
                    {opt}
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-400 text-center italic">No results found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TableHeader = ({ 
  label, 
  sortKey, 
  currentSort, 
  onSort, 
  onFilter, 
  filterValue,
  showFilter = true
}: { 
  label: string, 
  sortKey: string, 
  currentSort: { key: string, order: 'asc' | 'desc' } | null, 
  onSort: (key: string) => void,
  onFilter?: (val: string) => void,
  filterValue?: string,
  showFilter?: boolean
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 relative group">
      <div className="flex items-center gap-2">
        <span 
          className="cursor-pointer hover:text-black transition-colors flex items-center gap-1"
          onClick={() => onSort(sortKey)}
        >
          {label}
          {currentSort?.key === sortKey && (
            <ChevronDown size={12} className={`transition-transform ${currentSort.order === 'desc' ? 'rotate-180' : ''}`} />
          )}
        </span>
        {showFilter && onFilter && (
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-1 rounded hover:bg-gray-100 transition-colors ${filterValue ? 'text-black bg-gray-100' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}
            >
              <Search size={12} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 normal-case tracking-normal font-normal"
                >
                  <input 
                    type="text"
                    autoFocus
                    placeholder={`Filter ${label}...`}
                    value={filterValue || ""}
                    onChange={(e) => onFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none"
                  />
                  {filterValue && (
                    <button 
                      onClick={() => onFilter("")}
                      className="mt-2 text-[10px] text-gray-400 hover:text-black transition-colors"
                    >
                      Clear Filter
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </th>
  );
};

const SECTORS = [
  "Construction", "Hospitality", "Healthcare", "Technology", "Manufacturing", 
  "Retail", "Logistics", "Education", "Finance", "Real Estate", "Others"
];

const StaffDashboard = ({ user, token, onLogout }: { user: User, token: string, onLogout: () => void }) => {
  const [tab, setTab] = useState<'clients' | 'employees' | 'dependants' | 'certificates'>('clients');
  const [clients, setClients] = useState<Client[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dependants, setDependants] = useState<Dependant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<{ type: 'client' | 'employee' | 'dependant', data: any } | null>(null);

  // Search states
  const [clientSearch, setClientSearch] = useState('');
  const [empSearch, setEmpSearch] = useState('');
  const [depSearch, setDepSearch] = useState('');

  // Form states
  const [clientForm, setClientForm] = useState({ 
    company_name: '', 
    location: '', 
    sector: '', 
    sector_other: '', 
    unique_code: '', 
    cr_no: '', 
    contract_type: '', 
    contract_renewal_date: '',
    contacts: [{ name: '', designation: '', mobile_no: '', email: '' }]
  });
  const [empForm, setEmpForm] = useState({ 
    name: '', id_no: '', id_start_date: '', id_expiry_date: '', dob: '', gender: 'Male', 
    personal_details: '', salary: '', basic_salary: '', accommodation_allowance: '', travel_allowance: '',
    client_id: '', employee_id_at_client: '', 
    joining_date: '', address: '', country: '', visa_designation: '',
    mobile_no: '', personal_email: '', nationality: '',
    passport_no: '', passport_issuing_country: '', passport_issue_date: '', passport_expiry_date: '', permanent_address: '',
    insurance_provider: '', insurance_card_no: '', 
    insurance_plan: '', insurance_expiry: '', emergency_contact_name: '', 
    emergency_contact_phone: '', emergency_contact_phone_code: '+971', emergency_contact_relation: '' 
  });
  const [depForm, setDepForm] = useState({ 
    name: '', id_no: '', id_start_date: '', id_expiry_date: '', dob: '', gender: 'Male', 
    relationship: 'Child', employee_id: '', insurance_provider: '', 
    insurance_card_no: '', insurance_plan: '', insurance_expiry: '',
    mobile_no: '', personal_email: '', nationality: '', address: '', country: '',
    passport_no: '', passport_issuing_country: '', passport_issue_date: '', passport_expiry_date: '', permanent_address: ''
  });
  const [certForm, setCertForm] = useState({ employee_id: '', searchType: 'name' as 'name' | 'emp_no' });
  const [verifiedEmployeeName, setVerifiedEmployeeName] = useState<string | null>(null);
  const [verifiedEmployee, setVerifiedEmployee] = useState<Employee | null>(null);
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  // Dynamic Sort & Filter states
  const [sortConfig, setSortConfig] = useState<{ key: string, order: 'asc' | 'desc' } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'asc' };
    });
  };

  const handleFilter = (key: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [key]: value }));
  };

  const getFilteredAndSortedData = (data: any[], search: string, searchFields: string[]) => {
    let result = [...data].filter(item => {
      // Global search
      const matchesSearch = search === "" || searchFields.some(field => {
        const val = item[field];
        return val && val.toString().toLowerCase().includes(search.toLowerCase());
      });

      // Column filters
      const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterVal]) => {
        if (!filterVal) return true;
        let val = item[key];
        
        // Handle nested client contact info for sorting/filtering if needed
        if (key === 'contact_name' && item.contacts && item.contacts.length > 0) val = item.contacts[0].name;
        if (key === 'mobile_no' && item.contacts && item.contacts.length > 0 && !item.mobile_no) val = item.contacts[0].mobile_no;

        return val && String(val).toLowerCase().includes((filterVal as string).toLowerCase());
      });

      return matchesSearch && matchesColumnFilters;
    });

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        // Handle nested client contact info
        if (sortConfig.key === 'contact_name') {
          aVal = a.contacts?.[0]?.name || '';
          bVal = b.contacts?.[0]?.name || '';
        }
        if (sortConfig.key === 'mobile_no' && !a.mobile_no) {
          aVal = a.contacts?.[0]?.mobile_no || '';
          bVal = b.contacts?.[0]?.mobile_no || '';
        }

        if (aVal === undefined || aVal === null) aVal = '';
        if (bVal === undefined || bVal === null) bVal = '';
        
        if (aVal < bVal) return sortConfig.order === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  };

  const handleTabChange = (newTab: typeof tab) => {
    setTab(newTab);
    setShowForm(false);
    setEditingRecord(null);
  };

  const fetchData = async () => {
    const [cRes, eRes, dRes] = await Promise.all([
      fetch('/api/clients', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/employees', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/dependants', { headers: { 'Authorization': `Bearer ${token}` } })
    ]);
    setClients(await cRes.json());
    setEmployees(await eRes.json());
    setDependants(await dRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const verifyEmployee = async (id: string, isCert: boolean = false) => {
    if (!id) {
      if (isCert) setVerifiedEmployee(null);
      else setVerifiedEmployeeName(null);
      return;
    }
    try {
      const res = await fetch(`/api/employees/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (isCert) setVerifiedEmployee(data);
        else setVerifiedEmployeeName(data.name);
      } else {
        if (isCert) setVerifiedEmployee(null);
        else setVerifiedEmployeeName('Not Found');
      }
    } catch (e) {
      if (isCert) setVerifiedEmployee(null);
      else setVerifiedEmployeeName('Error');
    }
  };

  const downloadTemplate = (type: 'clients' | 'employees' | 'dependants') => {
    const headers = {
      clients: [['company_name', 'location', 'sector', 'sector_other', 'unique_code', 'cr_no', 'contract_type', 'contract_renewal_date']],
      employees: [['name', 'id_no', 'id_start_date', 'id_expiry_date', 'dob', 'gender', 'mobile_no', 'personal_email', 'address', 'country', 'visa_designation', 'basic_salary', 'accommodation_allowance', 'travel_allowance', 'client_id', 'employee_id_at_client', 'joining_date']],
      dependants: [['name', 'id_no', 'id_start_date', 'id_expiry_date', 'dob', 'gender', 'relationship', 'employee_id']]
    };
    
    const ws = XLSX.utils.aoa_to_sheet(headers[type]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, `${type}_template.xlsx`);
  };

  const handleExportExcel = () => {
    let dataToExport: any[] = [];
    let filename = "";
    
    if (tab === 'clients') {
      dataToExport = getFilteredAndSortedData(clients, clientSearch, ['company_name', 'unique_code']);
      filename = "clients_export.xlsx";
    } else if (tab === 'employees') {
      dataToExport = getFilteredAndSortedData(employees, empSearch, ['name', 'id_no']);
      filename = "employees_export.xlsx";
    } else if (tab === 'dependants') {
      dataToExport = getFilteredAndSortedData(dependants, depSearch, ['name', 'id_no', 'employee_name']);
      filename = "dependants_export.xlsx";
    }

    if (dataToExport.length === 0) {
      alert("No data to export");
      return;
    }

    // Clean up data for export (remove internal fields if necessary)
    const cleanedData = dataToExport.map(({ id, created_at, updated_at, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, filename);
  };

  const generateCertificate = () => {
    if (!verifiedEmployee) return;

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text('SALARY CERTIFICATE', 105, 40, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 160, 55);

    // Content
    doc.setFontSize(14);
    doc.text('TO WHOMSOEVER IT MAY CONCERN', 105, 75, { align: 'center' });

    doc.setFontSize(12);
    const text = `This is to certify that Mr./Ms. ${verifiedEmployee.name}, holding ID No. ${verifiedEmployee.id_no}, is currently employed with us as a resource deployed at ${verifiedEmployee.client_name || 'N/A'}.`;
    
    const splitText = doc.splitTextToSize(text, 170);
    doc.text(splitText, 20, 95);

    doc.text(`Joining Date: ${verifiedEmployee.joining_date}`, 20, 115);
    doc.text(`Monthly Salary: $${verifiedEmployee.salary.toLocaleString()}`, 20, 125);

    doc.text('This certificate is issued at the request of the employee without any liability on the part of the company.', 20, 145, { maxWidth: 170 });

    // Footer
    doc.setFontSize(14);
    doc.text('For Manpower Outsourcing Company', 20, 180);
    doc.text('Authorized Signatory', 20, 210);

    doc.save(`${verifiedEmployee.name}_Salary_Certificate.pdf`);
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'clients' | 'employees' | 'dependants') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const endpointMap = {
        clients: '/api/clients/bulk',
        employees: '/api/employees/bulk',
        dependants: '/api/dependants/bulk'
      };
      const endpoint = endpointMap[type];
      const payload = { [type]: data, created_by: user.id };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          alert(`Successfully uploaded ${data.length} ${type}`);
          fetchData();
          setShowUploadMenu(false);
        } else {
          const err = await res.json();
          alert(`Upload failed: ${err.message}`);
        }
      } catch (err) {
        alert('Upload failed: Connection error');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingRecord ? 'PUT' : 'POST';
    const url = editingRecord ? `/api/clients/${editingRecord.data.id}` : '/api/clients';
    
    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...clientForm, created_by: user.id }),
    });
    if (res.ok) {
      setClientForm({ 
        company_name: '', location: '', sector: '', sector_other: '', 
        unique_code: '', cr_no: '', contract_type: '', contract_renewal_date: '',
        contacts: [{ name: '', designation: '', mobile_no: '', email: '' }]
      });
      setShowForm(false);
      setEditingRecord(null);
      fetchData();
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingRecord ? 'PUT' : 'POST';
    const url = editingRecord ? `/api/employees/${editingRecord.data.id}` : '/api/employees';

    const totalSalary = (parseFloat(empForm.basic_salary) || 0) + 
                        (parseFloat(empForm.accommodation_allowance) || 0) + 
                        (parseFloat(empForm.travel_allowance) || 0);

    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        ...empForm, 
        salary: totalSalary,
        basic_salary: parseFloat(empForm.basic_salary) || 0,
        accommodation_allowance: parseFloat(empForm.accommodation_allowance) || 0,
        travel_allowance: parseFloat(empForm.travel_allowance) || 0,
        created_by: user.id 
      }),
    });
    if (res.ok) {
      setEmpForm({ 
        name: '', id_no: '', id_start_date: '', id_expiry_date: '', dob: '', gender: 'Male', 
        personal_details: '', salary: '', basic_salary: '', accommodation_allowance: '', travel_allowance: '',
        client_id: '', employee_id_at_client: '', 
        joining_date: '', address: '', country: '', visa_designation: '',
        mobile_no: '', personal_email: '', nationality: '',
        passport_no: '', passport_issuing_country: '', passport_issue_date: '', passport_expiry_date: '', permanent_address: '',
        insurance_provider: '', insurance_card_no: '', 
        insurance_plan: '', insurance_expiry: '', emergency_contact_name: '', 
        emergency_contact_phone: '', emergency_contact_phone_code: '+971', emergency_contact_relation: '' 
      });
      setShowForm(false);
      setEditingRecord(null);
      fetchData();
    }
  };

  const handleAddDependant = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingRecord ? 'PUT' : 'POST';
    const url = editingRecord ? `/api/dependants/${editingRecord.data.id}` : '/api/dependants';

    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...depForm, created_by: user.id }),
    });
    if (res.ok) {
      setDepForm({ 
        name: '', id_no: '', id_start_date: '', id_expiry_date: '', dob: '', gender: 'Male', 
        relationship: 'Child', employee_id: '', insurance_provider: '', 
        insurance_card_no: '', insurance_plan: '', insurance_expiry: '',
        mobile_no: '', personal_email: '', nationality: '', address: '', country: '',
        passport_no: '', passport_issuing_country: '', passport_issue_date: '', passport_expiry_date: '', permanent_address: ''
      });
      setVerifiedEmployeeName(null);
      setShowForm(false);
      setEditingRecord(null);
      fetchData();
    }
  };

  const startEditing = (type: 'client' | 'employee' | 'dependant', data: any) => {
    setEditingRecord({ type, data });
    if (type === 'client') setClientForm({
      ...data,
      contacts: data.contacts && data.contacts.length > 0 ? data.contacts : [{ name: '', designation: '', mobile_no: '', email: '' }]
    });
    if (type === 'employee') setEmpForm({ 
      ...data, 
      salary: data.salary.toString(), 
      basic_salary: (data.basic_salary || 0).toString(),
      accommodation_allowance: (data.accommodation_allowance || 0).toString(),
      travel_allowance: (data.travel_allowance || 0).toString(),
      client_id: data.client_id.toString(),
      address: data.address || '',
      country: data.country || '',
      visa_designation: data.visa_designation || '',
      mobile_no: data.mobile_no || '',
      personal_email: data.personal_email || '',
      nationality: data.nationality || '',
      passport_no: data.passport_no || '',
      passport_issuing_country: data.passport_issuing_country || '',
      passport_issue_date: data.passport_issue_date || '',
      passport_expiry_date: data.passport_expiry_date || '',
      permanent_address: data.permanent_address || '',
      id_start_date: data.id_start_date || '',
      insurance_provider: data.insurance_provider || '',
      insurance_card_no: data.insurance_card_no || '',
      insurance_plan: data.insurance_plan || '',
      insurance_expiry: data.insurance_expiry || '',
      emergency_contact_name: data.emergency_contact_name || '',
      emergency_contact_phone: data.emergency_contact_phone || '',
      emergency_contact_phone_code: data.emergency_contact_phone_code || '+971',
      emergency_contact_relation: data.emergency_contact_relation || ''
    });
    if (type === 'dependant') {
      setDepForm({ 
        ...data, 
        employee_id: data.employee_id.toString(),
        id_start_date: data.id_start_date || '',
        insurance_provider: data.insurance_provider || '',
        insurance_card_no: data.insurance_card_no || '',
        insurance_plan: data.insurance_plan || '',
        insurance_expiry: data.insurance_expiry || '',
        mobile_no: data.mobile_no || '',
        personal_email: data.personal_email || '',
        nationality: data.nationality || '',
        address: data.address || '',
        country: data.country || '',
        passport_no: data.passport_no || '',
        passport_issuing_country: data.passport_issuing_country || '',
        passport_issue_date: data.passport_issue_date || '',
        passport_expiry_date: data.passport_expiry_date || '',
        permanent_address: data.permanent_address || ''
      });
      verifyEmployee(data.employee_id.toString());
    }
    setShowForm(true);
  };

  const exportToCSV = (type: 'clients' | 'employees' | 'dependants') => {
    const data = type === 'clients' ? clients : type === 'employees' ? employees : dependants;
    
    // Clean data for export
    const exportData = data.map(item => {
      const { created_by, ...rest } = item as any;
      return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${type}_directory_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <nav className="bg-white border-b border-black/5 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <span className="font-semibold tracking-tight">Staff Portal</span>
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <div className="flex gap-1">
            <button 
              onClick={() => handleTabChange('clients')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'clients' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Clients
            </button>
            <button 
              onClick={() => handleTabChange('employees')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'employees' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Employees
            </button>
            <button 
              onClick={() => handleTabChange('dependants')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'dependants' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Dependants
            </button>
            <button 
              onClick={() => handleTabChange('certificates')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'certificates' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Certificates
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">{user.name}</span>
          <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {showForm ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {editingRecord ? `Update ${editingRecord.type}` : (tab === 'clients' ? 'Register New Client' : tab === 'employees' ? 'Onboard New Employee' : 'Add Dependant')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Please fill in all the required information below.</p>
              </div>
              <button 
                onClick={() => { setShowForm(false); setEditingRecord(null); }} 
                className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all font-medium"
              >
                <Plus className="rotate-45" size={20} />
                <span>Cancel & Close</span>
              </button>
            </div>

            <div className="max-w-4xl mx-auto">
              {tab === 'clients' ? (
                <form onSubmit={handleAddClient} className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Company Information</h4>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      required
                      value={clientForm.company_name}
                      onChange={e => setClientForm({...clientForm, company_name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Unique Code</label>
                    <input 
                      type="text" 
                      required
                      value={clientForm.unique_code}
                      onChange={e => setClientForm({...clientForm, unique_code: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all font-mono"
                      placeholder="e.g. MSFT-01"
                    />
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Sector"
                      options={SECTORS}
                      value={clientForm.sector}
                      onChange={(val) => setClientForm({...clientForm, sector: val})}
                      placeholder="Select Sector"
                    />
                  </div>
                  {clientForm.sector === 'Others' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Specify Sector</label>
                      <input 
                        type="text" 
                        required
                        value={clientForm.sector_other}
                        onChange={e => setClientForm({...clientForm, sector_other: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Location</label>
                    <input 
                      type="text" 
                      required
                      value={clientForm.location}
                      onChange={e => setClientForm({...clientForm, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Contract Details</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CR No.</label>
                    <input 
                      type="text" 
                      required
                      value={clientForm.cr_no}
                      onChange={e => setClientForm({...clientForm, cr_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Contract Type</label>
                    <input 
                      type="text" 
                      required
                      value={clientForm.contract_type}
                      onChange={e => setClientForm({...clientForm, contract_type: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Contract Renewal Date</label>
                    <input 
                      type="date" 
                      required
                      value={clientForm.contract_renewal_date}
                      onChange={e => setClientForm({...clientForm, contract_renewal_date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">No. of Employees</label>
                    <input 
                      type="text" 
                      readOnly
                      value={clientForm.employee_count || 0}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 mt-4 flex justify-between items-center border-b pb-2">
                    <h4 className="text-sm font-bold text-gray-900">Contact Person Information</h4>
                    <button 
                      type="button"
                      onClick={() => setClientForm({...clientForm, contacts: [...clientForm.contacts, { name: '', designation: '', mobile_no: '', email: '' }]})}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Plus size={14} />
                      Add More
                    </button>
                  </div>
                  {clientForm.contacts.map((contact, index) => (
                    <div key={index} className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
                      {index > 0 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newContacts = [...clientForm.contacts];
                            newContacts.splice(index, 1);
                            setClientForm({...clientForm, contacts: newContacts});
                          }}
                          className="absolute top-2 right-2 text-gray-400 hover:text-rose-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Name</label>
                        <input 
                          type="text" 
                          required
                          value={contact.name}
                          onChange={e => {
                            const newContacts = [...clientForm.contacts];
                            newContacts[index].name = e.target.value;
                            setClientForm({...clientForm, contacts: newContacts});
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Designation</label>
                        <input 
                          type="text" 
                          required
                          value={contact.designation}
                          onChange={e => {
                            const newContacts = [...clientForm.contacts];
                            newContacts[index].designation = e.target.value;
                            setClientForm({...clientForm, contacts: newContacts});
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Mobile No.</label>
                        <input 
                          type="text" 
                          required
                          value={contact.mobile_no}
                          onChange={e => {
                            const newContacts = [...clientForm.contacts];
                            newContacts[index].mobile_no = e.target.value;
                            setClientForm({...clientForm, contacts: newContacts});
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</label>
                        <input 
                          type="email" 
                          required
                          value={contact.email}
                          onChange={e => {
                            const newContacts = [...clientForm.contacts];
                            newContacts[index].email = e.target.value;
                            setClientForm({...clientForm, contacts: newContacts});
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="col-span-2 pt-8 border-t mt-4">
                    <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-black/90 transition-all shadow-lg shadow-black/10">
                      {editingRecord ? 'Update Client Details' : 'Register Client'}
                    </button>
                  </div>
                </form>
              ) : tab === 'employees' ? (
                <form onSubmit={handleAddEmployee} className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Personal Information</h4>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={empForm.name}
                      onChange={e => setEmpForm({...empForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      required
                      value={empForm.dob}
                      onChange={e => setEmpForm({...empForm, dob: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Gender</label>
                    <select 
                      required
                      value={empForm.gender}
                      onChange={e => setEmpForm({...empForm, gender: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Mobile Number</label>
                      <input 
                        type="text" 
                        required
                        value={empForm.mobile_no}
                        onChange={e => setEmpForm({...empForm, mobile_no: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        placeholder="e.g. +971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Personal Email</label>
                      <input 
                        type="email" 
                        required
                        value={empForm.personal_email}
                        onChange={e => setEmpForm({...empForm, personal_email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Nationality"
                      options={COUNTRIES}
                      value={empForm.nationality}
                      onChange={(val) => setEmpForm({...empForm, nationality: val})}
                      placeholder="Select Nationality"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Residential Address (Current)</label>
                    <input 
                      type="text"
                      required
                      value={empForm.address}
                      onChange={e => setEmpForm({...empForm, address: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      placeholder="Street, Area, City"
                    />
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Country (Current Residence)"
                      options={COUNTRIES}
                      value={empForm.country}
                      onChange={(val) => setEmpForm({...empForm, country: val})}
                      placeholder="Select Country"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Document Details</h4>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Permanent Address (Home Country)</label>
                    <input 
                      type="text"
                      required
                      value={empForm.permanent_address}
                      onChange={e => setEmpForm({...empForm, permanent_address: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      placeholder="Full permanent address in home country"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Number</label>
                    <input 
                      type="text" 
                      required
                      value={empForm.passport_no}
                      onChange={e => setEmpForm({...empForm, passport_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Passport Issuing Country"
                      options={COUNTRIES}
                      value={empForm.passport_issuing_country}
                      onChange={(val) => setEmpForm({...empForm, passport_issuing_country: val})}
                      placeholder="Select Country"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Issue Date</label>
                      <input 
                        type="date" 
                        required
                        value={empForm.passport_issue_date}
                        onChange={e => setEmpForm({...empForm, passport_issue_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Expiry Date</label>
                      <input 
                        type="date" 
                        required
                        value={empForm.passport_expiry_date}
                        onChange={e => setEmpForm({...empForm, passport_expiry_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Number (Emirates ID)</label>
                    <input 
                      type="text" 
                      required
                      value={empForm.id_no}
                      onChange={e => setEmpForm({...empForm, id_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Start Date</label>
                      <input 
                        type="date" 
                        required
                        value={empForm.id_start_date}
                        onChange={e => setEmpForm({...empForm, id_start_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Expiry Date</label>
                      <input 
                        type="date" 
                        required
                        value={empForm.id_expiry_date}
                        onChange={e => setEmpForm({...empForm, id_expiry_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Visa Designation</label>
                    <input 
                      type="text" 
                      required
                      value={empForm.visa_designation}
                      onChange={e => setEmpForm({...empForm, visa_designation: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      placeholder="e.g. Sales Executive"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Employment & Salary Details</h4>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Basic Salary</label>
                      <input 
                        type="number" 
                        required
                        value={empForm.basic_salary}
                        onChange={e => setEmpForm({...empForm, basic_salary: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Accommodation</label>
                      <input 
                        type="number" 
                        required
                        value={empForm.accommodation_allowance}
                        onChange={e => setEmpForm({...empForm, accommodation_allowance: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Travel Allowance</label>
                      <input 
                        type="number" 
                        required
                        value={empForm.travel_allowance}
                        onChange={e => setEmpForm({...empForm, travel_allowance: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-3 pt-2 flex justify-end items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Monthly Salary:</span>
                      <span className="text-xl font-bold text-emerald-600">
                        {((parseFloat(empForm.basic_salary) || 0) + (parseFloat(empForm.accommodation_allowance) || 0) + (parseFloat(empForm.travel_allowance) || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Joining Date</label>
                    <input 
                      type="date" 
                      required
                      value={empForm.joining_date}
                      onChange={e => setEmpForm({...empForm, joining_date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Assign to Client</label>
                    <select 
                      required
                      value={empForm.client_id}
                      onChange={e => setEmpForm({...empForm, client_id: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                    >
                      <option value="">Select Client</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.company_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Client Employee ID</label>
                    <input 
                      type="text" 
                      required
                      value={empForm.employee_id_at_client}
                      onChange={e => setEmpForm({...empForm, employee_id_at_client: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      placeholder="e.g. EMP-992"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Medical Insurance</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Insurance Provider</label>
                    <input 
                      type="text" 
                      value={empForm.insurance_provider}
                      onChange={e => setEmpForm({...empForm, insurance_provider: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      value={empForm.insurance_card_no}
                      onChange={e => setEmpForm({...empForm, insurance_card_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Plan Type</label>
                    <input 
                      type="text" 
                      value={empForm.insurance_plan}
                      onChange={e => setEmpForm({...empForm, insurance_plan: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Insurance Expiry</label>
                    <input 
                      type="date" 
                      value={empForm.insurance_expiry}
                      onChange={e => setEmpForm({...empForm, insurance_expiry: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Emergency Contact</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Contact Name</label>
                    <input 
                      type="text" 
                      value={empForm.emergency_contact_name}
                      onChange={e => setEmpForm({...empForm, emergency_contact_name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="w-48">
                        <SearchableSelect 
                          label="Code"
                          options={COUNTRY_CODES.map(c => `${c.country} (${c.code})`)}
                          value={COUNTRY_CODES.find(c => c.code === empForm.emergency_contact_phone_code) ? `${COUNTRY_CODES.find(c => c.code === empForm.emergency_contact_phone_code)?.country} (${empForm.emergency_contact_phone_code})` : ""}
                          onChange={(val) => {
                            const code = val.match(/\(([^)]+)\)/)?.[1];
                            if (code) setEmpForm({...empForm, emergency_contact_phone_code: code});
                          }}
                          placeholder="+971"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Number</label>
                        <input 
                          type="text" 
                          value={empForm.emergency_contact_phone}
                          onChange={e => setEmpForm({...empForm, emergency_contact_phone: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                          placeholder="50 123 4567"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Relationship</label>
                    <input 
                      type="text" 
                      value={empForm.emergency_contact_relation}
                      onChange={e => setEmpForm({...empForm, emergency_contact_relation: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Additional Notes</h4>
                  </div>
                  <div className="col-span-2">
                    <textarea 
                      value={empForm.personal_details}
                      onChange={e => setEmpForm({...empForm, personal_details: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all h-24 resize-none"
                      placeholder="Other relevant information..."
                    />
                  </div>
                  <div className="col-span-2 pt-8 border-t mt-4">
                    <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-black/90 transition-all shadow-lg shadow-black/10">
                      {editingRecord ? 'Update Employee Details' : 'Complete Onboarding'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddDependant} className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Connection</h4>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Employee Sys ID</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        required
                        value={depForm.employee_id}
                        onChange={e => {
                          setDepForm({...depForm, employee_id: e.target.value});
                          verifyEmployee(e.target.value);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        placeholder="Enter Employee System ID"
                      />
                      <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center min-w-[150px]">
                        <span className={`text-sm font-medium ${verifiedEmployeeName === 'Not Found' ? 'text-red-500' : 'text-gray-700'}`}>
                          {verifiedEmployeeName || 'Verify Name...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Personal Information</h4>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={depForm.name}
                      onChange={e => setDepForm({...depForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      required
                      value={depForm.dob}
                      onChange={e => setDepForm({...depForm, dob: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Gender</label>
                    <select 
                      required
                      value={depForm.gender}
                      onChange={e => setDepForm({...depForm, gender: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Mobile Number</label>
                      <input 
                        type="text" 
                        required
                        value={depForm.mobile_no}
                        onChange={e => setDepForm({...depForm, mobile_no: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        placeholder="e.g. +971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Personal Email</label>
                      <input 
                        type="email" 
                        required
                        value={depForm.personal_email}
                        onChange={e => setDepForm({...depForm, personal_email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Nationality"
                      options={COUNTRIES}
                      value={depForm.nationality}
                      onChange={(val) => setDepForm({...depForm, nationality: val})}
                      placeholder="Select Nationality"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Document Details</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Number</label>
                    <input 
                      type="text" 
                      required
                      value={depForm.passport_no}
                      onChange={e => setDepForm({...depForm, passport_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <SearchableSelect 
                      label="Passport Issuing Country"
                      options={COUNTRIES}
                      value={depForm.passport_issuing_country}
                      onChange={(val) => setDepForm({...depForm, passport_issuing_country: val})}
                      placeholder="Select Country"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Issue Date</label>
                      <input 
                        type="date" 
                        required
                        value={depForm.passport_issue_date}
                        onChange={e => setDepForm({...depForm, passport_issue_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Passport Expiry Date</label>
                      <input 
                        type="date" 
                        required
                        value={depForm.passport_expiry_date}
                        onChange={e => setDepForm({...depForm, passport_expiry_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Number</label>
                    <input 
                      type="text" 
                      required
                      value={depForm.id_no}
                      onChange={e => setDepForm({...depForm, id_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Start Date</label>
                      <input 
                        type="date" 
                        required
                        value={depForm.id_start_date}
                        onChange={e => setDepForm({...depForm, id_start_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">ID Expiry Date</label>
                      <input 
                        type="date" 
                        required
                        value={depForm.id_expiry_date}
                        onChange={e => setDepForm({...depForm, id_expiry_date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Relationship</label>
                    <select 
                      required
                      value={depForm.relationship}
                      onChange={e => setDepForm({...depForm, relationship: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-white"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-2 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Medical Insurance</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Insurance Provider</label>
                    <input 
                      type="text" 
                      value={depForm.insurance_provider}
                      onChange={e => setDepForm({...depForm, insurance_provider: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      value={depForm.insurance_card_no}
                      onChange={e => setDepForm({...depForm, insurance_card_no: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Plan Type</label>
                    <input 
                      type="text" 
                      value={depForm.insurance_plan}
                      onChange={e => setDepForm({...depForm, insurance_plan: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Insurance Expiry</label>
                    <input 
                      type="date" 
                      value={depForm.insurance_expiry}
                      onChange={e => setDepForm({...depForm, insurance_expiry: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 pt-8 border-t mt-4">
                    <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-black/90 transition-all shadow-lg shadow-black/10">
                      {editingRecord ? 'Update Dependant Details' : 'Add Dependant'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-8">
              <div className="flex-1 flex items-end gap-4">
                {tab !== 'certificates' && (
                  <div className="flex-1 max-w-md">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Search {tab}</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder={`Search by name, ID or code...`}
                        value={tab === 'clients' ? clientSearch : tab === 'employees' ? empSearch : depSearch}
                        onChange={(e) => tab === 'clients' ? setClientSearch(e.target.value) : tab === 'employees' ? setEmpSearch(e.target.value) : setDepSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-black/5 bg-white focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {tab !== 'certificates' && (
                  <div 
                    className="relative"
                    onMouseLeave={() => setShowUploadMenu(false)}
                  >
                    <button 
                      onClick={() => setShowUploadMenu(!showUploadMenu)}
                      className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
                    >
                      <FileUp size={18} />
                      Data
                      <ChevronDown size={14} className={`transition-transform ${showUploadMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showUploadMenu && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                          <button 
                            onClick={() => downloadTemplate(tab as 'clients' | 'employees' | 'dependants')}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                          >
                            <Download size={16} />
                            Download Template
                          </button>
                          <label className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer">
                            <FileUp size={16} />
                            Upload Excel
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".xlsx, .xls" 
                              onChange={(e) => handleExcelUpload(e, tab as 'clients' | 'employees' | 'dependants')} 
                            />
                          </label>
                          <button 
                            onClick={handleExportExcel}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700 border-t border-gray-100"
                          >
                            <FileText size={16} />
                            Export Excel
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                {tab !== 'certificates' && (
                  <button 
                    onClick={() => setShowForm(true)}
                    className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-black/90 transition-all shadow-sm"
                  >
                    <Plus size={18} />
                    {tab === 'clients' ? 'Add Client' : tab === 'employees' ? 'Add Employee' : 'Add Dependant'}
                  </button>
                )}
              </div>
            </div>

            {tab === 'clients' ? (
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <TableHeader 
                      label="Client Name" 
                      sortKey="company_name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('company_name', val)}
                      filterValue={columnFilters['company_name']}
                    />
                    <TableHeader 
                      label="Code" 
                      sortKey="unique_code" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('unique_code', val)}
                      filterValue={columnFilters['unique_code']}
                    />
                    <TableHeader 
                      label="Contact Person" 
                      sortKey="contact_name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('contact_name', val)}
                      filterValue={columnFilters['contact_name']}
                    />
                    <TableHeader 
                      label="Mobile No." 
                      sortKey="mobile_no" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('mobile_no', val)}
                      filterValue={columnFilters['mobile_no']}
                    />
                    <TableHeader 
                      label="Renewal Date" 
                      sortKey="contract_renewal_date" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('contract_renewal_date', val)}
                      filterValue={columnFilters['contract_renewal_date']}
                    />
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {getFilteredAndSortedData(clients, clientSearch, ['company_name', 'unique_code']).map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <Building2 size={16} />
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{c.company_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                          {c.unique_code}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {c.contacts && c.contacts.length > 0 ? c.contacts[0].name : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {c.contacts && c.contacts.length > 0 ? c.contacts[0].mobile_no : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-600 font-medium">
                        {c.contract_renewal_date || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => startEditing('client', c)}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : tab === 'employees' ? (
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <TableHeader 
                      label="Employee Name" 
                      sortKey="name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('name', val)}
                      filterValue={columnFilters['name']}
                    />
                    <TableHeader 
                      label="Mob. No." 
                      sortKey="mobile_no" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('mobile_no', val)}
                      filterValue={columnFilters['mobile_no']}
                    />
                    <TableHeader 
                      label="Company/Client" 
                      sortKey="client_name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('client_name', val)}
                      filterValue={columnFilters['client_name']}
                    />
                    <TableHeader 
                      label="ID Expiry Date" 
                      sortKey="id_expiry_date" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('id_expiry_date', val)}
                      filterValue={columnFilters['id_expiry_date']}
                    />
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {getFilteredAndSortedData(employees, empSearch, ['name', 'id_no']).map(e => (
                    <tr key={e.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                            {e.name.charAt(0)}
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {e.mobile_no || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {e.client_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-rose-500 font-medium">
                        {e.id_expiry_date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => startEditing('employee', e)}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {employees.length === 0 && (
              <div className="text-center py-20">
                <Users className="mx-auto text-gray-200 mb-3" size={48} />
                <p className="text-gray-400 text-sm">No employee records found</p>
              </div>
            )}
          </div>
        ) : tab === 'dependants' ? (
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <TableHeader 
                      label="Dependant" 
                      sortKey="name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('name', val)}
                      filterValue={columnFilters['name']}
                    />
                    <TableHeader 
                      label="Connection" 
                      sortKey="employee_name" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('employee_name', val)}
                      filterValue={columnFilters['employee_name']}
                    />
                    <TableHeader 
                      label="Insurance" 
                      sortKey="insurance_provider" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('insurance_provider', val)}
                      filterValue={columnFilters['insurance_provider']}
                    />
                    <TableHeader 
                      label="ID Info" 
                      sortKey="id_no" 
                      currentSort={sortConfig} 
                      onSort={handleSort} 
                      onFilter={(val) => handleFilter('id_no', val)}
                      filterValue={columnFilters['id_no']}
                    />
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {getFilteredAndSortedData(dependants, depSearch, ['name', 'id_no', 'employee_name']).map(d => (
                    <tr key={d.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-xs font-bold">
                            <Heart size={14} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{d.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {d.relationship}
                              </span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${d.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                                {d.gender}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-700">{d.employee_name}</p>
                        <p className="text-[10px] text-gray-400">Emp Sys ID: {d.employee_id}</p>
                      </td>
                      <td className="px-6 py-4">
                        {d.insurance_provider ? (
                          <div>
                            <p className="text-sm font-medium text-gray-700">{d.insurance_provider}</p>
                            <p className="text-[10px] text-emerald-600 font-medium">Exp: {d.insurance_expiry}</p>
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">No Insurance</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{d.id_no}</p>
                        <p className="text-[10px] text-gray-400">Start: {d.id_start_date || 'N/A'}</p>
                        <p className="text-[10px] text-gray-400">Exp: {d.id_expiry_date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <button 
                            onClick={() => startEditing('dependant', d)}
                            className="p-2 text-gray-400 hover:text-black transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {dependants.length === 0 && (
              <div className="text-center py-20">
                <Heart className="mx-auto text-gray-200 mb-3" size={48} />
                <p className="text-gray-400 text-sm">No dependant records found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Salary Certificate Generator</h3>
                  <p className="text-sm text-gray-500">Search for an employee to generate PDF</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <button 
                      onClick={() => setCertForm({...certForm, searchType: 'name', employee_id: ''})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${certForm.searchType === 'name' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      Search by Name
                    </button>
                    <button 
                      onClick={() => setCertForm({...certForm, searchType: 'emp_no', employee_id: ''})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${certForm.searchType === 'emp_no' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      Search by Emp No.
                    </button>
                  </div>

                  <SearchableSelect 
                    label={certForm.searchType === 'name' ? "Select Employee" : "Select Employee No."}
                    options={employees.map(e => certForm.searchType === 'name' ? e.name : e.employee_id_at_client)}
                    value={certForm.searchType === 'name' 
                      ? (employees.find(e => e.id.toString() === certForm.employee_id)?.name || "")
                      : (employees.find(e => e.id.toString() === certForm.employee_id)?.employee_id_at_client || "")
                    }
                    onChange={(val) => {
                      const emp = employees.find(e => certForm.searchType === 'name' ? e.name === val : e.employee_id_at_client === val);
                      if (emp) {
                        setCertForm({...certForm, employee_id: emp.id.toString()});
                        verifyEmployee(emp.id.toString(), true);
                      }
                    }}
                    placeholder={certForm.searchType === 'name' ? "Type name..." : "Type Emp No..."}
                  />
                </div>

                {verifiedEmployee && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Employee Sys ID</p>
                        <p className="text-sm font-semibold text-gray-900">{verifiedEmployee.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full Name</p>
                        <p className="text-sm font-semibold text-gray-900">{verifiedEmployee.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Client</p>
                        <p className="text-sm font-semibold text-gray-900">{verifiedEmployee.client_name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Monthly Salary</p>
                        <p className="text-sm font-semibold text-emerald-600">${verifiedEmployee.salary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Joined</p>
                        <p className="text-sm font-semibold text-gray-700">{verifiedEmployee.joining_date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Designation</p>
                        <p className="text-sm font-semibold text-gray-700">{verifiedEmployee.visa_designation || 'N/A'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <button 
                  onClick={generateCertificate}
                  disabled={!verifiedEmployee}
                  className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Salary Certificate (PDF)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </>
    )}
  </main>

      <AnimatePresence>
        {/* Modal removed for better desktop experience */}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('portal_user');
    const savedToken = localStorage.getItem('portal_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    
    // Check if we are on /master
    if (window.location.pathname === '/master') {
      setIsMaster(true);
    }
  }, []);

  const handleLogin = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('portal_user', JSON.stringify(u));
    localStorage.setItem('portal_token', t);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('portal_user');
    localStorage.removeItem('portal_token');
    if (isMaster) {
      window.location.href = '/master';
    } else {
      window.location.href = '/';
    }
  };

  if (!user) {
    if (window.location.pathname === '/forgot-password') {
      return <ForgotPasswordPage />;
    }
    if (window.location.pathname === '/reset-password') {
      return <ResetPasswordPage />;
    }
    if (isMaster) {
      return <LoginPage onLogin={handleLogin} isMaster={true} />;
    }
    if (window.location.pathname === '/login') {
      return <LoginPage onLogin={handleLogin} />;
    }
    return <LandingPage onGoToLogin={() => window.location.href = '/login'} />;
  }

  if (user.is_first_login) {
    return <SetPasswordPage email={user.email} onComplete={handleLogin} />;
  }

  if (user.role === 'superadmin') {
    return <SuperAdminDashboard user={user} token={token!} onLogout={handleLogout} />;
  }

  return user.role === 'admin' ? (
    <AdminDashboard user={user} token={token!} onLogout={handleLogout} />
  ) : (
    <StaffDashboard user={user} token={token!} onLogout={handleLogout} />
  );
}
