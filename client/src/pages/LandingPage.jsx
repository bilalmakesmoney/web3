import image from "../assets/hero.png";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full relative grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8 items-center mt-12 max-w-[1400px] mx-auto">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-[50px] xl:text-[56px] leading-tight lg:leading-[65px] xl:leading-[80px] font-bold">
          Bee the <span className="text-primary">Hope</span>,{" "}
          <br className="hidden md:block" />
          Spread the <span className="text-primary">Buzz</span> and{" "}
          <br className="hidden lg:block" />
          Save <span className="text-primary">Lives</span> Together
        </h1>
        <p className="text-white/50 mt-4 text-sm lg:text-md xl:text-lg max-w-[600px] mx-auto lg:mx-0">
          Unite passion and support to create something extraordinary. Start
          your journey today.
        </p>
        <Link
          to="/campaigns"
          className="flex mt-6 w-fit justify-center items-center px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-primary rounded-md gap-2 cursor-pointer mx-auto lg:mx-0 hover:bg-primary/90 transition-all"
        >
          <span className="text-sm lg:text-md xl:text-lg">
            Start Fundraising
          </span>
          <RxArrowTopRight className="text-2xl xl:text-3xl" />
        </Link>
      </div>
      <div className="flex justify-center lg:justify-end">
        <img
          src={image}
          alt="hero"
          className="h-auto max-h-[420px] max-w-full"
        />
      </div>
    </div>
  );
};
export default LandingPage;
