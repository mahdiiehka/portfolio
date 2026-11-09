import { profile, type Lang } from "@/data/profile";

type Intent = {
  id: string;
  fa: string[];
  en: string[];
  answer: (lang: Lang) => string;
};

const list = (items: string[]) => items.map((item) => `• ${item}`).join("\n");

const intents: Intent[] = [
  {
    id: "greeting",
    fa: ["سلام", "درود", "وقت بخیر", "هی", "سلام علیکم"],
    en: ["hi", "hello", "hey", "hey there", "good morning", "good evening"],
    answer: (lang) =>
      lang === "fa"
        ? `سلام! من دستیار ${profile.name.fa} هستم. می‌تونم دربارهٔ مهارت‌ها، نمونه‌کارها، سابقه یا راه تماس توضیح بدم. چی می‌خوای بدونی؟`
        : `Hi! I'm ${profile.name.en}'s assistant. I can tell you about skills, projects, experience or how to get in touch. What would you like to know?`,
  },
  {
    id: "about",
    fa: ["درباره", "کی هستی", "کی هست", "خودت", "معرفی", "بیوگرافی", "شما کی"],
    en: ["about", "who are you", "who is", "yourself", "introduce", "bio", "background"],
    answer: (lang) =>
      lang === "fa"
        ? `${profile.name.fa} یک ${profile.role.fa} است.\n\n${profile.about.paragraphs.fa[0]}`
        : `${profile.name.en} is a ${profile.role.en}.\n\n${profile.about.paragraphs.en[0]}`,
  },
  {
    id: "skills",
    fa: ["مهارت", "توانایی", "بلدی", "تخصص", "تکنولوژی", "تکنولوژی‌ها", "فریم‌ورک", "زبان برنامه"],
    en: ["skill", "skills", "tech", "stack", "technology", "frameworks", "know", "expertise"],
    answer: (lang) =>
      lang === "fa"
        ? `مهم‌ترین مهارت‌ها و ابزارهای من:\n${list(profile.skills.stack)}\n\nمهارت‌های نرم: ${profile.skills.soft.fa.join("، ")}`
        : `My main skills and tools:\n${list(profile.skills.stack)}\n\nSoft skills: ${profile.skills.soft.en.join(", ")}`,
  },
  {
    id: "projects",
    fa: ["پروژه", "نمونه کار", "نمونه‌کار", "کارها", "پورتفولیو", "سابقه کاری", "دمو"],
    en: ["project", "projects", "work", "portfolio", "case study", "demo", "built"],
    answer: (lang) => {
      const items = profile.projects.items[lang];
      const lines = items.map((p) => `${p.title} (${p.year}) — ${p.desc}`);
      return lang === "fa"
        ? `چند نمونه از کارهای من:\n${list(lines)}\n\nجزئیات بیشتر در بخش «نمونه‌کارها» است.`
        : `A few selected projects:\n${list(lines)}\n\nMore detail lives in the Work section.`;
    },
  },
  {
    id: "contact",
    fa: ["تماس", "ایمیل", "شماره", "ارتباط", "پیام", "ایمیلت", "چطور باهات"],
    en: ["contact", "email", "reach", "hire", "message", "talk", "get in touch", "phone"],
    answer: (lang) =>
      lang === "fa"
        ? `بهترین راه، ایمیل است: ${profile.contact.email}\n\nشبکه‌های اجتماعی: ${profile.contact.socials
            .map((s) => s.label)
            .join("، ")}\nیا از فرم انتهای همین صفحه پیام بفرست.`
        : `The best way is email: ${profile.contact.email}\n\nSocials: ${profile.contact.socials
            .map((s) => s.label)
            .join(", ")}\nOr use the form at the bottom of this page.`,
  },
  {
    id: "availability",
    fa: ["در دسترس", "پروژه جدید", "استخدام", "فریلنس", "وقت داری", "ظرفیت"],
    en: ["available", "availability", "hire", "freelance", "capacity", "open for"],
    answer: (lang) =>
      lang === "fa"
        ? `${profile.availability.label.fa}. ${profile.availability.note.fa} و ${profile.availability.response.fa}.`
        : `${profile.availability.label.en}. ${profile.availability.note.en}, with ${profile.availability.response.en.toLowerCase()}.`,
  },
  {
    id: "experience",
    fa: ["سابقه", "تجربه", "مسیر", "رزومه", "کار کردی", "شرکت"],
    en: ["experience", "journey", "resume", "cv", "career", "worked", "company"],
    answer: (lang) => {
      const items = profile.journey.items[lang];
      const lines = items.map((i) => `${i.year} — ${i.title}: ${i.text}`);
      return lang === "fa"
        ? `مسیر حرفه‌ای من:\n${list(lines)}`
        : `My path so far:\n${list(lines)}`;
    },
  },
  {
    id: "theme",
    fa: ["تم", "دارک", "روشن", "تاریک", "رنگ سایت"],
    en: ["theme", "dark", "light", "color mode"],
    answer: (lang) =>
      lang === "fa"
        ? "با دکمهٔ خورشید/ماه در هدر می‌تونی بین تم روشن و تیره جابه‌جا بشی؛ انتخابت ذخیره می‌شه."
        : "Use the sun/moon button in the header to switch between light and dark. Your choice is remembered.",
  },
  {
    id: "thanks",
    fa: ["ممنون", "مرسی", "سپاس", "دمت گرم"],
    en: ["thanks", "thank you", "cheers", "appreciate"],
    answer: (lang) =>
      lang === "fa"
        ? "خواهش می‌کنم! اگر سؤال دیگری داری، همین‌جا بپرس. 🙂"
        : "You're welcome! Ask me anything else. 🙂",
  },
];

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "what", "which", "do", "does", "you", "your",
  "me", "my", "i", "of", "and", "to", "in", "on", "for", "with", "about",
  "از", "به", "در", "که", "چه", "چی", "را", "و", "من", "تو", "شما", "است",
  "هست", "کن", "می", "های", "ها", "درباره",
]);

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/[؟?!.,،؛:;"'«»()\-_/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReply(message: string, lang: Lang): string {
  const text = normalize(message);
  if (!text) return fallback(lang);

  const tokens = text.split(" ").filter((t) => t.length > 1 && !STOPWORDS.has(t));

  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    const keywords = lang === "fa" ? intent.fa : intent.en;
    const other = lang === "fa" ? intent.en : intent.fa;
    let score = 0;

    for (const raw of [...keywords, ...other]) {
      const kw = normalize(raw);
      if (!kw) continue;
      if (kw.includes(" ")) {
        if (text.includes(kw)) score += 3;
      } else {
        if (tokens.includes(kw)) score += 2;
        else if (text.includes(kw)) score += 1;
      }
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best ? best.intent.answer(lang) : fallback(lang);
}

function fallback(lang: Lang) {
  return lang === "fa"
    ? "متوجه نشدم 🤔 می‌تونی دربارهٔ «مهارت‌ها»، «نمونه‌کارها»، «سابقه» یا «راه تماس» بپرسی. یا مستقیم به بخش تماس برو."
    : "I didn't quite catch that 🤔 Try asking about “skills”, “projects”, “experience” or “contact”. Or head to the contact section.";
}

export const quickPrompts: { label: { fa: string; en: string }; message: { fa: string; en: string } }[] = [
  { label: { fa: "مهارت‌هات چیه؟", en: "What are your skills?" }, message: { fa: "مهارت‌هات چیه؟", en: "What are your skills?" } },
  { label: { fa: "نمونه‌کارها", en: "Show projects" }, message: { fa: "نمونه‌کارهات رو نشون بده", en: "Show me your projects" } },
  { label: { fa: "چطور تماس بگیرم؟", en: "How to contact?" }, message: { fa: "چطور می‌تونم تماس بگیرم؟", en: "How can I reach you?" } },
  { label: { fa: "در دسترس هستی؟", en: "Are you available?" }, message: { fa: "برای پروژهٔ جدید در دسترس هستی؟", en: "Are you available for new projects?" } },
];
