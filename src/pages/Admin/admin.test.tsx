import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderApp } from '../../test/renderApp'

function rowNames(): string[] {
  const rows = screen.queryAllByRole('row')
  return rows
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0]?.textContent ?? '')
}

describe('admin dashboard', () => {
  it('renders at /admin with summary figures from the demo data', () => {
    renderApp('/admin')

    expect(screen.getByRole('heading', { level: 1, name: /administration/i })).toBeInTheDocument()
    expect(screen.getByText('Total users').previousSibling).toHaveTextContent('6')
    expect(screen.getByText('Active users').previousSibling).toHaveTextContent('4')
    expect(screen.getByText('Administrators').previousSibling).toHaveTextContent('1')
  })

  it('says nothing is connected to a backend', () => {
    renderApp('/admin')
    expect(screen.getByText(/admin api is not connected/i)).toBeInTheDocument()
  })

  it('is reachable from its own sidebar, not the public navigation', () => {
    renderApp('/admin')
    expect(screen.getByRole('navigation', { name: /administration/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Guides' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to site/i })).toHaveAttribute('href', '/')
  })
})

describe('admin users list', () => {
  it('lists every demo account', () => {
    renderApp('/admin/users')
    expect(screen.getByRole('heading', { level: 1, name: 'Users' })).toBeInTheDocument()
    expect(rowNames()).toHaveLength(6)
  })

  it('searches by name, username and email', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users')

    const search = screen.getByLabelText(/search/i)

    await user.type(search, 'tsukibito')
    expect(rowNames()).toHaveLength(1)

    await user.clear(search)
    await user.type(search, 'zate@example.invalid')
    expect(rowNames()[0]).toMatch(/zate/i)

    await user.clear(search)
    await user.type(search, 'nobody')
    expect(screen.getByText(/no users match these filters/i)).toBeInTheDocument()
  })

  it('filters by role', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users')

    await user.selectOptions(screen.getByLabelText(/^role$/i), 'editor')
    expect(rowNames()).toHaveLength(2)
  })

  it('filters by status', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users')

    await user.selectOptions(screen.getByLabelText(/^status$/i), 'inactive')
    expect(rowNames()).toHaveLength(2)
  })

  it('combines search with both filters', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users')

    await user.selectOptions(screen.getByLabelText(/^role$/i), 'member')
    await user.selectOptions(screen.getByLabelText(/^status$/i), 'active')
    expect(rowNames()).toHaveLength(1)
    expect(rowNames()[0]).toMatch(/lucsa/i)
  })

  it('links each row to its edit page and to the create form', () => {
    renderApp('/admin/users')
    expect(screen.getAllByRole('link', { name: /view \/ edit/i })[0]).toHaveAttribute(
      'href',
      '/admin/users/u-001',
    )
    expect(screen.getByRole('link', { name: /create user/i })).toHaveAttribute(
      'href',
      '/admin/users/new',
    )
  })
})

describe('create user', () => {
  it('renders every field', () => {
    renderApp('/admin/users/new')

    expect(screen.getByRole('heading', { level: 1, name: /create user/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/temporary password/i)).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText(/^role$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^status$/i)).toBeInTheDocument()
  })

  it('reports invalid input and marks the fields', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/new')

    await user.click(screen.getByRole('button', { name: /create user/i }))

    expect(screen.getByText(/enter a display name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/display name/i)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('status')).toHaveTextContent(/check the highlighted fields/i)
  })

  it('reports a password mismatch', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/new')

    await user.type(screen.getByLabelText(/display name/i), 'Demo Person')
    await user.type(screen.getByLabelText(/^username$/i), 'demoperson')
    await user.type(screen.getByLabelText(/^email$/i), 'demo@example.invalid')
    await user.type(screen.getByLabelText(/temporary password/i), 'nightfall1')
    await user.type(screen.getByLabelText(/confirm password/i), 'nightfall2')
    await user.click(screen.getByRole('button', { name: /create user/i }))

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('says explicitly that no account was created on a valid submission', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/new')

    await user.type(screen.getByLabelText(/display name/i), 'Demo Person')
    await user.type(screen.getByLabelText(/^username$/i), 'demoperson')
    await user.type(screen.getByLabelText(/^email$/i), 'demo@example.invalid')
    await user.type(screen.getByLabelText(/temporary password/i), 'nightfall1')
    await user.type(screen.getByLabelText(/confirm password/i), 'nightfall1')
    await user.click(screen.getByRole('button', { name: /create user/i }))

    expect(screen.getByRole('status')).toHaveTextContent(
      /no account was created or changed because the admin api is not connected/i,
    )
  })
})

describe('permissions', () => {
  it('loads the defaults for the selected role', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/new')

    expect(screen.getByRole('checkbox', { name: /manage guides/i })).not.toBeChecked()

    await user.selectOptions(screen.getByLabelText(/^role$/i), 'editor')
    expect(screen.getByRole('checkbox', { name: /manage guides/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /manage community/i })).not.toBeChecked()

    await user.selectOptions(screen.getByLabelText(/^role$/i), 'administrator')
    expect(screen.getByRole('checkbox', { name: /manage users/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /manage community/i })).toBeChecked()
  })

  it('lets the admin override a single permission', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/new')

    await user.selectOptions(screen.getByLabelText(/^role$/i), 'editor')
    const community = screen.getByRole('checkbox', { name: /manage community/i })

    await user.click(community)
    expect(community).toBeChecked()

    const guides = screen.getByRole('checkbox', { name: /manage guides/i })
    await user.click(guides)
    expect(guides).not.toBeChecked()
  })
})

describe('edit user', () => {
  it('loads an existing account without its password', () => {
    renderApp('/admin/users/u-002')

    expect(screen.getByRole('heading', { level: 1, name: /edit notfoxof/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^username$/i)).toHaveValue('notfoxof')
    expect(screen.getByLabelText(/^role$/i)).toHaveValue('moderator')
    expect(screen.getByLabelText(/new password/i)).toHaveValue('')
    expect(screen.getByRole('checkbox', { name: /manage community/i })).toBeChecked()
  })

  it('saves nothing and says so', async () => {
    const user = userEvent.setup()
    renderApp('/admin/users/u-002')

    await user.click(screen.getByRole('button', { name: /save changes/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/admin api is not connected/i)
  })

  it('shows a not-found state with a way back', () => {
    renderApp('/admin/users/does-not-exist')

    expect(screen.getByRole('heading', { level: 1, name: /user not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to users/i })).toHaveAttribute(
      'href',
      '/admin/users',
    )
  })
})
