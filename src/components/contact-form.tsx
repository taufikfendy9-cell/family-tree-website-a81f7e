import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type State = 'idle' | 'pending' | 'success' | 'error'

export const topics = [
  'General hello',
  'Event RSVP',
  'Share family news',
  'Send photos',
  'Join the next trip',
  'Order the cookbook',
]

export function ContactForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(
        await response.text(),
      )
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="flex flex-col items-center py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="size-8" />
        </span>
        <p className="mt-6 font-display text-3xl font-medium">Thank you!</p>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Your note has reached the family. Someone will put the kettle on and
          write back soon.
        </p>
        <Button variant="outline" className="mt-8 rounded-full" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your message</legend>
        <div className="grid gap-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Cousin Alfie" className="h-11 bg-background" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="h-11 bg-background" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="topic">What's it about?</Label>
          <select
            id="topic"
            name="topic"
            className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required maxLength={2000} rows={6} placeholder="Tell us everything…" className="bg-background" />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <Button type="submit" size="lg" className="rounded-full px-7">
            {state === 'pending' ? (
              <>
                <Loader2 className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send /> Send to the family
              </>
            )}
          </Button>
          {state === 'error' && (
            <p role="alert" className="text-sm text-destructive">
              Your message couldn't be sent. Your words are still here — please
              try again in a moment.
            </p>
          )}
        </div>
      </fieldset>
    </form>
  )
}
