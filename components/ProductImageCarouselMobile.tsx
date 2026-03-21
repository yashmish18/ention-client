import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useRef } from "react";

const defaultImages = [
  "/assets/landing_page/2A.webp",
  "/assets/landing_page/3A.webp",
  "/assets/landing_page/4A.webp",
];

export default function ProductImageCarouselMobile({ images }: { images?: any[] }) {
  const [middleSlide, setMiddleSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  const imgs = images && images.length ? images : defaultImages;

  return (
    <div className="w-screen block md:hidden" style={{ overflow: 'visible' }}>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={600}
        slidesPerView={1}
        spaceBetween={0}
        loop={imgs.length > 2}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        style={{ width: '100vw', overflow: 'visible' }}
        onSlideChange={(swiper) => setMiddleSlide(swiper.realIndex)}
      >
        {imgs.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                width: '100vw',
                aspectRatio: '16/9',
                height: 'auto',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'none',
                transform: middleSlide === idx ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.5s, box-shadow 0.5s',
                borderRadius: '0',
              }}
            >
              <img
                src={img}
                alt={`Ention Laptop ${idx + 1}`}
                className="w-full h-auto mx-auto"
                style={{ objectFit: 'contain' }}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4">
        {imgs.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full mx-1 ${idx === middleSlide ? 'bg-[#01E9FE]' : 'bg-white/30'}`}></span>
        ))}
      </div>
    </div>
  );
} 