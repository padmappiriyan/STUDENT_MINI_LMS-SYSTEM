import React from "react";
import careerImg from "../../assets/DashBoard/Careers.png";
import heroBg from "../../assets/Hero/Learn01.jpeg";

import emp1 from "../../assets/Employees/emp1.jpeg";
import emp2 from "../../assets/Employees/emp2.jpg";
import emp3 from "../../assets/Employees/emp3.jpeg";

import {
  FaChartLine,
  FaHandsHelping,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";

const Career = () => {
  const reasons = [
    {
      title: "All inclusive",
      description:
        "We firmly believe in and embrace an open culture. Our teams comprise individuals from diverse backgrounds bringing about their own experiences.",
      bg: "bg-yellow-50",
    },
    {
      title: "Innovation & tech first",
      description:
        "Our experiences and processes are constantly evolving. We believe in innovative practices that continually push the boundaries of what’s possible for the industry.",
      bg: "bg-blue-50",
    },
    {
      title: "People centric",
      description:
        "Our people make our organization. It’s our responsibility to ensure that everyone involved is taken care of and this applies to our policies and processes too via robust employee forums, interconnectivity, and other benefits.",
      bg: "bg-yellow-50",
    },
    {
      title: "Create real impact",
      description:
        "We are on a mission to transform lives through digital upskilling. Our programs empower professionals worldwide to acquire in-demand skills and advance their careers. Join the squad and create a real impact.",
      bg: "bg-blue-50",
    },
  ];

  const features = [
    {
      title: "Chart out your own career",
      description:
        "We empower you to mould your path, define your role, and chart your own career trajectory. Explore diverse horizons and unlock a world of possibilities.",
      icon: FaChartLine,
    },
    {
      title: "Open work culture",
      description:
        "We welcome fresh ideas with open arms, fostering a culture where creativity thrives, and new possibilities are explored.",
      icon: FaHandsHelping,
    },
    {
      title: "A chance to upskill at work",
      description:
        "We believe in the power of continuous growth and fuel a culture of personal and professional development.",
      icon: FaGraduationCap,
    },
    {
      title: "Best-in-class facilities",
      description:
        "We consider your best interests via health insurance and flexible tax-saving benefits.",
      icon: FaBuilding,
    },
  ];

  const employees = [
    {
      name: "Shephali Sharma",
      role: "Associate Business Manager",
      image: emp1,
    },
    {
      name: "Selvakumar Padmappiriyan",
      role: "Software Engineer (Intern)",
      image: emp2,
    },
    {
      name: "Mrinal Barua",
      role: "Senior Associate Director - Development",
      image: emp3,
    },
  ];

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <div className="w-full min-h-[400px] bg-[#061e44] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 p-6 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Be part of the{" "}
              <span className="text-blue-300">
                Digital Upskilling Revolution
              </span>
            </h1>
            <p className="text-white text-lg">
              Join us to enhance your digital skills and grow in the world of
              technology.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={careerImg}
              alt="Digital Upskilling"
              className="w-full max-w-md rounded-xl shadow-lg"
              data-aos="fade-left"
            />
          </div>
        </div>
      </div>

      {/* ================= REASONS ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-blue-900">
          Reasons to become a Simplilearner
        </h2>

        <div className="grid lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`${reason.bg} p-6 rounded-xl shadow-md`}
              data-aos="fade-left"
            >
              <h3 className="text-lg font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-700 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEATURES ================= */}
        <div
  className="w-full mt-16 bg-cover bg-center min-h-[700px]"
  style={{ backgroundImage: `url(${heroBg})` }}
>
  {/* Overlay */}
  <div className="bg-black/60 w-full min-h-[700px] flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full">
      {/* Title */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
        What’s in it for you?
      </h2>

      {/* Features */}
      <div className="grid lg:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white rounded-xl p-6 shadow-lg flex gap-4 items-start hover:shadow-xl transition"
            >
              <Icon className="text-4xl text-blue-600 flex-shrink-0" />

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>


      {/* ================= EMPLOYEES SECTION ================= */}
      <div className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14">
            Meet the Quick Learn Team
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {employees.map((emp, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg h-[420px]"
                data-aos="fade-up"
              >
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">{emp.name}</h3>
                  <p className="text-sm">{emp.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
