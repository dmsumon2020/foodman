import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import UserAddedFood from "../UserAddedFood/UserAddedFood";
import LottieLoader from "../LottieLoader/LottieLoader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserAddedFoods = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  // axios
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      const fetchFoods = async () => {
        try {
          const response = await axiosSecure.get(`/foods/email/${user.email}`);
          setFoods(response.data);
        } catch (err) {
          setError("No foods were added by you.", err);
        } finally {
          setLoading(false);
        }
      };

      fetchFoods();
    }
  }, [user]);

  if (loading) {
    return <LottieLoader />;
  }

  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-center text-3xl font-bold">{error}</p>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase">
            No added foods were found for : {user?.displayName}
          </p>
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="sub-heading">Make the Chef Proud</h4>

        <h3 className="heading dark:text-white">
          All Food Items of : {user?.displayName}
        </h3>
      </div>

      <div className="food-items-container w-11/12 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white dark:bg-DarkModeBg p-5">
        {foods.map((food) => (
          <UserAddedFood key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
};

export default UserAddedFoods;
