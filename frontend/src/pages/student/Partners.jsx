import React from "react";
import {
  FaHandshake,
  FaChalkboardTeacher,
  FaUniversity,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import Partner from "../../assets/ContactUs/Partner.png"

const Partners = () => {
  const partnerTypes = [
    {
      title: "Training Partners",
      description:
        "Collaborate with Quick Learn to deliver world-class training programs and empower learners with industry-relevant skills.",
      icon: FaChalkboardTeacher,
    },
    {
      title: "University Partners",
      description:
        "Partner with us to provide academic excellence combined with real-world digital skills for students and professionals.",
      icon: FaUniversity,
    },
    {
      title: "Corporate Partners",
      description:
        "Upskill your workforce with customized learning paths and enterprise-ready training solutions.",
      icon: FaHandshake,
    },
    {
      title: "Global Alliances",
      description:
        "Expand your reach worldwide by joining hands with Quick Learn to create impactful learning ecosystems.",
      icon: FaGlobe,
    },
  ];

  const benefits = [
    "Access to a global learner base",
    "Industry-recognized certification programs",
    "Revenue sharing opportunities",
    "Marketing & branding support",
    "Dedicated partner success team",
    "Technology-enabled learning platform",
  ];

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <div className="w-full py-24"
      style={{ backgroundImage: `url(${Partner})` }}>
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Become a Quick Learn Partner
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto opacity-90">
            Join hands with Quick Learn to shape the future of digital education
            and empower learners across the globe.
          </p>

          <button className="mt-10 inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition">
            Partner With Us <FaArrowRight />
          </button>
        </div>
      </div>

      {/* ================= PARTNER TYPES ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14 text-blue-900">
          Partnership Opportunities
        </h2>

        <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-8">
          {partnerTypes.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
                data-aos="fade-left"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100">
                  <Icon className="text-3xl text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {partner.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {partner.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BENEFITS SECTION ================= */}
      <div className="w-full bg-sky-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-blue-900">
                Why Partner with Quick Learn?
              </h2>
              <p className="text-gray-700 mb-8">
                We believe in building long-term partnerships that drive
                innovation, growth, and measurable impact in the learning
                ecosystem.
              </p>

              <ul className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                    data-aos="fade-left"
                  >
                    <span className="mt-1 w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                Ready to Collaborate?
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the partnership form and our team will get in touch
                with you to explore collaboration opportunities.
              </p>

              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition">
                Apply for Partnership
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRUST SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-blue-900">
          Trusted by Learners & Organizations
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Our partners play a vital role in delivering high-quality education
          that helps individuals and enterprises grow in a rapidly evolving
          digital world.
        </p>

        {/* Logo placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
