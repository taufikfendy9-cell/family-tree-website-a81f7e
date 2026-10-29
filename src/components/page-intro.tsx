import type { LucideIcon } from 'lucide-react'

export function PageIntro({
  icon: Icon,
  eyebrow,
  title,
  accent,
  children,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--gold)_35%,transparent),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-content px-4 pt-14 pb-10 sm:px-6 md:pt-20">
        <p className="rise flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent uppercase">
          <span className="grid size-9 place-items-center rounded-full border border-accent/40 bg-card">
            <Icon className="size-4" />
          </span>
          {eyebrow}
        </p>
        <h1
          className="rise mt-6 font-display text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-7xl"
          style={{ animationDelay: '80ms' }}
        >
          {title} <em className="font-light text-accent">{accent}</em>
        </h1>
        <div
          className="rise mt-6 max-w-reading text-lg text-muted-foreground"
          style={{ animationDelay: '160ms' }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
    >
      <span className="h-px w-16 bg-current opacity-60" />
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 2c1.5 4 4 6.5 8 8-4 1.5-6.5 4-8 8-1.5-4-4-6.5-8-8 4-1.5 6.5-4 8-8z" />
      </svg>
      <span className="h-px w-16 bg-current opacity-60" />
    </div>
  )
}
