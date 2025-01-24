import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import member from "../../../../assets/Member.jpg";
const MembershipSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const toggleVideoPopup = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  return (
    <div className="relative text-white pb-[8%] py-10">
      <div className="container shadow-xl p-5 mx-auto flex flex-col md:flex-row items-center gap-14 px-6">
        <div data-aos="fade-up" className="relative w-full md:w-1/2">
          <img src={member} alt="Membership" className="rounded-lg shadow-lg" />
          <button
            className="absolute inset-0 flex items-center justify-center text-white bg-opacity-100 rounded-lg transition"
            onClick={toggleVideoPopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.132-9.866a1 1 0 011.632-.774l3 2a1 1 0 010 1.548l-3 2A1 1 0 018 12V8a1 1 0 01.868-.866z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Right Section - Membership Info */}
        <div className="text-center text-black md:text-left w-full md:w-1/2 space-y-6">
          <h2 data-aos="fade-up" className="text-4xl font-bold">
            Become a <span className="text-primary">Member of Artifacts</span>
          </h2>
          <ul className="space-y-2">
            <li data-aos="fade-up" className="flex items-center gap-3">
              <span className="text-primary">✔</span> Unlimited additions of
              your own artifacts.
            </li>
            <li data-aos="fade-up" className="flex items-center gap-3">
              <span className="text-primary">✔</span> Free Tickets to Special
              Exhibitions
            </li>
            <li data-aos="fade-up" className="flex items-center gap-3">
              <span className="text-primary">✔</span> Access to Exclusive Member
              Events and Programs.
            </li>
            <li data-aos="fade-up" className="flex items-center gap-3">
              <span className="text-primary">✔</span> 10% off on all Artifacts.
            </li>
          </ul>
          <button
            data-aos="fade-up"
            className="bg-primary text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-orange-600 transition"
          >
            Become a Member
          </button>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-black text-2xl"
              onClick={toggleVideoPopup}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with the desired YouTube video URL
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipSection;
