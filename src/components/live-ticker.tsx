import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";
import { cn } from "@/lib/cn";

type Direction = "in" | "out";

interface Tick {
  id: number;
  uid: string;
  amount: number;
  currency: string;
  flag: string;
  bank: string;
  direction: Direction;
  ts: number;
}

const SOURCES: Omit<Tick, "id" | "ts">[] = [
  { uid: "47118afb…21a9d", amount: 218.4, currency: "USDT", flag: "🇷🇺", bank: "Tinkoff", direction: "in" },
  { uid: "1e9f71ff…30ce5", amount: 412.7, currency: "USDT", flag: "🇰🇿", bank: "Kaspi",   direction: "out" },
  { uid: "71aa5253…79a77", amount: 1240.0, currency: "USDT", flag: "🇺🇿", bank: "Humo",    direction: "in" },
  { uid: "0aaee95e…11fca", amount: 87.5,  currency: "USDT", flag: "🇰🇬", bank: "Mbank",   direction: "in" },
  { uid: "f8939b9e…b6e9",  amount: 540.2, currency: "USDT", flag: "🇮🇩", bank: "GoPay",   direction: "out" },
  { uid: "bcd5b74e…4341",  amount: 326.1, currency: "USDT", flag: "🇰🇷", bank: "Kakao",   direction: "in" },
  { uid: "80995253…fc67",  amount: 99.8,  currency: "USDT", flag: "🇪🇺", bank: "SEPA",    direction: "in" },
  { uid: "a5c3f1dc…09df",  amount: 750.0, currency: "USDT", flag: "🇷🇺", bank: "СБП",     direction: "out" },
  { uid: "1036f004…5b76",  amount: 189.3, currency: "USDT", flag: "🇰🇿", bank: "Halyk",   direction: "in" },
  { uid: "67801430…12d8",  amount: 64.2,  currency: "USDT", flag: "🇺🇿", bank: "Uzcard",  direction: "out" },
];

function formatAmount(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

/**
 * Лента «live»-транзакций. Каждые ~1.6 сек добавляет новый тик сверху,
 * выталкивая нижний. Анимация — через AnimatePresence + spring.
 */
export function LiveTicker() {
  const [ticks, setTicks] = useState<Tick[]>(() =>
    SOURCES.slice(0, 6).map((s, i) => ({
      ...s,
      id: i,
      ts: Date.now() - i * 1500,
    }))
  );

  useEffect(() => {
    let id = 1000;
    const t = window.setInterval(() => {
      const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
      const next: Tick = {
        ...src,
        id: id++,
        ts: Date.now(),
        amount:
          Math.round((src.amount * (0.7 + Math.random() * 0.6)) * 100) / 100,
      };
      setTicks((prev) => [next, ...prev].slice(0, 6));
    }, 1700);
    return () => window.clearInterval(t);
  }, []);

  const totalLast = ticks.reduce((sum, t) => sum + t.amount, 0);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass relative overflow-hidden rounded-3xl"
      >
        {/* Аккуратный glow за лентой */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,_rgba(0,245,160,0.12),_transparent_70%)] blur-2xl" />
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[260px_1fr]">
          {/* Sidebar header */}
          <div className="flex flex-col justify-between border-b border-white/[0.06] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                <Activity className="size-3" />
                Live · последние 6
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Сделки в реальном времени
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                Поток транзакций по сети — анонимизированно. Каждые
                ~1.7 сек обновляется новой сделкой.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 lg:flex-col lg:items-start lg:gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-dim)]">
                  Объём (USDT)
                </div>
                <div className="font-mono text-2xl font-semibold tabular-nums text-white">
                  {formatAmount(totalLast)}
                </div>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]" />
              </span>
            </div>
          </div>

          {/* Stream */}
          <div className="relative">
            <div className="border-b border-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-dim)] sm:px-6">
              <div className="grid grid-cols-[60px_1fr_70px_120px] items-center gap-3 sm:grid-cols-[80px_1.4fr_1fr_120px]">
                <span>Время</span>
                <span>Транзакция</span>
                <span className="hidden sm:block">Банк</span>
                <span className="text-right">Сумма</span>
              </div>
            </div>

            <ul className="relative">
              <AnimatePresence initial={false}>
                {ticks.map((t) => (
                  <motion.li
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                      mass: 0.6,
                    }}
                    className="grid grid-cols-[60px_1fr_70px_120px] items-center gap-3 border-b border-white/[0.04] px-4 py-3 text-sm sm:grid-cols-[80px_1.4fr_1fr_120px] sm:px-6"
                  >
                    <span className="font-mono text-[11px] text-[color:var(--color-fg-dim)] sm:text-xs">
                      {formatTime(t.ts)}
                    </span>
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-md border",
                          t.direction === "in"
                            ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]"
                            : "border-[color:var(--color-accent-2)]/30 bg-[color:var(--color-accent-2)]/10 text-[color:var(--color-accent-2)]"
                        )}
                      >
                        {t.direction === "in" ? (
                          <ArrowDownToLine className="size-3.5" />
                        ) : (
                          <ArrowUpFromLine className="size-3.5" />
                        )}
                      </span>
                      <span className="truncate font-mono text-[11px] text-white/80 sm:text-xs">
                        {t.uid}
                      </span>
                    </span>
                    <span className="hidden truncate text-xs text-[color:var(--color-fg-muted)] sm:flex sm:items-center sm:gap-1.5">
                      <span aria-hidden>{t.flag}</span>
                      {t.bank}
                    </span>
                    <span className="text-right font-mono text-sm font-semibold tabular-nums text-white">
                      {formatAmount(t.amount)}
                      <span className="ml-1 text-[10px] font-medium text-[color:var(--color-fg-dim)]">
                        {t.currency}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
