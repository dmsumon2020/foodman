import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import LottieLoader from "../LottieLoader/LottieLoader";
import MyOrder from "../MyOrder/MyOrder";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      const fetchPurchaseData = async () => {
        try {
          const response = await axiosSecure.get(
            `/purchases/email/${user.email}`
          );
          setPurchases(response.data);
          setError(null); // Reset error on successful fetch
        } catch (err) {
          console.error("Error fetching purchase data:", err);
          setError("You haven't made any purchase yet");
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchPurchaseData();
    }
  }, [user, axiosSecure]); // Added axiosSecure to dependencies

  // Function to remove a deleted purchase from the state
  const handleRemovePurchase = (id) => {
    setPurchases((prevPurchases) =>
      prevPurchases.filter((purchase) => purchase._id !== id)
    );
  };

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

  if (!purchases.length) {
    return (
      <section className="bg-titleImage py-10 md:py-32 bg-no-repeat bg-cover">
        <h2 className="text-lg font-semibold text-center text-white mt-0 md:mt-[85px]">
          <p className="uppercase text-black">
            No added purchase data were found for: {user?.displayName}
          </p>
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="sub-heading">Buy more, eat more</h4>

        <h3 className="heading dark:text-white">
          Order History of: {user?.displayName}
        </h3>
      </div>

      <div className="food-items-container w-11/12 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white dark:bg-DarkModeBg p-5">
        {purchases.map((purchase) => (
          <MyOrder
            key={purchase._id}
            purchase={purchase}
            handleRemovePurchase={handleRemovePurchase}
          />
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
