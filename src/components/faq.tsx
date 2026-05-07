import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    q: "Как быстро происходит settlement в USDT?",
    a: "Среднее время — около 12 секунд от подтверждения сделки до зачисления USDT на баланс мерчанта. На practical латенси влияет банковская SMS трейдера и время финализации; для P2P-сделок дедлайн настраивается per-мерчант (обычно 10–30 минут).",
  },
  {
    q: "Какие страны и валюты поддерживаются?",
    a: "Сейчас работаем по 7 направлениям: Россия (RUB), Казахстан (KZT), Узбекистан (UZS), Кыргызстан (KGS), Индонезия (IDR), Корея (KRW), Европа (EUR). Расчёт всегда в USDT — конверсия по индивидуальному курсу мерчанта в момент операции.",
  },
  {
    q: "Как защищены платежи и ваше API?",
    a: "Каждый запрос подписывается HMAC SHA-256 на raw-body — replay-атаки и подмена данных исключены. Авторизация — JWT с TTL 24h, refresh 30d, авто-rotate. На уровне БД финансовые операции выполняются в одной транзакции с select_for_update — гонок нет.",
  },
  {
    q: "Что происходит, если callback не дошёл до мерчанта?",
    a: "Callback живёт в фоновом daemon-thread с retry-логикой (экспоненциальный бэкофф). Если за N попыток мерчант не подтвердил, сделка остаётся в финальном статусе и доступна через GET /v2/p2p/status/. Все попытки логируются — диагностика по ID за минуту.",
  },
  {
    q: "Как идёт интеграция? Сколько времени занимает запуск?",
    a: "Sandbox-доступ выдаём в течение часа. Базовый Pay In + Pay Out + callback интегрируется за 1 рабочий день — три endpoint'а, OpenAPI-спека, готовые SDK-снипеты на Python / Node / cURL. На прод выводим после 5–10 успешных тестовых сделок.",
  },
  {
    q: "Какая модель комиссий?",
    a: "Только % с оборота — никаких setup-fee, monthly minimum или per-API-call charge. Ставка зависит от страны, метода и объёма; обсуждается per-мерчант. Стартовая для большинства направлений — от 1.5%.",
  },
  {
    q: "Можно ли увидеть аналитику по своим платежам?",
    a: "Да — у каждого мерчанта есть личный кабинет (merchant.explat.io) с реал-тайм графиками: объём, конверсия, прибыль, история по дням. Все данные также доступны через API — можно вытаскивать в свой BI.",
  },
  {
    q: "Что если моих трейдеров нет в нужный момент?",
    a: "Платформа автоматически кладёт сделку в каскад — отправляет её партнёрской платформе с прозрачным external_transaction_id в callback'е. Для мерчанта это незаметно, для аналитики — видно поле cascade_platform_name.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        number="07"
        title={
          <>
            Частые{" "}
            <span className="text-gradient-accent">вопросы</span>
          </>
        }
        description="Отвечаем на главное. Если не нашли свой вопрос — напишите нам в Telegram, ответим быстро."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-12 max-w-3xl divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.06] lg:mt-16"
      >
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="bg-[color:var(--color-bg-elev)]/30">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-6",
                  isOpen && "bg-white/[0.02]"
                )}
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-white sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border border-white/10 transition-transform duration-300",
                    isOpen ? "rotate-45 border-[color:var(--color-accent)]/50 text-[color:var(--color-accent)]" : "text-white/70"
                  )}
                  aria-hidden
                >
                  <Plus className="size-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-[color:var(--color-fg-muted)] sm:px-7 sm:pb-7 sm:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
}
