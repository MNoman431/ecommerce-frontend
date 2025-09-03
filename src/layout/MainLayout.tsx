import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
// import LoginForm from "../user-side/auth/LoginForm"
import RegisterForm from "../user-side/auth/RegisterForm"
import ProtectedRouting from "./ProtectedRouting"
// import LoginForm from "../user-side/auth/LoginForm"

const MainLayout = () => {
  return (
        <>
          <Toaster position="top-right" />
          <ProtectedRouting />

{/* publics routes */}
          <Routes>
            {/* <Route path="/login" element={<LoginForm />} /> */}
            <Route path="/register" element={<RegisterForm />} />
          </Routes>

        </>
  )
}
export default MainLayout

