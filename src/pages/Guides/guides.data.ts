/**
 * Guides shown on /guides.
 *
 * The four entries are the sample rows drawn in the Figma file (node 142:3),
 * kept in their original languages.
 *
 * Two fields are NOT in the Figma file and exist only so sorting and the
 * character filter have something to work on:
 *   - `date`    placeholder publication dates
 *   - `character` only "Akaza" appears anywhere in the design; the rest are
 *                 null until the roster is defined
 * Replace both once the real data exists.
 */

/** Characters with at least one guide. Add a name here as the roster grows. */
export type GuideCharacter = 'Akaza'

export type Guide = {
  id: string
  title: string
  author: string
  tags: string[]
  character: GuideCharacter | null
  /** ISO date (YYYY-MM-DD), used for sorting only. */
  date: string
  /** Character thumbnail exported from Figma. See src/assets/README.md. */
  thumbnail?: string
}

export const ALL_CHARACTERS = 'all'

export type CharacterFilter = typeof ALL_CHARACTERS | GuideCharacter

export type GuideSort = 'newest' | 'oldest'

export const guides: Guide[] = [
  {
    id: 'guia-manero',
    title: 'Titulo muito manero do guia manero',
    author: 'kisalto | akaza | lucsa',
    tags: ['BNB', 'Midscreen', 'Setup'],
    character: 'Akaza',
    date: '2026-09-08',
  },
  {
    id: 'very-cool-guide',
    title: 'Very cool title for a very cool guide',
    author: 'notfoxof',
    tags: ['All Around'],
    character: null,
    date: '2026-08-21',
  },
  {
    id: 'guia-genial',
    title: 'Título genial de la guía genial.',
    author: 'algum espanhol',
    tags: ['Pressure', 'Mixup'],
    character: null,
    date: '2026-07-02',
  },
  {
    id: 'cool-guide-jp',
    title: 'クールなガイドのとてもクールなタイトル',
    author: 'tsukibito',
    tags: ['Optimize'],
    character: null,
    date: '2026-09-15',
  },
]

/** Character buttons are derived from the guides, so the filter never offers
    a character with no guides behind it. */
export const guideCharacters: GuideCharacter[] = Array.from(
  new Set(
    guides
      .map((guide) => guide.character)
      .filter((character): character is GuideCharacter => character !== null),
  ),
)

export const sortOptions: { value: GuideSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
]

export function matchesSearch(guide: Guide, query: string): boolean {
  const haystack = [
    guide.title,
    guide.author,
    guide.character ?? '',
    ...guide.tags,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export function sortGuides(list: Guide[], sort: GuideSort): Guide[] {
  return [...list].sort((a, b) =>
    sort === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
  )
}
