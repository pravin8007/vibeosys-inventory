import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductList() {
  const products = useSelector((state) => state.products.list);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-5 py-3 text-white">Product Name</th>
            <th className="px-5 py-3 text-white">Category</th>
            <th className="px-5 py-3 text-white">Total Cost (₹)</th>
            <th className="px-5 py-3 text-white">Materials</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } hover:bg-gray-200`}
            >
              <td className="px-5 py-3 font-medium text-blue-600">
                <Link to={`/edit/${product.id}`}>
                  {product.productName}
                </Link>
              </td>

              <td className="px-5 py-3 text-gray-700">
                {product.productCategory || "-"}
              </td>

              <td className="px-5 py-3 text-gray-900 font-semibold">
                ₹{product.totalCost?.toFixed(2) || "0.00"}
              </td>

              <td className="px-5 py-3 text-gray-700">
                {product.rawMaterials.length || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
