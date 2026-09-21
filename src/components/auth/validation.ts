/** Client-side validation for the auth forms. No network, no backend. */

export type FieldErrors<TField extends string> = Partial<Record<TField, string>>

export type RegisterValues = {
  username: string
  discordId: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterField = keyof RegisterValues

export type LoginValues = {
  identifier: string
  password: string
}

export type LoginField = keyof LoginValues

const USERNAME = /^[a-zA-Z0-9_-]{3,32}$/
/** Current Discord handles, plus the legacy name#1234 form. */
const DISCORD_ID = /^(?:[a-z0-9._]{2,32}|[^\s#]{2,32}#\d{4})$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MIN_PASSWORD_LENGTH = 8

export function validateRegister(values: RegisterValues): FieldErrors<RegisterField> {
  const errors: FieldErrors<RegisterField> = {}

  if (!values.username.trim()) {
    errors.username = 'Choose a username.'
  } else if (!USERNAME.test(values.username.trim())) {
    errors.username = 'Use 3 to 32 letters, numbers, hyphens or underscores.'
  }

  if (!values.discordId.trim()) {
    errors.discordId = 'Enter your Discord ID.'
  } else if (!DISCORD_ID.test(values.discordId.trim())) {
    errors.discordId = 'That does not look like a Discord ID.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email.'
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Choose a password.'
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`
  } else if (!/[a-zA-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = 'Mix letters and numbers.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'The passwords do not match.'
  }

  return errors
}

export function validateLogin(values: LoginValues): FieldErrors<LoginField> {
  const errors: FieldErrors<LoginField> = {}

  if (!values.identifier.trim()) {
    errors.identifier = 'Enter your username or email.'
  }

  if (!values.password) {
    errors.password = 'Enter your password.'
  }

  return errors
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some((message) => Boolean(message))
}
