import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { PageIntro } from '@/components/page-intro'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { img, photos, type Photo } from '@/lib/family'

export const Route = createFileRoute('/gallery')({
  head: () => ({ meta: [{ title: 'Gallery · The Hartwell Family' }] }),
  component: GalleryPage,
})

const filters = ['All', 'Gatherings', 'Celebrations', 'Outdoors', 'Kitchen'] as const

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [open, setOpen] = useState<number | null>(null)

  const shown = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  )

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const current: Photo | undefined = open === null ? undefined : shown[open]

  return (
    <>
      <PageIntro icon={Images} eyebrow="Gallery" title="Our family" accent="album">
        Seventy-odd years of birthdays, harvests, weddings, and muddy walks.
        Tap any photo to see it up close.
      </PageIntro>

      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent/60 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              {f}
              <span className="ml-2 text-xs opacity-60">
                {f === 'All' ? photos.length : photos.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((p, i) => (
            <li key={p.file} className="rise mb-5 break-inside-avoid" style={{ animationDelay: `${i * 60}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-muted text-left ring-1 ring-border focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                <img
                  src={img(p.file, 720)}
                  srcSet={`${img(p.file, 480)} 480w, ${img(p.file, 720)} 720w, ${img(p.file, 960)} 960w`}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  alt={p.caption}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${p.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                  <span className="text-xs tracking-[0.2em] uppercase opacity-80">
                    {p.category} · {p.year}
                  </span>
                  <span className="mt-1 block font-display text-2xl">{p.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[min(92vw,72rem)] gap-0 overflow-hidden border-none bg-foreground p-0 text-primary-foreground sm:max-w-[min(92vw,72rem)]">
          {current && (
            <>
              <div className="relative bg-black">
                <img
                  src={img(current.file, 1600)}
                  alt={current.caption}
                  className="max-h-[75vh] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-foreground transition hover:bg-background"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-foreground transition hover:bg-background"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-5">
                <div>
                  <DialogTitle className="font-display text-2xl font-medium">
                    {current.title}
                  </DialogTitle>
                  <DialogDescription className="text-primary-foreground/70">
                    {current.caption}
                  </DialogDescription>
                </div>
                <span className="text-sm text-primary-foreground/60">
                  {(open ?? 0) + 1} / {shown.length} · {current.year}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
