import { Route, Routes } from 'react-router-dom'

import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import AppLayout from '../layouts/AppLayout'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Characters from '../pages/Characters/Characters'
import Community from '../pages/Community/Community'
import Events from '../pages/Events/Events'
import Guides from '../pages/Guides/Guides'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import Register from '../pages/Register/Register'
import Start from '../pages/Start/Start'

export default function AppRoutes() {
  return (
    <Routes>
      {/* The admin panel has its own shell and is not linked from the public
          navigation. It is intentionally not gated: there is no authentication
          yet, and the backend must enforce every administrative permission -
          frontend route guards would be UX only. */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/community" element={<Community />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
