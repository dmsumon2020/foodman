import { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import ProfileDropdown from "./ProfileDropdown";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import logoLight from "../../assets/logoLight.png";
import logoDark from "../../assets/logoDark.png";
import { ThemeContext } from "../../../ThemeProvider/ThemeProvider";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  // Set image sources based on the theme
  const logo = theme === "dark" ? logoLight : logoDark;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, userLogOut } = useAuth();
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate programmatically

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Foods", path: "/all-foods" },
    { name: "Gallery", path: "/gallery" },
  ];

  const handleUserLogout = () => {
    userLogOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have successfully logged out",
          icon: "success",
        });
      })
      .catch((error) => {
        console.err("user logout error", error);
      });
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to home if not already on the home page
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      <div
        className={`px-6 py-2 shadow bg-white dark:bg-gray-800 mt-3 transition-all duration-300 rounded-[15px]X ${
          isScrolled ? "scroll-menu" : ""
        }`}
      >
        <div className="w-11/12 md:w-9/12 mx-auto lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <button onClick={handleLogoClick}>
              <img className="w-auto h-6 sm:h-7" src={logo} alt="Logo" />
            </button>
            {/* Visible only on small and medium devices */}
            <div className="flex lg:hidden items-center mt-4 lg:mt-0">
              <ThemeToggle />
              {user && <ProfileDropdown />}
            </div>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {link.name}
                </NavLink>
              ))}
              {user ? (
                <NavLink
                  onClick={handleUserLogout}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to={"/login"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </NavLink>
              )}
              {!user && (
                <NavLink
                  to={"/registration"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Registration
                </NavLink>
              )}

              {/* {user && (
                <NavLink
                  to={"/my-foods"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Foods
                </NavLink>
              )}

              {user && (
                <NavLink
                  to={"/add-food"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Add Foods
                </NavLink>
              )}
              {user && (
                <NavLink
                  to={"/my-orders"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Orders
                </NavLink>
              )} */}

              {user && (
                <NavLink
                  to={"/book-table"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Book a Table
                </NavLink>
              )}
            </div>

            <div className="hidden lg:flex items-center mt-4 lg:mt-0">
              <ThemeToggle />
              {user && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
