import { Suspense } from "react";
import HighLightsProducts from "./HighLightsProducts";
import HomeSlider from "./HomeSlider";
import Offer from "./Offer";
import Loader from "../Loader/Loader";

const HomePage = async () => {
  return (
    <section>
      <HomeSlider />
      <div className=" p-10 ">
        <h2 className="text-[var(--green-main)] [font-size:_clamp(18px,4vw,30px)] font-bold  pb-10 max-w-[1500px] m-auto   ">
          {`This Week's Highlights`}
        </h2>
        <Suspense fallback={<Loader />}>
          <HighLightsProducts />
        </Suspense>
      </div>
      <Offer />
    </section>
  );
};

export default HomePage;
