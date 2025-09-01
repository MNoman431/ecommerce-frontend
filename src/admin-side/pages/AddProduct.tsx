import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { addProduct, updateProduct, fetchProductById} from "../../redux/admin/productThunks/productThunk";
import { toast } from "react-hot-toast";

const AddProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state: RootState) => state.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // jab id aayegi (edit mode), product fetch karke state me set karo
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  // jab selectedProduct update ho jaye, fields pre-fill kar do
  useEffect(() => {
    if (selectedProduct && id) {
      setName(selectedProduct.name || "");
      setDescription(selectedProduct.description || "");
      setPrice(String(selectedProduct.price) || "");
      setStock(String(selectedProduct.stock) || "");
      setCategory(selectedProduct.category || "");
    }
  }, [selectedProduct, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) formData.append("image", image);

    let res;
    if (id) {
      // edit mode
      res = await dispatch(updateProduct({ id: Number(id), productData: formData }));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Product updated successfully!");
      } else {
        toast.error(res.payload || "Failed to update product");
      }
    } else {
      // add mode
      res = await dispatch(addProduct(formData));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Product added successfully!");
      } else {
        toast.error(res.payload || "Failed to add product");
      }
    }

    navigate("/products");
  };

  

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? "✏️ Edit Product" : "➕ Add New Product"}
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Image Preview (edit mode or new image selected) */}
          {id && selectedProduct?.imageUrl && !image && (
            <div className="mb-3">
              <img
                src={selectedProduct.imageUrl}
                alt="Current"
                className="w-full h-40 object-cover rounded-lg border mb-2"
              />
              <p className="text-xs text-gray-500">Current Image</p>
            </div>
          )}
          {image && (
            <div className="mb-3">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border mb-2"
              />
              <p className="text-xs text-gray-500">New Image Preview</p>
            </div>
          )}
          {/* Product Name */}
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg p-3"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <input
            type="text"
            placeholder="Enter category"
            className="w-full border border-gray-300 rounded-lg p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            {...(!id ? { required: true } : {})} // add ke time required, edit ke time optional
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {id ? "Update Product" : "Add Product"}
          </button>
        </form>

     
      </div>
    </div>
  );
};

export default AddProduct;
