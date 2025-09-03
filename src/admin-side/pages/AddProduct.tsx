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
  const [carModel, setCarModel] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [images, setImages] = useState<File[]>([]);

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
      setCarModel(selectedProduct.carModel || "");
      setColor(selectedProduct.color || "");
      setMaterial(selectedProduct.material || "");
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
    formData.append("carModel", carModel);
    formData.append("color", color);
    formData.append("material", material);

    // multiple images
    images.forEach((file) => {
      formData.append("images", file);
    });

    let res;
    if (id) {
      // edit mode
      res = await dispatch(updateProduct({ id: Number(id), productData: formData }));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Product updated successfully!");
      } else {
        toast.error((res as any).payload || "Failed to update product");
      }
    } else {
      // add mode
      res = await dispatch(addProduct(formData));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Product added successfully!");
      } else {
        toast.error((res as any).payload || "Failed to add product");
      }
    }

    navigate("/products");
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? "✏️ Edit Product" : "➕ Add New Product"}
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Image Preview */}
          {id && selectedProduct?.images && Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3">
              {selectedProduct.images.map((url: string, idx: number) => (
                <img key={idx} src={url} alt={`Current ${idx}`} className="w-full h-28 object-cover rounded-lg border" />
              ))}
              <p className="col-span-3 text-xs text-gray-500">Current Images</p>
            </div>
          )}

          {images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3">
              {images.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx}`}
                  className="w-full h-28 object-cover rounded-lg border"
                />
              ))}
              <p className="col-span-3 text-xs text-gray-500">New Images Preview</p>
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

          {/* New fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Car model"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Color"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Material"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>

          {/* Images */}
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            {...(!id ? { required: true } : {})}
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
