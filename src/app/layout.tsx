import type { Metadata, Viewport } from "next";
import { Estedad, Geist_Mono, Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/lib/site-context";

const faFont = Estedad({
  subsets: ["arabic", "latin"],
  variable: "--font-estedad",
  display: "swap",
});

const faDisplay = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-fa-display",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahdiehkargar.ir"),
  title: "مهدیه — توسعه‌دهنده فرانت‌اند",
  description:
    "پورتفولیوی شخصی مهدیه؛ توسعه‌دهندهٔ فرانت‌اند و دانشجوی مهندسی کامپیوتر. طراحی و ساخت تجربه‌های وب سریع، تمیز و انسانی با React و Next.js.",
  keywords: [
    "مهدیه",
    "پورتفولیو",
    "فرانت‌اند",
    "React",
    "Next.js",
    "توسعه‌دهنده وب",
    "portfolio",
    "frontend developer",
  ],
  authors: [{ name: "Mahdieh" }],
  openGraph: {
    title: "مهدیه — توسعه‌دهنده فرانت‌اند",
    description:
      "طراحی و ساخت تجربه‌های وب سریع، تمیز و انسانی با React و Next.js.",
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#151011" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** پیش از اولین رنگ‌آمیزی، تم ذخیره‌شده را اعمال می‌کند تا پرش نداشته باشیم. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t="light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="light"
      suppressHydrationWarning
      className={`${faFont.variable} ${faDisplay.variable} ${display.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-svh antialiased">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
