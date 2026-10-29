// All family content lives here. Edit names, dates, and stories in this one file.
import {
  Calendar,
  Images,
  Mail,
  Newspaper,
  Plane,
  type LucideIcon,
} from 'lucide-react'

export const family = {
  surname: 'Hartwell',
  established: 1952,
  homestead: 'Oakridge Farm, Cotswolds',
  motto: 'Rooted together, growing apart, always coming home.',
  intro:
    'Four generations, one old oak tree, and a long table that keeps getting longer. This is where we keep our photographs, plans, news, and the stories we want our grandchildren to know.',
  stats: [
    { value: '4', label: 'Generations' },
    { value: '38', label: 'Family members' },
    { value: '7', label: 'Countries we call home' },
    { value: '73', label: 'Years of reunions' },
  ],
}

/** Builds a Netlify Image CDN URL for an image saved in public/img. */
export function img(file: string, w: number, h?: number) {
  const size = h ? `&w=${w}&h=${h}&fit=cover` : `&w=${w}`
  return `/.netlify/images?url=/img/${file}${size}&fm=webp&q=78`
}

export type Section = {
  to: '/gallery' | '/events' | '/news' | '/travel' | '/contact'
  label: string
  blurb: string
  icon: LucideIcon
}

export const sections: Section[] = [
  {
    to: '/gallery',
    label: 'Gallery',
    blurb: 'Photographs across the years',
    icon: Images,
  },
  {
    to: '/events',
    label: 'Events',
    blurb: 'Reunions, birthdays & gatherings',
    icon: Calendar,
  },
  {
    to: '/news',
    label: 'News',
    blurb: 'Births, milestones & updates',
    icon: Newspaper,
  },
  {
    to: '/travel',
    label: 'Travel',
    blurb: 'Journeys near and far',
    icon: Plane,
  },
  {
    to: '/contact',
    label: 'Contact',
    blurb: 'Write to the family',
    icon: Mail,
  },
]

export type Photo = {
  file: string
  title: string
  caption: string
  year: number
  category: 'Gatherings' | 'Kitchen' | 'Outdoors' | 'Celebrations'
  tall?: boolean
}

export const photos: Photo[] = [
  {
    file: 'hero-family.png',
    title: 'The whole clan',
    caption: 'Our summer portrait under the old oak at Oakridge Farm.',
    year: 2026,
    category: 'Gatherings',
  },
  {
    file: 'g-grandma-baking.png',
    title: "Nana Rose's bread",
    caption: 'Lily learns the recipe that has fed us since 1961.',
    year: 2025,
    category: 'Kitchen',
    tall: true,
  },
  {
    file: 'g-picnic.png',
    title: 'Long-table lunch',
    caption: 'Sunday picnic after the reunion cricket match.',
    year: 2025,
    category: 'Gatherings',
  },
  {
    file: 'g-beach.png',
    title: 'St Ives at sunset',
    caption: 'Three generations, one barefoot walk.',
    year: 2024,
    category: 'Outdoors',
  },
  {
    file: 'g-fishing.png',
    title: 'Early start',
    caption: 'Grandpa Arthur and Theo on the dock at Lake Windermere.',
    year: 2024,
    category: 'Outdoors',
    tall: true,
  },
  {
    file: 'g-wedding.png',
    title: "Clara & Sam's wedding",
    caption: 'Dancing under the lights until well past midnight.',
    year: 2023,
    category: 'Celebrations',
  },
  {
    file: 'g-holiday.png',
    title: 'Christmas Eve',
    caption: 'The cousins’ toast, an annual tradition since 1988.',
    year: 2025,
    category: 'Celebrations',
  },
  {
    file: 'g-garden.png',
    title: 'Apple harvest',
    caption: 'Aunt June and the little ones in the orchard.',
    year: 2024,
    category: 'Outdoors',
  },
  {
    file: 'g-campfire.png',
    title: 'Campfire stories',
    caption: 'Marshmallows, ghost stories, and far too many stars.',
    year: 2025,
    category: 'Gatherings',
  },
]

