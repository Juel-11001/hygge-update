import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useGetSliderQuery } from "../redux/services/eCommerceApi";

// Skeleton Component (আগের মতোই)
const SliderSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-8 sm:py-12 lg:py-[100px] gap-6 animate-pulse">
        <div className="w-full flex justify-center items-center">
            <div className="bg-gray-300 rounded-lg w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] h-[300px] sm:h-[400px]" />
        </div>
        <div className="w-full text-center lg:text-left px-4 sm:px-6 lg:px-0 space-y-6">
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto lg:mx-0" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full max-w-md mx-auto lg:mx-0" />
                <div className="h-4 bg-gray-300 rounded w-full max-w-md mx-auto lg:mx-0" />
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto lg:mx-0" />
            </div>
            <div className="h-10 bg-gray-300 rounded-full w-40 mx-auto lg:mx-0" />
        </div>
    </div>
);

const Hero = () => {
    const { data: sliderData, isLoading } = useGetSliderQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    const [SwiperComponent, setSwiperComponent] = useState(null);
    const [SwiperSlideComponent, setSwiperSlideComponent] = useState(null);

    // শুধু ক্লায়েন্ট সাইডে লোড করবে (SSR safe)
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("swiper/react").then((module) => {
                setSwiperComponent(() => module.Swiper);
                setSwiperSlideComponent(() => module.SwiperSlide);
            });

            // Swiper CSS গ্লোবালি লোড (যদি না করে থাকেন)
            import("swiper/css");
            import("swiper/css/navigation");
            import("swiper/css/pagination");
        }
    }, []);

    // লোডিং এর সময় স্কেলিটন দেখাবে
    if (isLoading || !SwiperComponent || !SwiperSlideComponent) {
        return (
            <div className="px-4 sm:px-6 lg:px-20 xl:px-20 bg-dark1">
                <div className="max-w-7xl mx-auto">
                    <SliderSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-dark1">
            <SwiperComponent
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={false}
                pagination={{ clickable: true }}
                navigation={true}
                className="w-full my-swiper-hero"
            >
                {sliderData?.sliders?.map((slide) => (
                    <SwiperSlideComponent key={slide.id}>
                        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 max-w-[1200px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-8 sm:py-12 lg:py-4 2xl:py-10 gap-6">
                                {/* Image */}
                                <div className="w-full flex justify-center items-center order-2 lg:order-1">
                                    <img
                                        src={slide.banner && `/${slide.banner}`}
                                        alt={slide.title}
                                        loading="lazy"
                                        className="w-full max-w-[300px] sm:max-w-[400px] lg:w-full lg:max-w-[300px] xl:w-full 2xl:max-w-[500px] object-contain drop-shadow-2xl"
                                    />
                                </div>

                                {/* Text */}
                                <div className="w-full order-1 lg:order-2 text-center lg:text-left px-4 sm:px-6 lg:px-0">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl text-yellow font-mont font-normal leading-tight sm:leading-snug lg:leading-[1.1] mb-6 sm:mb-8">
                                        {slide?.type}
                                    </h2>
                                    <p className="text-cream text-sm sm:text-base lg:text-lg xl:text-xl font-light mb-6 sm:mb-8 max-w-[90%] sm:max-w-[470px] mx-auto lg:mx-0 font-mont">
                                        {slide?.title}
                                    </p>
                                    <button
                                        href={slide?.btn_url}
                                        className="inline-flex items-center gap-3 text-sm sm:text-base lg:text-lg font-mont px-6 sm:px-8 py-3 rounded-[10px] border-2 bg-red text-cream border-red    transition-all duration-300"
                                    >
                                        Buy Products
                                        <GoArrowRight className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlideComponent>
                ))}
            </SwiperComponent>
        </div>
    );
};

export default Hero;
