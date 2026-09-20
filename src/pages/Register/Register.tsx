import { Link } from 'react-router-dom'

import RegisterField from './RegisterField'
import styles from './Register.module.css'

const fields = [
  {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter your username...',
    autoComplete: 'username',
  },
  {
    id: 'discord-id',
    label: 'discord id',
    placeholder: 'Enter your discord id...',
  },
  {
    id: 'email',
    label: 'email',
    placeholder: 'Enter your email...',
    type: 'email' as const,
    autoComplete: 'email',
  },
  {
    id: 'password',
    label: 'password',
    placeholder: 'Enter your password...',
    type: 'password' as const,
    autoComplete: 'new-password',
  },
  {
    id: 'confirm-password',
    label: 'confirm password',
    placeholder: 'confirm your password...',
    type: 'password' as const,
    autoComplete: 'new-password',
  },
]

export default function Register() {
  return (
    <div className={styles.page}>
      {/* UI only: submitting is a no-op until the API issue is picked up. */}
      <form
        className={styles.panel}
        onSubmit={(event) => event.preventDefault()}
      >
        <Link className={styles.close} to="/" aria-label="Close and go home">
          <span aria-hidden="true">&#215;</span>
        </Link>

        <h1 className={styles.title}>Register</h1>

        <div className={styles.fields}>
          {fields.map((field) => (
            <RegisterField key={field.id} {...field} />
          ))}
        </div>

        <button className={styles.submit} type="submit">
          divide!
        </button>
      </form>
    </div>
  )
}