export type FamilyEvent = {
  id: string
  title: string
  start: string // ISO date
  end?: string
  time: string
  place: string
  description: string
  kind: 'Reunion' | 'Birthday' | 'Anniversary' | 'Holiday'
  host: string
}

export const events: FamilyEvent[] = [
  {
    id: 'harvest-supper-2026',
    title: 'Harvest Supper',
    start: '2026-11-14',
    time: '6:00 pm',
    place: 'Oakridge Farm barn',
    description:
      'Bring a dish made with something you grew, picked, or bartered for. Pie contest judged by the under-tens.',
    kind: 'Holiday',
    host: 'June & David',
  },
  {
    id: 'nana-rose-90',
    title: "Nana Rose turns 90",
    start: '2026-12-05',
    time: '1:00 pm',
    place: 'The Kings Arms, Chipping Norton',
    description:
      'A surprise lunch for our matriarch. Please send a favourite photo of you with Nana for the memory book by 20 November.',
    kind: 'Birthday',
    host: 'The grandchildren',
  },
  {
    id: 'christmas-eve-2026',
    title: 'Christmas Eve at the Farm',
    start: '2026-12-24',
    time: '4:00 pm',
    place: 'Oakridge Farm',
    description:
      'Carols by the fire, the cousins’ toast, and the great Hartwell cracker pull. Sleeping bags welcome.',
    kind: 'Holiday',
    host: 'Arthur & Rose',
  },
  {
    id: 'ruby-anniversary',
    title: "Tom & Helen's Ruby Anniversary",
    start: '2027-03-20',
    time: '7:00 pm',
    place: 'Bath Assembly Rooms',
    description:
      'Forty years married! Dinner and dancing — dress code is “something red”.',
    kind: 'Anniversary',
    host: 'Clara, Ben & Ellie',
  },
  {
    id: 'reunion-2027',
    title: 'The 75th Hartwell Reunion',
    start: '2027-07-24',
    end: '2027-07-26',
    time: 'All weekend',
    place: 'Oakridge Farm, Cotswolds',
    description:
      'Three days of cricket, cake, and catching up. Camping in the top field, ceilidh on Saturday night, and the annual portrait under the oak.',
    kind: 'Reunion',
    host: 'Reunion committee',
  },
]

export const pastEvents = [
  { year: 2026, title: '74th Reunion', note: '41 attended · new record' },
  { year: 2025, title: "Theo's christening", note: 'St Mary’s, Burford' },
  { year: 2024, title: 'Lake District week', note: '3 cottages, 1 lake' },
  { year: 2023, title: "Clara & Sam's wedding", note: 'The orchard, Oakridge' },
]

export type Story = {
  id: string
  title: string
  date: string
  category: 'Births' | 'Milestones' | 'Home' | 'Achievements'
  excerpt: string
  body: string[]
  author: string
  file?: string
}

