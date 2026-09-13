import { Outlet } from 'react-router-dom'

import Header from '../components/layout/Header/Header'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
