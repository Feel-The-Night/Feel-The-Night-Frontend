import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>
        That route does not exist. <Link to="/">Go back to the dashboard</Link>{' '}
        or use the navigation above.
      </p>
    </section>
  )
}
