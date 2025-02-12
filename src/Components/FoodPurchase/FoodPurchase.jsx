import axios from "axios";
import { useParams } from "react-router";
import LottieLoader from "../LottieLoader/LottieLoader";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const FoodPurchase = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);

  // axios instances
  const axiosSecure = useAxiosSecure();

  // Current date and time
  const currentDateTime = moment().format("Do MMMM YYYY, h:mm:ss a");

  useEffect(() => {
    // Fetch the food item details based on the 'id' parameter
    const fetchFoodDetails = async () => {
      try {
        const response = await axiosSecure.get(`/secure/foods/${id}`, {
          headers: {
            "X-User-Email": user?.email,
          },
        });
        setFoodItem(response.data);
        setStockQuantity(parseInt(response.data.quantity));
      } catch (error) {
        setError("Error fetching food details. Please try again.");
        console.error("Error fetching food details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return <LottieLoader />;
  }

  // Error state
  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-center text-3xl font-bold text-red-500">{error}</p>
      </section>
    );
  }

  /**
   * sweet alert function
   */
  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };
  /**
   * handlePurchase
   */

  const handlePurchase = async (event) => {
    event.preventDefault();

    const buyingQuantity = parseInt(event.target.quantity.value.trim(), 10);

    if (
      buyingQuantity === "" || // Check if blank
      isNaN(buyingQuantity) || // Check if not a valid number
      buyingQuantity <= 0 || // Check if zero or negative
      buyingQuantity > stockQuantity // Check if more than available stock
    ) {
      let errorMessage = "";

      if (buyingQuantity === "") {
        errorMessage = "Quantity cannot be blank. Please enter a valid number.";
      } else if (isNaN(buyingQuantity)) {
        errorMessage = "Please enter a valid number for the quantity.";
      } else if (buyingQuantity <= 0) {
        errorMessage = "Quantity must be greater than zero.";
      } else if (buyingQuantity > stockQuantity) {
        errorMessage = `You cannot buy more than the available quantity: ${stockQuantity}`;
      }

      showAlert("error", "Error!", errorMessage);
      return;
    }

    // a buyer can not buy his own added item
    const buyerEmail = user?.email;
    const ownerEmail = foodItem?.email;
    if (buyerEmail === ownerEmail) {
      showAlert("error", "Error!", "You cannot buy your own item.");
      return;
    }

    // if all validation process is successful then insert data in mongodb
    // Prepare the purchase data to send to the server
    const purchaseData = {
      foodId: foodItem._id,
      quantity: buyingQuantity,
      buyerName: user.displayName,
      buyerEmail: user.email,
      buyingDate: currentDateTime,
    };

    // Send the purchase data to the backend
    try {
      const response = await axiosSecure.post("/purchase", purchaseData);

      if (response.data.message === "Purchase successful") {
        showAlert(
          "success",
          "Purchase Successful!",
          "Your purchase was completed successfully."
        );
        // Update the stock quantity
        setStockQuantity(
          (prevStockQuantity) => prevStockQuantity - buyingQuantity
        );
      }
    } catch (error) {
      console.error("Purchase error:", error);
      showAlert(
        "error",
        "Purchase Failed",
        "An error occurred while processing your purchase."
      );
    }
  };

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="font-subheadingFont text-primaryColor text-6xl text-center pt-12 pb-2">
          Buy
        </h4>

        <h3 className="font-headingFont text-2xl md:text-7xl text-[#111] dark:text-white font-bold text-center pb-14">
          {foodItem?.foodName}
        </h3>
      </div>

      <div className="w-10/12 mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between md:space-x-10">
          <div className="food-image md:w-1/3">
            <img
              src={foodItem?.image || "https://via.placeholder.com/150"}
              alt={foodItem?.foodName || "Food item"}
              className="rounded-md shadow-md"
            />
          </div>
          <aside className="md:w-2/3  rounded-md">
            <p className="text-primaryColor font-bold text-[20px] md:text-[30px] mb-5 mt-5 md:mt-0 break-words">
              Available Quantity: {stockQuantity}
            </p>

            <p className="text-base mb-5 dark:text-white">
              <span className="text-primaryColor font-bold">
                Category: {foodItem?.category}
              </span>
            </p>

            {/* Display message if the quantity is zero */}

            {stockQuantity === 0 && (
              <p className="text-red-500 font-semibold my-2">
                You cannot buy this item because this item is not available.
              </p>
            )}
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                Purchase Form
              </h2>
              <form onSubmit={handlePurchase}>
                {/* Food Name */}
                <div className="flex flex-col gap-6 mt-4">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="name"
                    >
                      Food Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      defaultValue={foodItem?.foodName || ""}
                      readOnly
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-6 mt-4">
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
                      defaultValue={foodItem?.price || ""}
                      readOnly
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-6 mt-4">
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
                      //defaultValue={foodItem?.price || ""}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Buyer Name */}
                <div className="flex flex-col gap-6 mt-4">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="buyerName"
                    >
                      Buyer Name
                    </label>
                    <input
                      id="buyerName"
                      type="text"
                      name="buyerName"
                      defaultValue={user?.displayName || ""}
                      readOnly
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Buyer Email */}
                <div className="flex flex-col gap-6 mt-4">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="buyerEmail"
                    >
                      Buyer Email
                    </label>
                    <input
                      id="buyerEmail"
                      type="email"
                      name="buyerEmail"
                      defaultValue={user?.email || ""}
                      readOnly
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Buying Date */}
                <div className="flex flex-col gap-6 mt-4">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="buyingDate"
                    >
                      Buying Date
                    </label>
                    <input
                      id="buyingDate"
                      type="text"
                      name="buyingDate"
                      value={currentDateTime}
                      readOnly
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColorHover focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="flex justify-end mt-6">
                  {/*            <button
                    type="submit"
                    disabled={stockQuantity === 0}
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primaryColor rounded-md hover:bg-primaryColorHover focus:outline-none focus:bg-primaryColor"
                  >
                    Purchase
                  </button> */}
                  <button
                    type="submit"
                    disabled={stockQuantity === 0}
                    className="px-12 py-3 inline-block rounded-[5px] text-primaryColor border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold"
                  >
                    Purchase
                  </button>
                </div>
              </form>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FoodPurchase;
