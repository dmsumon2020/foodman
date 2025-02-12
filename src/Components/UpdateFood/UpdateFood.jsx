import { useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";

const UpdateFood = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const formRef = useRef();

  const displayName = user?.displayName;
  const email = user?.email;

  // Error state
  const [errors, setErrors] = useState("");

  //equipment state
  const [food, setFood] = useState(null);

  // category state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // state for loading
  const [loading, setLoading] = useState(true);

  // axios
  const axiosNonSecure = useAxiosNonSecure();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch the food details using Axios
    const fetchFoodDetails = async () => {
      try {
        const response = await axiosNonSecure.get(`/foods/${id}`);
        setFood(response.data);
        setLoading(false);
      } catch (err) {
        setErrors(err.message);
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosNonSecure.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  /**
   * handleUpdateFoodItem
   */
  const handleUpdateFoodItem = async (event) => {
    event.preventDefault();
    // Reset previous errors
    setErrors({});
    // Create a new FormData object from the form
    const formData = new FormData(event.target);

    // Convert FormData entries to a plain JavaScript object
    const formDataObj = Object.fromEntries(formData.entries());

    const {
      email,
      foodName,
      image,
      category,
      quantity,
      price,
      foodOrigin,
      description,
    } = formDataObj;

    const showAlert = (icon, title, message) => {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Close",
      });
    };

    // foodName validation
    if (foodName.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        foodName: "Food name must be at least 5 characters long",
      }));
      return;
    }
    //Food Image Link validation
    if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(image)) {
      setErrors((prevError) => ({
        ...prevError,
        image: "Please provide a valid image URL.",
      }));
      return;
    }

    // category validation
    if (!category) {
      setErrors((prevError) => ({
        ...prevError,
        category: "Please select a category.",
      }));
      return;
    }

    // quantity validation
    if (isNaN(quantity) || (typeof quantity === "number" && quantity < 1)) {
      setErrors((prevError) => ({
        ...prevError,
        quantity: "Quantity can not be less than 1",
      }));
      return;
    }

    // foodOrigin validation
    if (foodOrigin.length < 4) {
      setErrors((prevError) => ({
        ...prevError,
        foodOrigin: "Food origin must be at least 4 characters long",
      }));
      return;
    }
    // food description validation
    if (description.length < 50) {
      setErrors((prevError) => ({
        ...prevError,
        description: "Food description must be at least 50 characters long",
      }));
      return;
    }

    // Create an object to send in the PUT request
    const foodData = {
      foodName: foodName,
      image: image,
      category: category,
      quantity: quantity,
      price: price,
      foodOrigin: foodOrigin,
      description: description,
    };
    // If all validations pass, send the data to the server
    try {
      const response = await axiosSecure.put(`/foods/${id}`, foodData, {
        headers: {
          "X-User-Email": email, // Custom header
        },
      });

      // Show success alert
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Food updated successfully!",
          text: "The food item has been updated.",
        });
      }
    } catch (error) {
      console.error("Error updating food", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="sub-heading">Delight for the Menu</h4>
        <h3 className="heading dark:text-white">Update Food Item</h3>
      </div>

      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <form onSubmit={handleUpdateFoodItem}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={displayName || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                value={email || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="foodName"
              >
                Food Name
              </label>
              <input
                id="foodName"
                type="text"
                name="foodName"
                defaultValue={food?.foodName || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
              {errors.foodName && (
                <p className="mt-2 text-sm text-red-600">{errors.foodName}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="image"
              >
                Food Image Link
              </label>
              <input
                id="image"
                type="text"
                name="image"
                defaultValue={food?.image || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="category"
              >
                Food Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                min="1"
                defaultValue={food?.quantity || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
              {errors.quantity && (
                <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                step="0.01"
                min="10"
                defaultValue={food?.price || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="foodOrigin"
              >
                Food Origin (Country)
              </label>
              <input
                id="foodOrigin"
                type="text"
                name="foodOrigin"
                defaultValue={food?.foodOrigin || ""}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
              />
              {errors.foodOrigin && (
                <p className="mt-2 text-sm text-red-600">{errors.foodOrigin}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="description"
            >
              A Short Description of the Food Item
            </label>
            <textarea
              id="description"
              rows="4"
              name="description"
              defaultValue={food?.description || ""}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-12 py-3 inline-block rounded-[5px] text-primaryColor border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold"
            >
              Update Food Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateFood;
