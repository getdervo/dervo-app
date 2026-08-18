/**
 * Lucide icon paths, inlined at the handoff's stroke-width of 2.75 rather than
 * pulling in lucide-react — the design supplies the exact paths, so inlining
 * keeps fidelity guaranteed and the dependency list short.
 */
type IconProps = {
  size?: number;
  className?: string;
};

function Stroke({
  size = 24,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5a6 6 0 1 0-9 0c.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </Stroke>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </Stroke>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Stroke>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Stroke>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r=".5" />
    </Stroke>
  );
}

export function MessageSquareIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Stroke>
  );
}

export function BarChartIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 16v-5" />
      <path d="M12 16V8" />
      <path d="M17 16v-8" />
    </Stroke>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </Stroke>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
    </Stroke>
  );
}

/** Three rounded bars forming a "D". `onDark` swaps to the footer variant. */
export function DervoMark({
  size = 38,
  onDark = false,
}: {
  size?: number;
  onDark?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="5" y="6" width="30" height="10" rx="5" fill="#aee37b" />
      <rect
        x="5"
        y="19"
        width="38"
        height="10"
        rx="5"
        fill={onDark ? "#f0fff4" : "#0464de"}
      />
      <rect
        x="5"
        y="32"
        width="30"
        height="10"
        rx="5"
        fill={onDark ? "rgba(240,255,244,.55)" : "#01092d"}
      />
    </svg>
  );
}
