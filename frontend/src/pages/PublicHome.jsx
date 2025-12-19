import { FaBook, FaClock, FaGraduationCap } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import AvailableCourse from '../components/student/AvailableCourse';
import FeaturesSection from '../components/student/FeaturesSection';
import NavbarSection from '../components/Home/NavbarSection';

const PublicHome = () => {
  return (
    <div className="w-full  flex flex-col min-h-screen">
      
      {/* Navbar */}
      <div>
        <NavbarSection />
      </div>

      

        {/* Hero Section */}
        <section className="w-full h-full">
          <HeroSection />
        </section>

        {/* Features Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
    Why Choose <span className="text-blue-600">QuickLearn</span>?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

    {/* Feature 1 */}
    <div className=" rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition">
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaBook className="text-3xl text-blue-600" />
      </div>
      <h3 className="text-xl text-gray-900 font-semibold mb-2">
        Diverse Courses
      </h3>
      <p className="text-gray-600">
        Access a wide range of courses across multiple categories
      </p>
    </div>

    {/* Feature 2 */}
    <div className=" rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition">
      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaClock className="text-3xl text-green-600" />
      </div>
      <h3 className="text-xl text-gray-900 font-semibold mb-2">
        Learn at Your Pace
      </h3>
      <p className="text-gray-600">
        Flexible learning schedule that fits your lifestyle
      </p>
    </div>

    {/* Feature 3 */}
    <div className=" rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition">
      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaGraduationCap className="text-3xl text-purple-600" />
      </div>
      <h3 className="text-xl text-gray-900 font-semibold mb-2">
        Earn Certificates
      </h3>
      <p className="text-gray-600">
        Get recognized for your achievements with certificates
      </p>
    </div>

  </div>
</section>


        {/* Available Courses Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <AvailableCourse />
        </section>

        {/* Extra Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 mt-40">
          <FeaturesSection />
        </section>

      </div>
      
    
  );
};

export default PublicHome;


