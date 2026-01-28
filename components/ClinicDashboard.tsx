
import React, { useState, useMemo } from 'react';
import { Users, FileText, Camera, Plus, Star, Search, MapPin, Sparkles, ChevronRight, Image as ImageIcon, Trash2, Heart, Filter, X, ArrowLeft, ArrowRight, ExternalLink, Tag, Coins, Percent, Banknote, Bookmark, Save, Lock, CheckCircle2, AlertCircle, Briefcase, MessageSquare, CalendarDays, Building } from 'lucide-react';
import { suggestJobDescription } from '../services/geminiService';
import { Region, PortfolioItem, WorkExperience, Review } from '../types';

interface Candidate {
  id: string;
  name: string;
  specialty: string;
  exp: string;
  rating: number;
  avatar: string;
  bio: string;
  portfolio: PortfolioItem[];
  experiences: WorkExperience[];
  reviews: Review[];
}

const SPECIALTIES_LIST = [
  'Implantodontia', 'Ortodontia', 'Endodontia', 'Periodontia', 
  'Odontopediatria', 'Prótese Dentária', 'Dentística', 'Harmonização Orofacial',
  'Cirurgia Bucomaxilofacial', 'Odontogeriatria', 'Clínico Geral'
];

const MOCK_CANDIDATES: Candidate[] = [
  { 
    id: '1', 
    name: 'Dra. Ana Costa', 
    specialty: 'Odontopediatria', 
    exp: '8 anos', 
    rating: 4.9, 
    avatar: 'https://i.pravatar.cc/150?u=ana',
    bio: 'Especialista em atendimento humanizado para crianças e adolescentes.',
    portfolio: [{ id: 'p1', title: 'Atendimento Lúdico', description: 'Técnica de manejo', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400' }],
    experiences: [
      { id: 'e1', clinicName: 'Sorriso Kids', role: 'Odontopediatra', period: '2018 - 2022', description: 'Responsável pelo setor de prevenção e tratamentos complexos em sedação consciente.' },
      { id: 'e2', clinicName: 'Clínica Bem Estar', role: 'Clínico Geral', period: '2016 - 2018', description: 'Atendimento clínico geral with foco em estética.' }
    ],
    reviews: [
      { id: 'r1', clinicName: 'Sorriso Kids', rating: 5, comment: 'Excelente profissional, pontual e muito técnica.', date: 'Há 3 meses' },
      { id: 'r2', clinicName: 'Clínica Bem Estar', rating: 4.8, comment: 'Dra Ana é fantástica com as crianças, recomendo muito.', date: 'Há 1 ano' }
    ]
  }
];

const ClinicDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs' | 'gallery'>('talent');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [clinicDescription, setClinicDescription] = useState('');
  const [bairro, setBairro] = useState('');
  const [paymentType, setPaymentType] = useState<'diaria' | 'comissao' | 'salario'>('comissao');
  const [paymentValue, setPaymentValue] = useState('');
  const [workDays, setWorkDays] = useState<number>(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [clinicPhotos, setClinicPhotos] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const completionStats = useMemo(() => {
    const checks = {
      description: clinicDescription.trim().length > 30,
      photos: clinicPhotos.length > 0,
      bairro: bairro.trim().length > 3,
      remuneration: paymentValue.trim().length > 0,
      specialties: selectedSpecialties.length > 0 && selectedSpecialties.length <= 3,
      workDays: workDays > 0
    };
    const total = Object.values(checks).length;
    const completed = Object.values(checks).filter(Boolean).length;
    return {
      percentage: Math.round((completed / total) * 100),
      checks,
      isComplete: completed === total
    };
  }, [clinicDescription, clinicPhotos, bairro, paymentValue, selectedSpecialties, workDays]);

  const toggleSpecialty = (s: string) => {
    if (selectedSpecialties.includes(s)) {
      setSelectedSpecialties(selectedSpecialties.filter(item => item !== s));
    } else if (selectedSpecialties.length < 3) {
      setSelectedSpecialties([...selectedSpecialties, s]);
    }
  };

  const handlePublishJob = () => {
    if (!completionStats.isComplete) {
      setShowError(true);
      setActiveTab('gallery');
      setTimeout(() => setShowError(false), 4000);
      return;
    }
    alert("Vaga publicada com sucesso!");
  };

  const addMockPhoto = () => {
    setClinicPhotos([...clinicPhotos, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400']);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-2 duration-500">
      
      {/* Detailed Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="flex justify-between items-center px-10 py-6 border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Voltar à busca
              </button>
              <div className="flex gap-3">
                <button className="px-8 py-3 bg-sky-600 text-white rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-100 flex items-center gap-2">
                  Convidar para Entrevista <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-10 custom-scrollbar space-y-16">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row gap-12">
                <div className="shrink-0 mx-auto md:mx-0">
                  <img src={selectedCandidate.avatar} className="w-44 h-44 rounded-[2.5rem] object-cover ring-8 ring-slate-50 shadow-xl" alt={selectedCandidate.name} />
                  <div className="mt-6 flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 px-4 py-2 rounded-2xl font-black">
                    <Star className="w-5 h-5 fill-current" /> {selectedCandidate.rating}
                  </div>
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h2 className="text-4xl font-black text-slate-900 mb-2">{selectedCandidate.name}</h2>
                  <p className="text-xl text-sky-600 font-bold mb-6">{selectedCandidate.specialty}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest">EXP: {selectedCandidate.exp}</span>
                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest">CRO ATIVO</span>
                  </div>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-3xl">
                    {selectedCandidate.bio}
                  </p>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Experiência Publicada</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCandidate.experiences.map(exp => (
                    <div key={exp.id} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-sky-200 transition-colors">
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{exp.role}</h4>
                      <p className="text-sky-600 font-bold text-sm mb-2">{exp.clinicName}</p>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">{exp.period}</p>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {showError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] w-full max-w-md animate-in slide-in-from-top-8 duration-300">
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-[2rem] shadow-2xl flex items-center gap-4">
            <div className="bg-red-200 p-2 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black uppercase text-xs tracking-widest mb-1">Perfil Incompleto</p>
              <p className="text-sm font-bold">Preencha todos os dados da clínica, fotos e bairro para publicar vagas.</p>
            </div>
          </div>
        </div>
      )}

      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel da <span className="text-sky-600">Sua Clínica</span></h1>
          <p className="text-slate-500 font-medium">Configure seu perfil detalhadamente para atrair os melhores talentos.</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * completionStats.percentage) / 100} className="text-sky-500 transition-all duration-1000" />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-700">{completionStats.percentage}%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Qualidade do Cadastro</p>
            <p className="text-sm font-bold text-slate-900">{completionStats.isComplete ? 'Pronto para contratar!' : 'Faltam detalhes'}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-72 space-y-4">
          <nav className="p-2 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('talent')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'talent' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Buscar Dentistas</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'jobs' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5" />
                <span>Anunciar Vaga</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'gallery' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-sky-50'}`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5" />
                <span>Perfil da Clínica</span>
              </div>
            </button>
          </nav>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requisitos Mínimos</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.bairro ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.bairro ? "text-slate-900" : "text-slate-400"}>Bairro Definido</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.photos ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.photos ? "text-slate-900" : "text-slate-400"}>Fotos Reais</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.specialties ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.specialties ? "text-slate-900" : "text-slate-400"}>Espec. buscadas</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow">
          {activeTab === 'talent' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {MOCK_CANDIDATES.map(candidate => (
                 <div key={candidate.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-sky-100 transition-all group flex flex-col items-center text-center">
                   <img src={candidate.avatar} className="w-32 h-32 rounded-[2rem] object-cover mb-4 ring-4 ring-slate-50 group-hover:ring-sky-50 transition-all shadow-md" alt={candidate.name} />
                   <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-xl mb-4">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-black text-sm">{candidate.rating}</span>
                   </div>
                   <h4 className="text-xl font-black text-slate-900">{candidate.name}</h4>
                   <p className="text-sky-600 font-bold mb-6">{candidate.specialty}</p>
                   
                   <div className="flex gap-3 w-full">
                     <button 
                      onClick={() => setSelectedCandidate(candidate)}
                      className="flex-grow py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all"
                     >
                       Ver Perfil Completo
                     </button>
                   </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
                    <Tag className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">O que você busca?</h3>
                </div>

                <div className="space-y-10">
                  {/* Specialty Multi-select */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Escolha até 3 especialidades</label>
                      <span className="text-[10px] font-black bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full">{selectedSpecialties.length}/3</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALTIES_LIST.map(s => (
                        <button 
                          key={s}
                          onClick={() => toggleSpecialty(s)}
                          className={`px-4 py-2 rounded-xl border-2 font-bold text-xs transition-all ${selectedSpecialties.includes(s) ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-100' : 'bg-white border-slate-100 text-slate-400 hover:border-sky-200'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Remuneration */}
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sistema de Remuneração</label>
                      <div className="flex gap-2">
                        {[
                          { id: 'salario', label: 'Fixo', icon: Banknote },
                          { id: 'diaria', label: 'Diária', icon: CalendarDays },
                          { id: 'comissao', label: 'Comissão', icon: Percent }
                        ].map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => setPaymentType(item.id as any)}
                            className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl border-2 font-bold transition-all ${paymentType === item.id ? 'bg-sky-600 border-sky-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="text-[10px] uppercase">{item.label}</span>
                          </button>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        value={paymentValue}
                        onChange={(e) => setPaymentValue(e.target.value)}
                        placeholder="Ex: R$ 450,00 ou 40%"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium focus:ring-4 focus:ring-sky-500/10 transition-all"
                      />
                    </div>

                    {/* Work Days */}
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dias por Semana</label>
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-black text-sky-600">{workDays} {workDays === 1 ? 'dia' : 'dias'}</span>
                          <span className="text-slate-400 font-bold text-xs">Semanal</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="7" 
                          value={workDays} 
                          onChange={(e) => setWorkDays(parseInt(e.target.value))}
                          className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handlePublishJob}
                    className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group"
                  >
                    Publicar Oportunidade <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Sobre a Clínica</label>
                        <textarea 
                          value={clinicDescription}
                          onChange={(e) => setClinicDescription(e.target.value)}
                          rows={4}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none font-medium text-slate-700 leading-relaxed resize-none focus:ring-4 focus:ring-sky-500/10"
                          placeholder="Fale sobre a infraestrutura, marca e diferenciais..."
                        />
                        <span className={`text-[10px] font-bold ${clinicDescription.length >= 30 ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {clinicDescription.length}/30 letras
                        </span>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Localização (Bairro)</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 w-5 h-5" />
                          <input 
                            type="text" 
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder="Ex: Itaim Bibi, SP"
                            className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium focus:ring-4 focus:ring-sky-500/10"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold ml-1 italic">Indicar bairro e cidade ajuda o match geográfico.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                       <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Fotos da Clínica</label>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {clinicPhotos.map((p, i) => (
                          <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-slate-100 relative group shadow-sm">
                            <img src={p} className="w-full h-full object-cover" alt="Ambiente" />
                            <button 
                              onClick={() => setClinicPhotos(clinicPhotos.filter((_, idx) => idx !== i))}
                              className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button onClick={addMockPhoto} className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-sky-500 hover:text-sky-600 transition-all bg-slate-50/50 group">
                          <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">Add Foto</span>
                        </button>
                       </div>
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

export default ClinicDashboard;
