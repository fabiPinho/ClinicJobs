
import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, Copy, ArrowRight, Loader2, Sparkles, Building2, User, Check } from 'lucide-react';

interface PaymentViewProps {
  userType: 'dentist' | 'clinic';
  onPaymentSuccess: () => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ userType, onPaymentSuccess }) => {
  const [method, setMethod] = useState<'pix' | 'card'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Configurações específicas por tipo de usuário
  const planDetails = {
    dentist: {
      title: 'Plano Profissional Digital',
      price: '50,00',
      period: '3 MESES',
      badge: 'DENTISTA PREMIUM',
      benefits: [
        'Acesso a todas as vagas do país',
        'Portfólio visual ilimitado',
        'IA para otimização de biografia',
        'Destaque nas buscas das clínicas',
        'Chat direto com contratantes'
      ],
      icon: User
    },
    clinic: {
      title: 'Plano Recrutador Elite',
      price: '149,00',
      period: '3 MESES',
      badge: 'CLÍNICA PARCEIRA',
      benefits: [
        'Anúncios de vagas ilimitados',
        'Busca ativa de talentos por especialidade',
        'Visualização de portfólios completos',
        'Galeria de fotos da clínica destacada',
        'Suporte prioritário na seleção'
      ],
      icon: Building2
    }
  }[userType];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 2500);
  };

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-sky-100 border-4 border-white">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Assinatura Ativada!</h2>
        <p className="text-slate-500 font-medium mb-8">Bem-vindo ao nível elite da odontologia.</p>
        <div className="flex items-center gap-2 text-sky-600 font-bold bg-sky-50 px-6 py-3 rounded-2xl border border-sky-100">
          <Loader2 className="w-5 h-5 animate-spin" />
          Redirecionando para seu painel...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest mb-4 border border-sky-200">
          {planDetails.badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Checkout <span className="text-sky-600">ClinicJobs</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Complete sua ativação para começar a transformar sua jornada profissional hoje mesmo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Lado Esquerdo: Opções de Pagamento */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex bg-slate-50/50 border-b border-slate-100">
              <button 
                onClick={() => setMethod('pix')}
                className={`flex-1 py-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${method === 'pix' ? 'text-sky-600 bg-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <QrCode className="w-5 h-5" /> Pix
              </button>
              <button 
                onClick={() => setMethod('card')}
                className={`flex-1 py-6 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${method === 'card' ? 'text-sky-600 bg-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <CreditCard className="w-5 h-5" /> Cartão de Crédito
              </button>
            </div>

            <div className="p-10">
              {method === 'pix' ? (
                <div className="space-y-8 text-center animate-in fade-in duration-300">
                  <div className="relative inline-block group">
                    <div className="absolute -inset-4 bg-sky-100/50 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-slate-200 inline-block mx-auto shadow-sm">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=clinicjobs-payment-sim" 
                        alt="QR Code Pix"
                        className="w-48 h-48 opacity-90"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Escaneie o código acima no app do seu banco. <br/>A confirmação é feita em poucos segundos.
                    </p>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 group">
                      <code className="text-[10px] text-slate-400 font-mono truncate flex-grow text-left">
                        00020126580014BR.GOV.BCB.PIX0136clinicjobs-payment-activation-key-1234
                      </code>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white text-sky-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-sky-600 transition-all shadow-sm">
                        <Copy className="w-4 h-4" /> Copiar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome no Cartão</label>
                    <input type="text" placeholder="JOÃO SILVA" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Número do Cartão</label>
                    <div className="relative">
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Validade</label>
                      <input type="text" placeholder="MM/AA" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-bold text-sm" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 py-4 opacity-40 grayscale hover:grayscale-0 transition-all">
            <img src="https://logodownload.org/wp-content/uploads/2014/07/visa-logo-1.png" className="h-4 object-contain" alt="Visa" />
            <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo.png" className="h-6 object-contain" alt="Mastercard" />
            <img src="https://logodownload.org/wp-content/uploads/2015/03/pix-logo.png" className="h-5 object-contain" alt="Pix" />
          </div>
        </div>

        {/* Lado Direito: Resumo e Benefícios */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <planDetails.icon className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-1">{planDetails.title}</h3>
              <p className="text-slate-400 text-sm font-bold mb-8 uppercase tracking-widest">{planDetails.period}</p>
              
              <div className="space-y-6 mb-10">
                {planDetails.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 animate-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="mt-1 w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0 border border-sky-500/30">
                      <Check className="w-3 h-3 text-sky-400 font-black" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Preço promocional</p>
                    <p className="text-4xl font-black text-white">R$ {planDetails.price}</p>
                  </div>
                  <div className="bg-sky-500 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest animate-pulse">
                    Acesso Imediato
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-sky-600/20 flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> Processando...
                    </>
                  ) : (
                    <>
                      Ativar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Segurança Bancária Certificada</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-sky-50 rounded-[2.5rem] border border-sky-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
               <Sparkles className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-tight mb-1">Satisfação Garantida</p>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">Milhares de conexões já foram realizadas. Junte-se à elite da odontologia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
