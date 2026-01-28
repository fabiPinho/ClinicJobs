import React, { useState } from 'react';
import { CheckCircle, Users, Building, ShieldCheck, ArrowRight, Sparkles, CreditCard, Star, Search, UserCheck, X, User, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleChoice = (type: 'dentist' | 'clinic') => {
    setShowRegisterModal(false);
    // Dispara o login simulado no App.tsx através dos botões da navbar
    const navButtons = document.querySelectorAll('nav button');
    if (type === 'dentist' && navButtons[0]) (navButtons[0] as HTMLButtonElement).click();
    if (type === 'clinic' && navButtons[1]) (navButtons[1] as HTMLButtonElement).click();
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Registration Choice Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12 relative animate-in zoom-in-95 duration-300 border border-white/20">
            <button 
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold uppercase tracking-widest mb-4">Escolha seu Perfil</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Bem-vindo ao ClinicJobs</h2>
              <p className="text-slate-500 font-medium">Selecione uma das opções abaixo para realizar seu cadastro.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => handleChoice('dentist')}
                className="group p-8 bg-slate-50 border-2 border-transparent hover:border-sky-500 hover:bg-white rounded-[2rem] transition-all text-left flex flex-col items-start gap-4 shadow-sm hover:shadow-xl hover:shadow-sky-100"
              >
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Cadastro de Dentista</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">Publique seu portfólio visual, receba propostas e gerencie sua carreira em um só lugar.</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sky-600 font-bold text-sm">
                  Quero Vagas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => handleChoice('clinic')}
                className="group p-8 bg-slate-50 border-2 border-transparent hover:border-sky-500 hover:bg-white rounded-[2rem] transition-all text-left flex flex-col items-start gap-4 shadow-sm hover:shadow-xl hover:shadow-sky-100"
              >
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shadow-inner">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Cadastro de Clínica</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">Exiba sua infraestrutura, fotos do consultório e encontre os melhores profissionais.</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sky-600 font-bold text-sm">
                  Quero Contratar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                O único site de empregos em odontologia com IA
              </div>
              <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl mb-6 leading-[1.1]">
                O próximo passo da sua <span className="text-sky-600">carreira clínica.</span>
              </h1>
              <div className="mb-8 p-4 bg-sky-50 rounded-2xl border border-sky-100 inline-block animate-pulse-slow">
                <p className="text-sky-800 font-bold text-sm md:text-base leading-relaxed flex items-center gap-2">
                   <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />
                   O único site de empregos em odontologia com ferramentas de IA para você sair na frente para se destacar.
                </p>
              </div>
              <p className="mt-3 text-lg text-slate-500 sm:mt-5 sm:text-xl leading-relaxed">
                Conectamos cirurgiões-dentistas talentosos às clínicas mais prestigiadas do país. Crie um portfólio visual impactante e seja descoberto hoje.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-5">
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-sky-600 hover:bg-sky-700 shadow-xl shadow-sky-200 transition-all hover:-translate-y-1"
                >
                  Encontrar Vagas <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleChoice('clinic')}
                  className="flex items-center justify-center px-10 py-4 border-2 border-slate-200 text-lg font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:border-sky-200"
                >
                  Cadastrar Clínica
                </button>
              </div>
            </div>
            <div className="mt-16 relative lg:col-span-6">
              <img
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl float"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Consultório Moderno"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Simplicidade & Transparência</h2>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Como funciona o ClinicJobs?</p>
            <p className="text-slate-500 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              Trazemos transparência, segurança e profissionalismo nos processos eliminando grupos de whatsapp, burocracia e intermediários. Mostramos portfólios de clínicas e candidatos para a melhor decisão.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto bg-sky-50 p-6 rounded-[2rem] border border-sky-100 mb-8">
            <p className="text-sky-800 font-bold text-lg leading-relaxed">
              <Sparkles className="inline-block w-5 h-5 mb-1 mr-2 text-sky-600" aria-hidden="true" />
              Por apenas <span className="text-2xl text-sky-600 font-black">R$50,00</span> nos próximos 3 meses, você tem acesso à plataforma e a visualização de todos os participantes , se destacando em um mercado competitivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Perfil Completo</h3>
              <p className="text-slate-500 font-medium">
                Dentistas criam portfólios visuais e clínicas detalham infraestrutura e remuneração.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Match Inteligente</h3>
              <p className="text-slate-500 font-medium">
                Nossa plataforma analisa especialidades e perfis para sugerir conexões ideais.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-sky-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Contratação Direta</h3>
              <p className="text-slate-500 font-medium">
                Agende entrevistas e feche parcerias sem intermediários ou taxas por faturamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
