import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { Product } from "../types/Product";

const Detail = ({ label, value }: { label: string; value?: string | number }) =>
  value ? (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  ) : null;

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-gray-200 rounded-lg animate-pulse" />)}
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
          {product.imageLink ? (
            <img src={product.imageLink} alt={product.name} className="w-full h-72 md:h-96 object-cover" />
          ) : (
            <div className="w-full h-72 md:h-96 bg-gray-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mt-2">₹{product.price}</p>
            {product.description && (
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{product.description}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Details</h2>
            <Detail label="Breed" value={product.breed} />
            <Detail label="Color" value={product.color} />
            <Detail label="Stock" value={product.count} />
          </div>

          <div className="flex gap-3">
            <Link
              to={`/edit/${product._id}`}
              className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Edit Product
            </Link>
            <Link
              to="/products"
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
