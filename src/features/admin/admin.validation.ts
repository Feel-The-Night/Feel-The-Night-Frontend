/** Client-side validation for the administrative account form. */

import {
  EMAIL,
  USERNAME,
  passwordProblem,
  type FieldErrors,
} from '../../components/auth/validation'
import { ADMIN_ROLES } from './admin.config'
import type { AdminUserFormField, AdminUserFormValues } from './admin.types'

export type AdminUserErrors = FieldErrors<AdminUserFormField>

type Options = {
  /** Edit never asks for the current password; a blank one is left alone. */
  requirePassword: boolean
}

export function validateAdminUser(
  values: AdminUserFormValues,
  { requirePassword }: Options,
): AdminUserErrors {
  const errors: AdminUserErrors = {}

  if (!values.displayName.trim()) {
    errors.displayName = 'Enter a display name.'
  }

  if (!values.username.trim()) {
    errors.username = 'Enter a username.'
  } else if (!USERNAME.test(values.username.trim())) {
    errors.username = 'Use 3 to 32 letters, numbers, hyphens or underscores.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter an email.'
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  const wantsPassword = requirePassword || values.password.length > 0
  if (wantsPassword) {
    const problem = passwordProblem(values.password)
    if (problem) {
      errors.password = problem
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'The passwords do not match.'
    }
    if (!problem && !values.confirmPassword) {
      errors.confirmPassword = 'Confirm the password.'
    }
  }

  if (!ADMIN_ROLES.some((role) => role.value === values.role)) {
    errors.role = 'Choose a role.'
  }

  return errors
}
