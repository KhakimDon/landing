import { motion } from "framer-motion";

const BANKS = [
  "Kapital Bank",
  "Birbank",
  "Bank of Baku",
  "Express24",
  "ABB",
  "Pasha Bank",
  "Yelo Bank",
  "Unibank",
  "Rabita Bank",
  "Xalq Bank",
  "TBC",
  "Halyk",
  "Kaspi",
  "Sberbank",
  "Tinkoff",
] as const;

export function BanksMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 px-4 text-center text-xs uppercase tracking-[0.24em] text-[color:var(--color-fg-dim)] sm:text-sm"
      >
        Поддерживаемые банки
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-32" />

      <div className="relative flex">
        <div className="animate-marquee flex shrink-0 gap-3 whitespace-nowrap pr-3 sm:gap-4 sm:pr-4">
          {[...BANKS, ...BANKS].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-sm text-white/70 sm:px-5 sm:text-base"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
