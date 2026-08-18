"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/** easeOutExpo-ish — fast out of the gate, long settle. */
const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Resolved once at module scope — looking these up inside a component would
 * count as creating a component during render, which the React Compiler
 * rejects (and which would reset state on every render).
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  ol: motion.ol,
  ul: motion.ul,
  li: motion.li,
  article: motion.article,
  figure: motion.figure,
} as const;

type Tag = keyof typeof TAGS;

/**
 * Fade + rise a single block into place as it enters the viewport.
 * Under prefers-reduced-motion this collapses to a plain fade with no travel.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];

  return (
    <Tag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduce ? 0 : 0.65,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Container whose StaggerItem children animate in sequence. Motion propagates
 * the variant name down the tree, so children need no props of their own.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger = 0.12,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };

  return (
    <Tag
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <Tag data-reveal="" className={className} variants={variants}>
      {children}
    </Tag>
  );
}

/** Draws the dashed connector left-to-right once the steps are in view. */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      data-reveal=""
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.15 }}
    />
  );
}
