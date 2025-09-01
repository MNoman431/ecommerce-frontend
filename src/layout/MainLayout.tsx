import { Toaster } from "react-hot-toast"
import AdminRoutes from "../admin-side/routes/AdminRoutes"
const MainLayout = () => {
  return (
        <>
          <Toaster position="top-right" />
          <AdminRoutes />
        </>
  )
}
export default MainLayout
