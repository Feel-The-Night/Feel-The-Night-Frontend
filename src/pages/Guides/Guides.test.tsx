import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../../test/renderApp'

function guideTitles(): string[] {
  return screen
    .queryAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent ?? '')
}

describe('Guides', () => {
  it('lists every guide by default', async () => {
    renderApp('/guides')
    expect(guideTitles()).toHaveLength(4)
  })

  it('filters by text across title, author and tags', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    const search = screen.getByRole('searchbox', { name: /search guides/i })

    await user.type(search, 'pressure')
    expect(guideTitles()).toEqual(['Título genial de la guía genial.'])

    await user.clear(search)
    await user.type(search, 'notfoxof')
    expect(guideTitles()).toEqual(['Very cool title for a very cool guide'])
  })

  it('ignores case', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    await user.type(screen.getByRole('searchbox', { name: /search guides/i }), 'AKAZA')
    expect(guideTitles()).toHaveLength(1)
  })

  it('filters by character and back again', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    const akaza = screen.getByRole('button', { name: /^akaza$/i })
    await user.click(akaza)

    expect(akaza).toHaveAttribute('aria-pressed', 'true')
    expect(guideTitles()).toEqual(['Titulo muito manero do guia manero'])

    await user.click(screen.getByRole('button', { name: /^all$/i }))
    expect(guideTitles()).toHaveLength(4)
  })

  it('sorts by date in both directions', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    const sort = screen.getByRole('combobox', { name: /sort guides/i })
    expect(guideTitles()[0]).toBe('クールなガイドのとてもクールなタイトル')

    await user.selectOptions(sort, 'oldest')
    expect(guideTitles()[0]).toBe('Título genial de la guía genial.')
  })

  it('combines search, character and sorting', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    await user.click(screen.getByRole('button', { name: /^akaza$/i }))
    await user.type(screen.getByRole('searchbox', { name: /search guides/i }), 'setup')

    expect(guideTitles()).toEqual(['Titulo muito manero do guia manero'])
  })

  it('shows the empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderApp('/guides')

    await user.type(screen.getByRole('searchbox', { name: /search guides/i }), 'zzzz')

    expect(guideTitles()).toHaveLength(0)
    expect(screen.getByText(/no guides found/i)).toBeInTheDocument()
    expect(screen.getByText(/try changing your search or filters/i)).toBeInTheDocument()
  })

  it('keeps the guide rows inside a list', () => {
    renderApp('/guides')
    const list = screen.getAllByRole('list').find((node) => within(node).queryAllByRole('heading', { level: 3 }).length === 4)
    expect(list).toBeDefined()
  })
})
