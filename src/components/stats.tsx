import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Поддерживаемых банков" },
  { value: 24, suffix: "/7", label: "Доступность инфраструктуры" },
  { value: 99.9, suffix: "%", label: "Аптайм платёжного шлюза" },
  { value: 12, suffix: " ⌀ сек", label: "Среднее время settlement" },
] as const;

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.05] bg-[color:var(--color-bg-elev)]/40 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 md:gap-10 lg:px-8">
        {STATS.map((s) => (
          <StatItem
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
          />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const fromZero = 0;
    const target = value;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(fromZero + (target - fromZero) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toString()
    : display.toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-start gap-1 sm:gap-2"
    >
      <div className="font-mono text-3xl font-semibold tabular-nums text-white sm:text-5xl">
        {formatted}
        <span className="text-[color:var(--color-accent)]">{suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-fg-dim)] sm:text-sm">
        {label}
      </div>
    </motion.div>
  );
}
