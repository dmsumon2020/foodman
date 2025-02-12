import { Link } from "react-router";

const UserAddedFood = ({ food }) => {
  const { _id, foodName, image, price, purchaseCount } = food;

  return (
    <div className="food-item-card relative group">
      <div className="food-item-image">
        <img src={image} alt={foodName} />
      </div>
      <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-40 transition-all duration-300 group-hover:opacity-75"></div>

      <div className="food-item-info flex flex-wrap flex-col justify-center items-center absolute bottom-10 w-full">
        <h3 className="text-white text-[32px] leading-[32px] md:text-[35px] md:leading-[50px] uppercase py-3 text-center">
          {foodName}
        </h3>
        <p className="text-white text-[20px] py-2">Price: ${price}</p>
        <p className="text-white text-[20px] py-2">
          Sold Times: {purchaseCount}
        </p>

        {/* Add View Details button */}
        <Link to={`/update-food/${_id}`}>
          <button className="px-12 py-3 inline-block rounded-[5px] text-white bg-transparent border border-white transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3">
            Update Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserAddedFood;
