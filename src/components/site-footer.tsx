import { Link } from '@tanstack/react-router'

import { Monogram } from '@/components/site-header'
import { family, sections } from '@/lib/family'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <svg
        aria-hidden
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-px h-6 w-full fill-background"
      >
        <path d="M0 0h1440v8c-240 28-480 28-720 10S240 0 0 22z" />
      </svg>
      <div className="mx-auto grid max-w-content gap-10 px-4 pt-20 pb-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram className="size-12 text-2xl" />
            <p className="font-display text-3xl font-semibold">
              The {family.surname} Family
            </p>
          </div>
          <p className="mt-5 max-w-sm font-display text-lg text-primary-foreground/75 italic">
            “{family.motto}”
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          <Link
            to="/"
            className="text-sm text-primary-foreground/75 transition-colors hover:text-gold"
          >
            Home
          </Link>
          {sections.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-primary-foreground/75 transition-colors hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-content flex-wrap justify-between gap-2 border-t border-primary-foreground/15 px-4 py-6 text-xs tracking-wide text-primary-foreground/60 sm:px-6">
        <span>{family.homestead}</span>
        <span>
          Since {family.established} · Made with love by the{' '}
          {family.surname}s
        </span>
      </div>
    </footer>
  )
}
