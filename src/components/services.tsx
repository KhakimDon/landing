import { motion } from "framer-motion";
import {
  Phone,
  CreditCard,
  QrCode,
  Link2,
  Layers,
  ArrowUpFromLine,
  Building2,
  Smartphone,
  Banknote,
  Wallet,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { cn } from "@/lib/cn";

interface Method {
  icon: LucideIcon;
  title: string;
  description: string;
  /** «Тон» — определяет цвет акцента карточки. Чередуем для визуальной живости. */
  tone: "accent" | "cyan" | "warm";
  /** Опциональные мини-теги под описанием. */
  tags?: readonly string[];
}

const METHODS: readonly Method[] = [
  {
    icon: Phone,
    title: "По номеру телефона",
    description:
      "Клиент отправляет перевод на номер телефона — платёж распознаётся автоматически и тут же зачисляется вам.",
    tone: "accent",
    tags: ["СБП", "Kaspi", "Humo"],
  },
  {
    icon: CreditCard,
    title: "По номеру карты",
    description:
      "Прямые переводы с карты на карту. Платёж подтверждается автоматически из банковской SMS — без ручной сверки.",
    tone: "cyan",
    tags: ["VISA", "MIR", "Mastercard"],
  },
  {
    icon: QrCode,
    title: "QR-код",
    description:
      "Клиент сканирует QR в своём банковском приложении и подтверждает платёж в один тап.",
    tone: "warm",
    tags: ["СБП QR", "QRIS", "Kakao"],
  },
  {
    icon: Link2,
    title: "Deeplink",
    description:
      "Платёжная ссылка открывает банковское приложение клиента сразу с заполненной формой — конверсия выше.",
    tone: "accent",
    tags: ["iOS", "Android"],
  },
  {
    icon: Layers,
    title: "Quasi-стяжка",
    description:
      "Безопасное автоматическое объединение средств с реквизитов в один кошелёк — никаких ручных операций.",
    tone: "cyan",
    tags: ["Auto-pull", "USDT settle"],
  },
  {
    icon: ArrowUpFromLine,
    title: "Стабильные выплаты",
    description:
      "Выплаты без срывов: система сама подбирает свободного трейдера, а при пиковой нагрузке подключает каскад.",
    tone: "warm",
    tags: ["~12 сек", "Cascade"],
  },
  {
    icon: Banknote,
    title: "Банковский перевод",
    description:
      "Переводы по реквизитам счёта (SEPA, IBAN, локальные сети) — удобно для крупных сумм.",
    tone: "accent",
    tags: ["SEPA", "IBAN"],
  },
  {
    icon: Wallet,
    title: "E-wallet",
    description:
      "Приём через кошельки экосистем: GoPay, OVO, DANA, KakaoPay, Naver Pay, Toss.",
    tone: "cyan",
    tags: ["ID", "KR"],
  },
  {
    icon: Smartphone,
    title: "Apple Pay / Google Pay",
    description:
      "Tap-and-pay на устройстве клиента. Подходит для in-store и mobile-first сценариев.",
    tone: "warm",
    tags: ["NFC"],
  },
  {
    icon: Building2,
    title: "Корпоративные счета",
    description:
      "Приём для B2B с автоматической сверкой по назначению платежа и привязкой к вашему заказу.",
    tone: "accent",
    tags: ["Reconciliation"],
  },
];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Сервисы"
        number="01"
        title={
          <>
            Все способы приёма{" "}
            <span className="text-gradient-accent">в одной платформе</span>
          </>
        }
        description="Дайте клиенту платить так, как ему удобно — телефон, карта, QR, deeplink, e-wallet или банковский перевод. Платёж распознаётся автоматически, а средства зачисляются вам в USDT."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-3 xl:gap-5">
        {METHODS.map((m, i) => (
          <MethodCard key={m.title} m={m} index={i} />
        ))}

        {/* «И ещё больше» — финальная карточка-приглашение */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
            delay: (METHODS.length % 6) * 0.04,
          }}
          whileHover={{ y: -4 }}
          className="group glass relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-colors sm:p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--color-accent)]/[0.07] via-transparent to-[color:var(--color-accent-2)]/[0.05] opacity-0 transition-opacity group-hover:opacity-100" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-dim)]">
              + ещё
            </div>
            <h3 className="mt-3 text-base font-semibold text-white">
              И больше методов под запрос
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
              Open Banking, выплаты в USDT, локальные ваучеры и кастомные
              интеграции под ваш объём — соберём решение под задачу.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
            Обсудить интеграцию
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.a>
      </div>
    </Section>
  );
}

function MethodCard({ m, index }: { m: Method; index: number }) {
  const accentVar =
    m.tone === "accent"
      ? "var(--color-accent)"
      : m.tone === "cyan"
        ? "var(--color-accent-2)"
        : "var(--color-accent-warm)";
  const iconRingClass =
    m.tone === "accent"
      ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]"
      : m.tone === "cyan"
        ? "border-[color:var(--color-accent-2)]/30 bg-[color:var(--color-accent-2)]/10 text-[color:var(--color-accent-2)]"
        : "border-[color:var(--color-accent-warm)]/30 bg-[color:var(--color-accent-warm)]/10 text-[color:var(--color-accent-warm)]";
  const Icon = m.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: (index % 6) * 0.04,
      }}
      whileHover={{ y: -4 }}
      className="group glass relative overflow-hidden rounded-2xl p-5 transition-colors sm:p-6"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
        style={{ background: `radial-gradient(closest-side, ${accentVar}, transparent)` }}
      />
      <div className="relative flex flex-col gap-4">
        <div
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border",
            iconRingClass
          )}
        >
          <Icon className="size-5" />
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {m.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
            {m.description}
          </p>
        </div>

        {m.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {m.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/[0.08] bg-black/30 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
