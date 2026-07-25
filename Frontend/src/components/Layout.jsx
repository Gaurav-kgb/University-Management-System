import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/Layout.css";

function Layout() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Topbar />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;