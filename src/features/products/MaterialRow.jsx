import React from "react";

export default function MaterialRow({ material, index, onChange }) {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-3 bg-gray-700 p-3 rounded-md items-center">
      
      <input
        type="text"
        placeholder="Material Name"
        value={material.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="col-span-2 px-2 py-1 rounded-md bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      />

      <select
        value={material.unit}
        onChange={(e) => handleChange("unit", e.target.value)}
        className="px-2 py-1 rounded-md bg-gray-600 border border-gray-500 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      >
        <option>kg</option>
        <option>gm</option>
        <option>ltr</option>
        <option>ml</option>
        <option>box</option>
        <option>units</option>
      </select>

      <input
        type="number"
        placeholder="Qty"
        value={material.quantity}
        onChange={(e) => handleChange("quantity", e.target.value)}
        className="px-2 py-1 rounded-md bg-gray-600 border border-gray-500 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      />

      <input
        type="number"
        placeholder="Price"
        value={material.price}
        onChange={(e) => handleChange("price", e.target.value)}
        className="px-2 py-1 rounded-md bg-gray-600 border border-gray-500 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      />

      <span className="px-2 py-1 text-white">{material.totalPrice.toFixed(2)}</span>
      <span className="px-2 py-1 text-white">{material.tax.toFixed(2)}</span>
      <span className="px-2 py-1 text-white">{material.totalAmount.toFixed(2)}</span>
    </div>
  );
}
