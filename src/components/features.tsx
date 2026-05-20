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
    title: "Простое API",
    description:
      "Чистый REST с понятной документацией и готовыми примерами на Python, Node и cURL. Базовая интеграция — за один рабочий день.",
  },
  {
    icon: Webhook,
    title: "Мгновенные уведомления",
    description:
      "О каждой завершённой операции вы узнаёте сразу. Если связь прервётся — система сама повторит доставку, ничего не потеряется.",
  },
  {
    icon: ScanLine,
    title: "Авто-подтверждение из SMS",
    description:
      "Платёж подтверждается автоматически из банковской SMS. Поддерживаем десятки шаблонов банков — от Kapital до Birbank.",
  },
  {
    icon: Wallet,
    title: "Расчёт в USDT",
    description:
      "Приём в локальной валюте, расчёт в USDT. Курс фиксируется в момент операции — без скрытых потерь на конвертации.",
  },
  {
    icon: Activity,
    title: "Аналитика в реальном времени",
    description:
      "Конверсия, объём и прибыль на наглядных графиках. Вся статистика по платежам — в личном кабинете и по API.",
  },
  {
    icon: Boxes,
    title: "Каскад выплат",
    description:
      "Если ваши трейдеры заняты, выплата автоматически уходит партнёрской сети. Для вас процесс остаётся незаметным.",
  },
  {
    icon: Bell,
    title: "Уведомления в Telegram",
    description:
      "Сделки и остатки приходят в Telegram. Низкий баланс — мгновенный сигнал менеджеру, без ручного контроля.",
  },
  {
    icon: ShieldCheck,
    title: "Антифрод",
    description:
      "Фильтры по картам, лимиты, автоотмена по таймауту и защита спорных сделок. Антифрод работает на каждом шаге.",
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
        description="Не просто шлюз, а полная платёжная инфраструктура: приём, выплаты, аналитика и антифрод — всё в одном месте."
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
