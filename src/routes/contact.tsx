import { createFileRoute } from '@tanstack/react-router'
import { Archive, Home, Mail, Users } from 'lucide-react'

import { ContactForm } from '@/components/contact-form'
import { PageIntro } from '@/components/page-intro'
import { contacts, family, img } from '@/lib/family'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact · The Hartwell Family' }] }),
  component: ContactPage,
})

const contactIcons = [Users, Archive, Home]

function ContactPage() {
  return (
    <>
      <PageIntro icon={Mail} eyebrow="Contact" title="Write to the" accent="family">
        RSVPs, old photographs, long-lost cousins, or just a hello — every
        letter finds its way to the kitchen table at Oakridge.
      </PageIntro>

      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={img('n-garden-house.png', 700, 520)}
              alt="The Oakridge farmhouse with its green front door"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl text-primary-foreground italic">
              The door is always open at {family.homestead.split(',')[0]}.
            </p>
          </div>
          {contacts.map((c, i) => {
            const Icon = contactIcons[i] ?? Mail
            return (
              <div
                key={c.role}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                    {c.role}
                  </p>
                  <p className="font-medium">{c.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{c.detail}</p>
                </div>
              </div>
            )
          })}
        </aside>

        <section
          aria-labelledby="write"
          className="relative rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_60px_-40px_color-mix(in_oklch,var(--primary)_60%,transparent)] sm:p-10"
        >
          {/* Postage stamp */}
          <div
            aria-hidden
            className="absolute -top-5 right-8 hidden rotate-6 rounded-sm bg-accent p-1.5 shadow-md sm:block"
          >
            <div className="grid size-16 place-items-center border-2 border-dashed border-accent-foreground/60 font-display text-3xl text-accent-foreground italic">
              {family.surname[0]}
            </div>
          </div>
          <h2 id="write" className="font-display text-3xl font-medium">
            Dear {family.surname}s,
          </h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            Fill in the note below and it goes straight to the family inbox.
          </p>
          <ContactForm />
        </section>
      </div>
    </>
  )
}
