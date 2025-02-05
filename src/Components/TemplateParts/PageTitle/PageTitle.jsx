import pageTitleBg from "../../../assets/titleBg.webp";

const PageTitle = ({ title }) => {
  return (
    <section
      className="py-32 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${pageTitleBg})` }}
    >
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
      <h2 className="text-center text-white text-2xl md:text-4xl font-bold relative z-10">
        {title}
      </h2>
    </section>
  );
};

export default PageTitle;
