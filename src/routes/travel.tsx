import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Compass, Plane, Sparkles } from 'lucide-react'

import { PageIntro } from '@/components/page-intro'
import { img, nextTrip, trips } from '@/lib/family'

export const Route = createFileRoute('/travel')({
  head: () => ({ meta: [{ title: 'Travel · The Hartwell Family' }] }),
  component: TravelPage,
})

function TravelPage() {
  return (
    <>
      <PageIntro icon={Plane} eyebrow="Travel" title="Postcards from" accent="afar">
        We scatter, we wander, and we always bring back stories. A journal of
        Hartwell journeys — and the next adventure we're planning together.
      </PageIntro>

      <div className="mx-auto max-w-content space-y-24 px-4 sm:px-6">
        {trips.map((t, i) => (
          <article
            key={t.id}
            className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
          >
            <div className="relative">
              <div
                className="overflow-hidden rounded-[1.75rem] bg-card p-3 shadow-xl ring-1 ring-border"
                style={{ rotate: i % 2 ? '1.5deg' : '-1.5deg' }}
              >
                <img
                  src={img(t.file, 900, 675)}
                  srcSet={`${img(t.file, 600, 450)} 600w, ${img(t.file, 900, 675)} 900w, ${img(t.file, 1200, 900)} 1200w`}
                  sizes="(min-width: 1024px) 580px, 100vw"
                  alt={`${t.place}, ${t.country}`}
                  loading={i ? 'lazy' : 'eager'}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </div>
              {/* Passport stamp */}
              <div
                className={`absolute -bottom-6 grid size-28 place-items-center rounded-full border-2 border-dashed border-accent bg-background/90 text-center text-accent backdrop-blur ${i % 2 ? '-left-3' : '-right-3'}`}
                style={{ rotate: '-14deg' }}
              >
                <span>
                  <span className="block font-display text-3xl leading-none">{t.year}</span>
                  <span className="mt-1 block text-[0.6rem] font-semibold tracking-[0.2em] uppercase">
                    {t.country}
                  </span>
                </span>
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                <Compass className="size-4 text-accent" /> {t.coords}
              </p>
              <h2 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl">
                {t.place}
              </h2>
              <p className="mt-2 font-display text-lg text-accent italic">{t.who}</p>
              <p className="mt-5 text-lg text-muted-foreground">{t.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <section className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-12 text-accent-foreground sm:px-12">
          <Plane
            aria-hidden
            className="absolute -right-6 -bottom-8 size-56 rotate-[-20deg] opacity-15"
            strokeWidth={1}
          />
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase">
            <Sparkles className="size-4" /> Next family trip
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
            {nextTrip.place}
          </h2>
          <p className="mt-2 font-display text-xl italic opacity-90">{nextTrip.dates}</p>
          <p className="mt-4 max-w-xl opacity-90">{nextTrip.note}</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-medium text-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            Count me in <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </>
  )
}
