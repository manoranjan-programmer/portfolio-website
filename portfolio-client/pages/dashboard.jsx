import ProtectedRoute from "../src/components/ProtectedRoute"
import AdminDashboard from "../src/pages/AdminDashboard"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
