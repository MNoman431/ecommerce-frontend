import { Routes, Route } from "react-router-dom";

import AdminLayout from "../../adminLayout/AdminLayout";
import Dashboard from "../pages/Dashbaord";
import AllProducts from "../pages/AllProducts";
import AddProduct from "../pages/AddProduct";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="add-product" element={<AddProduct />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
