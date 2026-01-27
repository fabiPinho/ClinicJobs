
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { UserType, PaymentStatus } from './types';
import LandingPage from './components/LandingPage';
import DentistDashboard from './components/DentistDashboard';
import ClinicDashboard from './components/ClinicDashboard';
import PaymentView from './components/PaymentView';
import { User, Building2, LogOut } from 'lucide-react';

const ClinicLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7" />
  </svg>
);

const AppContent: React.FC = () => {
  const [user, setUser] = useState<{ type: UserType; id: string; paymentStatus: PaymentStatus } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (type: UserType) => {
    setUser({ type, id: '123', paymentStatus: 'pending' });
    navigate('/activate');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const handlePaymentSuccess = () => {
    if (user) {
      setUser({ ...user, paymentStatus: 'paid' });
      navigate(user.type === 'dentist' ? '/dentist' : '/clinic');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <nav className="bg-white/80 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-sky-600 rounded-xl group-hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 flex items-center justify-center">
                <ClinicLogo className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Clinic<span className="text-sky-600">Jobs</span></span>
            </Link>

            <div className="flex items-center gap-6">
              {user ? (
                <>
                  {user.paymentStatus === 'paid' ? (
                    <>
                      {user.type === 'dentist' ? (
                        <Link to="/dentist" className="text-slate-600 hover:text-sky-600 font-semibold flex items-center gap-2 transition-colors">
                          <User className="w-5 h-5" /> Painel Dentista
                        </Link>
                      ) : (
                        <Link to="/clinic" className="text-slate-600 hover:text-sky-600 font-semibold flex items-center gap-2 transition-colors">
                          <Building2 className="w-5 h-5" /> Painel Clínica
                        </Link>
                      )}
                    </>
                  ) : (
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      Aguardando Ativação
                    </span>
                  )}
                  <button 
                    onClick={logout}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Sair"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <button 
                    onClick={() => login('dentist')}
                    className="px-5 py-2.5 text-sm font-bold text-sky-700 border-2 border-sky-100 rounded-xl hover:bg-sky-50 transition-all"
                  >
                    Sou Dentista
                  </button>
                  <button 
                    onClick={() => login('clinic')}
                    className="px-5 py-2.5 text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-700 shadow-lg shadow-sky-200 transition-all hover:-translate-y-0.5"
                  >
                    Sou Clínica
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/activate" 
            element={user ? <PaymentView userType={user.type} onPaymentSuccess={handlePaymentSuccess} /> : <LandingPage />} 
          />
          <Route 
            path="/dentist" 
            element={user?.type === 'dentist' && user.paymentStatus === 'paid' ? <DentistDashboard /> : (user ? <PaymentView userType="dentist" onPaymentSuccess={handlePaymentSuccess} /> : <LandingPage />)} 
          />
          <Route 
            path="/clinic" 
            element={user?.type === 'clinic' && user.paymentStatus === 'paid' ? <ClinicDashboard /> : (user ? <PaymentView userType="clinic" onPaymentSuccess={handlePaymentSuccess} /> : <LandingPage />)} 
          />
        </Routes>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-sky-600 rounded-lg flex items-center justify-center">
                  <ClinicLogo className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">ClinicJobs</span>
              </div>
              <p className="text-base leading-relaxed max-w-sm">
                A maior rede de talentos odontológicos do país. Nossa missão é elevar o padrão da odontologia conectando profissionais brilhantes a clínicas modernas.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Plataforma</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Encontrar Vagas</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Contratar Profissionais</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Portfólios em Destaque</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Suporte</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
            <span>© {new Date().getFullYear()} ClinicJobs. Elevando sorrisos.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;