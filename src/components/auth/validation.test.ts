import { describe, expect, it } from 'vitest'

import { validateLogin, validateRegister, type RegisterValues } from './validation'

const valid: RegisterValues = {
  username: 'kisalto',
  discordId: 'kisalto',
  email: 'kisalto@feelthenight.gg',
  password: 'nightfall1',
  confirmPassword: 'nightfall1',
}

describe('validateRegister', () => {
  it('accepts a complete, well formed submission', () => {
    expect(validateRegister(valid)).toEqual({})
  })

  it('reports every empty field', () => {
    const errors = validateRegister({
      username: '',
      discordId: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    expect(Object.keys(errors)).toHaveLength(5)
  })

  it('rejects a malformed email', () => {
    expect(validateRegister({ ...valid, email: 'kisalto@' }).email).toBeDefined()
  })

  it('rejects a password without digits', () => {
    const errors = validateRegister({
      ...valid,
      password: 'nightfallx',
      confirmPassword: 'nightfallx',
    })
    expect(errors.password).toBeDefined()
  })

  it('rejects a short password', () => {
    const errors = validateRegister({ ...valid, password: 'a1b2', confirmPassword: 'a1b2' })
    expect(errors.password).toBeDefined()
  })

  it('rejects mismatched confirmation', () => {
    const errors = validateRegister({ ...valid, confirmPassword: 'nightfall2' })
    expect(errors.confirmPassword).toBeDefined()
    expect(errors.password).toBeUndefined()
  })

  it('accepts the legacy discord handle format', () => {
    expect(validateRegister({ ...valid, discordId: 'kisalto#4417' }).discordId).toBeUndefined()
  })

  it('rejects a discord id with spaces', () => {
    expect(validateRegister({ ...valid, discordId: 'not valid' }).discordId).toBeDefined()
  })
})

describe('validateLogin', () => {
  it('accepts a filled form', () => {
    expect(validateLogin({ identifier: 'kisalto', password: 'nightfall1' })).toEqual({})
  })

  it('reports both empty fields', () => {
    const errors = validateLogin({ identifier: '  ', password: '' })
    expect(errors.identifier).toBeDefined()
    expect(errors.password).toBeDefined()
  })
})
