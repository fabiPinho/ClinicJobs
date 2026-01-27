
import React, { useState, useMemo, useRef } from 'react';
import { Users, FileText, Camera, Plus, Star, Search, MapPin, Sparkles, ChevronRight, Image as ImageIcon, Trash2, Heart, Filter, X, ArrowLeft, ExternalLink } from 'lucide-react';
import { suggestJobDescription } from '../services/geminiService';
import { Region, PortfolioItem } from '../types';

interface Candidate {
  id: string;
  name: string;
  specialty: string;
  exp: string;
  rating: number;
  avatar: string;
  bio: string;
  portfolio: PortfolioItem[];
}

const MOCK_CANDIDATES: Candidate[] = [
  { 
    id: '1', 
    name: 'Dra. Ana Costa', 
    specialty: 'Odontopediatria', 
    exp: '8 anos', 
    rating: 4.9, 
    avatar: 'https://i.pravatar.cc/150?u=ana',
    bio: 'Especialista em atendimento humanizado para crianças e adolescentes. Foco em prevenção e ortodontia preventiva.',
    portfolio: [
      { id: 'p1', title: 'Atendimento Lúdico', description: 'Técnicas de manejo comportamental em primeira consulta.', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400' },
      { id: 'p2', title: 'Reabilitação em Decíduos', description: 'Restaurações estéticas em dentes de leite.', imageUrl: 'https://images.unsplash.com/photo-1593054363531-ec3f8e6c78a0?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  { 
    id: '2', 
    name: 'Dr. Lucas Mendes', 
    specialty: 'Endodontia', 
    exp: '3 anos', 
    rating: 4.7, 
    avatar: 'https://i.pravatar.cc/150?u=lucas',
    bio: 'Expert em endodontia mecanizada e sistemas rotatórios de última geração.',
    portfolio: [
      { id: 'p3', title: 'Canal em Molar', description: 'Tratamento endodôntico complexo com microscopia.', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffce47267a5?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  { 
    id: '3', 
    name: 'Dra. Beatriz Silva', 
    specialty: 'Ortodontia', 
    exp: '12 anos', 
    rating: 5.0, 
    avatar: 'https://i.pravatar.cc/150?u=beatriz',
    bio: 'Referência em Invisalign e tratamentos ortodônticos estéticos para adultos.',
    portfolio: []
  },
  { 
    id: '4', 
    name: 'Dr. Felipe Rocha', 
    specialty: 'Implantodontia', 
    exp: '5 anos', 
    rating: 4.8, 
    avatar: 'https://i.pravatar.cc/150?u=felipe',
    bio: 'Especialista em implantes imediatos e carga imediata. Foco em reabilitação oral funcional.',
    portfolio: []
  },
];

const SPECIALTIES = [
  "Todas",
  "Ortodontia",
  "Endodontia",
  "Odontopediatria",
  "Implantodontia",
  "Estética",
  "Periodontia",
  "Cirurgia BMF"
];

const REGIONS: Region[] = ['Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'];

const ClinicDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs' | 'gallery'>('talent');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobRegion, setJobRegion] = useState<Region>('Centro');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Todas']);
  const [clinicPhotos, setClinicPhotos] = useState([
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSpecialty = (spec: string) => {
    if (spec === 'Todas') {
      setSelectedSpecialties(['Todas']);
      return;
    }

    setSelectedSpecialties(prev => {
      const withoutTodas = prev.filter(s => s !== 'Todas');
      if (withoutTodas.includes(spec)) {
        const next = withoutTodas.filter(r => r !== spec);
        return next.length === 0 ? ['Todas'] : next;
      } else {
        return [...withoutTodas, spec];
      }
    });
  };

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           candidate.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isAllSelected = selectedSpecialties.includes('Todas');
      const matchesSpecialty = isAllSelected || selectedSpecialties.includes(candidate.specialty);
      
      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, selectedSpecialties]);

  const handleGenerateDesc = async () => {
    if (!jobTitle) return;
    setIsGenerating(true);
    try {
      const desc = await suggestJobDescription(jobTitle, `Clínica moderna focada em bem-estar, localizada na ${jobRegion}. Possuímos infraestrutura de ponta.`);
      if (desc) setJobDesc(desc);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerPhotoUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-2 duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => console.log('File selected:', e.target.files?.[0])}
      />
      
      {/* Portfolio Detailed Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Voltar
              </button>
              <div className="flex gap-2">
                <button className="px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 flex items-center gap-2">
                  Contratar <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              <div className="flex flex-col md:flex-row gap-10 mb-12">
                <img 
                  src={selectedCandidate.avatar} 
                  className="w-40 h-40 rounded-[2rem] object-cover ring-8 ring-slate-50 shadow-lg shrink-0 mx-auto md:mx-0" 
                  alt={selectedCandidate.name} 
                />
                <div className="text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h2 className="text-4xl font-extrabold text-slate-900">{selectedCandidate.name}</h2>
                    <div className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold self-center">
                      <Star className="w-4 h-4 fill-current" /> {selectedCandidate.rating}
                    </div>
                  </div>
                  <p className="text-xl text-sky-600 font-bold mb-4">{selectedCandidate.specialty}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider">Experiência: {selectedCandidate.exp}</span>
                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider">CRO 123.456-SP</span>
                  </div>
                  <p className="text-slate-500 text-lg leading-relaxed max-w-2xl font-medium">
                    {selectedCandidate.bio}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Portfólio de Casos</h3>
                </div>
                
                {selectedCandidate.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedCandidate.portfolio.map(item => (
                      <div key={item.id} className="group bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden hover:border-sky-200 transition-all">
                        <div className="aspect-video relative overflow-hidden">
                          <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">Nenhum caso clínico cadastrado ainda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel da <span className="text-sky-600">Sua Clínica</span></h1>
          <p className="text-slate-500 font-medium">Gerencie suas vagas e descubra novos talentos.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-5 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
              {filteredCandidates.length}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Resultados</p>
              <p className="text-sm font-bold text-slate-900">Candidatos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-72 space-y-3">
          <nav className="p-2 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('talent')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'talent' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${activeTab === 'talent' ? 'text-white' : 'text-sky-600'}`}>
                   <Users className="w-5 h-5" />
                </div>
                <span>Buscar Talentos</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'talent' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'jobs' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${activeTab === 'jobs' ? 'text-white' : 'text-sky-600'}`}>
                  <Plus className="w-5 h-5" />
                </div>
                <span>Anunciar Vaga</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'jobs' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${activeTab === 'gallery' ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${activeTab === 'gallery' ? 'text-white' : 'text-sky-600'}`}>
                  <Camera className="w-5 h-5" />
                </div>
                <span>Fotos da Clínica</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'gallery' ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {activeTab === 'talent' && (
            <div className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Busca por nome ou especialidade do dentista..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all shadow-sm font-medium"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-widest">
                      <Filter className="w-4 h-4 text-sky-600" />
                      <span>Especialidades {selectedSpecialties.length > 0 && !selectedSpecialties.includes('Todas') && `(${selectedSpecialties.length})`}</span>
                    </div>
                    {!selectedSpecialties.includes('Todas') && (
                      <button 
                        onClick={() => setSelectedSpecialties(['Todas'])}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Limpar Filtros
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTIES.map(spec => {
                      const isSelected = selectedSpecialties.includes(spec);
                      return (
                        <button
                          key={spec}
                          onClick={() => toggleSpecialty(spec)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2 flex items-center gap-2 ${
                            isSelected 
                              ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-100' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-sky-200 hover:text-sky-600'
                          }`}
                        >
                          {spec}
                          {isSelected && spec !== 'Todas' && <X className="w-3.5 h-3.5 opacity-60" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {filteredCandidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCandidates.map(candidate => (
                    <div key={candidate.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-xl hover:shadow-sky-100 transition-all group">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative group/avatar">
                          <div className="absolute inset-0 bg-sky-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <img src={candidate.avatar} className="relative w-28 h-28 rounded-2xl object-cover shadow-md ring-4 ring-slate-50 group-hover:ring-sky-50 transition-all" alt={candidate.name} />
                          
                          <button 
                            onClick={triggerPhotoUpload}
                            className="absolute -bottom-2 -right-2 p-2 bg-sky-600 text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform z-10 opacity-0 group-hover/avatar:opacity-100"
                            title="Alterar Foto de Perfil"
                          >
                            <Camera className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={triggerPhotoUpload}
                          className="text-[10px] font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest flex items-center gap-1 transition-colors"
                        >
                          <ImageIcon className="w-3 h-3" /> Alterar Foto
                        </button>
                      </div>

                      <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-1 gap-2">
                          <h4 className="text-xl font-bold text-slate-900 leading-tight">{candidate.name}</h4>
                          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-bold">{candidate.rating}</span>
                          </div>
                        </div>
                        <p className="text-sky-600 text-sm font-bold">{candidate.specialty}</p>
                        <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest mt-1">Experiência: {candidate.exp}</p>
                        
                        <div className="flex justify-center sm:justify-start gap-3 mt-6">
                          <button 
                            onClick={() => setSelectedCandidate(candidate)}
                            className="text-xs font-bold px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-slate-100 group-hover:shadow-sky-100"
                          >
                            Ver Portfólio
                          </button>
                          <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum talento encontrado</h3>
                  <p className="text-slate-500 font-medium">Tente ajustar seus filtros de busca para encontrar outros profissionais.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedSpecialties(['Todas']); }}
                    className="mt-6 text-sky-600 font-bold hover:underline"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Anunciar Nova Oportunidade</h3>
                    <p className="text-slate-400 font-medium">Use nossa IA para criar uma descrição atraente.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest">Cargo Desejado</label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Ex: Endodontista"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest">Região / Zona</label>
                      <select 
                        value={jobRegion}
                        onChange={(e) => setJobRegion(e.target.value as Region)}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium appearance-none"
                      >
                        {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={handleGenerateDesc}
                      disabled={isGenerating || !jobTitle}
                      className="px-8 py-4 bg-sky-50 text-sky-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-sky-100 disabled:opacity-50 transition-all shadow-sm"
                    >
                      <Sparkles className="w-4 h-4" /> {isGenerating ? 'Criando...' : 'Gerar com IA'}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-widest">Descrição da Vaga</label>
                    <textarea 
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      rows={8}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all resize-none text-slate-700 font-medium leading-relaxed"
                      placeholder="Descreva as responsabilidades..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="w-full py-5 bg-sky-600 text-white font-bold rounded-[1.5rem] shadow-xl shadow-sky-200 hover:bg-sky-700 transition-all hover:-translate-y-1">
                      Publicar Anúncio
                    </button>
                    <button className="w-full py-5 bg-slate-100 text-slate-700 font-bold rounded-[1.5rem] hover:bg-slate-200 transition-all">
                      Salvar Rascunho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Galeria da Clínica</h2>
                    <p className="text-slate-500 font-medium">Fotos do ambiente, recepção e consultórios.</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-2xl hover:bg-sky-700 transition-all font-bold shadow-lg shadow-sky-200">
                    <Plus className="w-5 h-5" /> Adicionar Fotos
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clinicPhotos.map((photo, index) => (
                    <div key={index} className="group relative aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm">
                      <img src={photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Clínica ${index}`} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-3 bg-white text-red-500 rounded-xl hover:bg-red-50 transition-colors shadow-xl">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="aspect-[4/3] border-3 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-600 transition-all bg-slate-50 hover:bg-sky-50/30 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Upload Foto</span>
                  </button>
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