import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

const STATS = [
  { value: 50, suffix: "+", label: "Поддерживаемых банков" },
  { value: 24, suffix: "/7", label: "Доступность инфраструктуры" },
  { value: 99.9, suffix: "%", label: "Аптайм платёжного шлюза" },
  { value: 12, suffix: " ⌀ сек", label: "Среднее время settlement" },
] as const;

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] bg-[color:var(--color-bg-elev)]/40 py-14 sm:py-20">
      {/* Бегущий шум фоном — добавляет глубины */}
      <div
        aria-hidden
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent)]/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent-2)]/20 to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-4 sm:px-6 md:grid-cols-4 md:gap-x-8 md:gap-y-0 lg:px-8">
        {STATS.map((s, i) => (
          <StatItem
            key={s.label}
            index={i}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            withDivider={i > 0}
          />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  index,
  value,
  suffix,
  label,
  withDivider,
}: {
  index: number;
  value: number;
  suffix: string;
  label: string;
  withDivider: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
      className={cn(
        "relative flex flex-col items-start gap-3",
        withDivider && "md:pl-8 md:before:absolute md:before:inset-y-2 md:before:left-0 md:before:w-px md:before:bg-white/[0.08]"
      )}
    >
      {/* Eyebrow с порядковым номером */}
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-fg-dim)]">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-[color:var(--color-fg-dim)]/40" />
      </div>

      {/* Цифра — odometer */}
      <div className="relative">
        {/* Glow halo за цифрой, появляется к моменту приземления */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            inView
              ? { opacity: [0, 0.55, 0.18], scale: [0.4, 1.4, 1] }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{
            duration: 1.6,
            ease: "easeOut",
            delay: 0.4 + index * 0.08,
          }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,_rgba(0,245,160,0.45),_transparent_70%)] blur-2xl"
        />
        <Odometer
          value={value}
          isActive={inView}
          delay={0.2 + index * 0.08}
          suffix={suffix}
        />
      </div>

      {/* Label */}
      <div className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-fg-dim)] sm:text-sm">
        {label}
      </div>

      {/* Прогресс-линия снизу, растёт когда цифра приземлилась */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.6 + index * 0.08,
        }}
        className="h-px w-2/3 bg-gradient-to-r from-[color:var(--color-accent)]/70 to-transparent"
      />
    </motion.div>
  );
}

/* ---------- ODOMETER ----------
 *  Каждая цифра — это вертикальный «стек» 0–9, который сдвигается, чтобы
 *  показать нужную цифру. Точка / суффикс рисуются отдельно.
 *  Анимация: digits «прокручиваются» с лёгким стаггером слева направо. */
function Odometer({
  value,
  isActive,
  delay,
  suffix,
}: {
  value: number;
  isActive: boolean;
  delay: number;
  suffix: string;
}) {
  const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  const chars = formatted.split("");

  return (
    <div className="flex items-baseline font-mono text-4xl font-semibold leading-none text-white sm:text-6xl md:text-7xl">
      {chars.map((ch, i) => {
        if (ch === ".") {
          return (
            <motion.span
              key={`dot-${i}`}
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: delay + i * 0.08 }}
              className="inline-block"
            >
              .
            </motion.span>
          );
        }
        const digit = Number(ch);
        return (
          <DigitSlot
            key={`d-${i}`}
            digit={digit}
            active={isActive}
            delay={delay + i * 0.12}
          />
        );
      })}
      {/* Suffix appears with slide-up + slight delay после цифр */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: delay + chars.length * 0.12 + 0.1,
        }}
        className="ml-0.5 text-[color:var(--color-accent)]"
      >
        {suffix}
      </motion.span>
    </div>
  );
}

/** Одна цифра-слот: маска высотой 1em (= размер шрифта), внутри
 *  вертикальный стек 0..9, который сдвигается через motion's `y` в
 *  em-юнитах. em-единицы — ключ к правильной геометрии: высота слота
 *  совпадает с шагом и совпадает с font-size, всё попадает в baseline.
 *  Никаких % и flex-обёрток — line-height 1, баланс гарантирован. */
function DigitSlot({
  digit,
  active,
  delay,
}: {
  digit: number;
  active: boolean;
  delay: number;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1em",
        lineHeight: 1,
        verticalAlign: "baseline",
        width: "0.62em",
        textAlign: "center",
        fontVariantNumeric: "tabular-nums",
      }}
      aria-hidden
    >
      <motion.span
        initial={{ y: "0em" }}
        animate={{ y: active ? `-${digit}em` : "0em" }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        style={{
          display: "block",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span
            key={n}
            style={{
              display: "block",
              height: "1em",
              lineHeight: 1,
            }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
