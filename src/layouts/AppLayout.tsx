import { Outlet } from 'react-router-dom'

import Header from '../components/layout/Header/Header'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main className={styles.main} id="main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
