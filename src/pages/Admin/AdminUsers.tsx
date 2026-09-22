import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  ACCOUNT_STATUSES,
  ADMIN_ROLES,
  roleLabel,
  statusLabel,
} from '../../features/admin/admin.config'
import { adminUsers } from '../../features/admin/admin.data'
import type { AccountStatus, AdminRole } from '../../features/admin/admin.types'
import styles from './AdminUsers.module.css'

type RoleFilter = AdminRole | 'all'
type StatusFilter = AccountStatus | 'all'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<RoleFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return adminUsers.filter((user) => {
      const matchesRole = role === 'all' || user.role === role
      const matchesStatus = status === 'all' || user.status === status
      const matchesQuery =
        query === '' ||
        [user.displayName, user.username, user.email]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesRole && matchesStatus && matchesQuery
    })
  }, [search, role, status])

  return (
    <>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.note}>
            Demo data. The admin API is not connected, so this list is read-only.
          </p>
        </div>
        <Link className={styles.create} to="/admin/users/new">
          Create user
        </Link>
      </div>

      <div className={styles.filters}>
        <div className={styles.filter}>
          <label className={styles.filterLabel} htmlFor="userSearch">
            Search
          </label>
          <input
            className={styles.input}
            id="userSearch"
            type="search"
            placeholder="Name, username or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className={styles.filter}>
          <label className={styles.filterLabel} htmlFor="roleFilter">
            Role
          </label>
          <select
            className={styles.input}
            id="roleFilter"
            value={role}
            onChange={(event) => setRole(event.target.value as RoleFilter)}
          >
            <option value="all">All roles</option>
            {ADMIN_ROLES.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter}>
          <label className={styles.filterLabel} htmlFor="statusFilter">
            Status
          </label>
          <select
            className={styles.input}
            id="statusFilter"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
          >
            <option value="all">All statuses</option>
            {ACCOUNT_STATUSES.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.count} role="status">
        {visibleUsers.length} user{visibleUsers.length === 1 ? '' : 's'} shown
      </p>

      {visibleUsers.length > 0 ? (
        <table className={styles.table}>
          <caption className={styles.caption}>Administrative accounts</caption>
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => (
              <tr key={user.id}>
                <td data-label="User">
                  <span className={styles.name}>{user.displayName}</span>
                  <span className={styles.username}>@{user.username}</span>
                </td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{roleLabel(user.role)}</td>
                <td data-label="Status">
                  <span
                    className={`${styles.status} ${
                      user.status === 'active' ? styles.active : styles.inactive
                    }`}
                  >
                    {statusLabel(user.status)}
                  </span>
                </td>
                <td data-label="Created">{user.createdAt}</td>
                <td data-label="Actions">
                  <Link className={styles.action} to={`/admin/users/${user.id}`}>
                    View / edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.empty}>
          No users match these filters. Try a different search, role or status.
        </p>
      )}
    </>
  )
}
