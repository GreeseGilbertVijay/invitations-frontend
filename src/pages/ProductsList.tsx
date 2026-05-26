import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { Product } from "../types/Product";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const res = await axiosClient.get("/products");
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setDeletingId(id);
    await axiosClient.delete(`/products/${id}`);
    setDeletingId(null);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm shadow-blue-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-80 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">
            {search ? "No products match your search" : "No products yet"}
          </p>
          {!search && (
            <Link to="/create" className="mt-3 inline-block text-sm text-blue-600 hover:underline font-medium">
              Create your first product
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              {p.imageLink ? (
                <img src={p.imageLink} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              <div className="p-4">
                <h2 className="font-bold text-gray-800 truncate">{p.name}</h2>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-blue-600 font-semibold">₹{p.price}</p>
                  {p.count && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Stock: {p.count}</span>}
                </div>
                {p.breed && <p className="text-xs text-gray-400 mt-1">Breed: {p.breed}</p>}

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${p._id}`}
                    className="flex-1 text-center text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 py-2 rounded-lg transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${p._id}`}
                    className="flex-1 text-center text-xs font-semibold text-amber-600 border border-amber-200 hover:bg-amber-50 py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id!)}
                    disabled={deletingId === p._id}
                    className="flex-1 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deletingId === p._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
