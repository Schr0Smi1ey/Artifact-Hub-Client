import { useEffect } from "react";
import story from "../../../Assets/Story.png";
import Founder from "../../../Assets/Founder.jpg";
import email from "../../../assets/send.png";
import artifactBackground from "../../../assets/bgImage.png";
import Mission from "../../../assets/Mission.png";
import sponsor1 from "../../../assets/sponsor1.png";
import sponsor2 from "../../../assets/sponsor2.png";
import sponsor3 from "../../../assets/sponsor3.png";
import sponsor4 from "../../../assets/sponsor4.png";
import sponsorBg from "../../../assets/sponsorBg.png";
import founderBg from "../../../assets/founderBg.png";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Aos from "aos";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 600 });
  });

  return (
    <div className="pt-36 bg-black">
      <Helmet>
        <title>Artifact Hub | About Us</title>
      </Helmet>

      <div className="relative pb-[10%] ">
        <svg
          className="absolute w-full z-30 bottom-[-1%] lg:bottom-[-2%] xl:bottom-[-3%] text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 170.68 1440 149.32"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L80,282.7C160,277,320,267,480,240C640,213,800,171,960,170.7C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <div className="container mx-auto">
          <header data-aos="fade-left" className="text-center mb-10">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-white font-bold mb-3">
              About <span className="text-primary">Artifact Hub</span>
            </h1>
            <p className="w-[80%] mx-auto text-xs md:text-base lg:text-lg text-gray-400 mt-2">
              Discover the world&apos;s most fascinating historical artifacts
              with Artifact Hub. Uniting the past and present, one artifact at a
              time.
            </p>
          </header>
        </div>
      </div>
      <div className="bg-white flex flex-col items-center">
        <div className="container px-4 mx-auto">
          <section
            data-aos="zoom-in"
            className="md:max-w-5xl mx-auto px-4 py-8 rounded-lg"
          >
            <div className="relative mb-12 py-16 px-8 md:px-16 lg:px-24 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 max-w-5xl mx-auto overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={Mission}
                  alt="Artifact Exploration"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
              </div>

              <div className="relative z-10 text-center">
                <h2
                  data-aos="fade-left"
                  className="text-xl md:text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight"
                >
                  Our Mission
                </h2>
                <div
                  className="w-32 h-1 bg-yellow-500 mx-auto rounded-full"
                  data-aos="zoom-in"
                ></div>
              </div>

              {/* Description */}
              <div className="relative z-10 text-xs md:text-base lg:text-xl text-gray-300 leading-relaxed space-y-8 mt-10">
                <p data-aos="fade-up" className="px-4">
                  At{" "}
                  <span className="text-yellow-500 font-bold">
                    Artifact Hub
                  </span>
                  , our mission is to connect people with history by showcasing
                  a vast collection of artifacts from around the world. We aim
                  to spark curiosity and foster a deeper understanding of human
                  heritage.
                </p>
                <p data-aos="fade-up" data-aos-delay="100" className="px-4">
                  Through immersive storytelling and a collaborative platform,
                  we invite enthusiasts, researchers, and learners to explore,
                  share, and contribute to the legacy of artifacts that have
                  shaped our history.
                </p>
              </div>
            </div>

            <div
              data-aos="zoom-in"
              className="relative bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-16 px-8 md:px-20 lg:px-28 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src={story}
                  alt="Artifact Story"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
              </div>

              <div className="relative z-10 text-center md:text-left">
                <div className="mb-10">
                  <h2
                    data-aos="fade-left"
                    className="text-xl md:text-3xl lg:text-5xl font-extrabold text-yellow-800 leading-tight"
                  >
                    Our Story
                  </h2>
                  <div
                    data-aos="zoom-in"
                    className="w-24 h-1 bg-yellow-500 mx-auto md:mx-0 rounded-full"
                  ></div>
                </div>

                <div className="space-y-6 text-xs md:text-base lg:text-xl leading-relaxed">
                  <p data-aos="fade-up" className="px-2 md:px-0">
                    At{" "}
                    <span className="font-bold text-yellow-700">
                      Artifact Hub
                    </span>
                    , we envisioned a world where history connects us all. By
                    combining the expertise of historians, technologists, and
                    educators, we’ve created a platform where artifacts narrate
                    their timeless stories.
                  </p>
                  <p
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="px-2 md:px-0"
                  >
                    From ancient relics to modern discoveries, Artifact Hub
                    bridges the gap between the past and present. Join us in
                    preserving and celebrating the treasures that define our
                    shared human experience.
                  </p>
                </div>

                {/* Call to Action */}
                <div
                  data-aos="fade-up"
                  className="mt-10 flex justify-center md:justify-start"
                >
                  <button className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50">
                    Explore Our Journey
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Partners & Sponsors Section */}
          <section
            data-aos="fade-up"
            className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#f1e6c7] via-[#d3b89b] to-[#b59a5e] py-16 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src={sponsorBg}
                alt="Artifact Hub Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Background Overlay */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black via-transparent to-black"></div>

            {/* Section Title */}
            <h2
              data-aos="fade-left"
              className="text-xl md:text-3xl lg:text-5xl font-serif font-extrabold mb-8 relative z-10"
            >
              Partners & Sponsors
            </h2>

            {/* Description */}
            <p
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-xs md:text-base lg:text-lg text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto relative z-10"
            >
              Artifact Hub is proudly supported by museums, cultural
              institutions, and historical societies from around the world, all
              working to preserve and share the stories of our past.
            </p>

            {/* Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {/* Partner/Sponsor Logos */}
              <div
                data-aos="zoom-in"
                className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={sponsor1}
                  alt="Partner Logo"
                  className="mx-auto object-contain rounded-xl"
                />
              </div>

              <div
                data-aos="zoom-in"
                className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={sponsor2}
                  alt="Partner Logo"
                  className="mx-auto object-contain rounded-xl"
                />
              </div>

              <div
                data-aos="zoom-in"
                className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={sponsor3}
                  alt="Sponsor Logo"
                  className="mx-auto object-contain rounded-xl"
                />
              </div>

              <div
                data-aos="zoom-in"
                className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={sponsor4}
                  alt="Sponsor Logo"
                  className="mx-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </section>
          <div
            data-aos="fade-down"
            className="max-w-6xl relative mx-auto text-white px-6 text-center md:text-left mt-20 p-8 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Apply rounded-lg to the background wrapper */}
              <img
                src={founderBg}
                className="w-full h-full object-cover"
                alt="Background"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative z-10">
              {/* Content inside the rounded container */}
              <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-white mb-8">
                Meet the Founder
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div
                  data-aos="fade-right"
                  className="w-full md:w-1/3 p-4 rounded-xl shadow-lg"
                >
                  <img
                    src={Founder}
                    alt="Founder"
                    className="w-56 h-56 rounded-full mx-auto mb-6 border-8 border-primary shadow-xl"
                  />
                </div>

                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h3
                    data-aos="fade-left"
                    className="text-3xl font-semibold mb-4"
                  >
                    Sarafat Karim
                  </h3>
                  <p data-aos="fade-left" className="text-lg italic mb-4">
                    Founder & CEO
                  </p>
                  <p
                    data-aos="fade-left"
                    className="text-xs md:text-base leading-relaxed mb-6"
                  >
                    Sarafat Karim is the visionary behind Artifact Hub,
                    dedicated to making history accessible and engaging for
                    people around the world. With a passion for heritage and a
                    commitment to education, Sarafat is leading the way in
                    preserving our collective past.
                  </p>

                  <div className="flex justify-center md:justify-start space-x-8 mt-6">
                    <Link
                      data-aos="fade-up"
                      to="https://www.facebook.com/radiant.remel.5/"
                      target="_blank"
                      className="hover:text-primary/60 transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaFacebook className="text-3xl" />
                    </Link>

                    <Link
                      data-aos="fade-up"
                      to={"https://www.linkedin.com/in/sarafat-karim/"}
                      target="_blank"
                      className="hover:text-primary/60 transition-colors duration-300 transform hover:scale-110"
                    >
                      <IoLogoLinkedin className="text-3xl" />
                    </Link>

                    <Link
                      data-aos="fade-up"
                      to="https://x.com/sarafat_karim"
                      target="_blank"
                      className="hover:text-primary/60 transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaTwitter className="text-3xl" />
                    </Link>

                    <Link
                      data-aos="fade-up"
                      to={"https://github.com/Schr0Smi1ey"}
                      target="_blank"
                      className="hover:text-primary/60 transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaGithubSquare className="text-3xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Subscribe Section */}
          <section className="relative mx-auto mt-20 bg-white pt-10 pb-20 md:pb-32 lg:pb-52">
            {/* Email Icon */}
            <div
              data-aos="fade-down"
              className="absolute -top-3 -right-3 z-10 bg-white p-3 rounded-full shadow-lg"
            >
              <img src={email} alt="Email Icon" className="w-12 h-12" />
            </div>

            <div
              data-aos="fade-up"
              className="bg-gradient-to-r from-[#4B4A2F] to-[#2E2C1D] relative overflow-hidden rounded-tl-[100px] p-12 md:p-16 lg:p-24"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-25">
                <img
                  src={artifactBackground} // Your historical artifact-themed background image URL here
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Heading */}
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-center font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-5 md:mb-8 lg:mb-12"
              >
                Join the <span className="text-yellow-600">Artifact Hub</span>{" "}
                Community
              </h1>

              {/* Input & Button Layout */}
              <div
                data-aos="zoom-in"
                className="space-x-4 md:space-x-6 flex flex-col md:flex-row items-center justify-center mx-auto text-center md:text-left"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-4/5 lg:w-2/5 xl:w-1/3 bg-white font-semibold px-4 py-2 pl-8 rounded-lg shadow-lg focus:outline-none"
                />
                <button className="mt-2 md:mt-0 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all border-opacity-50 px-4 py-[4px] rounded-lg font-semibold text-lg shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className="w-screen relative mx-auto text-center">
          <svg
            className="absolute w-full z-30 bottom-[-210px] text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 170.68 1440 149.32"
          >
            <path
              fill="#000000"
              fillOpacity="1"
              d="M0,288L80,282.7C160,277,320,267,480,240C640,213,800,171,960,170.7C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
