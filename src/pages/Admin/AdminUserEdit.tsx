import { Link, useParams } from 'react-router-dom'

import AdminUserForm from '../../components/admin/AdminUserForm'
import { findAdminUser } from '../../features/admin/admin.data'
import styles from './AdminUserForm.page.module.css'

export default function AdminUserEdit() {
  const { id } = useParams()
  const user = findAdminUser(id)

  if (!user) {
    return (
      <>
        <h1 className={styles.title}>User not found</h1>
        <p className={styles.note}>
          No demo account matches this id.{' '}
          <Link to="/admin/users">Back to users</Link>
        </p>
      </>
    )
  }

  return (
    <>
      <p className={styles.breadcrumb}>
        <Link to="/admin/users">Users</Link> / {user.username}
      </p>
      <h1 className={styles.title}>Edit {user.displayName}</h1>
      <p className={styles.note}>
        The admin API is not connected. Changes are validated and discarded; the
        current password is never shown.
      </p>

      <AdminUserForm
        mode="edit"
        initialValues={{
          displayName: user.displayName,
          username: user.username,
          email: user.email,
          password: '',
          confirmPassword: '',
          role: user.role,
          status: user.status,
          permissions: [...user.permissions],
        }}
        submitLabel="Save changes"
      />
    </>
  )
}
