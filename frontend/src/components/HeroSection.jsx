import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import Image1 from "../assets/Hero/Learn01.jpeg";
import Image2 from "../assets/Hero/Learn02.jpeg";
import Image3 from "../assets/Hero/Learn03.jpeg";
import Image6 from "../assets/Hero/Learn06.png";

const ImageList = [
  {
    id: 1,
    image: Image1,
    title: "Get Valuable Certificates",
    description:
      "Earn globally recognized certificates that boost your career and validate your professional skills.",
  },
  {
    id: 2,
    image: Image2,
    title: "Learn from Anywhere, Anytime",
    description:
      "Access high-quality online courses anytime with flexible and personalized learning options.",
  },
  {
    id: 3,
    image: Image3,
    title: "Upgrade Your Skills Today",
    description:
      "Join thousands of learners and gain in-demand skills from industry experts.",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
    customPaging: () => (
      <div className="w-2.5 h-2.5 mx-1 rounded-full bg-blue-400/40 hover:bg-pink-500 transition-all" />
    ),
    dotsClass: "slick-dots !bottom-6",
  };

  return (
    <section className="relative min-h-[550px] sm:min-h-[600px] flex items-center overflow-hidden">

      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Image6})` }}
      />

      {/* 🔹 Dark + Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r 
        from-black/80 via-blue-900/60 to-black/80" />

      {/* 🔹 Decorative Glows */}
      <div className="absolute top-[-120px] right-[-120px] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] left-[-120px] w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

      {/* 🔹 Content */}
      <div className="container max-w-7xl  mx-auto px-4 relative z-10">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">

                {/* TEXT */}
                <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">

                  <span className="inline-block text-xs font-semibold uppercase tracking-wider
                    bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
                    Online Learning Platform
                  </span>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-blue-200">
                    {data.title}
                  </h1>

                  <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                    {data.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                    <button
                      onClick={() => navigate("/register")}
                      className="px-7 py-3 rounded-full font-semibold text-white
                      bg-gradient-to-r from-blue-600 to-pink-600
                      shadow-lg shadow-blue-600/30
                      hover:scale-105 hover:shadow-pink-500/40
                      transition-transform"
                    >
                      Get Started Now
                    </button>

                    <button
                      className="px-7 py-3 rounded-full font-semibold
                      border border-blue-400/40 text-blue-300
                      hover:bg-blue-500/10 transition"
                    >
                      Learn More
                    </button>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative w-[260px] sm:w-[340px] lg:w-[500px] rounded-2xl overflow-hidden
                    bg-white/5 backdrop-blur-md border border-white/10
                    shadow-2xl shadow-blue-900/40">

                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full h-[260px] sm:h-[320px] lg:h-[400px] object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HeroSection;
