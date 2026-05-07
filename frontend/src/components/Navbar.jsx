import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  // =========================================
  // ACTIVE TAB STYLING
  // =========================================

  const tabClass = (path) =>
    `px-5 py-2 rounded-lg transition font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // REMOVE AUTH DATA
    localStorage.removeItem("user");

    // CLEAR HISTORY + REDIRECT
    window.location.replace("/login");
  };

  return (

    <nav className="w-full bg-gray-900 shadow-md">

      <div className="flex items-center justify-between w-full px-8 py-5">

        {/* LOGO */}

        <div
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          CRM SYSTEM
        </div>

        {/* NAVIGATION */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className={tabClass("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/leads")}
            className={tabClass("/leads")}
          >
            Leads
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-2 font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}