import React from "react";

const AddProduct: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add Product</h1>
      <form className="mt-6 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2"
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          placeholder="Stock"
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
