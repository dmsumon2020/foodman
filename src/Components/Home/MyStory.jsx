import { useContext } from "react";
import { motion } from "framer-motion";
import chef from "../../assets/chef.jpg";
import signatureDark from "../../assets/signatureDark.png";
import signatureLight from "../../assets/signatureLight.png";
import { ThemeContext } from "../../../ThemeProvider/ThemeProvider";
import plate from "../../assets/plate.png";

const MyStory = () => {
  const { theme } = useContext(ThemeContext);

  // Set image sources based on the theme
  const signature = theme === "dark" ? signatureLight : signatureDark;

  return (
    <section className="dark:bg-DarkModeBg">
      <div className="my-story-container w-11/12 md:w-9/12 mx-auto flex flex-col lg:flex-row gap-10 lg:gap-24 py-20">
        <div className="chef-image flex-1 relative">
          <motion.div
            className="plate absolute -left-20 top-0"
            animate={{
              y: [0, -20, 0], // Move up by 20px and back to the original position
            }}
            transition={{
              duration: 2, // Duration for one complete cycle
              repeat: Infinity, // Repeat the animation indefinitely
              ease: "easeInOut", // Smooth transition
            }}
          >
            <img src={plate} alt="" className="w-[200px] h-auto" />
          </motion.div>
          <img src={chef} alt="Chef" />
        </div>
        <div className="my-story flex-1 ">
          <div className="flex flex-col justify-center items-center h-full">
            <h4 className="sub-heading text-left">The struggle to win</h4>
            <h3 className="heading text-left dark:text-white">My Story</h3>
            <p className="dark:text-white">
              From humble beginnings, Chef Alex started in a small kitchen,
              facing countless challenges. With limited resources and a deep
              passion for cooking, he honed his skills, working tirelessly to
              perfect his craft. His journey wasn't easy—many sleepless nights
              and failed attempts—but his love for food kept him going. Slowly,
              word spread about his unique flavors and dedication to quality.
              After years of perseverance, Chef Alex opened his own restaurant,
              turning it into a success. Today, his restaurant is renowned for
              its innovative dishes and exceptional dining experience, a
              testament to his hard work and resilience.
            </p>
            <img src={signature} alt="Signature" className="pt-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
