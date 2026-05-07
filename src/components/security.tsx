import { motion } from "framer-motion";
import { Lock, KeyRound, FileSearch, Eye } from "lucide-react";
import { Section, SectionHeading } from "./section";

const ITEMS = [
  {
    icon: Lock,
    title: "HMAC SHA-256 подпись",
    description:
      "Каждый запрос мерчанта подписывается на raw body — replay-атаки и подмена данных исключены.",
  },
  {
    icon: KeyRound,
    title: "JWT auth + ротация",
    description:
      "Access TTL 24h, refresh 30d, авто-refresh до истечения. Изолированные cookie-домены для каждой роли.",
  },
  {
    icon: FileSearch,
    title: "Полный аудит",
    description:
      "Каждое изменение балансов, callback, init-запрос пишутся в журнал. Reconciliation — за минуту.",
  },
  {
    icon: Eye,
    title: "Контроль трафика",
    description:
      "Лимиты на трейдера: parallel_payouts, min/max-чек, BIN-фильтры. Авто-suspend реквизита при подряд-фейлах.",
  },
] as const;

export function Security() {
  return (
    <Section id="security">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Безопасность"
          number="05"
          title={
            <>
              Каждая операция —{" "}
              <span className="text-gradient-accent">подписана и атомарна</span>
            </>
          }
          description="Финансовая логика проходит в одной DB-транзакции с select_for_update. Callback'и и retry'ы — в изолированных воркерах. Всё видно в логах."
        />

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: (i % 2) * 0.06,
              }}
              className="glass rounded-2xl p-5 sm:p-6"
            >
              <it.icon className="size-5 text-[color:var(--color-accent)]" />
              <h3 className="mt-3 text-base font-semibold text-white">
                {it.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                {it.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
