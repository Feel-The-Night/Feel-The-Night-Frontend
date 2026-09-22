import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import AuthField from '../auth/AuthField'
import {
  ACCOUNT_STATUSES,
  ADMIN_PERMISSIONS,
  ADMIN_ROLES,
  DEFAULT_PERMISSIONS,
} from '../../features/admin/admin.config'
import { validateAdminUser, type AdminUserErrors } from '../../features/admin/admin.validation'
import type {
  AccountStatus,
  AdminPermission,
  AdminRole,
  AdminUserFormValues,
} from '../../features/admin/admin.types'
import styles from './AdminUserForm.module.css'

type AdminUserFormProps = {
  mode: 'create' | 'edit'
  initialValues: AdminUserFormValues
  submitLabel: string
}

/**
 * Create and edit share this form.
 *
 * Nothing is persisted: there is no admin API. A valid submission reports that
 * explicitly instead of claiming an account was saved.
 */
export default function AdminUserForm({
  mode,
  initialValues,
  submitLabel,
}: AdminUserFormProps) {
  const [values, setValues] = useState<AdminUserFormValues>(initialValues)
  const [errors, setErrors] = useState<AdminUserErrors>({})
  const [submitted, setSubmitted] = useState<'none' | 'invalid' | 'valid'>('none')

  function setField<TField extends keyof AdminUserFormValues>(
    field: TField,
    value: AdminUserFormValues[TField],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  /* Changing the role reloads that role's default permissions; the admin can
     still tick each one afterwards. */
  function changeRole(role: AdminRole) {
    setValues((current) => ({
      ...current,
      role,
      permissions: [...DEFAULT_PERMISSIONS[role]],
    }))
  }

  function togglePermission(permission: AdminPermission, checked: boolean) {
    setValues((current) => ({
      ...current,
      permissions: checked
        ? [...current.permissions, permission]
        : current.permissions.filter((entry) => entry !== permission),
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validateAdminUser(values, { requirePassword: mode === 'create' })
    setErrors(found)
    setSubmitted(Object.keys(found).length > 0 ? 'invalid' : 'valid')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <section className={styles.section} aria-labelledby="account-details">
        <h2 className={styles.sectionTitle} id="account-details">
          Account
        </h2>

        <div className={styles.fields}>
          <AuthField
            id="displayName"
            label="Display name"
            value={values.displayName}
            error={errors.displayName}
            onChange={(event) => setField('displayName', event.target.value)}
          />
          <AuthField
            id="adminUsername"
            label="Username"
            name="username"
            value={values.username}
            error={errors.username}
            onChange={(event) => setField('username', event.target.value)}
          />
          <AuthField
            id="adminEmail"
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(event) => setField('email', event.target.value)}
          />
          <AuthField
            id="temporaryPassword"
            label={mode === 'create' ? 'Temporary password' : 'New password (optional)'}
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            error={errors.password}
            onChange={(event) => setField('password', event.target.value)}
          />
          <AuthField
            id="confirmTemporaryPassword"
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) => setField('confirmPassword', event.target.value)}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="access-level">
        <h2 className={styles.sectionTitle} id="access-level">
          Access level
        </h2>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>
            <select
              className={styles.select}
              id="role"
              name="role"
              value={values.role}
              aria-invalid={errors.role ? true : undefined}
              aria-describedby={errors.role ? 'role-error' : undefined}
              onChange={(event) => changeRole(event.target.value as AdminRole)}
            >
              {ADMIN_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role ? (
              <p className={styles.error} id="role-error">
                {errors.role}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="status">
              Status
            </label>
            <select
              className={styles.select}
              id="status"
              name="status"
              value={values.status}
              onChange={(event) =>
                setField('status', event.target.value as AccountStatus)
              }
            >
              {ACCOUNT_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <fieldset className={styles.permissions}>
        <legend className={styles.sectionTitle}>Permissions</legend>
        <p className={styles.hint}>
          Defaults follow the selected role. Adjust individual permissions
          before saving.
        </p>

        <ul className={styles.permissionList}>
          {ADMIN_PERMISSIONS.map((permission) => (
            <li key={permission.value}>
              <label className={styles.permission}>
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission.value}
                  checked={values.permissions.includes(permission.value)}
                  onChange={(event) =>
                    togglePermission(permission.value, event.target.checked)
                  }
                />
                <span>{permission.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {submitted !== 'none' ? (
        <p
          className={`${styles.message} ${submitted === 'invalid' ? styles.messageError : ''}`}
          role="status"
        >
          {submitted === 'invalid'
            ? 'Check the highlighted fields.'
            : 'Frontend demo only. No account was created or changed because the admin API is not connected.'}
        </p>
      ) : null}

      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          {submitLabel}
        </button>
        <Link className={styles.cancel} to="/admin/users">
          Cancel
        </Link>
      </div>
    </form>
  )
}
