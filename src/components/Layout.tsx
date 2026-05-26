import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
