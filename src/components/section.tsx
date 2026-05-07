import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function SectionEyebrow({
  children,
  number,
}: {
  children: ReactNode;
  /** Опциональный номер секции — рендерится моно-шрифтом до названия. */
  number?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] backdrop-blur"
    >
      {number ? (
        <span className="font-mono text-[10px] tracking-[0.24em] text-[color:var(--color-fg-dim)]">
          {number}
        </span>
      ) : null}
      <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
      <span className="text-[color:var(--color-accent)]">{children}</span>
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  number,
  title,
  description,
  align = "center",
}: {
  eyebrow?: ReactNode;
  number?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.08 }}
      className={cn(
        "flex w-full flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start"
      )}
    >
      {eyebrow ? (
        <SectionEyebrow number={number}>{eyebrow}</SectionEyebrow>
      ) : null}
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-[56px]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "max-w-2xl text-pretty text-base text-[color:var(--color-fg-muted)] sm:text-lg",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}
