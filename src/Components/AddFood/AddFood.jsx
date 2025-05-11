import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LottieLoader from "../LottieLoader/LottieLoader";

const AddFood = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});
  // state for loading
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const displayName = user?.displayName;
  const email = user?.email;

  // axios instances
  const axiosSecure = useAxiosSecure();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get("/categories", {
          headers: {
            "X-User-Email": email,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <LottieLoader />;
  }

  /**
   * handleAddFoodItem
   */

  const handleAddFoodItem = async (event) => {
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

    // Create an object to send in the POST request
    const foodData = {
      username: displayName,
      email: email,
      foodName: foodName,
      image: image,
      category: category,
      quantity: quantity,
      price: price,
      foodOrigin: foodOrigin,
      description: description,
      purchaseCount: 0,
    };

    // If all validations pass, send the data to the server

    try {
      // Send the POST request to the API to insert the data into MongoDB
      const response = await axiosSecure.post("/foods", foodData);

      // Check for successful response (status 201)
      if (response.status === 201) {
        showAlert(
          "success",
          "Food Added",
          "The food item has been successfully added."
        );
        // Optionally reset the form or perform additional actions
        event.target.reset();
        setSelectedCategory("");
      } else {
        showAlert(
          "error",
          "Failed to Add Food",
          "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error posting data:", error);
      showAlert(
        "error",
        "Failed to Add Food",
        "An error occurred while adding the food item."
      );
    }
  };

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="sub-heading">Delight for the Menu</h4>
        <h3 className="heading dark:text-white">Add a Food Item</h3>
      </div>
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Food
        </h2>

        <form onSubmit={handleAddFoodItem}>
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddFood;
