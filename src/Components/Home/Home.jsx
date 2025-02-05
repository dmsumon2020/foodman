import AllFoodItems from "../AllFoodItems/AllFoodItems";
import Gallery from "../Gallery/Gallery";
import Slider from "../Slider/Slider";
import Features from "./Features";
import MyStory from "./MyStory";

const Home = () => {
  return (
    <main>
      <Slider />
      <Features />
      <AllFoodItems isHomepage={true} />
      <MyStory />
      <Gallery isHomepage={true} />
    </main>
  );
};

export default Home;
