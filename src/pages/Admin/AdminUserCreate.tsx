import { Link } from 'react-router-dom'

import AdminUserForm from '../../components/admin/AdminUserForm'
import { EMPTY_ADMIN_USER } from '../../features/admin/admin.config'
import styles from './AdminUserForm.page.module.css'

export default function AdminUserCreate() {
  return (
    <>
      <p className={styles.breadcrumb}>
        <Link to="/admin/users">Users</Link> / New
      </p>
      <h1 className={styles.title}>Create user</h1>
      <p className={styles.note}>
        The admin API is not connected. This form validates input and reports
        what it would send; no account is created.
      </p>

      <AdminUserForm
        mode="create"
        initialValues={EMPTY_ADMIN_USER}
        submitLabel="Create user"
      />
    </>
  )
}
