import styles from './RegisterField.module.css'

type RegisterFieldProps = {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
}

export default function RegisterField({
  id,
  label,
  placeholder,
  type = 'text',
  autoComplete,
}: RegisterFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  )
}
