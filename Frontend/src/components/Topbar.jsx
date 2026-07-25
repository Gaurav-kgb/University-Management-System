import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">

      <div>
        <h2>University Management System</h2>
      </div>

      <div className="topbar-right">

        <span>👤 {username}</span>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </header>
  );
}

export default Topbar;