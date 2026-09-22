import { describe, expect, it } from 'vitest'

import { DEFAULT_PERMISSIONS } from './admin.config'
import { validateAdminUser } from './admin.validation'
import type { AdminUserFormValues } from './admin.types'

const valid: AdminUserFormValues = {
  displayName: 'Kisalto (demo)',
  username: 'kisalto',
  email: 'kisalto@example.invalid',
  password: 'nightfall1',
  confirmPassword: 'nightfall1',
  role: 'moderator',
  status: 'active',
  permissions: DEFAULT_PERMISSIONS.moderator,
}

describe('validateAdminUser', () => {
  it('accepts a complete creation', () => {
    expect(validateAdminUser(valid, { requirePassword: true })).toEqual({})
  })

  it('requires display name, username and email', () => {
    const errors = validateAdminUser(
      { ...valid, displayName: ' ', username: '', email: '' },
      { requirePassword: true },
    )
    expect(errors.displayName).toBeDefined()
    expect(errors.username).toBeDefined()
    expect(errors.email).toBeDefined()
  })

  it('rejects a username outside 3 to 32 characters', () => {
    expect(
      validateAdminUser({ ...valid, username: 'ab' }, { requirePassword: true }).username,
    ).toBeDefined()
    expect(
      validateAdminUser({ ...valid, username: 'a'.repeat(33) }, { requirePassword: true })
        .username,
    ).toBeDefined()
  })

  it('rejects a weak temporary password', () => {
    const short = validateAdminUser(
      { ...valid, password: 'abc1', confirmPassword: 'abc1' },
      { requirePassword: true },
    )
    const lettersOnly = validateAdminUser(
      { ...valid, password: 'nightfallx', confirmPassword: 'nightfallx' },
      { requirePassword: true },
    )
    expect(short.password).toBeDefined()
    expect(lettersOnly.password).toBeDefined()
  })

  it('rejects a mismatched confirmation', () => {
    const errors = validateAdminUser(
      { ...valid, confirmPassword: 'nightfall2' },
      { requirePassword: true },
    )
    expect(errors.confirmPassword).toBeDefined()
  })

  it('leaves the password alone when editing and the field is blank', () => {
    const errors = validateAdminUser(
      { ...valid, password: '', confirmPassword: '' },
      { requirePassword: false },
    )
    expect(errors).toEqual({})
  })

  it('still checks a password typed while editing', () => {
    const errors = validateAdminUser(
      { ...valid, password: 'abc', confirmPassword: 'abc' },
      { requirePassword: false },
    )
    expect(errors.password).toBeDefined()
  })
})

describe('role defaults', () => {
  it('gives administrators every permission and members none', () => {
    expect(DEFAULT_PERMISSIONS.administrator).toHaveLength(5)
    expect(DEFAULT_PERMISSIONS.member).toHaveLength(0)
  })

  it('keeps moderators above editors', () => {
    expect(DEFAULT_PERMISSIONS.moderator).toContain('manage_community')
    expect(DEFAULT_PERMISSIONS.editor).not.toContain('manage_community')
  })
})
