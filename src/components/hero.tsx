import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Globe2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CURRENCIES = [
  { code: "RUB", flag: "🇷🇺" },
  { code: "USDT", flag: "₮" },
  { code: "KZT", flag: "🇰🇿" },
  { code: "UZS", flag: "🇺🇿" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "IDR", flag: "🇮🇩" },
  { code: "KGS", flag: "🇰🇬" },
  { code: "KRW", flag: "🇰🇷" },
] as const;

export function Hero() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section
      id="top"
      ref={wrapRef}
      onMouseMove={(e) => {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28"
    >
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-aurora absolute inset-0 opacity-90" />
        <div className="bg-grid absolute inset-0 opacity-[0.45]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      <Spotlight mx={mx} my={my} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
          {/* LEFT — copy + CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="flex flex-col items-start text-left"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-tight text-white/80 backdrop-blur sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
              </span>
              <span className="font-mono tracking-[0.16em]">EXPLAT</span>
              <span className="hidden text-[color:var(--color-fg-dim)] sm:inline">·</span>
              <span className="hidden sm:inline">
                Платежи без банковских ограничений
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[76px]"
            >
              <span className="text-gradient-accent">Процессинговая</span>{" "}
              инфраструктура
              <br />
              нового поколения
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[color:var(--color-fg-muted)] sm:text-lg"
            >
              Принимайте и отправляйте платежи в локальных валютах через сеть
              верифицированных трейдеров. Settlement в USDT, поддержка десятков
              банков, прозрачные расчёты и контроль через единый канал.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <MagneticAnchor
                href="#contact"
                className="btn-glow group inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--color-accent)] px-7 py-3.5 text-base font-semibold text-black"
              >
                Запросить интеграцию
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticAnchor>
              <MagneticAnchor
                href="#services"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-base font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/[0.06]"
              >
                Что мы умеем
              </MagneticAnchor>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[color:var(--color-fg-dim)] sm:gap-x-10 sm:text-sm"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-white/70" />
                HMAC SHA-256
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="size-4 text-white/70" />
                Settlement за минуты
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="size-4 text-white/70" />
                7 рынков
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — owl scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex w-full items-center justify-center"
          >
            <OwlScene mx={mx} my={my} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Spotlight ---------- */
function Spotlight({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useTransform(mx, [0, 1], ["0%", "100%"]);
  const y = useTransform(my, [0, 1], ["0%", "100%"]);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x} ${y}, rgba(0,245,160,0.10), transparent 60%)`;
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    />
  );
}

/* ---------- Owl Scene ----------
 * Использую trigonometric positioning через CSS-переменные `--angle` и
 * `--radius`, чтобы каждый item на кольце стоял в фиксированной позиции,
 * а само кольцо при этом плавно вращается через CSS-keyframes на родителе.
 * Для items, которые НЕ должны крутиться вместе с кольцом (валюта-чипсы),
 * применяется встречная анимация — counter-rotate с тем же периодом.
 *
 * Радиусы:
 *   - Owl: занимает 56% диаметра (центр)
 *   - Inner ring (точки): радиус 38% (точки на ring'е, не пересекают сову)
 *   - Outer ring (валюты): радиус 52% (вынесены за границу видимого квадрата
 *     контейнера; чипсы не перекрывают сову)
 */
const OWL_DIAMETER_PCT = 0.56; // 56% диаметра контейнера
const INNER_RADIUS_PCT = 0.38;
const OUTER_RADIUS_PCT = 0.52;

function OwlScene({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
  const owlX = useTransform(sx, [0, 1], [-8, 8]);
  const owlY = useTransform(sy, [0, 1], [-6, 6]);

  return (
    <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px]">
      {/* Halo glow */}
      <div
        aria-hidden
        className="absolute inset-[18%] -z-10 rounded-full bg-[radial-gradient(closest-side,_rgba(0,245,160,0.32),_rgba(0,217,255,0.08),_transparent_70%)] blur-2xl"
      />

      {/* Outer ring (dashed) — валюты */}
      <Ring
        radiusPct={OUTER_RADIUS_PCT}
        rotateAnim="orbit-cw"
        rotateDuration={70}
        ringStyle="dashed"
      >
        {CURRENCIES.map((c, i) => (
          <RingItem
            key={c.code}
            index={i}
            count={CURRENCIES.length}
            radiusPct={OUTER_RADIUS_PCT}
            counterAnim="orbit-cw-counter"
            counterDuration={70}
          >
            <CurrencyChip code={c.code} flag={c.flag} />
          </RingItem>
        ))}
      </Ring>

      {/* Inner ring (solid) — точки */}
      <Ring
        radiusPct={INNER_RADIUS_PCT}
        rotateAnim="orbit-ccw"
        rotateDuration={50}
        ringStyle="solid"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <RingItem
            key={i}
            index={i}
            count={16}
            radiusPct={INNER_RADIUS_PCT}
            counterAnim="orbit-ccw-counter"
            counterDuration={50}
          >
            <span
              className="block size-1.5 rounded-full bg-white/80 shadow-[0_0_6px_rgba(0,245,160,0.6)]"
              style={{
                animation: `pulse-soft ${2 + (i % 4) * 0.4}s ease-in-out infinite`,
              }}
            />
          </RingItem>
        ))}
      </Ring>

      {/* Owl */}
      <motion.div
        style={{
          x: owlX,
          y: owlY,
          width: `${OWL_DIAMETER_PCT * 100}%`,
          height: `${OWL_DIAMETER_PCT * 100}%`,
        }}
        className="animate-owl-breath absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src="/owl.svg"
          alt="Explat"
          className="block h-full w-full select-none object-contain drop-shadow-[0_0_30px_rgba(0,245,160,0.45)]"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/** Кольцо: видимая окружность + slot для items внутри.
 *  Items позиционируются абсолютно через RingItem. Кольцо вращается через
 *  CSS-анимацию на этом контейнере; items получают встречную анимацию
 *  внутри, чтобы их содержимое не вращалось. */
function Ring({
  radiusPct,
  rotateAnim,
  rotateDuration,
  ringStyle,
  children,
}: {
  radiusPct: number;
  rotateAnim: "orbit-cw" | "orbit-ccw";
  rotateDuration: number;
  ringStyle: "solid" | "dashed";
  children: ReactNode;
}) {
  const sizePct = radiusPct * 200; // диаметр в %
  return (
    <div
      aria-hidden
      style={{ width: `${sizePct}%`, height: `${sizePct}%` }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={
          "absolute inset-0 rounded-full border " +
          (ringStyle === "dashed"
            ? "border-dashed border-white/[0.08]"
            : "border-white/[0.06]")
        }
      />
      <div
        className="absolute inset-0"
        style={{
          animation: `${rotateAnim} ${rotateDuration}s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Item на кольце:
 *  - Position: trig-формулой (cos / sin), ставим в центр на угол `angle`,
 *    радиус 50% (т.к. ring уже масштабирован под нужный диаметр).
 *  - Counter-rotate: внутренний div крутится в обратную сторону,
 *    чтобы content (текст / точка) не наклонялся. */
function RingItem({
  index,
  count,
  counterAnim,
  counterDuration,
  children,
}: {
  index: number;
  count: number;
  /** для расчёта позиции — диаметр относительно ring'а всегда 100%, поэтому пробрасывать не надо */
  radiusPct: number;
  counterAnim: "orbit-cw-counter" | "orbit-ccw-counter";
  counterDuration: number;
  children: ReactNode;
}) {
  const angle = (index / count) * 2 * Math.PI;
  // Координаты на единичной окружности → проценты (50 = центр).
  const x = 50 + Math.cos(angle - Math.PI / 2) * 50;
  const y = 50 + Math.sin(angle - Math.PI / 2) * 50;
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          animation: `${counterAnim} ${counterDuration}s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function CurrencyChip({ code, flag }: { code: string; flag: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/85 px-2.5 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur">
      <span className="text-[12px] leading-none" aria-hidden>
        {flag}
      </span>
      <span className="font-mono text-[10px] font-semibold leading-none tracking-[0.12em] text-white/85">
        {code}
      </span>
    </span>
  );
}

/* ---------- Magnetic anchor ---------- */
function MagneticAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const max = 120;
      const dist = Math.hypot(dx, dy);
      if (dist > max) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setT({ x: 0, y: 0 }));
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setT({ x: dx * 0.12, y: dy * 0.12 }));
    };
    const onLeave = () => setT({ x: 0, y: 0 });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
