import { Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";


export default function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Manufacturing Inventory</h2>
        
        <nav className="flex gap-6 mb-8 border-b border-gray-200 pb-4">
          <Link 
            to="/" 
            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Products
          </Link>
          <span className="text-gray-300">|</span>
          <Link 
            to="/add" 
            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Add Product
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/edit/:id" element={<EditProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}