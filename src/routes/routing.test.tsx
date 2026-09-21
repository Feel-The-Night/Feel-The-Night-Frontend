import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../test/renderApp'
import { navItems } from './navigation'

describe('routing', () => {
  it.each([
    ['/', 'Feel The Night'],
    ['/start', 'Survive the night'],
    ['/guides', 'Guides'],
    ['/community', 'Community'],
    ['/characters', 'Character select'],
    ['/events', 'Events'],
    ['/register', 'Register'],
    ['/login', 'Login'],
    ['/does-not-exist', 'Page not found'],
  ])('renders %s with its own heading', (route, heading) => {
    renderApp(route)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('navigates from the header and marks the active item', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('link', { name: 'Guides' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Guides' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('aria-current', 'page')
  })

  it('exposes every nav destination as a real link', () => {
    renderApp('/')
    for (const item of navItems) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.path)
    }
  })
})
