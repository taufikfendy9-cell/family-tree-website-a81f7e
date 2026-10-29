import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Newspaper } from 'lucide-react'
import { useState } from 'react'

import { PageIntro } from '@/components/page-intro'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDate, img, stories, type Story } from '@/lib/family'

export const Route = createFileRoute('/news')({
  head: () => ({ meta: [{ title: 'News · The Hartwell Family' }] }),
  component: NewsPage,
})

const categories = ['All', 'Births', 'Achievements', 'Home', 'Milestones'] as const

function NewsPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [reading, setReading] = useState<Story | null>(null)

  const sorted = [...stories].sort((a, b) => b.date.localeCompare(a.date))
  const shown = category === 'All' ? sorted : sorted.filter((s) => s.category === category)
  const [lead, ...rest] = shown

  return (
    <>
      <PageIntro icon={Newspaper} eyebrow="News" title="The Hartwell" accent="Herald">
        Births, graduations, new front doors and marathon medals — the family
        news worth passing around the table.
      </PageIntro>

      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y-2 border-double border-foreground/70 py-3">
          <p className="font-display text-sm tracking-[0.2em] uppercase">
            Vol. LXXIV · Autumn edition
          </p>
          <div role="group" aria-label="Filter news" className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {!lead && (
          <p className="py-20 text-center font-display text-2xl text-muted-foreground italic">
            No news in this section yet — check back soon.
          </p>
        )}

        {lead && (
          <button
            type="button"
            onClick={() => setReading(lead)}
            className="group mt-10 grid w-full gap-8 text-left lg:grid-cols-[1.3fr_1fr]"
          >
            {lead.file ? (
              <div className="overflow-hidden rounded-2xl ring-1 ring-border">
                <img
                  src={img(lead.file, 1000, 680)}
                  alt=""
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
            ) : (
              <div className="grid aspect-[3/2] place-items-center rounded-2xl bg-secondary font-display text-8xl text-gold italic">
                {lead.title[0]}
              </div>
            )}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                {lead.category} · {formatDate(lead.date)}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-balance group-hover:text-primary sm:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-accent">
                {lead.excerpt}
              </p>
              <span className="mt-6 flex items-center gap-2 font-medium text-primary">
                Read the full story
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        )}

        {rest.length > 0 && (
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((s) => (
              <li key={s.id} className="bg-card">
                <button
                  type="button"
                  onClick={() => setReading(s)}
                  className="group flex h-full w-full flex-col p-6 text-left transition-colors hover:bg-secondary/60"
                >
                  {s.file && (
                    <img
                      src={img(s.file, 480, 300)}
                      alt=""
                      loading="lazy"
                      className="mb-5 aspect-[8/5] w-full rounded-lg object-cover"
                    />
                  )}
                  <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                    {s.category}
                  </span>
                  <span className="mt-2 font-display text-xl leading-snug font-medium group-hover:text-primary">
                    {s.title}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground">{s.excerpt}</span>
                  <span className="mt-auto pt-5 text-xs text-muted-foreground">
                    {formatDate(s.date)} · by {s.author}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={!!reading} onOpenChange={(o) => !o && setReading(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-card sm:max-w-2xl">
          {reading && (
            <article>
              {reading.file && (
                <img
                  src={img(reading.file, 1000, 560)}
                  alt=""
                  className="-mx-6 -mt-6 mb-6 aspect-[16/9] w-[calc(100%+3rem)] max-w-none object-cover"
                />
              )}
              <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                {reading.category} · {formatDate(reading.date)}
              </p>
              <DialogTitle className="mt-3 font-display text-3xl leading-tight font-medium">
                {reading.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-base">
                {reading.excerpt}
              </DialogDescription>
              <div className="mt-5 space-y-4 leading-relaxed">
                {reading.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p className="mt-6 font-display text-muted-foreground italic">
                — {reading.author}
              </p>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
