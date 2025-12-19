import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  const LinkSections = [
    {
      title: 'Quick Links',
      links: ['Home', 'careers', 'Contact us', 'FAQ'],
      hrefs: ['/', '/career', '/contact-us', '/faq']
    },
    {
      title: "Need Help?",
      links: ["Partners",  "Contact Us"],
      hrefs: ["/partners", "/contact"]
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
      hrefs: ["#", "#", "#", "#"]
    }
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-950 text-gray-400 w-full h-full">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-600/30">
        
        {/* Brand */}
        <div>
          <h1 className="font-bold text-3xl text-white">Quick Learn</h1>
          <p className="max-w-[410px] mt-6">
            Learn anytime, anywhere with our LMS. Explore courses, track your progress, 
            and enhance your skills with high-quality learning content designed for your success.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {LinkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-300 md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={section.hrefs[i] || "#"}
                      className="hover:underline hover:text-white transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()} <span className="text-white">Quick Learn</span>. All Rights Reserved.
      </p>

    </div>
  );
};

export default Footer;
