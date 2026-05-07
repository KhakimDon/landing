import { motion } from "framer-motion";
import { Section, SectionHeading } from "./section";

const STEPS = [
  {
    n: "01",
    title: "Запрос платежа от мерчанта",
    description:
      "Мерчант делает HTTP-запрос на /api/.../init — указывает сумму, валюту, реквизит получателя и (для Pay Out) данные карты.",
  },
  {
    n: "02",
    title: "Подбор трейдера",
    description:
      "Платформа в одной транзакции выбирает свободного трейдера с подходящим балансом, BIN-фильтром, валютой и лимитами. Использует select_for_update для гонок-сейфа.",
  },
  {
    n: "03",
    title: "Исполнение",
    description:
      "Pay In: клиент переводит фиат на реквизит трейдера, SMS-парсер ловит подтверждение. Pay Out: трейдер сам отправляет фиат — частичные или полное подтверждение через сайт или Telegram-бот.",
  },
  {
    n: "04",
    title: "Settlement и callback",
    description:
      "После финализации платформа атомарно проводит балансы трейдера и мерчанта в USDT, шлёт мерчанту HTTP-callback с подписью HMAC SHA-256.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="Как это работает"
        title={
          <>
            От запроса до callback'а —{" "}
            <span className="text-gradient-accent">за минуты</span>
          </>
        }
        description="Single API. Многошаговый flow проходит автоматически: подбор трейдера, hold баланса, реал-тайм трекинг и callback."
      />

      <div className="relative mt-14 lg:mt-20">
        {/* Vertical accent line for desktop */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />

        <ol className="relative grid gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className={
                i % 2 === 0
                  ? "lg:col-start-1 lg:col-end-2 lg:pr-12 lg:text-right"
                  : "lg:col-start-2 lg:col-end-3 lg:pl-12 lg:mt-24"
              }
            >
              <div
                className={
                  "glass relative rounded-2xl p-5 sm:p-7 " +
                  (i % 2 === 0 ? "lg:after:left-full" : "lg:after:right-full")
                }
              >
                <div className="flex items-center gap-3 lg:justify-end">
                  <div
                    className={
                      "font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent)] " +
                      (i % 2 === 0 ? "lg:order-2" : "")
                    }
                  >
                    Шаг {step.n}
                  </div>
                  <div className="h-px flex-1 bg-white/10 lg:hidden" />
                </div>
                <h3
                  className={
                    "mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl " +
                    (i % 2 === 0 ? "lg:text-right" : "lg:text-left")
                  }
                >
                  {step.title}
                </h3>
                <p
                  className={
                    "mt-2 text-sm text-[color:var(--color-fg-muted)] sm:text-base " +
                    (i % 2 === 0 ? "lg:text-right" : "lg:text-left")
                  }
                >
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
