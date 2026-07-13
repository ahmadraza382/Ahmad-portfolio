// Tiny, dependency-free skeleton block. Uses the site's `soft` token
// and Tailwind's core `animate-pulse`. Purely presentational.
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-soft rounded-[8px] animate-pulse ${className}`} aria-hidden="true" />;
}
