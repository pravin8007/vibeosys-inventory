import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "./productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { calculateMaterial, calculateProductTotal } from "../../utils/calculations";
import MaterialRow from "./MaterialRow";

export default function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingProduct = useSelector((state) =>
    state.products.list.find((p) => p.id === id)
  );

  const [product, setProduct] = useState(
    existingProduct || {
      name: "",
      unit: "kg",
      category: "Finished",
      expiryDate: "",
      materials: [],
    }
  );

  const addMaterial = () => {
    setProduct((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          materialId: nanoid(),
          name: "",
          unit: "kg",
          quantity: 0,
          price: 0,
          totalPrice: 0,
          tax: 0,
          totalAmount: 0,
        },
      ],
    }));
  };

  const updateMaterial = (index, field, value) => {
    const updatedMaterials = [...product.materials];
    updatedMaterials[index][field] = value;

    const calculated = calculateMaterial(
      Number(updatedMaterials[index].quantity),
      Number(updatedMaterials[index].price)
    );

    updatedMaterials[index] = { ...updatedMaterials[index], ...calculated };
    setProduct({ ...product, materials: updatedMaterials });
  };

  const saveProduct = () => {
    const totalCost = calculateProductTotal(product.materials);
    const payload = { ...product, totalCost, id: existingProduct?.id || nanoid() };

    if (existingProduct) {
      dispatch(updateProduct(payload));
    } else {
      dispatch(addProduct(payload));
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 space-y-8">
      {/* Header */}
      <div className="p-4 bg-blue-500 rounded text-white">
        <h2 className="text-2xl font-bold">
          {existingProduct ? "Update Product" : "Add Product"}
        </h2>
        <p className="text-sm mt-1">Enter product details and raw materials</p>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-gray-800 rounded text-white">
        <h3 className="mb-3 font-semibold">Product Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              value={product.name}
              placeholder="Product name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Unit</label>
            <select
              value={product.unit}
              onChange={(e) => setProduct({ ...product, unit: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            >
              <option>kg</option>
              <option>gm</option>
              <option>ltr</option>
              <option>ml</option>
              <option>box</option>
              <option>units</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Category</label>
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            >
              <option>Finished</option>
              <option>Semi Finished</option>
              <option>Subsidiary</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Expiry</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={product.expiryDate}
              onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Raw Materials */}
      <div className="p-4 bg-gray-800 rounded text-white">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Raw Materials</h3>
          <button
            onClick={addMaterial}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {product.materials.map((material, i) => (
            <MaterialRow
              key={material.materialId}
              material={material}
              index={i}
              onChange={updateMaterial}
            />
          ))}
        </div>
      </div>

      {/* Subtotal */}
      <div className="p-4 bg-blue-500 rounded flex justify-between items-center text-white font-semibold">
        <span>Subtotal</span>
        <span>₹{calculateProductTotal(product.materials).toFixed(2)}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-1 border border-gray-600 rounded text-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={saveProduct}
          className="px-6 py-1 bg-blue-500 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
