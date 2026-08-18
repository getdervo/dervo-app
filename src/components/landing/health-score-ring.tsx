"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const RADIUS = 33;
/** 2πr for r=33, matching the handoff's stated circumference. */
const CIRCUMFERENCE = 207;
const SCORE = 38;
const ARC = Math.round((SCORE / 100) * CIRCUMFERENCE);

export function HealthScoreRing() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  return (
    <svg
      ref={ref}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      role="img"
      aria-label={`Business health score ${SCORE} out of 100`}
    >
      <circle
        cx="40"
        cy="40"
        r={RADIUS}
        fill="none"
        stroke="#e4ebf6"
        strokeWidth="8"
      />
      <motion.circle
        cx="40"
        cy="40"
        r={RADIUS}
        fill="none"
        stroke="#e04545"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
        transform="rotate(-90 40 40)"
        initial={{ strokeDashoffset: ARC }}
        animate={{ strokeDashoffset: inView ? 0 : ARC }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
      />
      <text
        x="40"
        y="42"
        textAnchor="middle"
        fontSize="21"
        fontWeight="700"
        fill="#01092d"
      >
        {SCORE}
      </text>
      <text x="40" y="56" textAnchor="middle" fontSize="9.5" fill="#5b6b85">
        /100
      </text>
    </svg>
  );
}
