import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Wallet, CreditCard, ArrowRight, Copy, Check } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, selectedPlan }) {
  const [method, setMethod] = useState('telda');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const planName = selectedPlan?.name || 'Pro Developer OS';
  const planPrice = selectedPlan?.price || '$19';

  const paymentDetails = {
    telda: { name: 'Telda / Vodafone Cash', account: '01281256422', note: 'حول المبلغ المباشر وأرسل الإشعار' },
    fawry: { name: 'فوري (Fawry)', account: 'Code: 01281256422', note: 'ادفع عبر أي منفذ فوري برقم الكود' },
    binance: { name: 'Binance Pay / USDT (TRC20)', account: 'جاري اضافه الميزه', note: 'USDT TRC20 Address' },
    paypal: { name: 'PayPal', account: 'smarttraderx61@gmail.com', note: 'Send as Friends & Family or Goods' },
    okx: { name: 'OKX Pay', account: 'OKX-UID: *****', note: 'Direct OKX Transfer' }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-white">تم استلام طلب الترقية بنجاح!</h3>
            <p className="text-xs text-slate-400">جاري تفعيل خطة <span className="text-emerald-400 font-bold">{planName}</span> لحسابك...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                تأكيد الدفع والترقية
              </span>
              <h2 className="text-xl font-bold text-white mt-2">اختر طريقة الدفع المناسبة</h2>
              <p className="text-xs text-slate-400 mt-1">
                الخطة المختارة: <span className="text-white font-semibold">{planName}</span> ({planPrice})
              </p>
            </div>

            {/* طرق الدفع */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'telda', label: 'تيلدا / كاش' },
                { id: 'fawry', label: 'فوري' },
                { id: 'binance', label: 'Binance USDT' },
                { id: 'paypal', label: 'PayPal' },
                { id: 'okx', label: 'OKX Pay' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    method === m.id 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-slate-800/60 border-white/5 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* تفاصيل الحساب للدفع */}
            <div className="bg-slate-950/60 border border-white/10 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{paymentDetails[method].name}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">آمن ومباشر</span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-white/5">
                <span className="text-xs font-mono text-white tracking-wider">{paymentDetails[method].account}</span>
                <button 
                  onClick={() => handleCopy(paymentDetails[method].account)}
                  className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                  title="نسخ"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-slate-500">{paymentDetails[method].note}</p>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <span>تأكيد التحويل والترقية</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

      </div>
    </div>
  );
}