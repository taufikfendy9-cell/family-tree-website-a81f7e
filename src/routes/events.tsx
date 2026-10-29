import { createFileRoute } from '@tanstack/react-router'
import { Calendar, CalendarPlus, Clock, MapPin, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Ornament, PageIntro } from '@/components/page-intro'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { events, formatDate, pastEvents, type FamilyEvent } from '@/lib/family'

export const Route = createFileRoute('/events')({
  head: () => ({ meta: [{ title: 'Events · The Hartwell Family' }] }),
  component: EventsPage,
})

const kindStyles: Record<FamilyEvent['kind'], string> = {
  Reunion: 'bg-primary text-primary-foreground',
  Birthday: 'bg-accent text-accent-foreground',
  Anniversary: 'bg-gold text-foreground',
  Holiday: 'bg-secondary text-secondary-foreground',
}

function downloadIcs(e: FamilyEvent) {
  const d = (iso: string) => iso.replaceAll('-', '')
  const endDate = new Date(`${e.end ?? e.start}T12:00:00`)
  endDate.setDate(endDate.getDate() + 1)
  const end = endDate.toISOString().slice(0, 10)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hartwell Family//Events//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}@hartwellfamily`,
    `DTSTART;VALUE=DATE:${d(e.start)}`,
    `DTEND;VALUE=DATE:${d(end)}`,
    `SUMMARY:${e.title}`,
    `LOCATION:${e.place}`,
    `DESCRIPTION:${e.time} — ${e.description.replace(/[,;]/g, '\\$&')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${e.id}.ics`
  a.click()
  URL.revokeObjectURL(url)
  toast.success('Added to your downloads', {
    description: `Open ${e.id}.ics to save “${e.title}” to your calendar.`,
  })
}

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    const target = new Date(`${iso}T18:00:00`).getTime()
    const tick = () => setLeft(Math.max(0, target - Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [iso])
  if (left === null) return null
  const s = Math.floor(left / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function EventsPage() {
  const reunion = events.find((e) => e.kind === 'Reunion') ?? events[0]
  const countdown = useCountdown(reunion.start)

  return (
    <>
      <PageIntro icon={Calendar} eyebrow="Events" title="Save the" accent="dates">
        Reunions, birthdays, and every excuse we can find to gather around the
        long table. Download any event straight into your calendar.
      </PageIntro>

      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* Countdown */}
        <section className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-primary-foreground sm:px-12">
          <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full border-[36px] border-gold/15" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
                Counting down to
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
                {reunion.title}
              </h2>
              <p className="mt-2 text-primary-foreground/75">
                {formatDate(reunion.start, { day: 'numeric', month: 'long' })}
                {reunion.end && `–${formatDate(reunion.end)}`} · {reunion.place}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-live="off">
              {(['days', 'hours', 'minutes', 'seconds'] as const).map((k) => (
                <div
                  key={k}
                  className="min-w-[4.25rem] rounded-2xl bg-primary-foreground/10 px-2 py-4 text-center ring-1 ring-primary-foreground/15 sm:min-w-[5.5rem]"
                >
                  <span className="block font-display text-3xl tabular-nums sm:text-5xl">
                    {countdown ? String(countdown[k]).padStart(2, '0') : '––'}
                  </span>
                  <span className="mt-1 block text-[0.65rem] tracking-[0.2em] text-primary-foreground/60 uppercase">
                    {k}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming */}
        <section aria-labelledby="upcoming" className="mt-20">
          <h2 id="upcoming" className="font-display text-4xl font-medium">
            Coming <em className="font-light text-accent">up</em>
          </h2>
          <ol className="relative mt-10 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[2.6rem] before:w-px before:bg-border sm:before:left-[3.1rem]">
            {events.map((e, i) => {
              const d = new Date(`${e.start}T12:00:00`)
              return (
                <li
                  key={e.id}
                  className="rise relative grid grid-cols-[5.25rem_1fr] gap-4 sm:grid-cols-[6.25rem_1fr] sm:gap-6"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative z-10 flex h-fit flex-col items-center rounded-2xl border border-border bg-card py-3 shadow-sm">
                    <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                      {d.toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                    <span className="font-display text-4xl leading-none font-medium">
                      {d.getDate()}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {d.getFullYear()}
                    </span>
                  </div>
                  <article className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--primary)_50%,transparent)]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Badge className={`rounded-full ${kindStyles[e.kind]}`}>
                          {e.kind}
                        </Badge>
                        <h3 className="mt-3 font-display text-2xl font-medium">
                          {e.title}
                        </h3>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => downloadIcs(e)}
                      >
                        <CalendarPlus /> Add to calendar
                      </Button>
                    </div>
                    <p className="mt-3 text-muted-foreground">{e.description}</p>
                    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Time</dt>
                        <Clock className="size-4 text-accent" />
                        <dd>{e.time}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Place</dt>
                        <MapPin className="size-4 text-accent" />
                        <dd>{e.place}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Host</dt>
                        <Users className="size-4 text-accent" />
                        <dd>Hosted by {e.host}</dd>
                      </div>
                    </dl>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Past */}
        <section aria-labelledby="past" className="mt-24">
          <Ornament />
          <h2 id="past" className="mt-6 text-center font-display text-3xl font-medium">
            Fondly <em className="font-light text-accent">remembered</em>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((p) => (
              <li key={p.title} className="rounded-2xl border border-dashed border-gold/70 p-6 text-center">
                <p className="font-display text-4xl text-gold">{p.year}</p>
                <p className="mt-2 font-medium">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
