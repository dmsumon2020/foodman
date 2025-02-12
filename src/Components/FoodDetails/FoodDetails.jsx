import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LottieLoader from "../LottieLoader/LottieLoader";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";

const FoodDetails = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosNonSecure = useAxiosNonSecure();

  useEffect(() => {
    // Fetch the food item details based on the 'id' parameter
    const fetchFoodDetails = async () => {
      try {
        const response = await axiosNonSecure.get(`/foods/${id}`);
        setFoodItem(response.data);
      } catch (error) {
        setError("Error fetching food details");
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
        <p className="text-center text-3xl font-bold">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="font-subheadingFont text-primaryColor text-6xl text-center pt-12 pb-2">
          Details
        </h4>

        <h3 className="font-headingFont text-2xl md:text-7xl text-[#111] dark:text-white font-bold text-center pb-14">
          {foodItem?.foodName}
        </h3>
      </div>
      <div className="food-details-container w-10/12 mx-auto">
        <div className="food-container flex flex-col md:flex-row gap-7">
          <div className="food-item-image flex-1 items-center justify-center">
            <div className="flex flex-col">
              <img
                src={foodItem?.image}
                alt={foodItem.foodName}
                // className="max-h-[650px] w-auto"
              />
            </div>
          </div>
          <div className="food-info flex-1">
            <p className="text-primaryColor font-bold text-[30px] mb-5">
              Price: ${foodItem?.price}
            </p>

            <p className="text-base mb-1 dark:text-white">
              <span className="text-primaryColor font-bold">Category:</span>{" "}
              {foodItem?.category}
            </p>

            <p className="text-base mb-1 dark:text-white">
              <span className="text-primaryColor font-bold">Quantity:</span>{" "}
              {foodItem?.quantity}
            </p>

            <p className="text-base dark:text-white">
              <span className="text-primaryColor font-bold">
                Purchase Count:{" "}
              </span>
              {foodItem?.purchaseCount}
            </p>

            <p className="text-[40px] pt-12 pb-6 font-headingFont text-[#111] dark:text-white font-bold">
              Description
            </p>
            <p className="dark:text-white">{foodItem?.description}</p>
            <p className="text-[40px] pt-12 pb-6 font-headingFont text-[#111] dark:text-white font-bold">
              Ingredients
            </p>
            <div className="dark:text-white">
              <ul>
                {foodItem.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <p className="text-[40px] leading-[50px] pt-12 pb-6 font-headingFont text-[#111] dark:text-white font-bold">
              Making Procedure
            </p>

            <p className="dark:text-white">{foodItem.makingProcedure}</p>

            <Link to={`/purchase-food/${id}`}>
              <button className="px-12 py-3 inline-block rounded-[5px] text-primaryColor border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold">
                Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
