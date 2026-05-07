import { motion } from "framer-motion";
import {
  Webhook,
  Code2,
  ScanLine,
  Activity,
  Wallet,
  Boxes,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { Section, SectionHeading } from "./section";

const FEATURES = [
  {
    icon: Code2,
    title: "API-first",
    description:
      "Чистый REST с подписью HMAC SHA-256. Идемпотентность по muid / order_id. Полный OpenAPI на /api/schema.",
  },
  {
    icon: Webhook,
    title: "Real-time callbacks",
    description:
      "После финализации мерчант получает HTTP-callback в фоне. Daemon-thread + retries — фронт пользователя не ждёт сети.",
  },
  {
    icon: ScanLine,
    title: "SMS-парсер",
    description:
      "Pay In авто-подтверждается из SMS банка. Поддержка десятков шаблонов (Bank of Baku, Birbank, Express24, Kapital, ...).",
  },
  {
    icon: Wallet,
    title: "Multi-currency settlement",
    description:
      "Внутренний расчёт в USDT, выдача в локальной валюте. Курсы фиксируются на момент операции — без дрейфа.",
  },
  {
    icon: Activity,
    title: "Live-дашборды",
    description:
      "Реал-тайм мониторинг: конверсия, объём, прибыль, очередь сделок. Графики per-period и календарь дохода.",
  },
  {
    icon: Boxes,
    title: "Cascade",
    description:
      "Если внутренние трейдеры заняты — выплата уходит партнёрской платформе с прозрачным внешним transaction_id.",
  },
  {
    icon: Bell,
    title: "Telegram-уведомления",
    description:
      "Трейдер получает уведомление о новой сделке в свой топик. Низкий баланс — авто-нотификация менеджеру.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-fraud",
    description:
      "BIN-фильтры, лимиты чек/день, автоотмена по таймауту, escrow на апелляции, AML-разметка по reason.",
  },
] as const;

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Возможности"
        number="03"
        title={
          <>
            Всё, что нужно для{" "}
            <span className="text-gradient-accent">P2P-расчётов</span>
          </>
        }
        description="Не просто шлюз. Полная инфраструктура: матчинг, settlement, аналитика, антифрод и поддержка десятков SMS-форматов."
      />

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: (i % 4) * 0.05,
            }}
            whileHover={{ y: -4 }}
            className="group glass relative overflow-hidden rounded-2xl p-5 transition-colors sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <f.icon className="size-6 text-[color:var(--color-accent)]" />
            <h3 className="mt-4 text-base font-semibold text-white">
              {f.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
