import React from "react";
import NavbarSection from "../../components/Home/NavbarSection";
import Image1 from "../../assets/ContactUs/Contact.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavbarSection />

     
      <div className="max-w-7xl mx-auto px-6 lg:px-14 mt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

         
          <div className="rounded-2xl overflow-hidden h-[600px] ">
            <img
              src={Image1}
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div data-aos="fade-up">
            <h3 className="text-4xl font-bold leading-tight text-blue-900">
              Sri Lanka’s Leading Online Learning Platform
            </h3>
            <div className="w-56 h-1 bg-blue-600 mt-3 rounded-full"></div>

            <div className="mt-10 bg-blue-900/20 p-8 rounded-2xl shadow-md border border-blue-100">
              <form className="space-y-6">

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell us about your requirements or feedback..."
                    className="w-full p-3 rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                
                <button
                  type="submit"
                  className="w-full bg-blue-600 py-3 rounded-md text-white font-semibold text-lg hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-7xl mx-auto mt-20 px-6 lg:px-14 mb-16">
        <div className="w-full mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-4 shadow-sm">
          <h3 className="text-3xl font-semibold text-gray-800">
            Contact Information
          </h3>

          <p className="text-gray-600">
            Reach out to Quick Learn — your trusted Online Learning Platform  in Jaffna, Sri Lanka
            for software development, AI solutions, and digital transformation
            services courses.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

           
            <div className="space-y-2">
              <div className="flex gap-3 items-center">
                <IoLocation className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Location
                </h3>
              </div>
              <p className="text-gray-600">
                Dream Comes, Jaffna, Sri Lanka
              </p>
            </div>

            
            <div className="space-y-2">
              <div className="flex gap-3 items-center">
                <FaPhoneVolume className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Phone Number
                </h3>
              </div>
              <p className="text-gray-600">+94 77 123 4567</p>
            </div>

         
            <div className="space-y-2">
              <div className="flex gap-3 items-center">
                <MdMarkEmailRead className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Address
                </h3>
              </div>
              <p className="text-gray-600">contact@fation.lk</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

