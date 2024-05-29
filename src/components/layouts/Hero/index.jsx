import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import Swipe1 from "@/assets/images/swipe1.png";
import Swipe2 from "@/assets/images/swipe2.png";
import Swipe3 from "@/assets/images/swipe3.png";
import Swipe6 from "@/assets/images/swipe6.jpg";
import Swipe5 from "@/assets/images/swipe5.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="container w-full mx-auto md:h-80 h-60 relative">
        <Swiper
          spaceBetween={30}
          speed={3000}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          fadeEffect={{ crossFade: true }}
          navigation={true}
          modules={[Navigation, Autoplay, EffectFade]}
          className="mySwiper rounded-lg"
        >
          <SwiperSlide>
            <div className="w-full">
              <Image
                src={Swipe1}
                alt="Slide 1"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <Image
                src={Swipe2}
                alt="Slide 2"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <Image
                src={Swipe3}
                alt="Slide 3"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <Image
                src={Swipe6}
                alt="Slide 4"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <Image
                src={Swipe5}
                alt="Slide 5"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
