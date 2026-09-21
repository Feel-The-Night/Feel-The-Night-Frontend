import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import AuthField from '../../components/auth/AuthField'
import AuthPanel, { type AuthStatus } from '../../components/auth/AuthPanel'
import PasswordField from '../../components/auth/PasswordField'
import {
  hasErrors,
  validateLogin,
  type FieldErrors,
  type LoginField,
  type LoginValues,
} from '../../components/auth/validation'
import styles from './Login.module.css'

const EMPTY: LoginValues = { identifier: '', password: '' }

export default function Login() {
  const [values, setValues] = useState<LoginValues>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({})
  const [status, setStatus] = useState<AuthStatus>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const found = validateLogin(values)
    setErrors(found)

    if (hasErrors(found)) {
      setStatus('error')
      return
    }

    /* Demo only: no session is created, there is no API yet. */
    setStatus('success')
  }

  const message =
    status === 'error'
      ? 'Check the highlighted fields.'
      : status === 'success'
        ? 'Looks good. Sign-in is not wired up yet - the backend is still to come.'
        : undefined

  return (
    <div className={styles.page}>
      <AuthPanel
        title="Login"
        submitLabel="enter"
        status={status}
        message={message}
        onSubmit={handleSubmit}
        footer={
          <>
            No account yet? <Link to="/register">Register</Link>
          </>
        }
      >
        <AuthField
          id="identifier"
          label="username or email"
          placeholder="Enter your username or email..."
          autoComplete="username"
          value={values.identifier}
          error={errors.identifier}
          onChange={(event) =>
            setValues((current) => ({ ...current, identifier: event.target.value }))
          }
        />
        <PasswordField
          id="loginPassword"
          label="password"
          placeholder="Enter your password..."
          autoComplete="current-password"
          value={values.password}
          error={errors.password}
          onChange={(value) =>
            setValues((current) => ({ ...current, password: value }))
          }
        />
      </AuthPanel>
    </div>
  )
}
