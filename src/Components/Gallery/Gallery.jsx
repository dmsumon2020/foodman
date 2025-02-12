import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Link } from "react-router";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";
import PageTitle from "../TemplateParts/PageTitle/PageTitle";
import LottieLoader from "../LottieLoader/LottieLoader";

const Gallery = ({ isHomepage }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosNonSecure = useAxiosNonSecure();

  // Fetch gallery items from the API using Axios
  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosNonSecure.get("/gallery", {
          params: { homepage: isHomepage },
        });
        setImages(
          response.data.map((item) => ({
            src: item.image,
            alt: item.foodName,
            userName: item.userName,
            foodName: item.foodName,
            description: item.description,
          }))
        );
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGalleryItems();
  }, [axiosNonSecure, isHomepage]);

  return (
    <>
      {!isHomepage && <PageTitle title={"FoodMAN Photo Gallery"} />}
      <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor px-4 py-20">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="font-subheadingFont text-[40px] leading-[40px] text-center text-primaryColor md:pt-10 pb-2">
            We make awesome foods
          </h4>

          <h3 className="font-headingFont text-[30px] leading-[30px] md:text-[55px] md:leading-[55px] font-bold text-center text-[#111] dark:text-white pb-[4rem]">
            Our Gallery
          </h3>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <LottieLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer group"
                onClick={() => {
                  setCurrentIndex(index);
                  setOpen(true);
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                  <div className="text-white text-lg font-semibold text-center p-5">
                    <h3 className="text-white text-[35px] leading-[50px] uppercase py-3 text-center">
                      {image.foodName}
                    </h3>
                    <p className="text-white text-[20px] py-1">
                      User: {image.userName}
                    </p>
                    <p className="text-white text-[20px] py-1 font-normal">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isHomepage && (
          <div className="view-all-foods w-11/12 md:w-9/12 mx-auto text-center mt-10">
            <Link
              to="/gallery"
              className="px-12 py-3 inline-block rounded-[5px] text-primaryColor  border border-primaryColor transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-white mt-1 md:mt-3"
            >
              View Full Gallery
            </Link>
          </div>
        )}

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images}
          index={currentIndex}
          on={{
            click: () => setOpen(false),
          }}
        />
      </section>
    </>
  );
};

export default Gallery;
