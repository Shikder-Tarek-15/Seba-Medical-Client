import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {/* Slide - 1 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-around bg-base-200 p-5 rounded-xl">
          <div className=" space-y-5">
            <h2 className="text-4xl font-bold">Clear Vision Restored</h2>
            <p className="w-[400px] text-xl">Mr. Rahman, aged 72, received free cataract surgery at our eye care camp. His joy was boundless as he saw his grandchildren clearly for the first time.</p>
          </div>
          <div>
            <img
              className="h-96 rounded-xl border-4 border-yellow-600"
              src="https://i.ibb.co/PjQ7mxz/slide1.jpg"
            />
          </div>
        </div>
      </SwiperSlide>
      {/* Slide - 2 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-around bg-base-200 p-5 rounded-xl">
          <div className=" space-y-5">
            <h2 className="text-4xl font-bold">Ahmeds Heart Surgery</h2>
            <p className="w-[400px] text-xl">6-year-old Ahmed underwent life-saving heart surgery at our camp, allowing him to play and live a normal, active life.</p>
          </div>
          <div>
            <img
              className="h-96 rounded-xl border-4 border-yellow-600"
              src="https://i.ibb.co/wMLm2nM/slide2.jpg"
            />
          </div>
        </div>
      </SwiperSlide>
      {/* Slide - 3 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-around bg-base-200 p-5 rounded-xl">
          <div className=" space-y-5">
            <h2 className="text-4xl font-bold">Vaccines for a Safer Tomorrow</h2>
            <p className="w-[400px] text-xl">Over 1,000 children were vaccinated against diseases like measles and polio, safeguarding their health and the community’s future.</p>
          </div>
          <div>
            <img
              className="h-96 rounded-xl border-4 border-yellow-600"
              src="https://i.ibb.co/xJPs3sH/slide3.webp"
            />
          </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Slider;