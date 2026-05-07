import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { cn } from "@/lib/cn";

type Cell = "yes" | "no" | "limited" | string;

interface Row {
  feature: string;
  explat: Cell;
  bank: Cell;
  swift: Cell;
}

const ROWS: readonly Row[] = [
  { feature: "Settlement в USDT за минуты", explat: "yes", bank: "no", swift: "no" },
  { feature: "Pay In + Pay Out из одного API", explat: "yes", bank: "limited", swift: "no" },
  { feature: "Локальные методы (СБП / Kaspi / Humo / GoPay / SEPA)", explat: "yes", bank: "limited", swift: "no" },
  { feature: "Поддержка 7+ стран без отдельных интеграций", explat: "yes", bank: "no", swift: "limited" },
  { feature: "HMAC-подпись, идемпотентность, callbacks", explat: "yes", bank: "limited", swift: "limited" },
  { feature: "Авто-подбор трейдера и BIN-фильтры", explat: "yes", bank: "no", swift: "no" },
  { feature: "Комиссия", explat: "от 1.5%", bank: "2–4%+", swift: "$25–$50" },
  { feature: "Скорость зачисления", explat: "~12 сек", bank: "1–3 рабочих дня", swift: "1–5 рабочих дней" },
];

export function Comparison() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Почему мы"
        number="06"
        title={
          <>
            Сравните с тем, что{" "}
            <span className="text-gradient-accent">было раньше</span>
          </>
        }
        description="Те же платежи, но без банковских лимитов и SWIFT-задержек. Цифры из реальной практики мерчантов."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mt-12 lg:mt-16"
      >
        {/* Desktop / tablet — таблица */}
        <div className="hidden overflow-hidden rounded-3xl border border-white/[0.08] sm:block">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/[0.06] bg-[color:var(--color-bg-elev)]/60">
            <div className="px-3 py-4 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-dim)] sm:px-6">
              Параметр
            </div>
            <HeaderCell highlight>
              <span className="text-base font-semibold sm:text-lg">Explat</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                ⚡
              </span>
            </HeaderCell>
            <HeaderCell>
              <span className="text-sm sm:text-base">Банк</span>
            </HeaderCell>
            <HeaderCell>
              <span className="text-sm sm:text-base">SWIFT</span>
            </HeaderCell>
          </div>

          {ROWS.map((r, i) => (
            <motion.div
              key={r.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={cn(
                "grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-b border-white/[0.04] last:border-b-0",
                i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
              )}
            >
              <div className="px-3 py-4 text-sm text-white/85 sm:px-6 sm:text-base">
                {r.feature}
              </div>
              <Cell value={r.explat} highlight />
              <Cell value={r.bank} />
              <Cell value={r.swift} />
            </motion.div>
          ))}
        </div>

        {/* Mobile — каждая строка превращается в карточку (3 строки сравнения внутри). */}
        <ul className="flex flex-col gap-3 sm:hidden">
          {ROWS.map((r, i) => (
            <motion.li
              key={r.feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <div className="border-b border-white/[0.06] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-fg-dim)]">
                {r.feature}
              </div>
              <div className="divide-y divide-white/[0.04]">
                <MobileRow label="Explat" value={r.explat} highlight />
                <MobileRow label="Банк" value={r.bank} />
                <MobileRow label="SWIFT" value={r.swift} />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}

function MobileRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: Cell;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3",
        highlight && "bg-[color:var(--color-accent)]/[0.05]"
      )}
    >
      <span
        className={cn(
          "text-sm",
          highlight ? "font-semibold text-white" : "text-[color:var(--color-fg-muted)]"
        )}
      >
        {label}
      </span>
      <span>
        {value === "yes" ? (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]">
            <Check className="size-3.5" />
          </span>
        ) : value === "no" ? (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
            <X className="size-3.5" />
          </span>
        ) : value === "limited" ? (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
            <Minus className="size-3.5" />
          </span>
        ) : (
          <span className="font-mono text-sm tabular-nums text-white/90">
            {value}
          </span>
        )}
      </span>
    </div>
  );
}

function HeaderCell({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-4 sm:px-6",
        highlight
          ? "bg-[color:var(--color-accent)]/[0.05] text-white"
          : "text-[color:var(--color-fg-muted)]"
      )}
    >
      {children}
    </div>
  );
}

function Cell({ value, highlight }: { value: Cell; highlight?: boolean }) {
  let content: React.ReactNode;
  if (value === "yes") {
    content = (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]">
        <Check className="size-4" />
      </span>
    );
  } else if (value === "no") {
    content = (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
        <X className="size-4" />
      </span>
    );
  } else if (value === "limited") {
    content = (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
        <Minus className="size-4" />
      </span>
    );
  } else {
    content = (
      <span className="font-mono text-sm tabular-nums text-white/90">
        {value}
      </span>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center px-2 py-4 sm:px-4",
        highlight && "bg-[color:var(--color-accent)]/[0.05]"
      )}
    >
      {content}
    </div>
  );
}
