
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, DollarSign, Calendar, Sparkles, Plus, Image as ImageIcon, Trash2, ChevronRight, Building2, Filter, Save, Bookmark, X } from 'lucide-react';
import { Job, PortfolioItem, Region, SavedFilter } from '../types';
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
    description: 'Buscamos profissional com experiência em Invisalign e aparelhos autoligados. Ambiente moderno com Scanner iTero.',
    type: 'PJ',
    postedAt: 'Há 2 dias'
  },
  {
    id: '2',
    clinicId: 'c2',
    clinicName: 'Smile Design Studio',
    title: 'Implantodontista',
    specialty: 'Implantodontia',
    location: 'Rio de Janeiro, RJ',
    region: 'Zona Oeste',
    salaryRange: 'R$ 15.000+',
    minSalaryValue: 15000,
    description: 'Oportunidade para atuar em clínica boutique focada em estética e reabilitação oral.',
    type: 'Autônomo',
    postedAt: 'Há 5 horas'
  },
  {
    id: '3',
    clinicId: 'c3',
    clinicName: 'Clínica Sorrir Mais',
    title: 'Clínico Geral',
    specialty: 'Clínica Geral',
    location: 'Curitiba, PR',
    region: 'Centro',
    salaryRange: 'R$ 4.500 - R$ 6.000',
    minSalaryValue: 4500,
    description: 'Vaga para início imediato. Clínica com grande fluxo de pacientes e foco em prevenção.',
    type: 'CLT',
    postedAt: 'Há 1 dia'
  },
  {
    id: '4',
    clinicId: 'c4',
    clinicName: 'Premium Dental',
    title: 'Endodontista',
    specialty: 'Endodontia',
    location: 'Belo Horizonte, MG',
    region: 'Zona Norte',
    salaryRange: 'R$ 10.000 - R$ 14.000',
    minSalaryValue: 10000,
    description: 'Especialista em endodontia com domínio de sistemas rotatórios. Oferecemos microscópio operatório.',
    type: 'PJ',
    postedAt: 'Há 3 dias'
  }
];

const SALARY_FILTERS = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: 'Até R$ 5k', min: 0, max: 5000 },
  { label: 'R$ 5k - R$ 10k', min: 5000, max: 10000 },
  { label: 'R$ 10k - R$ 15k', min: 10000, max: 15000 },
  { label: 'Acima de R$ 15k', min: 15000, max: Infinity },
];

