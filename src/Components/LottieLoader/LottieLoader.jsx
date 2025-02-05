import Lottie from "lottie-react";
import animationData from "../../assets/animation.json";

const LottieLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default LottieLoader;
