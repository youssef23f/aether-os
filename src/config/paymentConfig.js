// 💳 بيانات وسائل الدفع الخاصة بـ Youssef / AETHER
export const PAYMENT_CONFIG = {
  // 📱 مصر (Telda / Vodafone Cash)
  telda: {
    name: "Telda / Vodafone Cash",
    number: "010XXXXXXXX", // 👈 حط رقم فودافون كاش أو تيلدا هنا
    handle: "@youssef_aether", // 👈 المعرف الخاص بيك على تيلدا
    note: "يرجى تحويل المبلغ ثم إرفاق صورة الإشعار"
  },

  // 🟡 فوري (Fawry Pay)
  fawry: {
    name: "Fawry Pay",
    code: "01281256422", // 👈 أو رقم المحفظة المربوطة بفوري
    note: "تحويل مباشر للمحفظة عبر فوري"
  },

  // 💳 PayPal (دولي)
  paypal: {
    name: "PayPal",
    email: "smarttraderx61@gmail.com", // 👈 إيميل البايبال بتاعك
    link: "https://paypal.me/@YoussefEldeep343", // 👈 رابط paypal.me المباشر
    note: "يرجى اختيار Send to friends and family إن أمكن"
  },

  // 🟡 Binance Pay & USDT (TRC20)
  binance: {
    name: "Binance",
    payId: "*******", // 👈 Binance Pay ID بتاعك
    usdtAddress: "جاري اضافه العنوان", // 👈 عنوان USDT (شبكة TRC20)
    note: "تأكد من اختيار شبكة TRC20 عند التحويل"
  },

  // ⬛ OKX
  okx: {
    name: "OKX",
    uid: "********", // 👈 OKX UID بتاعك
    usdtAddress: "جاري اضافه العنوان", // 👈 عنوان USDT
    note: "تحويل داخلي عبر UID أو TRC20"
  }
};