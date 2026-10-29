import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { family, sections } from '@/lib/family'

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-full border border-gold/70 bg-primary font-display text-primary-foreground italic shadow-[inset_0_0_0_3px_var(--primary),inset_0_0_0_4px_color-mix(in_oklch,var(--gold)_60%,transparent)] ${className}`}
    >
      {family.surname[0]}
    </span>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3 rounded-md">
          <Monogram className="size-9 text-lg transition-transform duration-300 group-hover:rotate-[-8deg] motion-reduce:transition-none" />
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight">
              {family.surname}
            </span>
            <span className="block text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
              Est. {family.established}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {sections.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground motion-reduce:transition-none"
              activeProps={{
                className: 'bg-primary !text-primary-foreground hover:bg-primary',
              }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">
                The {family.surname}s
              </SheetTitle>
              <SheetDescription>Where would you like to go?</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {sections.map(({ to, label, blurb, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-secondary"
                  activeProps={{ className: 'bg-secondary' }}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {blurb}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
