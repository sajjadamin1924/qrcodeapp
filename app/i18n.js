import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      selectLanguage: "Select Your Language",
      continue: "Continue",
      generate: "Generate",
      history: "History",
      scanning: "Scanning...",
      noCamera: "No access to camera",
      requestingCamera: "Requesting camera permission...",

      // 🔽 Permission Screen
      permissionsTitle: "App Permissions",
      permissionsSubtitle: "We need a few permissions to make QR Maker work perfectly.",
      grantCamera: "Grant Camera Access",
      cameraGranted: "Camera Granted",
      grantGallery: "Grant Gallery Access",
      galleryGranted: "Gallery Granted",
      grantNotifications: "Grant Notifications",
      notificationsGranted: "Notifications Granted",
      redirectInfo: "You’ll be redirected automatically once all permissions are granted.",
      //drawer 
      drawerHome: "Home",
      drawerGenerate: "Generate",
      drawerScanner: "Scanner",
      drawerHistory: "History",
      drawerSettings: "Settings",
      text: "Text",
      website: "Website",
      wifi: "Wi-Fi",
      event: "Event",
      contact: "Contact",
      business: "Business",
      location: "Location",
      whatsapp: "WhatsApp",
      email: "Email",
      twitter: "Twitter",
      instagram: "Instagram",
      telephone: "Telephone",
      Generate: "Generate",
      History: "History",

    },
  },
  ur: {
    translation: {
      welcome: "خوش آمدید",
      selectLanguage: "اپنی زبان منتخب کریں",
      continue: "جاری رکھیں",
      generate: "بنائیں",
      history: "تاریخ",
      scanning: "اسکین کر رہا ہے...",
      noCamera: "کیمرا تک رسائی نہیں",
      requestingCamera: "کیمرا کی اجازت طلب کی جا رہی ہے...",

      // 🔽 Permission Screen (Urdu)
      permissionsTitle: "ایپ کی اجازتیں",
      permissionsSubtitle: "ہمیں چند اجازتوں کی ضرورت ہے تاکہ QR میکر صحیح طریقے سے کام کرے۔",
      grantCamera: "کیمرا کی اجازت دیں",
      cameraGranted: "کیمرا کی اجازت مل گئی",
      grantGallery: "گیلری کی اجازت دیں",
      galleryGranted: "گیلری کی اجازت مل گئی",
      grantNotifications: "نوٹیفکیشن کی اجازت دیں",
      notificationsGranted: "نوٹیفکیشن کی اجازت مل گئی",
      redirectInfo: "تمام اجازتیں ملنے کے بعد آپ کو خودکار طور پر ری ڈائریکٹ کیا جائے گا۔",
      drawerHome: "ہوم",
      drawerGenerate: "بنائیں",
      drawerScanner: "اسکینر",
      drawerHistory: "تاریخ",
      drawerSettings: "ترتیبات",
      text: "متن",
      website: "ویب سائٹ",
      wifi: "وائی فائی",
      event: "ایونٹ",
      contact: "رابطہ",
      business: "کاروبار",
      location: "مقام",
      whatsapp: "واٹس ایپ",
      email: "ای میل",
      twitter: "ٹوئٹر",
      instagram: "انسٹاگرام",
      telephone: "ٹیلیفون",
      Generate: "بنائیں",
      History: "تاریخ",

    },
  },

  ar: {
    translation: {
      welcome: "مرحباً",
      selectLanguage: "اختر لغتك",
      continue: "استمر",
      generate: "انشئ",
      history: "السجل",
      scanning: "جارٍ المسح...",
      noCamera: "لا يمكن الوصول إلى الكاميرا",
      requestingCamera: "طلب إذن الكاميرا...",

      // 🔽 Permission Screen (Arabic)
      permissionsTitle: "أذونات التطبيق",
      permissionsSubtitle: "نحتاج إلى بعض الأذونات لجعل تطبيق QR Maker يعمل بشكل مثالي.",
      grantCamera: "منح إذن الكاميرا",
      cameraGranted: "تم منح إذن الكاميرا",
      grantGallery: "منح إذن المعرض",
      galleryGranted: "تم منح إذن المعرض",
      grantNotifications: "منح إذن الإشعارات",
      notificationsGranted: "تم منح إذن الإشعارات",
      redirectInfo: "سيتم توجيهك تلقائياً بمجرد منح جميع الأذونات.",
      // Arabic
      drawerHome: "الرئيسية",
      drawerGenerate: "إنشاء",
      drawerScanner: "المسح",
      drawerHistory: "السجل",
      drawerSettings: "الإعدادات",
      text: "نص",
      website: "موقع إلكتروني",
      wifi: "واي فاي",
      event: "حدث",
      contact: "جهة اتصال",
      business: "عمل",
      location: "موقع",
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      twitter: "تويتر",
      instagram: "إنستغرام",
      telephone: "هاتف",
      Generate: "إنشاء",
      History: "السجل",
     

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
