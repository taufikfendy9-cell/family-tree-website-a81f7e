import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'

import { Ornament } from '@/components/page-intro'
import { events, family, formatDate, img, photos, sections } from '@/lib/family'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const nextEvent = events[0]
  const album = photos.slice(1, 5)

  return (
    <>
      {/* Hero: family name + portrait */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--gold)_30%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-content px-4 pt-12 text-center sm:px-6 md:pt-16">
          <p className="rise flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            <span className="h-px w-8 bg-accent/50" />
            Est. {family.established} · {family.homestead}
            <span className="h-px w-8 bg-accent/50" />
          </p>
          <h1
            className="rise mt-6 font-display leading-[0.85] font-medium tracking-tight"
            style={{ animationDelay: '100ms' }}
          >
            <span className="block text-2xl font-light text-muted-foreground italic sm:text-3xl">
              The
            </span>
            <span className="block text-[clamp(4rem,15vw,12rem)]">
              {family.surname}
            </span>
            <span className="-mt-2 block text-[clamp(2.25rem,7vw,5.5rem)] font-light text-accent italic">
              Family
            </span>
          </h1>
        </div>

        <div
          className="rise relative mx-auto mt-10 max-w-content px-4 sm:px-6"
          style={{ animationDelay: '250ms' }}
        >
          <figure className="relative rounded-t-[min(14vw,12rem)] rounded-b-2xl bg-card p-2.5 shadow-[0_40px_80px_-30px_color-mix(in_oklch,var(--primary)_55%,transparent)] ring-1 ring-border sm:p-3.5">
            <div className="overflow-hidden rounded-t-[min(13vw,11rem)] rounded-b-xl">
              <img
                src={img('hero-family.png', 1600)}
                srcSet={`${img('hero-family.png', 800)} 800w, ${img('hero-family.png', 1200)} 1200w, ${img('hero-family.png', 1600)} 1600w, ${img('hero-family.png', 2200)} 2200w`}
                sizes="(min-width: 1216px) 1180px, 100vw"
                alt={`The extended ${family.surname} family, four generations, gathered on the lawn under the old oak at Oakridge Farm`}
                width={1376}
                height={768}
                fetchPriority="high"
                className="aspect-[16/9] w-full object-cover transition-transform duration-[2s] ease-out hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-2 pt-3 pb-1 text-sm text-muted-foreground">
              <span className="font-display italic">
                Summer reunion, 2026 — all forty-one of us (and Biscuit the dog)
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-accent" /> Under the old oak
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section icons */}
      <section aria-labelledby="explore" className="mx-auto max-w-content px-4 pt-16 sm:px-6">
        <h2 id="explore" className="sr-only">
          Explore the family site
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sections.map(({ to, label, blurb, icon: Icon }, i) => (
            <li
              key={to}
              className={`rise ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <Link
                to={to}
                className="group relative flex h-full flex-col items-center rounded-3xl border border-border/80 bg-card px-4 pt-8 pb-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_40px_-20px_color-mix(in_oklch,var(--accent)_45%,transparent)] focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="relative grid size-20 place-items-center">
                  <span className="absolute inset-0 rounded-full border border-dashed border-gold/70 transition-transform duration-700 group-hover:rotate-90 motion-reduce:transition-none" />
                  <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent">
                    <Icon className="size-7" strokeWidth={1.6} />
                  </span>
                </span>
                <span className="mt-5 font-display text-2xl font-medium">
                  {label}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {blurb}
                </span>
                <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Story + stats */}
      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <Ornament />
        <p className="mx-auto mt-8 max-w-3xl text-center font-display text-3xl leading-snug font-light text-balance sm:text-4xl">
          {family.intro}
        </p>
        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-10 border-y border-border py-10 md:grid-cols-4">
          {family.stats.map((s) => (
            <div key={s.label} className="flex flex-col text-center">
              <dt className="order-2 mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-5xl font-medium text-primary">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Album teaser + next event */}
      <section className="mx-auto grid max-w-content gap-10 px-4 pt-24 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-medium">
              From the <em className="font-light text-accent">album</em>
            </h2>
            <Link
              to="/gallery"
              className="group flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              See all photos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {album.map((p, i) => (
              <Link
                key={p.file}
                to="/gallery"
                className="group block rounded-sm bg-card p-2 pb-8 shadow-md ring-1 ring-border transition-transform duration-300 hover:z-10 hover:scale-105 motion-reduce:transition-none"
                style={{ rotate: `${[-3, 2, -1.5, 3][i]}deg` }}
              >
                <img
                  src={img(p.file, 360, 420)}
                  alt={p.caption}
                  loading="lazy"
                  width={360}
                  height={420}
                  className="aspect-[6/7] w-full object-cover"
                />
                <span className="mt-2 block text-center font-display text-sm italic">
                  {p.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/events"
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground"
        >
          <div
            aria-hidden
            className="absolute -right-16 -bottom-16 size-64 rounded-full border-[28px] border-gold/20 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
          />
          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Next gathering
            </p>
            <p className="mt-4 font-display text-4xl leading-tight font-medium">
              {nextEvent.title}
            </p>
            <p className="mt-3 text-primary-foreground/75">
              {nextEvent.description}
            </p>
          </div>
          <div className="relative mt-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-2xl italic">
                {formatDate(nextEvent.start, { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <p className="text-sm text-primary-foreground/70">
                {nextEvent.time} · {nextEvent.place}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent transition-transform group-hover:rotate-[-45deg] motion-reduce:transition-none">
              <ArrowRight className="size-5" />
            </span>
          </div>
        </Link>
      </section>
    </>
  )
}
