import { useContext } from "react";
import icon1Light from "../../assets/icon1Light.webp";
import icon1Dark from "../../assets/icon1Dark.webp";
import icon2Light from "../../assets/icon2Light.webp";
import icon2Dark from "../../assets/icon2Dark.webp";
import icon3Light from "../../assets/icon3Light.webp";
import icon3Dark from "../../assets/icon3Dark.webp";
import icon4Light from "../../assets/icon4Light.webp";
import icon4Dark from "../../assets/icon4Dark.webp";
import { ThemeContext } from "../../../ThemeProvider/ThemeProvider";

const Features = () => {
  const { theme } = useContext(ThemeContext);

  // Set image sources based on the theme
  const icon1 = theme === "dark" ? icon1Light : icon1Dark;
  const icon2 = theme === "dark" ? icon2Light : icon2Dark;
  const icon3 = theme === "dark" ? icon3Light : icon3Dark;
  const icon4 = theme === "dark" ? icon4Light : icon4Dark;

  return (
    <div>
      <section className="bg-sectionBgColor dark:bg-DarkModeSectionBgColor">
        <h4 className="sub-heading">Features</h4>
        <h3 className="heading dark:text-white">Why people choose us?</h3>

        <div className="features-container w-11/12 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-12  bg-white dark:bg-DarkModeBg">
          <div className="feature-card flex flex-col items-center justify-center">
            <img
              src={icon1}
              alt="breakfast"
              className="w-[110px] h-[110px] font-bold"
            />
            <h3 className="text-primaryColor text-2xl font-bold pt-9 pb-5">
              BREAKFAST
            </h3>
            <p className="text-center dark:text-white">
              Fuel your morning with our mouthwatering breakfast menu, crafted
              to satisfy every craving and start your day deliciously!
            </p>
          </div>
          <div className="feature-card flex flex-col items-center justify-center">
            <img
              src={icon2}
              alt="Lunch"
              className="w-[110px] h-[110px] font-bold"
            />
            <h3 className="text-primaryColor text-2xl font-bold pt-9 pb-5">
              Lunch
            </h3>
            <p className="text-center dark:text-white">
              Enjoy a delicious midday break with our satisfying lunch menu,
              featuring fresh flavors and hearty options for every taste.
            </p>
          </div>
          <div className="feature-card flex flex-col items-center justify-center">
            <img
              src={icon3}
              alt="dinner"
              className="w-[110px] h-[110px] font-bold"
            />
            <h3 className="text-primaryColor text-2xl font-bold pt-9 pb-5">
              Dinner
            </h3>
            <p className="text-center dark:text-white">
              Indulge in a perfect evening with our delightful dinner menu,
              offering flavorful dishes to make your night special.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center justify-center">
            <img
              src={icon4}
              alt="others"
              className="w-[110px] h-[110px] font-bold"
            />
            <h3 className="text-primaryColor text-2xl font-bold pt-9 pb-5">
              Others
            </h3>
            <p className="text-center dark:text-white">
              Craving something quick? Our fast food menu offers tasty,
              satisfying options for every craving, served fresh and fast!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