const REGIONS: Region[] = ['Todas', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'];

const DentistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'portfolio' | 'profile'>('jobs');
  const [bio, setBio] = useState('Sou dentista clínico geral com foco em estética há 5 anos, atuando principalmente com facetas e clareamento.');
  const [optimizationSpecialty, setOptimizationSpecialty] = useState('Estética');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryFilter, setSalaryFilter] = useState(SALARY_FILTERS[0]);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(['Todas']);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: '1', title: 'Reabilitação Estética', description: 'Caso complexo envolvendo facetas cerâmicas E-max.', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffce47267a5?auto=format&fit=crop&q=80&w=400' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('clinicJobs_savedFilters');
    if (saved) setSavedFilters(JSON.parse(saved));
  }, []);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSalary = 
        job.minSalaryValue >= salaryFilter.min && (salaryFilter.max === Infinity || job.minSalaryValue < salaryFilter.max);
      
      const matchesRegion = selectedRegions.includes('Todas') || selectedRegions.includes(job.region);
      
      return matchesSearch && matchesSalary && matchesRegion;
    });
  }, [searchTerm, salaryFilter, selectedRegions]);

  const handleSaveFilter = () => {
    const name = searchTerm || `Busca em ${selectedRegions.join(', ')}`;
    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: name || "Filtro sem nome",
      searchTerm,
      salaryLabel: salaryFilter.label,
      regions: [...selectedRegions]
    };
    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('clinicJobs_savedFilters', JSON.stringify(updated));
  };

  const applySavedFilter = (filter: SavedFilter) => {
    setSearchTerm(filter.searchTerm);
    setSelectedRegions(filter.regions);
    const sal = SALARY_FILTERS.find(s => s.label === filter.salaryLabel);
    if (sal) setSalaryFilter(sal);
  };

  const deleteSavedFilter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedFilters.filter(f => f.id !== id);
    setSavedFilters(updated);
    localStorage.setItem('clinicJobs_savedFilters', JSON.stringify(updated));
  };

  const toggleRegion = (reg: Region) => {
    if (reg === 'Todas') {
      setSelectedRegions(['Todas']);
      return;
    }
    setSelectedRegions(prev => {
      const withoutTodas = prev.filter(r => r !== 'Todas');
      if (withoutTodas.includes(reg)) {
        const next = withoutTodas.filter(r => r !== reg);
        return next.length === 0 ? ['Todas'] : next;
      } else {
        return [...withoutTodas, reg];
      }
    });
  };

  const handleOptimizeBio = async () => {
    if (!optimizationSpecialty) return;
    setIsOptimizing(true);
    try {
      const newBio = await optimizeBio(bio, optimizationSpecialty);
      if (newBio) setBio(newBio);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-2 duration-500">
      <header className="mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bem-vindo, <span className="text-sky-600">Dr. Ricardo</span></h1>
        <p className="text-slate-500 font-medium">Você tem {filteredJobs.length} matches de vagas disponíveis para o seu perfil.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-72 space-y-3">
          <nav className="p-2 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'jobs' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <span>Buscar Vagas</span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'jobs' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'portfolio' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <span>Meu Portfólio</span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'portfolio' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'profile' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <span>Meu Perfil</span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'profile' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </nav>
          
          {savedFilters.length > 0 && activeTab === 'jobs' && (
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                <Bookmark className="w-3 h-3" /> Buscas Salvas
              </div>
              <div className="space-y-1">
                {savedFilters.map(f => (
                  <div 
                    key={f.id} 
                    onClick={() => applySavedFilter(f)}
                    className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-sky-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-600 group-hover:text-sky-600 truncate max-w-[160px]">{f.name}</span>
                    <button 
                      onClick={(e) => deleteSavedFilter(f.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-2">Dica Pro</p>
            <p className="text-sm leading-relaxed opacity-80">
              Perfis com filtros geográficos definidos recebem notificações prioritárias para novas vagas na região.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {activeTab === 'jobs' && (
            <div className="space-y-8">
              <div className="flex flex-col gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Especialidade ou clínica..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <button 
                    onClick={handleSaveFilter}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-sky-100 text-sky-700 font-bold rounded-2xl hover:bg-sky-200 transition-all whitespace-nowrap"
                  >
                    <Save className="w-5 h-5" /> Salvar Filtro
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-50">
                  {/* Region Filter */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-sky-600" />
                      <span>Região / Zona</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {REGIONS.map((reg) => (
                        <button
                          key={reg}
                          onClick={() => toggleRegion(reg)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                            selectedRegions.includes(reg) 
                              ? 'bg-sky-600 border-sky-600 text-white' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-sky-200'
                          }`}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Salary Filter */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest">
                      <DollarSign className="w-3 h-3 text-sky-600" />
                      <span>Faixa Salarial</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SALARY_FILTERS.map((filter) => (
                        <button
                          key={filter.label}
                          onClick={() => setSalaryFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                            salaryFilter.label === filter.label 
                              ? 'bg-sky-600 border-sky-600 text-white' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-sky-200'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <div key={job.id} className="bg-white border border-slate-200 p-8 rounded-[2rem] hover:shadow-xl hover:shadow-sky-100 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[4rem] -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                      <div className="flex justify-between items-start mb-6 relative">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sky-600 font-bold flex items-center gap-1.5">
                              <Building2 className="w-4 h-4" /> {job.clinicName}
                            </p>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            <span className="text-slate-400 font-bold text-sm">{job.region}</span>
                          </div>
                        </div>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full tracking-wider uppercase">{job.type}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2 font-medium">{job.description}</p>
                      <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-bold">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sky-500" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-sky-500" /> {job.salaryRange}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-sky-500" /> {job.postedAt}
                        </div>
                      </div>
                      <button className="mt-8 w-full py-3.5 bg-slate-50 text-sky-700 font-bold rounded-xl hover:bg-sky-600 hover:text-white transition-all shadow-sm">
                        Ver Vaga Completa
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhuma vaga encontrada</h3>
                    <p className="text-slate-500 font-medium">Tente ajustar seus termos de busca ou filtros de região e salário.</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSalaryFilter(SALARY_FILTERS[0]); setSelectedRegions(['Todas']); }}
                      className="mt-6 text-sky-600 font-bold hover:underline"
                    >
                      Limpar todos os filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-slate-900">Casos Clínicos</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-2xl hover:bg-sky-700 transition-all font-bold shadow-lg shadow-sky-200">
                  <Plus className="w-5 h-5" /> Novo Caso
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.map(item => (
                  <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group">
                    <div className="relative aspect-[16/10]">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <button className="absolute top-4 right-4 p-3 bg-white/90 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
                <button className="aspect-[16/10] border-3 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-600 transition-all bg-white hover:bg-sky-50/30">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">Adicionar Foto Clínica</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-sky-600 rounded-[2rem] blur-2xl opacity-10"></div>
                    <img src="https://i.pravatar.cc/300?u=ricardo" className="relative w-32 h-32 rounded-[2rem] object-cover ring-4 ring-white shadow-xl" alt="Profile" />
                    <label className="absolute inset-0 bg-black/50 rounded-[2rem] opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-all">
                      EDITAR
                    </label>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-extrabold text-slate-900">Dr. Ricardo Silva</h2>
                    <p className="text-sky-600 font-bold text-lg">Especialista em Dentística</p>
                    <p className="text-slate-400 font-medium mt-1">CRO 123.456-SP • São Paulo</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block">Biografia Profissional</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-grow w-full">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Especialidade para a IA</p>
                        <input 
                          type="text"
                          value={optimizationSpecialty}
                          onChange={(e) => setOptimizationSpecialty(e.target.value)}
                          placeholder="Ex: Odontopediatria, Implantodontia..."
                          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <button 
                        onClick={handleOptimizeBio}
                        disabled={isOptimizing || !optimizationSpecialty}
                        className="whitespace-nowrap flex items-center gap-2 text-xs font-bold text-white bg-sky-600 px-5 py-3.5 rounded-xl hover:bg-sky-700 transition-all disabled:opacity-50 shadow-lg shadow-sky-200"
                      >
                        <Sparkles className="w-4 h-4" /> {isOptimizing ? 'Reescrevendo...' : 'Aperfeiçoar com IA'}
                      </button>
                    </div>
                  </div>
                  
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={6}
                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium"
                    placeholder="Conte sua trajetória profissional..."
                  />
                  <div className="flex justify-end pt-4">
                    <button className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
                      Salvar Alterações
                    </button>
                  </div>
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