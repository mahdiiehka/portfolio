"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { getReply, quickPrompts } from "@/lib/chat";
import { useSite } from "@/lib/site-context";
import { Close, MessageCircle, Send } from "./icons";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

export function ChatWidget() {
  const { lang } = useSite();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const idRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greeting =
    lang === "fa"
      ? "سلام، خوش اومدی! ✨ من اینجام تا سریع‌تر به جواب سؤالاتت برسی"
      : "Hi, welcome! ✨ I'm here to help you get answers faster.";

  // پیام خوش‌آمد در اولین باز شدن
  useEffect(() => {
    if (open && messages.length === 0) {
      idRef.current += 1;
      setMessages([{ id: idRef.current, role: "bot", text: greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // اسکرول خودکار
  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing, open]);

  // فوکوس ورودی و بستن با Escape
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    idRef.current += 1;
    const userMessage: ChatMessage = {
      id: idRef.current,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    const reply = getReply(trimmed, lang);

    window.setTimeout(
      () => {
        idRef.current += 1;
        setMessages((prev) => [
          ...prev,
          { id: idRef.current, role: "bot", text: reply },
        ]);
        setTyping(false);
      },
      520 + Math.random() * 420,
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  const showQuickPrompts = messages.filter((m) => m.role === "user").length === 0;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="pop-in flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-bg shadow-[0_34px_90px_-30px_rgba(0,0,0,0.45)]">
          {/* هدر */}
          <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3.5">
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-[0.6rem] font-bold text-bg">
              {profile.brand.replace(".", "")}
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald-500" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.85rem] font-semibold text-ink">
                {profile.ui.chatTitle[lang]}
              </p>
              <p className="truncate text-[0.68rem] text-muted">
                {profile.ui.chatSubtitle[lang]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={profile.ui.close[lang]}
              className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-ink"
            >
              <Close className="size-4" />
            </button>
          </div>

          {/* پیام‌ها */}
          <div
            ref={listRef}
            className="max-h-[19rem] min-h-[13rem] space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`pop-in max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-relaxed ${
                    message.role === "user"
                      ? "rounded-ee-md bg-ink text-bg"
                      : "rounded-es-md border border-line bg-surface text-inksoft"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {typing ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-es-md border border-line bg-surface px-3.5 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="typing-dot size-1.5 rounded-full bg-muted"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* پیشنهادهای سریع */}
          {showQuickPrompts ? (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => send(prompt.message[lang])}
                  className="shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-[0.7rem] text-inksoft transition-colors hover:border-accent hover:text-accent"
                >
                  {prompt.label[lang]}
                </button>
              ))}
            </div>
          ) : null}

          {/* ورودی */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-line bg-surface p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={profile.ui.chatPlaceholder[lang]}
              aria-label={profile.ui.chatPlaceholder[lang]}
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[0.82rem] text-ink outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={profile.ui.chatSend[lang]}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-bg transition-opacity disabled:opacity-35"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={profile.ui.chatOpen[lang]}
        className="relative flex size-14 items-center justify-center rounded-full bg-ink text-bg shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
      >
        {open ? (
          <Close className="size-5" />
        ) : (
          <>
            <MessageCircle className="size-5" />
            <span className="absolute right-0.5 top-0.5 size-3 rounded-full border-2 border-bg bg-accent" />
          </>
        )}
      </button>
    </div>
  );
}
