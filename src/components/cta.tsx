import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative isolate mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[color:var(--color-bg-elev)] to-black p-8 sm:p-12 lg:p-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-[0.4]" />
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,_rgba(0,245,160,0.18),_transparent_70%)] blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,_rgba(0,217,255,0.14),_transparent_70%)] blur-3xl" />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
            Готовы запустить{" "}
            <span className="text-gradient-accent">платежи</span>?
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base text-[color:var(--color-fg-muted)] sm:text-lg">
            Расскажите про объём и валюты — пришлём интеграционный пакет,
            тестовые ключи и контакт персонального менеджера в течение часа.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="https://t.me/explat_ceo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-base font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="size-4" />
              Написать в Telegram
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
