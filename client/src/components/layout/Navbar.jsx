import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/Navbar.css";

const Navbar = () => {
  // ✅ FIX: extract user ALSO
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  // ✅ Now this works
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">🍽️ TasteMatch</h2>

        {/* 🍔 Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Nav links */}
        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setOpen(false)}>Explore</Link>
          <Link to="/taste" onClick={() => setOpen(false)}>Taste</Link>
          <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
          <Link to="/map" onClick={() => setOpen(false)}>Map</Link>

          {/* 👑 Admin link */}
          {isAdmin && (
            <Link
              to="/admin/dishes"
              className="admin-link"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          )}

          <button
            className="logout-btn"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
