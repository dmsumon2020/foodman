import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyOrder = ({ purchase, handleRemovePurchase }) => {
  // axios
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    buyerEmail,
    foodName,
    price,
    purchaseDate,
    quantity,
    totalPrice,
    image,
  } = purchase;

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };

  const handleDeleteOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deletePurchase = async () => {
          try {
            const response = await axiosSecure.delete(`/purchase/${id}`, {
              headers: {
                "X-User-Email": buyerEmail,
              },
            });
            if (response.status === 200) {
              handleRemovePurchase(id);
            }
          } catch (error) {
            console.error("Error deleting purchase:", error);
            showAlert(
              "error",
              "Failed to delete",
              "Failed to delete the purchase. Please try again later."
            );
          }
        };
        deletePurchase();
        Swal.fire({
          title: "Deleted!",
          text: `Purchase with ID ${id} deleted successfully!`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="food-item-card relative group">
      <div className="food-item-image">
        <img src={image} alt={foodName} />
      </div>

      <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-40 transition-all duration-300 group-hover:opacity-75"></div>

      <div className="food-item-info flex flex-wrap flex-col justify-center items-center absolute bottom-10 w-full">
        <h3 className="text-white text-[30px] leading-[30px] lg:text-[35px] lg:leading-[50px] uppercase md:py-3 text-center">
          {foodName}
        </h3>
        <p className="text-white text-center text-[20px] lg:py-2">
          Quantity: {quantity}
        </p>
        <p className="text-white text-center text-[20px] lg:py-2">
          Unit Price: ${price}
        </p>
        <p className="text-white text-center text-[20px] lg:py-2">
          {purchaseDate}
        </p>
        <p className="text-white text-center text-[20px] lg:py-2">
          Total cost: {totalPrice}
        </p>

        <button
          onClick={() => handleDeleteOrder(_id)}
          className="view-details-button text-white text-[20px] border border-white px-4 py-2 mt-3 font-bold transition-all duration-300 hover:bg-white hover:text-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyOrder;
