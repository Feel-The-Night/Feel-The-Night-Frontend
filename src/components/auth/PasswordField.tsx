import { useState } from 'react'

import AuthField from './AuthField'
import styles from './PasswordField.module.css'

type PasswordFieldProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  autoComplete?: string
  error?: string
  onChange: (value: string) => void
}

export default function PasswordField({
  id,
  label,
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <AuthField
      id={id}
      label={label}
      error={error}
      type={visible ? 'text' : 'password'}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(event) => onChange(event.target.value)}
      adornment={
        <button
          className={styles.toggle}
          type="button"
          aria-pressed={visible}
          aria-controls={id}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      }
    />
  )
}
