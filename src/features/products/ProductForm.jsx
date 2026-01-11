import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "./productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { calculateMaterial, calculateProductTotal } from "../../utils/calculations";
import MaterialRow from "./MaterialRow";

export default function ProductEditor() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingItem = useSelector((state) =>
    state.products.list.find((p) => p.id === productId)
  );

  const [currentProduct, setCurrentProduct] = useState(
    existingItem || {
      productName: "",
      unitMeasure: "kg",
      productCategory: "Finished",
      expiryDate: "",
      rawMaterials: [],
    }
  );

  const addNewMaterial = () => {
    setCurrentProduct((prev) => ({
      ...prev,
      rawMaterials: [
        ...prev.rawMaterials,
        {
          id: nanoid(),
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
    const materialsCopy = [...currentProduct.rawMaterials];
    materialsCopy[index][field] = value;

    const calculation = calculateMaterial(
      Number(materialsCopy[index].quantity),
      Number(materialsCopy[index].price)
    );

    materialsCopy[index] = { ...materialsCopy[index], ...calculation };
    setCurrentProduct({ ...currentProduct, rawMaterials: materialsCopy });
  };

  const saveProductChanges = () => {
    const totalCost = calculateProductTotal(currentProduct.rawMaterials);
    const payload = { ...currentProduct, totalCost, id: existingItem?.id || nanoid() };

    if (existingItem) {
      dispatch(updateProduct(payload));
    } else {
      dispatch(addProduct(payload));
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <div className="bg-blue-500 p-4 rounded text-white">
        <h2 className="text-2xl font-bold">
          {existingItem ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm mt-1">Fill in product details and add raw materials</p>
      </div>

      <div className="bg-gray-800 p-4 rounded text-white">
        <h3 className="mb-3 font-semibold">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={currentProduct.productName}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, productName: e.target.value })
              }
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Unit</label>
            <select
              value={currentProduct.unitMeasure}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, unitMeasure: e.target.value })
              }
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
              value={currentProduct.productCategory}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, productCategory: e.target.value })
              }
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            >
              <option>Finished</option>
              <option>Semi Finished</option>
              <option>Subsidiary</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Expiry Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={currentProduct.expiryDate}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, expiryDate: e.target.value })
              }
              className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded text-white">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Raw Materials</h3>
          <button
            onClick={addNewMaterial}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            + Add Material
          </button>
        </div>
        <div className="space-y-2">
          {currentProduct.rawMaterials.map((material, index) => (
            <MaterialRow
              key={material.id}
              material={material}
              index={index}
              onChange={updateMaterial}
            />
          ))}
        </div>
      </div>

      <div className="bg-blue-500 p-4 rounded flex justify-between items-center text-white font-semibold">
        <span>Total Cost</span>
        <span>₹{calculateProductTotal(currentProduct.rawMaterials).toFixed(2)}</span>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-1 border border-gray-600 rounded text-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={saveProductChanges}
          className="px-6 py-1 bg-blue-500 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
