import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const fieldMeta: Record<string, { label: string; type: string; placeholder: string }> = {
  name:        { label: "Product Name", type: "text",   placeholder: "e.g. Golden Retriever" },
  price:       { label: "Price (₹)",    type: "number", placeholder: "e.g. 25000" },
  count:       { label: "Stock Count",  type: "number", placeholder: "e.g. 10" },
  breed:       { label: "Breed",        type: "text",   placeholder: "e.g. Labrador" },
  color:       { label: "Color",        type: "text",   placeholder: "e.g. Golden" },
  imageLink:   { label: "Image URL",    type: "url",    placeholder: "https://..." },
  description: { label: "Description",  type: "textarea", placeholder: "Describe the product..." },
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosClient.put(`/products/${id}`, form);
      navigate("/products");
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!form)
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-4">
        {[...Array(6)].map((_, i) => <div key={i} className="h-14 bg-gray-200 rounded-xl animate-pulse" />)}
      </div>
    );

  const editableKeys = Object.keys(fieldMeta).filter((k) => k in form);

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
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

      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-gray-500 text-sm mt-1">Update the details below.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        {editableKeys.map((key) => {
          const meta = fieldMeta[key];
          return (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{meta.label}</label>
              {meta.type === "textarea" ? (
                <textarea
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  placeholder={meta.placeholder}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              ) : (
                <input
                  name={key}
                  type={meta.type}
                  value={form[key] || ""}
                  onChange={handleChange}
                  placeholder={meta.placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              )}
            </div>
          );
        })}

        {/* Image preview */}
        {form.imageLink && (
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <img src={form.imageLink} alt="Preview" className="w-full h-44 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <Link
            to="/products"
            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
