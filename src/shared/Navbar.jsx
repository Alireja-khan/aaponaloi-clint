import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router";
import { Menu, X, UserCircle2, ChevronDown } from "lucide-react";
import logo from "../assets/aaponaloi-logo.png";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const { signOutUser, loading } = useContext(AuthContext);
  const profileRef = useRef();

  console.log(user);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = {
    visitor: [
      { label: "Home", path: "/" },
      { label: "Apartment", path: "/apartment" },
    ],
    member: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Apartment", path: "/my-apartment" },
      { label: "Payments", path: "/payments" },
      { label: "Announcements", path: "/announcements" },
    ],
    admin: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Members", path: "/members" },
      { label: "Payments", path: "/payments" },
      { label: "Settings", path: "/settings" },
    ],
  };

  const links = navItems[role || "visitor"];

  const handleLogout = () => {
    signOutUser();
    setProfileMenuOpen(false);
    setMenuOpen(false);
  };

  if (loading) return null;

  return (
    <header className="bg-white border-b py-3 border-gray-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Aaponaloi Logo" className="w-22 h-22 object-contain" />
          <span className="text-2xl font-extrabold text-primary select-none hidden sm:block">
            Aaponaloi
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-base font-medium px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-base font-medium px-4 py-2 rounded-md bg-primary text-white hover:bg-primaryHover transition`
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
              ref={profileRef}
            >
              <div role="button" className="flex items-center gap-2 cursor-pointer">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <UserCircle2 className="w-10 h-10 text-gray-400" />
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
                  >
                    <li className="px-4 py-2 text-sm font-medium text-gray-800 border-b">
                      {user.displayName || 'User'}
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-5 py-4 animate-fadeIn">
          <ul className="flex flex-col space-y-4">
            {links.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-medium ${
                      isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:bg-red-100 py-2 px-3 rounded transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
