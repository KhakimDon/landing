import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    q: "Как быстро приходит расчёт в USDT?",
    a: "В среднем около 12 секунд — от подтверждения платежа до зачисления USDT на ваш баланс. Для P2P-сделок срок подтверждения настраивается индивидуально (обычно 10–30 минут).",
  },
  {
    q: "Какие страны и валюты поддерживаются?",
    a: "Сейчас работаем по 7 направлениям: Россия (RUB), Казахстан (KZT), Узбекистан (UZS), Кыргызстан (KGS), Индонезия (IDR), Корея (KRW) и Европа (EUR). Расчёт всегда в USDT — по индивидуальному курсу в момент операции.",
  },
  {
    q: "Насколько защищены платежи и ваше API?",
    a: "Каждый запрос подписывается — повтор и подмена платежа исключены. Доступ выдаётся по токенам с автоматической ротацией, а каждая финансовая операция выполняется атомарно: задвоений и гонок не бывает.",
  },
  {
    q: "Что будет, если уведомление о платеже не дойдёт?",
    a: "Система автоматически повторяет доставку уведомления с нарастающими интервалами. Если связи всё ещё нет, итоговый статус сделки всегда можно запросить по API. Все попытки сохраняются — найдём по ID за минуту.",
  },
  {
    q: "Как идёт интеграция и сколько занимает запуск?",
    a: "Тестовый доступ выдаём в течение часа. Базовый приём, выплаты и уведомления подключаются за один рабочий день — понятная документация и готовые примеры на Python, Node и cURL. На боевой режим выводим после нескольких успешных тестовых сделок.",
  },
  {
    q: "Какая модель комиссий?",
    a: "Только процент с оборота — без платы за подключение, абонентской платы и скрытых сборов. Ставка зависит от страны, метода и объёма и обсуждается индивидуально. Старт для большинства направлений — от 1.5%.",
  },
  {
    q: "Можно ли смотреть аналитику по своим платежам?",
    a: "Да. У каждого мерчанта есть личный кабинет с графиками в реальном времени: объём, конверсия, прибыль и история по дням. Те же данные доступны по API — можно выгружать в свою систему аналитики.",
  },
  {
    q: "Что если моих трейдеров нет в нужный момент?",
    a: "Платформа автоматически переводит сделку в каскад и отправляет её партнёрской сети. Для вас процесс остаётся незаметным, а в аналитике видно, что выплата прошла через партнёра.",
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
