import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";
import PageTitle from "../TemplateParts/PageTitle/PageTitle";
import LottieLoader from "../LottieLoader/LottieLoader";

const AllFoodItems = ({ isHomepage }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Adding loading state

  const axiosNonSecure = useAxiosNonSecure();

  useEffect(() => {
    // Fetch food items from the backend
    const fetchFoodItems = async () => {
      try {
        setLoading(true); // Set loading to true when the fetch starts
        const response = await axiosNonSecure.get("/foods", {
          params: { homepage: isHomepage, search: searchTerm },
        });
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false); // Set loading to false when the fetch is done
      }
    };

    fetchFoodItems();
  }, [isHomepage, searchTerm]);

  return (
    <>
      {!isHomepage && <PageTitle title={"All Food Items"} />}
      <section className="bg-sectionBgColor py-20 dark:bg-DarkModeSectionBgColor">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="sub-heading">Our Specialties</h4>
          {isHomepage ? (
            <h3 className="heading dark:text-white">My Featured Menus</h3>
          ) : (
            <h3 className="heading dark:text-white">All Food Items</h3>
          )}
        </div>
        {/* Add Search Input */}
        {!isHomepage && (
          <div className="search-container w-11/12 md:w-9/12 mx-auto my-6">
            <input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
              className="search-input w-full px-5 py-5 dark:bg-DarkModeBg dark:text-white"
            />
          </div>
        )}

        {/* Show loading spinner while fetching data */}
        {loading ? (
          <div className="loading-spinner text-center">
            <LottieLoader />
          </div>
        ) : (
          <div className="food-items-container w-11/12 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white dark:bg-DarkModeBg p-5">
            {foodItems.map((item) => (
              <div key={item._id} className="food-item-card relative group">
                <div className="food-item-image">
                  <img src={item.image} alt={item.foodName} />
                </div>
                <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-40 transition-all duration-300 group-hover:opacity-75"></div>
                <div className="food-item-info flex flex-wrap flex-col justify-center items-center absolute bottom-10 w-full">
                  <h3 className="text-white text-[30px] md:text-[35px] leading-[30px] md:leading-[50px] uppercase py-1 md:py-3 text-center">
                    {item.foodName}
                  </h3>
                  <p className="text-white md:text-[20px] py-1">
                    Price: ${item.price}
                  </p>
                  <p className="text-white md:text-[20px] py-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-white md:text-[20px] py-1">
                    Sold Times: {item.purchaseCount}
                  </p>

                  {/* Add View Details button */}
                  <Link to={`/food/${item._id}`}>
                    <button className="px-12 py-3 inline-block rounded-[5px] text-white bg-transparent border border-white transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-black mt-1 md:mt-3">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {isHomepage && (
          <div className="view-all-foods w-11/12 md:w-9/12 mx-auto text-center mt-10">
            <Link
              to="/all-foods"
              className="border border-primaryColor text-primaryColor px-6 py-3 font-bold text-base md:text-lg font-headingFont transition-bg duration-300 hover:bg-primaryColor hover:text-white"
            >
              View All Foods
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default AllFoodItems;
