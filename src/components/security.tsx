import { motion } from "framer-motion";
import { Lock, KeyRound, FileSearch, Eye } from "lucide-react";
import { Section, SectionHeading } from "./section";

const ITEMS = [
  {
    icon: Lock,
    title: "Подпись каждого запроса",
    description:
      "Каждый запрос подписывается на уровне данных — повтор запроса и подмена платежа исключены.",
  },
  {
    icon: KeyRound,
    title: "Авторизация с ротацией ключей",
    description:
      "Токены доступа обновляются автоматически, а каждая роль изолирована в своём домене. Доступ всегда под контролем.",
  },
  {
    icon: FileSearch,
    title: "Полный аудит операций",
    description:
      "Каждое изменение баланса и каждая операция фиксируются в журнале. Сверка по любой транзакции — за минуту.",
  },
  {
    icon: Eye,
    title: "Контроль трафика",
    description:
      "Гибкие лимиты, фильтры по картам и автоматическое отключение проблемных реквизитов при сбоях.",
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
              Деньги —{" "}
              <span className="text-gradient-accent">под защитой и контролем</span>
            </>
          }
          description="Безопасность банковского уровня на каждом шаге: подписанные запросы, изолированные процессы и полный аудит каждой операции."
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