export const stories: Story[] = [
  {
    id: 'welcome-iris',
    title: 'Welcome to the world, Iris May',
    date: '2026-09-18',
    category: 'Births',
    excerpt:
      'Clara and Sam welcomed a daughter at 3:42 am — 7lb 2oz and already the loudest Hartwell.',
    body: [
      'Iris May Hartwell-Okafor arrived on a rainy Thursday morning at the John Radcliffe Hospital. Mother and baby are doing beautifully; Sam is running on coffee and joy.',
      'She is Nana Rose’s eleventh great-grandchild, and the first to share her middle name. Visits are welcome from October — please check with Clara first.',
    ],
    author: 'Helen Hartwell',
    file: 'n-baby.png',
  },
  {
    id: 'ellie-graduates',
    title: 'Ellie graduates with first-class honours',
    date: '2026-07-11',
    category: 'Achievements',
    excerpt:
      'Ellie is now officially a marine biologist — and Grandpa Arthur cried more than anyone.',
    body: [
      'After four years in Plymouth, Ellie graduated with a First in Marine Biology. Her dissertation on seagrass restoration is being published next spring.',
      'She starts a research post in Lisbon in January, so expect a new Travel entry soon.',
    ],
    author: 'Tom Hartwell',
    file: 'n-graduation.png',
  },
  {
    id: 'farmhouse-restored',
    title: 'The farmhouse gets a new green door',
    date: '2026-05-02',
    category: 'Home',
    excerpt:
      'Eighteen months of weekends later, the old Oakridge farmhouse restoration is finally finished.',
    body: [
      'New roof slates, a rebuilt chimney, and a front door painted the exact shade of green Great-Grandpa Walter chose in 1952.',
      'Huge thanks to everyone who gave up a Saturday to sand floors. The kettle is always on.',
    ],
    author: 'David Hartwell',
    file: 'n-garden-house.png',
  },
  {
    id: 'cookbook',
    title: 'The family cookbook is at the printers',
    date: '2026-03-15',
    category: 'Milestones',
    excerpt:
      '62 recipes, five generations, one very sticky manuscript. Copies arrive in time for Christmas.',
    body: [
      'From Nana Rose’s bread to Ben’s questionable chilli, every recipe comes with a story. Order your copy through the Contact page.',
    ],
    author: 'June Hartwell',
  },
  {
    id: 'marathon',
    title: 'Ben runs the London Marathon',
    date: '2026-04-27',
    category: 'Achievements',
    excerpt:
      '4 hours 12 minutes and £3,400 raised for the local hospice. Legs still recovering.',
    body: [
      'Ben ran in memory of Great-Aunt Margaret, raising money for the hospice that cared for her. The family cheering squad at mile 18 had a banner and a lot of jelly babies.',
    ],
    author: 'Clara Hartwell-Okafor',
  },
]

export type Trip = {
  id: string
  place: string
  country: string
  year: number
  file: string
  who: string
  summary: string
  highlights: string[]
  coords: string
}

export const trips: Trip[] = [
  {
    id: 'como',
    place: 'Lake Como',
    country: 'Italy',
    year: 2025,
    file: 't-lakes.png',
    who: 'Tom, Helen & the grandchildren',
    summary:
      'A week in a lakeside cabin with a leaky canoe, endless gelato, and one unforgettable thunderstorm.',
    highlights: ['Ferry to Bellagio', 'Swimming at dawn', 'Pasta-making class'],
    coords: '45.98° N, 9.26° E',
  },
  {
    id: 'kyoto',
    place: 'Kyoto',
    country: 'Japan',
    year: 2024,
    file: 't-kyoto.png',
    who: 'Clara & Sam',
    summary:
      'Autumn leaves, temple bells, and a ryokan breakfast that ruined toast for them forever.',
    highlights: ['Fushimi Inari at sunrise', 'Arashiyama bamboo', 'Tea ceremony'],
    coords: '35.01° N, 135.77° E',
  },
  {
    id: 'cornwall',
    place: 'South West Coast Path',
    country: 'Cornwall, UK',
    year: 2023,
    file: 't-coast.png',
    who: 'David, June & friends',
    summary:
      '74 miles on foot from Padstow to St Ives, fuelled entirely by pasties and stubbornness.',
    highlights: ['Bedruthan Steps', 'Wild camping', 'Seal spotting'],
    coords: '50.21° N, 5.48° W',
  },
]

export const nextTrip = {
  place: 'Lisbon & the Algarve',
  dates: 'April 2027',
  note: 'Visiting Ellie at her new research post. 14 Hartwells have said yes so far — room for more.',
}

export const contacts = [
  {
    role: 'Reunion committee',
    name: 'June Hartwell',
    detail: 'reunion@hartwellfamily.example',
  },
  {
    role: 'Family archivist',
    name: 'Helen Hartwell',
    detail: 'archive@hartwellfamily.example',
  },
  {
    role: 'Oakridge Farm',
    name: 'Arthur & Rose',
    detail: 'Oakridge Lane, Burford, OX18',
  },
]

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    'en-GB',
    opts ?? { day: 'numeric', month: 'long', year: 'numeric' },
  )
}
