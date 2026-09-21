import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

import AppRoutes from '../routes/AppRoutes'

/** Renders the whole app at a given route, with the real router. */
export function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

/** Renders a single element inside a router, for component-level tests. */
export function renderWithRouter(ui: ReactElement, route = '/') {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
