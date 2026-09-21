import { useMemo, useState } from 'react'

import GuideCard from './GuideCard'
import {
  ALL_CHARACTERS,
  guideCharacters,
  guides,
  matchesSearch,
  sortGuides,
  sortOptions,
  type CharacterFilter,
  type GuideSort,
} from './guides.data'
import styles from './Guides.module.css'

export default function Guides() {
  const [search, setSearch] = useState('')
  const [character, setCharacter] = useState<CharacterFilter>(ALL_CHARACTERS)
  const [sort, setSort] = useState<GuideSort>('newest')

  const visibleGuides = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = guides.filter((guide) => {
      const matchesCharacter =
        character === ALL_CHARACTERS || guide.character === character
      return matchesCharacter && (query === '' || matchesSearch(guide, query))
    })

    return sortGuides(filtered, sort)
  }, [search, character, sort])

  const characterFilters: CharacterFilter[] = [
    ALL_CHARACTERS,
    ...guideCharacters,
  ]

  return (
    <section className={styles.page}>
      <h1 className={styles.srOnly}>Guides</h1>

      <div className={styles.panel}>
        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search..."
              aria-label="Search guides"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className={styles.sort}
              aria-label="Sort guides by date"
              value={sort}
              onChange={(event) => setSort(event.target.value as GuideSort)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <fieldset className={styles.filters}>
            <legend className={styles.srOnly}>Filter by character</legend>
            {characterFilters.map((filter) => (
              <button
                className={`${styles.characterSlot} ${
                  filter === character ? styles.characterSlotActive : ''
                }`}
                key={filter}
                type="button"
                aria-pressed={filter === character}
                onClick={() => setCharacter(filter)}
              >
                {filter === ALL_CHARACTERS ? 'All' : filter}
              </button>
            ))}
          </fieldset>
        </div>

        <p className={styles.srOnly} role="status">
          {visibleGuides.length} guide{visibleGuides.length === 1 ? '' : 's'} shown
        </p>

        {visibleGuides.length > 0 ? (
          <ul className={styles.list}>
            {visibleGuides.map((guide) => (
              <li key={guide.id}>
                <GuideCard {...guide} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No guides found</p>
            <p className={styles.emptyText}>
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
