import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../../test/renderApp'

describe('Login', () => {
  it('renders both fields', () => {
    renderApp('/login')

    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password')
  })

  it('reports empty fields', async () => {
    const user = userEvent.setup()
    renderApp('/login')

    await user.click(screen.getByRole('button', { name: /enter/i }))

    expect(screen.getByText(/enter your username or email/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your password/i)).toBeInTheDocument()
  })

  it('accepts a filled form without pretending to sign in', async () => {
    const user = userEvent.setup()
    renderApp('/login')

    await user.type(screen.getByLabelText(/username or email/i), 'kisalto')
    await user.type(screen.getByLabelText(/^password$/i), 'nightfall1')
    await user.click(screen.getByRole('button', { name: /enter/i }))

    expect(screen.getByRole('status')).toHaveTextContent(/not wired up yet/i)
  })

  it('links to the register page', () => {
    renderApp('/login')
    expect(screen.getByRole('link', { name: /^register$/i })).toHaveAttribute('href', '/register')
  })
})
