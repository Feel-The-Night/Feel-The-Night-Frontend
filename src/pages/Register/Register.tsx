import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import AuthField from '../../components/auth/AuthField'
import AuthPanel, { type AuthStatus } from '../../components/auth/AuthPanel'
import PasswordField from '../../components/auth/PasswordField'
import {
  hasErrors,
  validateRegister,
  type FieldErrors,
  type RegisterField,
  type RegisterValues,
} from '../../components/auth/validation'
import styles from './Register.module.css'

const EMPTY: RegisterValues = {
  username: '',
  discordId: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Register() {
  const [values, setValues] = useState<RegisterValues>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors<RegisterField>>({})
  const [status, setStatus] = useState<AuthStatus>('idle')

  const update = (field: RegisterField) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const found = validateRegister(values)
    setErrors(found)

    if (hasErrors(found)) {
      setStatus('error')
      return
    }

    /* Demo only: there is no API yet, so the form just reports success. */
    setStatus('success')
  }

  const message =
    status === 'error'
      ? 'Check the highlighted fields.'
      : status === 'success'
        ? 'Looks good. Accounts are not created yet - the backend is still to come.'
        : undefined

  return (
    <div className={styles.page}>
      <AuthPanel
        title="Register"
        submitLabel="divide!"
        status={status}
        message={message}
        onSubmit={handleSubmit}
        footer={
          <>
            Already have an account? <Link to="/login">Log in</Link>
          </>
        }
      >
        <AuthField
          id="username"
          label="Username"
          placeholder="Enter your username..."
          autoComplete="username"
          value={values.username}
          error={errors.username}
          onChange={(event) => update('username')(event.target.value)}
        />
        <AuthField
          id="discordId"
          label="discord id"
          placeholder="Enter your discord id..."
          value={values.discordId}
          error={errors.discordId}
          onChange={(event) => update('discordId')(event.target.value)}
        />
        <AuthField
          id="email"
          label="email"
          type="email"
          placeholder="Enter your email..."
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email')(event.target.value)}
        />
        <PasswordField
          id="password"
          label="password"
          placeholder="Enter your password..."
          autoComplete="new-password"
          value={values.password}
          error={errors.password}
          onChange={update('password')}
        />
        <PasswordField
          id="confirmPassword"
          label="confirm password"
          placeholder="confirm your password..."
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={update('confirmPassword')}
        />
      </AuthPanel>
    </div>
  )
}
