import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeading } from "./section";

interface Country {
  flag: string;
  name: string;
  currency: string;
  methods: string;
  /** Координаты на «глобусе» — проценты от ширины/высоты карты. */
  x: number;
  y: number;
}

const COUNTRIES: readonly Country[] = [
  {
    flag: "🇷🇺",
    name: "Россия",
    currency: "RUB",
    methods: "СБП · Карты · MIR",
    x: 56,
    y: 22,
  },
  {
    flag: "🇰🇿",
    name: "Казахстан",
    currency: "KZT",
    methods: "Kaspi · Halyk · Jusan",
    x: 60,
    y: 30,
  },
  {
    flag: "🇺🇿",
    name: "Узбекистан",
    currency: "UZS",
    methods: "Humo · Uzcard · UzumBank",
    x: 60,
    y: 36,
  },
  {
    flag: "🇰🇬",
    name: "Кыргызстан",
    currency: "KGS",
    methods: "Mbank · MEGA · O!",
    x: 64,
    y: 35,
  },
  {
    flag: "🇮🇩",
    name: "Индонезия",
    currency: "IDR",
    methods: "GoPay · OVO · DANA",
    x: 75,
    y: 64,
  },
  {
    flag: "🇰🇷",
    name: "Корея",
    currency: "KRW",
    methods: "KakaoPay · Naver · Toss",
    x: 80,
    y: 30,
  },
  {
    flag: "🇪🇺",
    name: "Европа",
    currency: "EUR",
    methods: "SEPA · IBAN · Cards",
    x: 50,
    y: 28,
  },
];

export function Geo() {
  return (
    <Section id="geo">
      <SectionHeading
        eyebrow="География"
        number="02"
        title={
          <>
            Один API —{" "}
            <span className="text-gradient-accent">7 рынков</span>
          </>
        }
        description="Локальные методы оплаты в каждой стране. Принимайте RUB, KZT, UZS, KGS, EUR, IDR, KRW — settlement всегда в USDT, без задержек на банк-корреспонденте."
      />

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        {/* Stylised dotted globe / map */}
        <DottedMap countries={COUNTRIES} />

        {/* Country cards */}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
          {COUNTRIES.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: (i % 4) * 0.05,
              }}
              whileHover={{ y: -3 }}
              className="glass relative flex items-start gap-4 rounded-2xl p-4 transition-colors sm:p-5"
            >
              <div
                className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/[0.06] bg-black/40 text-3xl"
                aria-hidden
              >
                {c.flag}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-base font-semibold text-white">
                    {c.name}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-fg-dim)]">
                    {c.currency}
                  </span>
                </div>
                <div className="mt-1 truncate text-xs text-[color:var(--color-fg-muted)] sm:text-sm">
                  {c.methods}
                </div>
              </div>
              <span
                className="ml-auto flex size-2 shrink-0 translate-y-1 rounded-full bg-[color:var(--color-accent)]"
                title="Live"
                aria-hidden
              >
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-[color:var(--color-accent)] opacity-50" />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Стилизованная карта мира из точек с пинами стран (CSS-only).
 *  Точки генерим программно как сетка с прозрачностью; пины —
 *  абсолютно позиционированные элементы с пульсом. */
function DottedMap({ countries }: { countries: readonly Country[] }) {
  // Scroll-driven parallax: карта чуть наклоняется при скролле.
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tilt = useTransform(scrollYProgress, [0, 1], [4, -4]);
  const drift = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Сетка точек 28×16 — даёт «глобус-feel» без svg-карты.
  const cols = 36;
  const rows = 18;
  const dots: { x: number; y: number; alpha: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1)) * 100;
      const y = (r / (rows - 1)) * 100;
      // Лёгкий «континентальный» шум через расстояние от центра + sin
      const dx = x - 50;
      const dy = y - 50;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const wobble = Math.sin(c * 0.6) * 4 + Math.cos(r * 0.7) * 3;
      const visible = dist + wobble < 50;
      if (!visible) continue;
      dots.push({ x, y, alpha: 0.3 + (1 - dist / 60) * 0.45 });
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: tilt,
        // Лёгкий drift по Y чтобы карта «жила» при скролле.
        y: drift,
        transformPerspective: 1200,
      }}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,_#0e0e12_0%,_#050505_70%)] sm:aspect-[16/9]"
    >
      {/* Глоу за глобусом */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,_rgba(0,245,160,0.10),_transparent_70%)] blur-2xl" />
      </div>

      {/* Точки */}
      <div className="absolute inset-0 z-10">
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: 2,
              height: 2,
              opacity: d.alpha * 0.5,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* Пины стран */}
      <div className="absolute inset-0 z-20">
        {countries.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.3 + i * 0.12,
            }}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              {/* Pulse ring */}
              <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-[color:var(--color-accent)] opacity-50" />
              <span
                className="relative grid size-5 place-items-center rounded-full text-[11px] shadow-[0_0_0_2px_rgba(0,0,0,0.6),0_0_18px_rgba(0,245,160,0.7)]"
                style={{
                  background:
                    "radial-gradient(closest-side, var(--color-accent), #0a8c5e)",
                }}
                aria-hidden
              />
              {/* Tooltip flag */}
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.08] bg-black/80 px-2 py-1 text-[10px] font-medium text-white/85 backdrop-blur sm:text-xs">
                <span className="mr-1">{c.flag}</span>
                {c.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle scanline */}
      <motion.div
        initial={{ x: "-30%" }}
        animate={{ x: "130%" }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(0,245,160,0.06),transparent)]"
      />
    </motion.div>
  );
}
