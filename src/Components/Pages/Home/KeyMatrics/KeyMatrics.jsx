import { useEffect } from "react";
import CountUp from "react-countup";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaQrcode, FaTrophy, FaUniversity, FaUsers } from "react-icons/fa";

const KeyMatrics = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div className="container mx-auto">
      <section
        id="success"
        className="my-16 text-center bg-gradient-to-r from-primary/30 via-white to-primary/10 py-12 px-8 rounded-3xl shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div
            data-aos="zoom-in"
            className="bg-white flex flex-col items-center space-y-4 shadow-lg hover:bg-gradient-to-t hover:from-primary/50 p-8 rounded-xl transform transition-transform duration-300 hover:scale-105"
          >
            <FaQrcode className="block" size={80}></FaQrcode>
            <h3 className="text-4xl font-extrabold text-primary">
              <CountUp end={4261} duration={2.5} />
            </h3>
            <p className="text-xl font-semibold text-gray-700 mt-4">
              Artifacts
            </p>
          </div>
          <div
            data-aos="zoom-in"
            className="bg-white flex flex-col items-center space-y-4 shadow-lg hover:bg-gradient-to-t hover:from-primary/50 p-8 rounded-xl transform transition-transform duration-300 hover:scale-105"
          >
            <FaUsers className="block" size={80}></FaUsers>
            <h3 className="text-4xl font-extrabold text-primary">
              <CountUp end={2550} duration={2.5} />
            </h3>
            <p className="text-xl font-medium text-gray-700 mt-4">
              Daily Visitors
            </p>
          </div>
          <div
            data-aos="zoom-in"
            className="bg-white flex flex-col items-center space-y-4 shadow-lg hover:bg-gradient-to-t hover:from-primary/50 p-8 rounded-xl transform transition-transform duration-300 hover:scale-105"
          >
            <FaUniversity className="block" size={80}></FaUniversity>
            <h3 className="text-4xl font-extrabold text-primary">
              <CountUp end={22} duration={2.5} />
            </h3>
            <p className="text-xl font-medium text-gray-700 mt-4">
              Venues Worldwide
            </p>
          </div>
          <div
            data-aos="zoom-in"
            className="bg-white flex flex-col items-center space-y-4 shadow-lg hover:bg-gradient-to-t hover:from-primary/50 p-8 rounded-xl transform transition-transform duration-300 hover:scale-105"
          >
            <FaTrophy className="block" size={80}></FaTrophy>
            <h3 className="text-4xl font-extrabold text-primary">
              <CountUp end={21} duration={2.5} />
            </h3>
            <p className="text-xl font-medium text-gray-700 mt-4">
              Winning Awards
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KeyMatrics;
