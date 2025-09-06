import { Toaster } from "react-hot-toast"
import ProtectedRouting from "./ProtectedRouting"

const MainLayout = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ProtectedRouting />
    </>
  )
}
export default MainLayout

