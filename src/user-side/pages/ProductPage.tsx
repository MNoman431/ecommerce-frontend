import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  // add other fields if your product has more
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // get the product id from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`); // your backend endpoint
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-red-600 text-2xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
