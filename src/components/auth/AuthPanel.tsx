import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './AuthPanel.module.css'

export type AuthStatus = 'idle' | 'submitting' | 'success' | 'error'

type AuthPanelProps = {
  title: string
  submitLabel: string
  status: AuthStatus
  /** Message shown for the success and error states. */
  message?: string
  footer?: ReactNode
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function AuthPanel({
  title,
  submitLabel,
  status,
  message,
  footer,
  children,
  onSubmit,
}: AuthPanelProps) {
  const busy = status === 'submitting'

  return (
    <form className={styles.panel} onSubmit={onSubmit} noValidate>
      <Link className={styles.close} to="/" aria-label="Close and go home">
        <span aria-hidden="true">&#215;</span>
      </Link>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.fields}>{children}</div>

      {message ? (
        <p
          className={`${styles.message} ${status === 'error' ? styles.messageError : styles.messageSuccess}`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <button className={styles.submit} type="submit" disabled={busy}>
        {busy ? 'Sending...' : submitLabel}
      </button>

      {footer ? <p className={styles.footer}>{footer}</p> : null}
    </form>
  )
}
