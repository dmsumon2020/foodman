import PageTitle from "../TemplateParts/PageTitle/PageTitle";
import Swal from "sweetalert2";

const BookTable = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "Your table has been booked successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <PageTitle title={"Book a Table for your family"} />
      <section className=" bg-sectionBgColor dark:bg-DarkModeSectionBgColor py-20">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="font-subheadingFont text-[40px] leading-[40px] text-center text-primaryColor md:pt-10 pb-2">
            Enjoy food with your beloved
          </h4>

          <h3 className="font-headingFont text-[30px] leading-[30px] md:text-[55px] md:leading-[55px] font-bold text-center text-[#111] dark:text-white pb-[4rem]">
            Book A Table
          </h3>
        </div>
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColor focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColor focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColor focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="time"
                >
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColor focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="guests"
                >
                  Number of Guests
                </label>
                <input
                  id="guests"
                  type="number"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primaryColor focus:ring-primaryColor focus:ring-opacity-40 dark:focus:border-primaryColor focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-12 py-3 inline-block rounded-[5px] text-primaryColor  border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3 font-bold"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookTable;
