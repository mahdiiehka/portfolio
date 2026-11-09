/**
 * ─────────────────────────────────────────────────────────────
 *  همهٔ محتوای سایت اینجاست. برای شخصی‌سازی فقط همین فایل را
 *  ویرایش کن؛ لازم نیست به کامپوننت‌ها دست بزنی.
 * ─────────────────────────────────────────────────────────────
 */

export type Lang = "fa" | "en";

export type L = { fa: string; en: string };

export type Segment = { t: string; em?: boolean };

export type ProjectItem = {
  title: string;
  desc: string;
  tags: string[];
  year: string;
  demo: string;
  repo: string;
  /** مسیر عکس داخل پوشهٔ public */
  image?: string;
  /** کارت «به‌زودی» با پوشش و نشان */
  comingSoon?: boolean;
};

export type SocialKey = "github" | "linkedin" | "twitter" | "instagram" | "dribbble" | "telegram" | "mail";

export const profile = {
  /** لوگوی بالای سایت و فوتر */
  brand: "M.",
  /** اسم ثابت انگلیسی برای هدر */
  fullName: "Mahdieh Kargar",
  name: { fa: "مهدیه", en: "Mahdieh" } as L,
  role: { fa: "توسعه‌دهنده فرانت‌اند", en: "Frontend Developer" } as L,
  location: { fa: "ایران", en: "Iran" } as L,

  availability: {
    open: true,
    label: {
      fa: "آمادهٔ همکاری و پروژه‌های جدید",
      en: "Open to new projects",
    } as L,
    note: {
      fa: "در حال پذیرش پروژه و فرصت همکاری",
      en: "Taking on projects and collaborations",
    } as L,
    response: {
      fa: "پاسخ‌گویی حداکثر ۲۴ ساعت",
      en: "Response within 24 hours",
    } as L,
  },

  hero: {
    eyebrow: { fa: "آماده همکاری", en: "Open to collaboration" } as L,
    headingPrefix: { fa: "سلام، من ", en: "Hi, I'm " } as L,
    headingName: { fa: "مهدیه کارگر", en: "Mahdieh Kargar" } as L,
    /** هر آرایه یک خط است؛ em = تاکید رنگی */
    headline: {
      fa: [[{ t: "سلام، من " }, { t: "مهدیه", em: true }, { t: " هستم." }]] as Segment[][],
      en: [[{ t: "Hi, I'm " }, { t: "Mahdieh", em: true }, { t: "." }]] as Segment[][],
    },
    nameLines: {
      fa: ["مهدیه", "کارگر"],
      en: ["Mahdieh", "Kargar"],
    } as Record<Lang, string[]>,
    tagline: {
      fa: "Front-End Developer | Building Modern Digital Experiences",
      en: "Front-End Developer | Building Modern Digital Experiences",
    } as L,
    intro: {
      fa: "توسعه‌دهنده فرانت‌اند با تمرکز بر طراحی مدرن و استانداردهای روز وب.\nخلق وب‌سایت‌های زیبا، سریع و کاربرمحور.",
      en: "Frontend developer focused on modern design and current web standards.\nBuilding beautiful, fast and user-centred websites.",
    } as L,
    rolesLine: "Frontend Developer | React | Next.js | TypeScript",
    ctaPrimary: { fa: "دیدن نمونه‌کارها", en: "View my work" } as L,
    ctaSecondary: { fa: "درباره من", en: "About me" } as L,
    cardCaption: { fa: "پورتفولیو ۲۰۲۶", en: "Portfolio 2026" } as L,
    cardNote: {
      fa: "در حال ساخت یک محصول واقعی",
      en: "Currently building a real product",
    } as L,
    stackLabel: { fa: "ابزارهای روزمرهٔ من", en: "My everyday stack" } as L,
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Git"],
  },

  about: {
    kicker: { fa: "درباره من", en: "About me" } as L,
    title: {
      fa: "فرانت‌اند برای من فقط نوشتن کد نیست؛ ترکیب خلاقیت و تکنولوژی است.",
      en: "Frontend isn’t just writing code for me — it’s where creativity meets technology.",
    } as L,
    paragraphs: {
      fa: [
        "من مهدیه هستم؛ توسعه‌دهنده فرانت‌اند و دانشجوی سال آخر مهندسی کامپیوتر.",
        "علاقه‌ام به توسعه وب با تجربه همکاری در یک شرکت آغاز شد و از آن زمان با یادگیری مستمر و انجام پروژه‌های مختلف، مسیر حرفه‌ای خودم را در این حوزه دنبال کرده‌ام.",
        "با تکنولوژی‌هایی مانند React، Next.js، JavaScript و TypeScript کار می‌کنم و به ساخت رابط‌های کاربری مدرن، واکنش‌گرا و کاربرپسند علاقه‌مندم. در کنار پروژه‌های شخصی، روی توسعه یک محصول واقعی نیز فعالیت دارم.",
        "همیشه به دنبال یادگیری، تجربه چالش‌های جدید و تبدیل ایده‌ها به محصولات کاربردی و باکیفیت هستم.",
      ],
      en: [
        "I'm Mahdieh — a front-end developer and a final-year computer engineering student.",
        "My interest in web development began with a collaboration at a company, and since then I've followed my professional path through continuous learning and different projects.",
        "I work with technologies like React, Next.js, JavaScript and TypeScript, and I enjoy building modern, responsive and user-friendly interfaces. Alongside personal projects, I'm also working on a real product.",
        "I'm always looking to learn, take on new challenges and turn ideas into useful, high-quality products.",
      ],
    } as Record<Lang, string[]>,
    stats: {
      fa: [
        { value: "۲+", label: "سال تجربه" },
        { value: "۳+", label: "تکنولوژی" },
        { value: "∞", label: "یادگیری مداوم" },
      ],
      en: [
        { value: "2+", label: "Years of experience" },
        { value: "3+", label: "Technologies" },
        { value: "∞", label: "Always learning" },
      ],
    } as Record<Lang, { value: string; label: string }[]>,
    portraitNote: { fa: "عکس خودت را اینجا بگذار", en: "Drop your photo here" } as L,
    portraitHint: {
      fa: "فایل را در public/profile.jpg بگذار و مسیرش را در components/hero.tsx عوض کن.",
      en: "Put a file at public/profile.jpg and update the path in components/hero.tsx.",
    } as L,
    quote: {
      fa: "جایی که خلاقیت به کد تبدیل می‌شود",
      en: "Where creativity turns into code.",
    } as L,
  },

  journey: {
    kicker: { fa: "مسیر من", en: "My journey" } as L,
    title: { fa: "چطور به اینجا رسیدم", en: "How I got here" } as L,
    items: {
      fa: [
        {
          year: "شروع",
          title: "اولین همکاری",
          text: "پیش از ورود به دانشگاه، روی وب‌سایت یک شرکت کار کردم؛ همان‌جا بود که دنیای وب مرا گرفت.",
        },
        {
          year: "دانشگاه",
          title: "مهندسی کامپیوتر",
          text: "هم‌زمان با تحصیل، React و اکوسیستم فرانت‌اند را یاد گرفتم و روی پروژه‌های مختلف کار کردم.",
        },
        {
          year: "اکنون",
          title: "ساختن و یاد گرفتن",
          text: "روی یک محصول واقعی کار می‌کنم و هر روز چیز تازه‌ای یاد می‌گیرم؛ از طراحی رابط تا جزئیات پیاده‌سازی.",
        },
        {
          year: "بعدی",
          title: "رشد بیشتر",
          text: "هدفم ساختن تجربه‌های سریع، در دسترس و لذت‌بخش در کنار تیم‌های محصول است.",
        },
      ],
      en: [
        {
          year: "Start",
          title: "First collaboration",
          text: "Before university I worked on a company's website — that's where the web got me.",
        },
        {
          year: "University",
          title: "Computer Engineering",
          text: "Alongside my studies I learned React and the frontend ecosystem, working on different projects.",
        },
        {
          year: "Now",
          title: "Building and learning",
          text: "I'm working on a real product and learning something new every day — from interface design to implementation details.",
        },
        {
          year: "Next",
          title: "Growing further",
          text: "My goal is building fast, accessible and enjoyable experiences with product teams.",
        },
      ],
    } as Record<Lang, { year: string; title: string; text: string }[]>,
  },

  skills: {
    kicker: { fa: "مهارت‌ها", en: "Skills" } as L,
    title: { fa: "چیزهایی که با آن‌ها کار می‌کنم", en: "Things I work with" } as L,
    intro: {
      fa: "مجموعه‌ای از تکنولوژی‌ها و ابزارهایی که هر روز با آن‌ها کار می‌کنم و در حال عمیق‌تر کردنشان هستم.",
      en: "The technologies and tools I work with every day — and keep getting better at.",
    } as L,
    stackLabel: { fa: "تکنولوژی‌ها و ابزارها", en: "Technologies & tools" } as L,
    softLabel: { fa: "مهارت‌های نرم", en: "Soft skills" } as L,
    stack: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "GitHub",
      "VS Code",
      "Vercel",
    ],
    soft: {
      fa: ["کار تیمی", "حل مسئله", "دقت به جزئیات", "یادگیری سریع", "ارتباط شفاف", "مدیریت زمان"],
      en: ["Teamwork", "Problem solving", "Attention to detail", "Fast learning", "Clear communication", "Time management"],
    } as Record<Lang, string[]>,
  },

  projects: {
    kicker: { fa: "نمونه‌کارها", en: "Selected work" } as L,
    title: { fa: "نمونه کارها", en: "Selected Work" } as L,
    intro: {
      fa: "چند نمونهٔ منتخب از پروژه‌های شخصی و دانشگاهی. برای دیدن بقیه، گیت‌هاب را ببین.",
      en: "A few selected personal and university projects. For more, check GitHub.",
    } as L,
    viewAll: { fa: "دیدن همهٔ پروژه‌ها", en: "See all projects" } as L,
    viewAllHref: "https://github.com/mahdiiehka",
    items: {
      fa: [
        {
          title: "آذرتک",
          desc: "",
          tags: [],
          year: "",
          demo: "",
          repo: "",
          image: "/projects/coming-soon.png",
          comingSoon: true,
        },
        {
          title: "فروشگاه آنلاین",
          desc: "پیاده‌سازی فروشگاه اینترنتی با استفاده از API عمومی برای دریافت و نمایش محصولات، همراه با قابلیت فیلتر، مشاهده جزئیات کالاها و مدیریت سبد خرید شامل افزودن، حذف و تغییر تعداد محصولات.",
          tags: ["Next.js", "TypeScript", "API"],
          year: "۱۴۰۵",
          demo: "",
          repo: "https://github.com/mahdiiehka/shop--app/tree/main/app",
          image: "/projects/shop.svg",
        },
        {
          title: "ورود و ثبت‌نام",
          desc: "فرم‌های احراز هویت با اعتبارسنجی، طراحی مینیمال و تجربهٔ کاربری ساده.",
          tags: ["Next.js", "TypeScript", "Auth"],
          year: "۱۴۰۵",
          demo: "",
          repo: "https://github.com/mahdiiehka/signin-signup-app/tree/main/app",
          image: "/projects/auth.svg",
        },
      ],
      en: [
        {
          title: "Azartak",
          desc: "",
          tags: [],
          year: "",
          demo: "",
          repo: "",
          image: "/projects/coming-soon.png",
          comingSoon: true,
        },
        {
          title: "Online shop",
          desc: "An online store built on a public API for fetching and displaying products, with filtering, product details and full cart management — add, remove and change item quantities.",
          tags: ["Next.js", "TypeScript", "API"],
          year: "2026",
          demo: "",
          repo: "https://github.com/mahdiiehka/shop--app/tree/main/app",
          image: "/projects/shop.svg",
        },
        {
          title: "Sign in & sign up",
          desc: "Authentication forms with validation, a minimal interface and a smooth user experience.",
          tags: ["Next.js", "TypeScript", "Auth"],
          year: "2026",
          demo: "",
          repo: "https://github.com/mahdiiehka/signin-signup-app/tree/main/app",
          image: "/projects/auth.svg",
        },
      ],
    } as Record<Lang, ProjectItem[]>,
    labels: {
      demo: { fa: "دمو زنده", en: "Live demo" } as L,
      repo: { fa: "سورس کد", en: "Source" } as L,
      project: { fa: "پروژه", en: "Project" } as L,
    },
  },

  contact: {
    kicker: { fa: "تماس", en: "Contact" } as L,
    title: { fa: "با من در ارتباط باشید", en: "Get in touch" } as L,
    intro: {
      fa: "برای شروع یک پروژه جدید یا گفت‌وگو درباره ایده‌هایتان، از طریق فرم زیر با من در ارتباط باشید.",
      en: "To start a new project or talk through your ideas, reach out through the form below.",
    } as L,
    email: "mahdiehkargar410540@gmail.com",
    phone: "",
    form: {
      name: { fa: "نام", en: "Name" } as L,
      email: { fa: "ایمیل", en: "Email" } as L,
      message: { fa: "پیام", en: "Message" } as L,
      namePlaceholder: { fa: "نام خود را وارد کنید", en: "Enter your name" } as L,
      emailPlaceholder: { fa: "you@example.com", en: "you@example.com" } as L,
      messagePlaceholder: { fa: "کمی از پروژه‌ات بگو…", en: "Tell me a bit about it…" } as L,
      submit: { fa: "ارسال پیام", en: "Send message" } as L,
      sending: { fa: "در حال ارسال…", en: "Sending…" } as L,
      success: {
        fa: "پیامت رسید! به‌زودی جواب می‌دهم.",
        en: "Message sent! I'll get back to you soon.",
      } as L,
      error: {
        fa: "ارسال نشد. لطفاً دوباره تلاش کن یا مستقیم ایمیل بزن.",
        en: "Couldn't send it. Please try again or email me directly.",
      } as L,
      unconfigured: {
        fa: "سرویس ایمیل هنوز تنظیم نشده؛ فعلاً مستقیم ایمیل بزن:",
        en: "The email service isn't configured yet — please email me directly:",
      } as L,
      activation: {
        fa: "فرم در حال فعال‌سازی است؛ یک ایمیل تأیید برای صاحب سایت ارسال شد. لطفاً بعد از تأیید دوباره تلاش کنید یا مستقیم ایمیل بزنید:",
        en: "The form is being activated; a confirmation email was sent to the site owner. Please try again after confirming, or email directly:",
      } as L,
    },
    socials: [
      { key: "github", label: "GitHub", href: "https://github.com/mahdiiehka" },
      { key: "instagram", label: "Instagram", href: "https://instagram.com/mahdiiehka_" },
      { key: "telegram", label: "Telegram", href: "https://t.me/Mahdiieh_ka" },
      { key: "mail", label: "Email", href: "mailto:mahdiehkargar410540@gmail.com" },
    ] as { key: SocialKey; label: string; href: string }[],
    resume: { fa: "دانلود رزومه", en: "Download résumé" } as L,
    resumeHref: "/resume",
  },

  footer: {
    rights: { fa: "همهٔ حقوق محفوظ است.", en: "All rights reserved." } as L,
    built: { fa: "ساخته‌شده با Next.js", en: "Built with Next.js" } as L,
    backToTop: { fa: "بازگشت به بالا", en: "Back to top" } as L,
  },

  /** متن‌های رابط کاربری */
  ui: {
    menu: { fa: "منو", en: "Menu" } as L,
    close: { fa: "بستن", en: "Close" } as L,
    theme: { fa: "تغییر تم", en: "Toggle theme" } as L,
    language: { fa: "تغییر زبان", en: "Toggle language" } as L,
    chatOpen: { fa: "گفت‌وگو با دستیار", en: "Chat with my assistant" } as L,
    chatTitle: { fa: "دستیار شخصی", en: "Personal assistant" } as L,
    chatSubtitle: { fa: "دربارهٔ من بپرس", en: "Ask me anything" } as L,
    chatPlaceholder: { fa: "سوالت را بنویس…", en: "Type your question…" } as L,
    chatSend: { fa: "ارسال", en: "Send" } as L,
  },

  nav: [
    { id: "home", fa: "خانه", en: "Home" },
    { id: "about", fa: "درباره من", en: "About" },
    { id: "skills", fa: "مهارت‌ها", en: "Skills" },
    { id: "projects", fa: "نمونه‌کارها", en: "Work" },
    { id: "contact", fa: "تماس", en: "Contact" },
  ] as { id: string; fa: string; en: string }[],
};

export type Profile = typeof profile;
