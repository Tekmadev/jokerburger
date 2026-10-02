import type { SVGProps } from "react";
import type { Suit } from "@/data/menu";

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

const suitPaths: Record<Suit, string> = {
  spade:
    "M12 1.5C9.4 5.7 3.4 8.6 3.4 13.5c0 2.7 2.1 4.7 4.6 4.7 1.4 0 2.6-.6 3.3-1.6-.1 2.3-1 3.9-2.7 5h6.8c-1.7-1.1-2.6-2.7-2.7-5 .7 1 1.9 1.6 3.3 1.6 2.5 0 4.6-2 4.6-4.7 0-4.9-6-7.8-8.6-12z",
  heart:
    "M12 21.3s-8.7-5.3-10-10.7C1.1 6.8 3.4 3.5 6.9 3.5c2.2 0 3.9 1.3 5.1 3.2 1.2-1.9 2.9-3.2 5.1-3.2 3.5 0 5.8 3.3 4.9 7.1-1.3 5.4-10 10.7-10 10.7z",
  diamond: "M12 1.5 20.2 12 12 22.5 3.8 12z",
  club: "M12 1.8a4.7 4.7 0 0 0-4.5 6.1 4.7 4.7 0 1 0 3.3 8.3c-.2 2.3-1.1 3.9-2.8 5h8c-1.7-1.1-2.6-2.7-2.8-5a4.7 4.7 0 1 0 3.3-8.3A4.7 4.7 0 0 0 12 1.8z",
};

/** Card suit, drawn as SVG so it never turns into an emoji on phones. */
export function SuitIcon({ suit, ...props }: IconProps & { suit: Suit }) {
  return (
    <Solid {...props}>
      <path d={suitPaths[suit]} />
    </Solid>
  );
}

export const suitTone: Record<Suit, "red" | "dark"> = {
  spade: "dark",
  heart: "red",
  diamond: "red",
  club: "dark",
};

export function JokerStar(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M12 1.8 14.6 8l6.7.6-5.1 4.4 1.6 6.6L12 16.1l-5.8 3.5 1.6-6.6-5.1-4.4 6.7-.6z" />
    </Solid>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </Solid>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Stroke>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1z" />
    </Stroke>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </Stroke>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Stroke>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7" />
    </Stroke>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
      <path d="M17.5 6.5h.01" />
    </Stroke>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Stroke>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.7 1.7-3 3.4-2.5V9.7c-3.5-.5-6.5 2.2-6.5 5.6 0 3.3 2.8 5.7 5.7 5.7 3.1 0 5.7-2.6 5.7-5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3s-1.9.1-3.2-1.5z" />
    </Solid>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Stroke>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <Solid {...props}>
      <path d="M4.6 19.5c-1.1-1.2-1.6-2.5-1.6-4.6 0-3.6 2.6-6.9 6.3-8.5l.9 1.4C6.7 9.7 6 11.8 5.8 13.2c.6-.3 1.3-.4 2-.3 1.9.2 3.4 1.7 3.4 3.7a3.7 3.7 0 0 1-3.7 3.7 4 4 0 0 1-2.9-.8zm10.4 0c-1.1-1.2-1.6-2.5-1.6-4.6 0-3.6 2.6-6.9 6.3-8.5l.9 1.4c-3.5 1.9-4.2 4-4.4 5.4.6-.3 1.3-.4 2-.3 1.9.2 3.4 1.7 3.4 3.7a3.7 3.7 0 0 1-3.7 3.7 4 4 0 0 1-2.9-.8z" />
    </Solid>
  );
}
