import { useState } from 'react';
import { 
  X, CheckCircle2, Copy, Check, ArrowRight, Wallet, QrCode
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

export default function PaymentModal({ isOpen, onClose, selectedPlan }) {
  const [method, setMethod] = useState('telda'); // telda | fawry | paypal | binance | okx
  const [copiedText, setCopiedText] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [txId, setTxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleSubmitProof = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // إرسال إثبات الدفع للسيرفر أو إشعار الأدمن
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-xl w-full p-5 md:p-6 shadow-2xl relative overflow-hidden">
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* الهيدر */}
            <div className="mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                إتمام الاشتراك
              </span>
              <h2 className="text-xl font-bold text-white mt-2">
                ترقية إلى خطة {selectedPlan?.name || 'Pro'}
              </h2>
              <p className="text-xs text-slate-400">
                المبلغ المطلوب: <span className="text-emerald-400 font-bold text-sm">{selectedPlan?.price || '$29'}</span>
              </p>
            </div>

            {/* 1️⃣ أزرار اختيار المحفظة */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
              {[
                { id: 'telda', label: 'Telda / Cash', icon: '📱' },
                { id: 'fawry', label: 'Fawry', icon: '🟡' },
                { id: 'paypal', label: 'PayPal', icon: '💳' },
                { id: 'binance', label: 'Binance', icon: '🟡' },
                { id: 'okx', label: 'OKX', icon: '⬛' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMethod(item.id)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    method === item.id 
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                      : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* 2️⃣ عرض تفاصيل المحفظة المختارة مع زر النسخ السريع */}
            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 mb-6 text-xs space-y-3">
              {method === 'telda' && (
                <div>
                  <p className="text-slate-400 mb-1">حول لحساب Telda / فودافون كاش:</p>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-white/10 font-mono text-white">
                    <span>{PAYMENT_CONFIG.telda.number}</span>
                    <button onClick={() => handleCopy(PAYMENT_CONFIG.telda.number)} className="text-blue-400 hover:text-blue-300">
                      {copiedText === PAYMENT_CONFIG.telda.number ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">معرف تيلدا: {PAYMENT_CONFIG.telda.handle}</p>
                </div>
              )}

              {method === 'fawry' && (
                <div>
                  <p className="text-slate-400 mb-1">رقم المحفظة لخدمة فوري:</p>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-white/10 font-mono text-white">
                    <span>{PAYMENT_CONFIG.fawry.code}</span>
                    <button onClick={() => handleCopy(PAYMENT_CONFIG.fawry.code)} className="text-blue-400 hover:text-blue-300">
                      {copiedText === PAYMENT_CONFIG.fawry.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {method === 'paypal' && (
                <div>
                  <p className="text-slate-400 mb-1">حساب PayPal المباشر:</p>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-white/10 font-mono text-white mb-2">
                    <span>{PAYMENT_CONFIG.paypal.email}</span>
                    <button onClick={() => handleCopy(PAYMENT_CONFIG.paypal.email)} className="text-blue-400 hover:text-blue-300">
                      {copiedText === PAYMENT_CONFIG.paypal.email ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <a href={PAYMENT_CONFIG.paypal.link} target="_blank" rel="noreferrer" className="text-[11px] text-blue-400 underline block">
                    أو اضغط هنا للفتح المباشر في PayPal
                  </a>
                </div>
              )}

              {method === 'binance' && (
                <div>
                  <p className="text-slate-400 mb-1">Binance Pay ID:</p>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-white/10 font-mono text-white mb-2">
                    <span>{PAYMENT_CONFIG.binance.payId}</span>
                    <button onClick={() => handleCopy(PAYMENT_CONFIG.binance.payId)} className="text-blue-400 hover:text-blue-300">
                      {copiedText === PAYMENT_CONFIG.binance.payId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-slate-400 mb-1">عنوان USDT (TRC20):</p>
                  <p className="text-[10px] font-mono text-slate-300 break-all p-2 bg-slate-900 rounded-lg border border-white/5">
                    {PAYMENT_CONFIG.binance.usdtAddress}
                  </p>
                </div>
              )}

              {method === 'okx' && (
                <div>
                  <p className="text-slate-400 mb-1">OKX UID:</p>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-white/10 font-mono text-white">
                    <span>{PAYMENT_CONFIG.okx.uid}</span>
                    <button onClick={() => handleCopy(PAYMENT_CONFIG.okx.uid)} className="text-blue-400 hover:text-blue-300">
                      {copiedText === PAYMENT_CONFIG.okx.uid ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3️⃣ رفع الإشعار وإرسال الطلب */}
            <form onSubmit={handleSubmitProof} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 mb-1 block">رقم العملية / Transaction ID (اختياري)</label>
                <input 
                  type="text" 
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="مثال: TXN-98213812"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">رفع صورة الإشعار / الوصل *</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setReceipt(e.target.files[0])}
                  required
                  className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-blue-400 hover:file:bg-slate-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'جاري إرسال الإثبات...' : 'تأكيد وإرسال طلب التفعيل'}
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </>
        ) : (
          /* شاشة تأكيد الإرسال بنجاح */
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">تم إرسال طلب التفعيل بنجاح!</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              شكراً لك يا يوسف. جاري مراجعة الإشعار، وسنقوم بتفعيل الخطة فوراً.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-white/10 transition-all mt-4"
            >
              العودة إلى AETHER Studio
            </button>
          </div>
        )}

      </div>
    </div>
  );
}