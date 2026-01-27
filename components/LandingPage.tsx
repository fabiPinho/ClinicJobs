
import React from 'react';
import { CheckCircle, Users, Building, ShieldCheck, ArrowRight, Sparkles, CreditCard, Star, Search, UserCheck } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[100px] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Novidade: Otimização de Bio com IA
              </div>
              <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl mb-8 leading-[1.1]">
                O próximo passo da sua <span className="text-sky-600">carreira clínica.</span>
              </h1>
              <p className="mt-3 text-lg text-slate-500 sm:mt-5 sm:text-xl leading-relaxed">
                Conectamos cirurgiões-dentistas talentosos às clínicas mais prestigiadas do país. Crie um portfólio visual impactante e seja descoberto hoje.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-5">
                <button className="flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-sky-600 hover:bg-sky-700 shadow-xl shadow-sky-200 transition-all hover:-translate-y-1">
                  Encontrar Vagas <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="flex items-center justify-center px-10 py-4 border-2 border-slate-200 text-lg font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:border-sky-200">
                  Cadastrar Clínica
                </button>
              </div>
              <div className="mt-12 flex items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i*10}`} className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-sky-50" alt="Profissional" />
                  ))}
                </div>
                <span>Junte-se a <span className="text-slate-900 font-bold">+5.000</span> dentistas</span>
              </div>
            </div>
            <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full group">
                <div className="absolute inset-0 bg-sky-600 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative rounded-[2.5rem] shadow-2xl overflow-hidden ring-8 ring-white/50 border border-slate-200 aspect-[4/3]">
                  <img
                    className="w-full h-full object-cover float"
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                    alt="Consultório Odontológico Moderno"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl border border-white/40 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">OJ</div>
                      <div>
                        <p className="font-bold text-slate-900">Odonto Joy</p>
                        <p className="text-xs text-slate-500 font-medium">Buscando Especialista em Estética</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Eliminamos burocracia e intermediários. Mostramos portfólio dos candidatos e fotos das clínicas para melhor decisão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm relative z-10">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Cadastro e Filtro</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Profissionais criam portfólios e clínicas anunciam vagas com detalhes da infraestrutura.
              </p>
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-100 -z-0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm relative z-10">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Match & Contato</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Nossa IA sugere conexões ideais. Quando o interesse é mútuo, o contato é liberado para entrevista.
              </p>
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-100 -z-0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-sky-600 text-white rounded-3xl flex items-center justify-center mb-8 transition-all shadow-lg shadow-sky-200 relative z-10">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. Ativação Final</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Após a aprovação do cadastro, é cobrada uma taxa de ativação para liberação total do perfil.
              </p>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8">
                <CreditCard className="w-16 h-16 text-sky-500/20" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-grow">
                  <span className="inline-block px-4 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest mb-4">Taxa Única de Sucesso</span>
                  <h3 className="text-3xl font-extrabold text-white mb-4">Investimento fixo, <br/>sem surpresas.</h3>
                  <p className="text-slate-400 font-medium leading-relaxed text-lg">
                    Diferente de agências tradicionais, cobramos apenas uma vez pela ativação da conta. Sem mensalidades, sem comissões sobre seu faturamento.
                  </p>
                </div>
                <div className="shrink-0 text-center bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Valor de Ativação</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-white text-2xl font-bold">R$</span>
                    <span className="text-white text-6xl font-extrabold tracking-tight">150</span>
                    <span className="text-sky-500 text-2xl font-bold">,00</span>
                  </div>
                  <p className="text-sky-500 font-bold text-sm mt-4 italic">Taxa Única de Acesso</p>
                  <p className="text-slate-500 text-[10px] mt-2 font-medium uppercase tracking-tighter">Válido para Dentistas e Clínicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Diferenciais</h2>
          <p className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
            Desenhado para a excelência clínica
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[2.5rem] bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all border border-slate-100 group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-sky-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Portfólio Visual</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Suas habilidades merecem visibilidade. Poste seus melhores casos, fotos clínicas e certificações em um feed profissional.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all border border-slate-100 group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-cyan-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
            <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-sm">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Vagas Inteligentes</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Filtre por infraestrutura, equipamentos (Laser, Scanner 3D, Microscópio) e regime de contratação ideal.
            </p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all border border-slate-100 group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Match com IA</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Nossa inteligência artificial analisa seu CRO e portfólio para sugerir as clínicas que combinam com seu perfil técnico.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;