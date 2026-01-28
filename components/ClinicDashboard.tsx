
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Users, FileText, Camera, Plus, Star, Search, MapPin, Sparkles, ChevronRight, Image as ImageIcon, Trash2, Heart, Filter, X, ArrowLeft, ExternalLink, Tag, Coins, Percent, Banknote, Bookmark, Save, Lock, CheckCircle2, AlertCircle, Briefcase, MessageSquare } from 'lucide-react';
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
      { id: 'e2', clinicName: 'Clínica Bem Estar', role: 'Clínico Geral', period: '2016 - 2018', description: 'Atendimento clínico geral com foco em estética.' }
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
  const [paymentType, setPaymentType] = useState<'diaria' | 'porcentagem' | 'salario'>('porcentagem');
  const [paymentValue, setPaymentValue] = useState('');
  const [clinicPhotos, setClinicPhotos] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const completionStats = useMemo(() => {
    const checks = {
      description: clinicDescription.trim().length > 30,
      photos: clinicPhotos.length > 0,
      remuneration: paymentValue.trim().length > 0
    };
    const total = Object.values(checks).length;
    const completed = Object.values(checks).filter(Boolean).length;
    return {
      percentage: Math.round((completed / total) * 100),
      checks,
      isComplete: completed === total
    };
  }, [clinicDescription, clinicPhotos, paymentValue]);

  const addMockPhoto = () => {
    setClinicPhotos(['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400']);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-2 duration-500">
      
      {/* Detailed Candidate Modal with Experience and Reviews */}
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

              {/* Work Experience Section */}
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

              {/* Reviews Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Avaliações de Clínicas</h3>
                </div>
                <div className="space-y-4">
                  {selectedCandidate.reviews.map(review => (
                    <div key={review.id} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col sm:flex-row gap-6">
                      <div className="shrink-0 flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl h-fit">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{review.rating}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-slate-900">{review.clinicName}</h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</span>
                        </div>
                        <p className="text-slate-600 font-medium italic leading-relaxed">"{review.comment}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio section remains... */}
              <div className="space-y-6 pb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Portfólio Clínico</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedCandidate.portfolio.map(item => (
                    <div key={item.id} className="group rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 hover:shadow-xl transition-all">
                      <img src={item.imageUrl} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                      <div className="p-6">
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-medium">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel da <span className="text-sky-600">Sua Clínica</span></h1>
          <p className="text-slate-500 font-medium">Avalie experiências e encontre profissionais certificados.</p>
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
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cadastro Clínica</p>
            <p className="text-sm font-bold text-slate-900">{completionStats.isComplete ? 'Perfil Profissional' : 'Ainda em configuração'}</p>
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
                {!completionStats.isComplete && <Lock className="w-3.5 h-3.5 opacity-40" />}
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
                <Camera className="w-5 h-5" />
                <span>Fotos & Perfil</span>
              </div>
            </button>
          </nav>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pendências</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.description ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.description ? "text-slate-900" : "text-slate-400"}>Bio da Clínica</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.photos ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.photos ? "text-slate-900" : "text-slate-400"}>Fotos (Mín. 1)</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold">
                {completionStats.checks.remuneration ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-slate-300" />}
                <span className={completionStats.checks.remuneration ? "text-slate-900" : "text-slate-400"}>Forma de Pagto</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow">
          {activeTab === 'talent' && (
            <div className="relative">
              {!completionStats.isComplete && (
                <div className="absolute inset-0 z-10 bg-slate-50/60 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem]">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
                    <Lock className="w-10 h-10 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Talentos Protegidos</h3>
                  <p className="text-slate-500 font-medium max-w-sm mb-6">Sua clínica precisa estar 100% cadastrada para que possamos mostrar os profissionais disponíveis para você.</p>
                  <button onClick={() => setActiveTab('gallery')} className="px-8 py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg">
                    Completar Dados da Clínica
                  </button>
                </div>
              )}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${!completionStats.isComplete ? "opacity-30 pointer-events-none blur-[2px]" : ""}`}>
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
                         Ver Perfil & Exp.
                       </button>
                       <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
                        <Heart className="w-5 h-5" />
                       </button>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Anunciar Vaga</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remuneração Padrão</label>
                    <div className="flex gap-2">
                      {['diaria', 'porcentagem', 'salario'].map((type) => (
                        <button 
                          key={type}
                          onClick={() => setPaymentType(type as any)}
                          className={`flex-1 py-3 px-2 rounded-xl border-2 font-bold text-[10px] uppercase transition-all ${paymentType === type ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Valor/Porcentagem</label>
                    <input 
                      type="text" 
                      value={paymentValue}
                      onChange={(e) => setPaymentValue(e.target.value)}
                      placeholder="Ex: R$ 450,00 ou 35%"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium"
                    />
                  </div>
                </div>
                <button className="w-full py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg">
                  Publicar Oportunidade
                </button>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                 <div className="space-y-10">
                    <div className="space-y-3">
                       <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Sobre a Clínica (Min. 30 caracteres)</label>
                       <textarea 
                        value={clinicDescription}
                        onChange={(e) => setClinicDescription(e.target.value)}
                        rows={6}
                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] outline-none font-medium text-slate-700 leading-relaxed"
                        placeholder="Descreva sua clínica, equipamentos, missão e infraestrutura..."
                       />
                       <span className={`text-[10px] font-bold ${clinicDescription.length >= 30 ? 'text-emerald-500' : 'text-slate-400'}`}>
                         {clinicDescription.length}/30 caracteres mínimos
                       </span>
                    </div>

                    <div className="space-y-4">
                       <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Fotos da Infraestrutura</label>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {clinicPhotos.map((p, i) => (
                          <div key={i} className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 relative group">
                            <img src={p} className="w-full h-full object-cover" alt="Clinica" />
                          </div>
                        ))}
                        <button onClick={addMockPhoto} className="aspect-[4/3] border-3 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-sky-500 hover:text-sky-600 transition-all bg-slate-50">
                          <ImageIcon className="w-10 h-10 mb-2" />
                          <span className="text-[10px] font-bold uppercase">Adicionar Foto</span>
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
