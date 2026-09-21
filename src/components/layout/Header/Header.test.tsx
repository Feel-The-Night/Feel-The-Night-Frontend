import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../../../test/renderApp'

describe('Header menu', () => {
  it('starts collapsed and reports its state', () => {
    renderApp('/')
    expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('opens and closes from the keyboard', async () => {
    const user = userEvent.setup()
    renderApp('/')

    const toggle = screen.getByRole('button', { name: /menu/i })
    toggle.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: /close/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('closes after navigating', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: /menu/i }))
    await user.click(screen.getByRole('link', { name: 'Events' }))

    expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
