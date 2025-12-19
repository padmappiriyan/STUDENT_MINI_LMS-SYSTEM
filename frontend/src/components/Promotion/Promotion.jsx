import React from 'react';
import image1 from "../../assets/DashBoard/LiveShow.png";

const Promotion = () => {
  return (
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-6'
    data-aos="fade-up">
      {/* Text Content */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-3xl font-semibold text-blue-800'>Upcoming Valuable Live Session</h3>
        <p className='text-lg font-medium text-gray-700'>Time: <span className='font-semibold'>Dec 20, 2025 - 5:00 PM</span></p>
        <p className='text-lg font-medium text-gray-700'>Title: <span className='font-semibold'>Mastering React for Beginners</span></p>
        <p className='italic text-gray-600'>"Learning never exhausts the mind, it only ignites it."</p>
        <p className='text-blue-600 font-semibold'>Link: Will be announced soon</p>
        <p className='text-gray-700'>
          Join our live sessions to interact with instructors in real-time, ask questions, and get instant feedback. Stay updated with upcoming live classes and never miss an opportunity to learn directly from experts.
        </p>
      </div>

      {/* Image */}
      <div className='shadow-lg overflow-hidden rounded-2xl'>
        <img
          src={image1}
          alt='Live Show'
          className='object-cover w-full h-[300px] lg:h-full rounded-2xl hover:scale-105 duration-200 transition'
        />
      </div>
    </div>
  );
}

export default Promotion;

