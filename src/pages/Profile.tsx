import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 border-b border-gray-100 last:border-0 gap-1">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <span className="text-sm font-semibold text-gray-800 break-all">{value}</span>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      axiosClient
        .get(`/auth/users/${payload.id}`)
        .then((res) => setUser(res.data.user))
        .catch(() => setError("Failed to load profile."))
        .finally(() => setLoading(false));
    } catch {
      setError("Invalid session. Please log in again.");
      setLoading(false);
    }
  }, [navigate]);

  if (loading)
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-4">
        <div className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
      </div>
    );

  if (!user) return null;

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Your account information.</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md shadow-blue-200">
          {initials}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
          <span
            className={`inline-flex items-center gap-1.5 mt-2 text-xs px-3 py-1 rounded-full font-semibold ${
              user.emailVerified
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${user.emailVerified ? "bg-green-500" : "bg-yellow-500"}`} />
            {user.emailVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
      </div>

      {/* Details card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Details</h3>
        <Row label="Username" value={user.username} />
        <Row label="Email" value={user.email} />
        <Row label="Account Status" value={user.emailVerified ? "Active" : "Pending Verification"} />
        <Row label="User ID" value={user._id} />
      </div>
    </div>
  );
};

export default Profile;
