
import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, Calendar, Sparkles, Plus, Image as ImageIcon, Trash2, ChevronRight, Building2, Filter, Save, Bookmark, X, Tag, Lock, CheckCircle2, AlertCircle, Briefcase, Star } from 'lucide-react';
import { Job, PortfolioItem, Region, WorkExperience } from '../types';
import { optimizeBio } from '../services/geminiService';

interface FilterableJob extends Job {
  minSalaryValue: number;
}

const MOCK_JOBS: FilterableJob[] = [
  {
    id: '1',
    clinicId: 'c1',
    clinicName: 'Odonto Excellence',
    title: 'Ortodontista Sênior',
    specialty: 'Ortodontia',
    location: 'São Paulo, SP',
    region: 'Zona Sul',
    salaryRange: 'R$ 8.000 - R$ 12.000',
    minSalaryValue: 8000,
    description: 'Buscamos profissional com experiência em Invisalign e aparelhos autoligados.',
    type: 'PJ',
    postedAt: 'Há 2 dias'
  }
];

const DentistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'portfolio' | 'profile'>('profile');
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [optimizationSpecialty, setOptimizationSpecialty] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  
  // States for new experience form
  const [newExpClinic, setNewExpClinic] = useState('');
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [showExpForm, setShowExpForm] = useState(false);

  // Lógica de conclusão de perfil atualizada
  const completionStats = useMemo(() => {
    const checks = {
      bio: bio.trim().length > 30,
      specialty: specialty.trim().length >= 3,
      portfolio: portfolio.length > 0,
      experience: experiences.length > 0
    };
    const total = Object.values(checks).length;
    const completed = Object.values(checks).filter(Boolean).length;
    return {
      percentage: Math.round((completed / total) * 100),
      checks,
      isComplete: completed === total
    };
  }, [bio, specialty, portfolio, experiences]);

  const handleOptimizeBio = async () => {
    if (!optimizationSpecialty) return;
    setIsOptimizing(true);
    try {
      const newBio = await optimizeBio(bio || "Sou dentista focado em resultados.", optimizationSpecialty);
      if (newBio) {
        setBio(newBio);
        setSpecialty(optimizationSpecialty);
      }
    } catch (error) { console.error(error); } finally { setIsOptimizing(false); }
  };

  const addMockPortfolio = () => {
    setPortfolio([...portfolio, { id: Date.now().toString(), title: 'Caso Clínico Exemplo', description: 'Reabilitação Estética', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffce47267a5?auto=format&fit=crop&q=80&w=400' }]);
  };

  const handleAddExperience = () => {
    if (!newExpClinic || !newExpRole) return;
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      clinicName: newExpClinic,
      role: newExpRole,
      period: newExpPeriod,
      description: newExpDesc
    };
    setExperiences([newExp, ...experiences]);
    setNewExpClinic('');
    setNewExpRole('');
    setNewExpPeriod('');
    setNewExpDesc('');
    setShowExpForm(false);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-2 duration-500">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Olá, <span className="text-sky-600">Dr. Ricardo</span></h1>
          <p className="text-slate-500 font-medium">Preencha bio, especialidade, portfólio e experiência para liberar as vagas.</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * completionStats.percentage) / 100} className="text-sky-600 transition-all duration-1000" />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-700">{completionStats.percentage}%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status do Perfil</p>
            <p className="text-sm font-bold text-slate-900">{completionStats.isComplete ? 'Perfil Publicado!' : 'Cadastro em andamento'}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-72 space-y-4">
          <nav className="p-2 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'jobs' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                <span>Vagas</span>
                {!completionStats.isComplete && <Lock className="w-3.5 h-3.5 opacity-40" />}
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'portfolio' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5" />
                <span>Portfólio</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'profile' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <span>Perfil & Exp.</span>
              </div>
            </button>
          </nav>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Requisitos Obrigatórios</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.specialty ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.specialty ? "text-slate-900" : "text-slate-400"}>Especialidade</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.bio ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.bio ? "text-slate-900" : "text-slate-400"}>Bio (30+ letras)</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.portfolio ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.portfolio ? "text-slate-900" : "text-slate-400"}>Item no Portfólio</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.experience ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.experience ? "text-slate-900" : "text-slate-400"}>Experiência Profis.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow">
          {activeTab === 'jobs' && (
            <div className="relative">
              {!completionStats.isComplete && (
                <div className="absolute inset-0 z-10 bg-slate-50/60 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem]">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
                    <Lock className="w-10 h-10 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Acesso Restrito</h3>
                  <p className="text-slate-500 font-medium max-w-sm mb-6">Seu perfil e experiência devem estar completos para visualizar as vagas abertas.</p>
                  <button onClick={() => setActiveTab('profile')} className="px-8 py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-200">
                    Completar Meu Perfil
                  </button>
                </div>
              )}
              <div className={!completionStats.isComplete ? "opacity-30 pointer-events-none grayscale" : ""}>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center">
                  <p className="text-slate-500 font-bold">Nenhuma vaga nova no momento. Continue de olho!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Portfólio de Casos</h2>
                <button onClick={addMockPortfolio} className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-2xl hover:bg-sky-700 transition-all font-bold shadow-lg shadow-sky-200">
                  <Plus className="w-5 h-5" /> Novo Caso
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.map(item => (
                  <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
                {portfolio.length === 0 && (
                  <button onClick={addMockPortfolio} className="aspect-video border-3 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 hover:border-sky-600 hover:text-sky-600 transition-all bg-slate-50 hover:bg-sky-50/50">
                    <ImageIcon className="w-12 h-12 mb-3" />
                    <span className="font-bold">Clique para adicionar seu primeiro caso</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Profile Completion Form */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Sua Especialidade Principal</label>
                      <input 
                        type="text" 
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        placeholder="Ex: Implantodontia"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Otimizar Bio com IA</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={optimizationSpecialty}
                          onChange={(e) => setOptimizationSpecialty(e.target.value)}
                          placeholder="Foco para IA..."
                          className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium"
                        />
                        <button 
                          onClick={handleOptimizeBio}
                          disabled={isOptimizing || !optimizationSpecialty}
                          className="px-6 bg-sky-600 text-white rounded-2xl font-bold hover:bg-sky-700 disabled:opacity-50 transition-all shadow-lg shadow-sky-100"
                        >
                          <Sparkles className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Biografia Profissional</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={6}
                      className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all resize-none text-slate-700 leading-relaxed font-medium"
                      placeholder="Fale sobre seus anos de experiência, cursos..."
                    />
                    <div className="flex justify-between items-center px-1">
                      <span className={`text-xs font-bold ${bio.length >= 30 ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {bio.length}/30 caracteres mínimos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience History Section */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-100 text-sky-600 rounded-xl">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Experiência Profissional</h3>
                  </div>
                  <button 
                    onClick={() => setShowExpForm(!showExpForm)}
                    className="px-6 py-2.5 bg-sky-50 text-sky-600 font-bold rounded-xl hover:bg-sky-100 transition-all text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Experiência
                  </button>
                </div>

                {showExpForm && (
                  <div className="mb-10 p-8 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4 animate-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nome da Clínica" 
                        value={newExpClinic}
                        onChange={(e) => setNewExpClinic(e.target.value)}
                        className="p-4 bg-white border border-slate-200 rounded-xl outline-none font-medium text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Cargo (Ex: Clínico Geral)" 
                        value={newExpRole}
                        onChange={(e) => setNewExpRole(e.target.value)}
                        className="p-4 bg-white border border-slate-200 rounded-xl outline-none font-medium text-sm"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Período (Ex: Jan 2020 - Dez 2023)" 
                      value={newExpPeriod}
                      onChange={(e) => setNewExpPeriod(e.target.value)}
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none font-medium text-sm"
                    />
                    <textarea 
                      placeholder="Breve descrição das atividades..." 
                      value={newExpDesc}
                      onChange={(e) => setNewExpDesc(e.target.value)}
                      rows={3}
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none font-medium text-sm resize-none"
                    />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowExpForm(false)} className="px-6 py-2.5 text-slate-400 font-bold hover:text-slate-600">Cancelar</button>
                      <button onClick={handleAddExperience} className="px-6 py-2.5 bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-200">Publicar Experiência</button>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {experiences.length > 0 ? (
                    experiences.map(exp => (
                      <div key={exp.id} className="relative p-6 bg-white border border-slate-100 rounded-2xl hover:border-sky-200 transition-all group">
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                        <p className="text-sky-600 font-bold text-sm mb-1">{exp.clinicName}</p>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{exp.period}</p>
                        <p className="text-slate-500 text-sm font-medium">{exp.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                      <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 font-bold">Nenhuma experiência profissional cadastrada.</p>
                      <p className="text-slate-300 text-sm">Adicionar suas experiências aumenta sua chance de contratação.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DentistDashboard;
