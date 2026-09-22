import { Link } from 'react-router-dom'

import { roleLabel, statusLabel } from '../../features/admin/admin.config'
import { adminUsers } from '../../features/admin/admin.data'
import styles from './AdminDashboard.module.css'

/* Every figure is derived from the same demo dataset the user list reads. */
const summary = [
  { label: 'Total users', value: adminUsers.length },
  {
    label: 'Active users',
    value: adminUsers.filter((user) => user.status === 'active').length,
  },
  {
    label: 'Administrators',
    value: adminUsers.filter((user) => user.role === 'administrator').length,
  },
  {
    label: 'Moderators / editors',
    value: adminUsers.filter(
      (user) => user.role === 'moderator' || user.role === 'editor',
    ).length,
  },
]

const recent = [...adminUsers]
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  .slice(0, 4)

export default function AdminDashboard() {
  return (
    <>
      <h1 className={styles.title}>Administration</h1>
      <p className={styles.note}>
        Demo data. The admin API is not connected, so nothing here is fetched or
        saved.
      </p>

      <section aria-labelledby="summary-title">
        <h2 className={styles.sectionTitle} id="summary-title">
          Summary
        </h2>
        <ul className={styles.cards}>
          {summary.map((item) => (
            <li className={styles.card} key={item.label}>
              <p className={styles.cardValue}>{item.value}</p>
              <p className={styles.cardLabel}>{item.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="recent-title">
        <h2 className={styles.sectionTitle} id="recent-title">
          Recent users
        </h2>
        <ul className={styles.recent}>
          {recent.map((user) => (
            <li className={styles.recentRow} key={user.id}>
              <Link className={styles.recentName} to={`/admin/users/${user.id}`}>
                {user.displayName}
              </Link>
              <span className={styles.recentMeta}>
                {roleLabel(user.role)} &middot; {statusLabel(user.status)}
              </span>
              <span className={styles.recentDate}>{user.createdAt}</span>
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link to="/admin/users">Manage all users</Link>
        </p>
      </section>
    </>
  )
}
