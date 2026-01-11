import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const colors = {
  bg: "bg-slate-800",
  border: "border-slate-600",
  label: "text-cyan-300",
  header: "bg-gradient-to-r from-cyan-500 to-purple-500",
  hover: "hover:bg-slate-700",
  link: "text-cyan-400 hover:text-cyan-200 font-medium transition-colors",
};

export default function ProductList() {
  const products = useSelector((state) => state.products.list);

  if (!products.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-lg">No products found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className={`${colors.header}`}>
            <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
            <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
            <th className="px-6 py-4 text-left text-white font-semibold">Total Cost (₹)</th>
            <th className="px-6 py-4 text-left text-white font-semibold">Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.id}
              className={`border-b ${colors.border} ${colors.hover} transition-colors ${
                i % 2 === 0 ? colors.bg : "bg-slate-750"
              }`}
            >
              <td className="px-6 py-4">
                <Link to={`/edit/${p.id}`} className={colors.link}>
                  {p.name}
                </Link>
              </td>
              <td className={`px-6 py-4 ${colors.label}`}>{p.category}</td>
              <td className={`px-6 py-4 ${colors.label} font-semibold`}>
                ₹{p.totalCost.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${colors.label} bg-slate-700`}
                >
                  {p.materials.length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
