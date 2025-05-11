import { useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { MdAddToPhotos, MdFavoriteBorder } from "react-icons/md";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  //const userImage = user?.photoURL || "https://i.ibb.co.com/vcGXjYY/user.jpg";
  const userImage = user?.photoURL;
  const userName = user?.displayName || "user";
  const userEmail = user?.email;

  const handleMyFoodsClick = () => {
    navigate("/my-foods");
  };
  const handleAddFoodClick = () => {
    navigate("/add-food");
  };
  const handleMyOrdersClick = () => {
    navigate("/my-orders");
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
          <img
            src={userImage}
            className="object-cover w-full h-full"
            alt="avatar"
          />
        </div>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={closeDropdown}
          className="absolute -right-[2rem] z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <a
            href="#"
            className="flex items-center flex-wrap p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src={userImage}
              alt={userName}
            />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {userName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userEmail}
              </p>
            </div>
          </a>

          <hr className="border-gray-200 dark:border-gray-700" />

          <a
            onClick={handleMyFoodsClick}
            className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <IoFastFoodSharp />

            <span className="mx-2">My Foods</span>
          </a>

          <a
            onClick={handleAddFoodClick}
            className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <MdAddToPhotos />

            <span className="mx-2">Add food</span>
          </a>

          <a
            onClick={handleMyOrdersClick}
            className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <MdFavoriteBorder />

            <span className="mx-2">My Orders</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
