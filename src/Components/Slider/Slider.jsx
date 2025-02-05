import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "./Slider.css";
import { Link } from "react-router";
import LottieLoader from "../LottieLoader/LottieLoader";
import useAuth from "../../Hooks/useAuth";
import useAxiosNonSecure from "../../Hooks/useAxiosNonSecure";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true);
  const axiosNonSecure = useAxiosNonSecure();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await axiosNonSecure.get("/sliders");
        setSlides(response.data);
      } catch (error) {
        setError("Error fetching slider data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <LottieLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        className="w-full h-full"
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col items-start justify-center text-white px-0 md:px-10 lg:px-20"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="p-6">
                <h3 className="text-xl tracking-[5px] text-primaryColor mb-3 font-black font-subheadingFont">
                  {slide.subTitle}
                </h3>
                <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold mb-8 max-w-sm md:max-w-md lg:max-w-lg">
                  {slide.title}
                </h1>
                <p className="text-sm text-[#e5ebef] opacity-70 max-w-sm md:max-w-md lg:max-w-lg">
                  {slide.description}
                </p>
                <div className="mt-10 flex flex-col md:flex-row gap-10">
                  <Link
                    to="/all-foods"
                    className="px-12 py-3 inline-block rounded-[5px] text-black bg-primaryColor border border-primaryColor transition-all duration-300 hover:border-white hover:bg-transparent hover:text-white"
                  >
                    All Foods
                  </Link>
                  <Link
                    to="/gallery"
                    className="px-12 py-3 inline-block rounded-[5px] text-white bg-transparent border border-white transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:text-black"
                  >
                    Gallery
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
