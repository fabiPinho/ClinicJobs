
import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, Copy, ArrowRight, Loader2 } from 'lucide-react';

interface PaymentViewProps {
  userType: 'dentist' | 'clinic';
  onPaymentSuccess: () => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ userType, onPaymentSuccess }) => {
  const [method, setMethod] = useState<'pix' | 'card'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

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
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-sky-100">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Pagamento Confirmado!</h2>
        <p className="text-slate-500 font-medium mb-8">Seu perfil foi ativado com sucesso.</p>
        <div className="flex items-center gap-2 text-sky-600 font-bold">
          <Loader2 className="w-5 h-5 animate-spin" />
          Redirecionando para seu painel...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest mb-4">Ativação de Perfil</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Finalize sua <span className="text-sky-600">inscrição</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Para liberar seu acesso vitalício à plataforma e ser visto por {userType === 'dentist' ? 'centenas de clínicas' : 'milhares de talentos'}, realize o pagamento único da taxa de ativação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setMethod('pix')}
                className={`flex-1 py-5 font-bold flex items-center justify-center gap-2 transition-all ${method === 'pix' ? 'text-sky-600 bg-sky-50/50' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <QrCode className="w-5 h-5" /> Pix
              </button>
              <button 
                onClick={() => setMethod('card')}
                className={`flex-1 py-5 font-bold flex items-center justify-center gap-2 transition-all ${method === 'card' ? 'text-sky-600 bg-sky-50/50' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <CreditCard className="w-5 h-5" /> Cartão de Crédito
              </button>
            </div>

            <div className="p-8">
              {method === 'pix' ? (
                <div className="space-y-6 text-center">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-dashed border-slate-200 inline-block mx-auto">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=clinicjobs-payment-sim" 
                      alt="QR Code Pix"
                      className="w-48 h-48 opacity-80"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      Escaneie o código acima ou copie o código Pix abaixo para pagar. <br/> A ativação é instantânea após o pagamento.
                    </p>
                    <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <code className="text-xs text-slate-400 font-mono truncate flex-grow text-left">
                        00020126580014BR.GOV.BCB.PIX0136clinicjobs-3849-4829-9283-9283829283
                      </code>
                      <button className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nome no Cartão</label>
                    <input type="text" placeholder="JOÃO SILVA" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Número do Cartão</label>
                    <div className="relative">
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Validade</label>
                      <input type="text" placeholder="MM/AA" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6">Resumo da Ativação</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
                <span>Taxa Única de Acesso</span>
                <span className="text-white">R$ 150,00</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
                <span>Manutenção de Perfil</span>
                <span className="text-sky-400 font-bold uppercase text-[10px]">Grátis</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-bold">Total a pagar</span>
                <span className="text-2xl font-extrabold">R$ 150,00</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  Confirmar Pagamento <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3 text-sky-400">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">Pagamento 100% Seguro com Certificação SSL</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-4">O que você libera:</h4>
            <ul className="space-y-3">
              {[
                'Acesso a todas as vagas do país',
                'IA para otimização de perfil',
                'Exibição de portfólio visual',
                'Chat direto com contratantes',
                'Suporte prioritário 24/7'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;