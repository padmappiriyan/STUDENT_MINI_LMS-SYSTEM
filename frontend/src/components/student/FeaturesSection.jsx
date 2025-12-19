import React from 'react';
import FeaturesImage from '../../assets/features.png';

const FeaturesSection = () => {
  return (
    <section className=" max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-12 gap-10 items-center">

        {/* Left Column */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join <span className="text-blue-600">QuickLearn</span> Today!
          </h2>

          <div className="w-24 h-1 bg-blue-600 mb-6 rounded-full"></div>

          <p className="text-gray-600 max-w-md">
            Explore our expertly crafted courses and enhance your skills
            with hands-on learning and industry-relevant content.
          </p>

          {/* Stats Grid */}
          <div className="mt-12 relative">

            {/* Soft Background Accent */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10
              bg-gradient-to-r from-blue-100 to-purple-100
              blur-3xl opacity-50 rounded-full"
            ></div>

            <div className="grid sm:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="bg-linear-to-r from-blue-200 via-indigo-200 to-blue-100 p-8 rounded-2xl shadow-md text-center 
              border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="text-4xl font-bold text-blue-600">+10</h3>
                <p className="text-gray-600 mt-3 tracking-wide text-sm">
                  PROGRAMMING COURSES
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-linear-to-r from-blue-200 via-indigo-200 to-blue-100 p-8 rounded-2xl shadow-md text-center 
              border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="text-4xl font-bold text-green-600">+5</h3>
                <p className="text-gray-600 mt-3 tracking-wide text-sm">
                  AI & MACHINE LEARNING
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-linear-to-r from-blue-200 via-indigo-200 to-blue-100 p-8 rounded-2xl shadow-md text-center 
              border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="text-4xl font-bold text-purple-600">+5</h3>
                <p className="text-gray-600 mt-3 tracking-wide text-sm">
                  CLOUD COMPUTING
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-linear-to-r from-blue-200 via-indigo-200 to-blue-100 p-8 rounded-2xl shadow-md text-center 
              border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="text-4xl font-bold text-red-500">+3</h3>
                <p className="text-gray-600 mt-3 tracking-wide text-sm">
                  CYBER SECURITY
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div
          className="col-span-12 lg:col-span-6 h-[450px] rounded-3xl 
          shadow-xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${FeaturesImage})` }}
        ></div>

      </div>
    </section>
  );
};

export default FeaturesSection;
