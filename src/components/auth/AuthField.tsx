import type { InputHTMLAttributes, ReactNode } from 'react'

import styles from './AuthField.module.css'

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string
  label: string
  error?: string
  /** Control rendered inside the field, e.g. the show/hide password button. */
  adornment?: ReactNode
}

export default function AuthField({
  id,
  label,
  error,
  adornment,
  ...inputProps
}: AuthFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div className={styles.control}>
        <input
          {...inputProps}
          className={`${styles.input} ${error ? styles.inputInvalid : ''}`}
          id={id}
          name={inputProps.name ?? id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        {adornment}
      </div>

      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
