import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../../test/renderApp'

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^username$/i), 'kisalto')
  await user.type(screen.getByLabelText(/discord id/i), 'kisalto')
  await user.type(screen.getByLabelText(/^email$/i), 'kisalto@feelthenight.gg')
  await user.type(screen.getByLabelText(/^password$/i), 'nightfall1')
  await user.type(screen.getByLabelText(/confirm password/i), 'nightfall1')
}

describe('Register', () => {
  it('renders the five fields from the design', () => {
    renderApp('/register')

    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/discord id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'password')
  })

  it('reports errors on an empty submission and does not clear the form', async () => {
    const user = userEvent.setup()
    renderApp('/register')

    await user.click(screen.getByRole('button', { name: /divide!/i }))

    expect(screen.getByText(/choose a username/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your discord id/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^username$/i)).toHaveAttribute('aria-invalid', 'true')
  })

  it('reports mismatched passwords', async () => {
    const user = userEvent.setup()
    renderApp('/register')

    await fillValidForm(user)
    await user.clear(screen.getByLabelText(/confirm password/i))
    await user.type(screen.getByLabelText(/confirm password/i), 'nightfall2')
    await user.click(screen.getByRole('button', { name: /divide!/i }))

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('accepts a valid submission and says no account was created', async () => {
    const user = userEvent.setup()
    renderApp('/register')

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /divide!/i }))

    expect(screen.queryByText(/check the highlighted fields/i)).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/accounts are not created yet/i)
  })

  it('toggles password visibility from the keyboard', async () => {
    const user = userEvent.setup()
    renderApp('/register')

    const password = screen.getByLabelText(/^password$/i)
    const toggle = screen.getAllByRole('button', { name: /show/i })[0]

    expect(password).toHaveAttribute('type', 'password')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    toggle.focus()
    await user.keyboard('{Enter}')

    expect(password).toHaveAttribute('type', 'text')
    expect(screen.getAllByRole('button', { name: /hide/i })[0]).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
