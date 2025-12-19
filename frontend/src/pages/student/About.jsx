import React from "react";
import NavbarSection from "../../components/Home/NavbarSection";
import { IoIosContacts } from "react-icons/io";
import { SiSololearn } from "react-icons/si";
import { LiaCertificateSolid } from "react-icons/lia";
import { SiGreatlearning } from "react-icons/si";
import Image1 from "../../assets/About/Studying.png";
import { FaLightbulb } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { PiPottedPlantFill } from "react-icons/pi";
import Image2 from "../../assets/About/Study.png";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleContactUs = () =>{
        navigate("/contact_us");
    }
   
  return (
    <div className="min-h-screen h-full">
      {/* Navbar */}
      <NavbarSection className="fixed" />

      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto lg:px-14 mt-24">
        <div className="mt-4 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900">
            Quick Learn - Online Learning Platform in Sri Lanka
          </h1>
          <p className="text-gray-400">
            An online learning platform is a website where students learn
            through videos, quizzes, and interactive lessons from anywhere.
          </p>
        </div>

        {/* Stats */}
        
<div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">

  {/* Card 1 */}
  <div className="rounded-2xl p-6 bg-white border border-gray-200 
  shadow-md hover:shadow-xl hover:-translate-y-1 transition space-y-3">
    <IoIosContacts className="text-blue-600 text-4xl" />
    <h3 className="text-4xl text-gray-900 font-bold">10+</h3>
    <p className="text-gray-600">Expert Team Members</p>
  </div>

  {/* Card 2 */}
  <div className="rounded-2xl p-6 bg-white border border-gray-200 
  shadow-md hover:shadow-xl hover:-translate-y-1 transition space-y-3">
    <SiSololearn className="text-green-600 text-4xl" />
    <h3 className="text-4xl text-gray-900 font-bold">20+</h3>
    <p className="text-gray-600">Best Courses</p>
  </div>

  {/* Card 3 */}
  <div className="rounded-2xl p-6 bg-white border border-gray-200 
  shadow-md hover:shadow-xl hover:-translate-y-1 transition space-y-3">
    <LiaCertificateSolid className="text-purple-600 text-4xl" />
    <h3 className="text-4xl text-gray-900 font-bold">95%</h3>
    <p className="text-gray-600">Valuable Certificates</p>
  </div>

  {/* Card 4 */}
  <div className="rounded-2xl p-6 bg-white border border-gray-200 
  shadow-md hover:shadow-xl hover:-translate-y-1 transition space-y-3">
    <SiGreatlearning className="text-orange-500 text-4xl" />
    <h3 className="text-4xl text-gray-900 font-bold">100%</h3>
    <p className="text-gray-600">Valuable Courses</p>
  </div>

</div>

      </div>

      {/* About Section */}
      <div className="w-full max-w-7xl  mx-auto px-14 mt-32" data-aos="fade-up" >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={Image1}
              alt="studying_group"
              className="w-full h-[400px] object-cover transition duration-300 hover:scale-105 rounded-2xl"
            />
            <p className="text-blue-400 text-center mt-4">
              Get the Benefits from us through Learning
            </p>
          </div>

          <div>
            <h3 className="text-3xl lg:text-4xl text-blue-900 font-bold">
              Sri Lanka’s Leading Online Learning Platform
            </h3>
            <div className="w-56 h-1 bg-blue-500 mt-2"></div>

            <div className="space-y-8 mt-8 text-gray-800">
              <p>
                QuickLearn is proudly based in Colombo, offering high-quality
                online education to learners across Sri Lanka and beyond.
              </p>

              <p>
                We connect learners with expert instructors and modern digital
                tools. Our mission is to provide globally competitive learning
                experiences that match both international standards and local
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="w-full max-w-7xl  mx-auto px-14 py-16 mt-10">
        <h2 className="text-center text-4xl font-bold text-blue-800">
          Our Core Values Driving IT Excellence in Sri Lanka
        </h2>
        <div className="w-48 h-[3px] bg-blue-500 mx-auto mt-3"></div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mt-12">
          <div className="bg-blue-500/10 p-6 rounded-xl space-y-4 hover:scale-105 transition">
            <FaLightbulb className="text-blue-500 text-3xl" />
            <h3 className="text-xl font-bold text-gray-800">
              Innovation & AI Solutions
            </h3>
            <p className="text-gray-800">
              We embrace modern technologies to deliver innovative learning
              solutions.
            </p>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-xl space-y-4 hover:scale-105 transition">
            <FaStar className="text-blue-500 text-3xl" />
            <h3 className="text-xl font-bold text-gray-800">Quality Excellence</h3>
            <p className="text-gray-800">
              We ensure high-quality courses with strong focus on value and
              reliability.
            </p>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-xl space-y-4 hover:scale-105 transition">
            <AiFillSafetyCertificate className="text-blue-500 text-3xl" />
            <h3 className="text-xl font-bold text-gray-800">Integrity & Trust</h3>
            <p className="text-gray-800">
              We build long-term trusted relationships with our learners.
            </p>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-xl space-y-4 hover:scale-105 transition">
            <PiPottedPlantFill className="text-blue-500 text-3xl" />
            <h3 className="text-xl font-bold text-gray-800">
              Growth & Learning
            </h3>
            <p className="text-gray-800">
              We promote continuous learning and skill development.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-full max-w-7xl mx-auto px-14 mt-10 py-16" data-aos="flip-left">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
          <div className="overflow-hidden rounded-2xl lg:order-2">
            <img
              src={Image2}
              alt="learner"
              className="w-full h-[400px] object-cover transition duration-300 hover:scale-105 rounded-2xl"
            />
          </div>

          <div className="lg:order-1">
            <h3 className="text-3xl lg:text-4xl text-blue-800 font-bold">
              Our Story – Growing Into a Modern Online Learning Platform
            </h3>
            <div className="w-56 h-1 bg-blue-500 mt-2"></div>

            <div className="space-y-4 mt-6 text-gray-800">
              <p>
                Our journey began as a small WhatsApp learning group where
                students shared notes and helped each other.
              </p>

              <p>
                As the group grew, we expanded to YouTube, offering free lessons
                for students across Sri Lanka.
              </p>

              <p>
                Today, we have transformed into a complete online learning
                platform (LMS) providing structured courses, interactive
                lessons, and skill-development programs for all learners.
              </p>

              <p>
                What started as a simple idea is now a growing digital learning
                community—helping thousands learn anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-7xl mx-auto mt-10 py-16 lg:py-24 relative overflow-hidden mb-20">
        

        <div className="flex flex-col justify-center items-center px-10 lg:px-36 py-16 space-y-10 relative">
          <h3 className="text-3xl lg:text-4xl text-center text-blue-800 font-bold">
            Unlock Your Potential With Modern Online Learning  
            Start Your Journey With Sri Lanka’s Trusted Online Education Platform.
          </h3>

          <button className="text-xl lg:text-2xl text-white bg-linear-to-r from-blue-600 to-pink-600 font-semibold px-8 py-3 rounded-xl cursor-pointer"
          onClick={handleContactUs}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
