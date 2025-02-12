import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";
import PageTitle from "../TemplateParts/PageTitle/PageTitle";
import LottieLoader from "../LottieLoader/LottieLoader";

const AllFoodItems = ({ isHomepage }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); // Sorting state

  const axiosNonSecure = useAxiosNonSecure();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const response = await axiosNonSecure.get("/foods", {
          params: { homepage: isHomepage, search: searchTerm },
        });
        let sortedData = response.data;

        // Apply sorting
        if (sortOrder === "asc") {
          sortedData = sortedData.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
          sortedData = sortedData.sort((a, b) => b.price - a.price);
        }

        setFoodItems(sortedData);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [isHomepage, searchTerm, sortOrder]);

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

        {!isHomepage && (
          <div className="search-sort-container w-11/12 md:w-9/12 mx-auto my-6 flex justify-between">
            <input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-2/3 px-5 py-3 dark:bg-DarkModeBg dark:text-white"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-dropdown w-1/3 px-5 py-3 dark:bg-DarkModeBg dark:text-white"
            >
              <option value="">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        )}

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
                  <Link to={`/food/${item._id}`}>
                    <button className="px-12 py-3 inline-block rounded-[5px] text-white bg-transparent border border-white transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3">
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
              className="px-12 py-3 inline-block rounded-[5px] text-primaryColor border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3"
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
