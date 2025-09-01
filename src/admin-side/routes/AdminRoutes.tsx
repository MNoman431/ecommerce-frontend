import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../adminLayout/AdminLayout";
import Dashboard from "../pages/Dashbaord";
import AllProducts from "../pages/AllProducts";
import AddProduct from "../pages/AddProduct";
import ViewProduct from "../pages/ViewProduct";


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="add-product/:id" element={<AddProduct />} />  {/* ✅ edit ke liye */}
                <Route path="view-product/:id" element={<ViewProduct />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
