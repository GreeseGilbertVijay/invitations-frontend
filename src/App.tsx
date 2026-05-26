import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import InvitesList from "./pages/InvitesList";
import CreateInvite from "./pages/CreateInvite";
import AdminInvites from "./pages/AdminInvites";
import PublicInvite from "./pages/PublicInvite";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import WeddingInvitationPage from "./pages/WeddingInvitationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Public: shareable invitation link — no auth required */}
        <Route path="/invite/:slug" element={<PublicInvite />} />
        <Route path="/wedding-invitation" element={<WeddingInvitationPage />} />
    
        {/* Guest-only routes */}
        <Route path="/login" element={<GuestRoute><SignIn /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
        <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invites" element={<InvitesList />} />
          <Route path="/create" element={<CreateInvite />} />
          <Route path="/profile" element={<Profile />} />

          {/* Superadmin only — client-side guard in AdminInvites redirects non-admins */}
          <Route path="/admin/invites" element={<AdminInvites />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
