import upArrow from "../../../../assets/up-arrow.png";
import downArrow from "../../../../assets/down-arrow.png";
import Commenter1 from "../../../../assets/commenter1.jpg";
import Commenter2 from "../../../../assets/commenter2.jpg";
import Commenter3 from "../../../../assets/commenter3.jpg";
import Commenter4 from "../../../../assets/commenter4.jpg";
import { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "The Artifact Hub is a treasure trove! I found rare historical artifacts that matched my collection perfectly. The detailed descriptions and authenticity checks gave me great confidence in my purchase.",
      name: "Alexander Gray",
      location: "London, UK",
      image: Commenter1,
    },
    {
      id: 2,
      text: "As a historian, Artifact Hub has been a game-changer for my research. The curated collections and historical context provided are unmatched. I can't wait to recommend this platform to my peers!",
      name: "Sophia Rinaldi",
      location: "Rome, Italy",
      image: Commenter2,
    },
    {
      id: 3,
      text: "I've been collecting artifacts for years, but Artifact Hub made it easier than ever. The variety is stunning, and the support team is extremely knowledgeable. My latest acquisition was a dream come true!",
      name: "Ravi Kapoor",
      location: "Mumbai, India",
      image: Commenter3,
    },
    {
      id: 4,
      text: "A wonderful platform for artifact enthusiasts! I recently bought an ancient vase, and the entire experience was smooth and professional. The Artifact Hub team ensured secure delivery. Highly recommend!",
      name: "Olivia Martinez",
      location: "Barcelona, Spain",
      image: Commenter4,
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const { id, text, name, location, image } = testimonials[currentSlide];
  return (
    <div>
      <section className="md:container mx-auto my-10 lg:my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div data-aos="fade-up" className="font-poppins  p-10 space-y-5">
            <h2 className="font-semibold text-primary text-xl lg:text-lg">
              Client Testimonials
            </h2>
            <h1 className="font-volkhov font-bold text-4xl md:text-5xl text-black leading-[65px]">
              What Our Clients Say <br /> about Artifact Hub.
            </h1>
            <p className="text-gray-600 text-lg">
              Discover how Artifact Hub has connected collectors, researchers,
              and history enthusiasts with extraordinary artifacts from across
              the globe.
            </p>
            <div className="flex gap-8">
              <div className="w-5 h-5 rounded-full bg-black"></div>
              <div className="w-5 h-5 rounded-full bg-primary"></div>
              <div className="w-5 h-5 rounded-full bg-sky-500"></div>
            </div>
          </div>

          <div className="carousel w-full p-4 rounded-box h-fit">
            <div
              key={id}
              className="carousel-item relative w-fit rounded-xl shadow-lg h-full flex items-center p-5"
              data-aos="zoom-in"
              data-aos-duration="800"
            >
              <div className="relative bg-gradient-to-r from-primary/10 to-primary/20 w-[80%] ml-3 bg-white rounded-xl space-y-5 p-5 pt-10 sm:pl-14 xl:pt-14 font-poppins font-medium text-base text-[#5E6282]">
                <p
                  data-aos="zoom-in"
                  data-aos-duration="600"
                  className="sm:w-[95%]"
                >
                  {text}
                </p>
                <div>
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="800"
                    className="miama text-xl font-bold"
                  >
                    {name}
                  </h1>
                  <h3
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="800"
                  >
                    {location}
                  </h3>
                </div>
                <div
                  data-aos="fade-down"
                  data-aos-delay="400"
                  data-aos-duration="800"
                  className="absolute -top-8 -left-8"
                >
                  <img
                    src={image}
                    alt={name}
                    className="p-1 border-4 border-primary w-14 h-14 sm:w-20 sm:h-20 rounded-full"
                  />
                </div>
              </div>
              <div className="absolute flex flex-col gap-2 mr-2 top-1/2 right-0 transform -translate-y-1/2">
                <button
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  onClick={goToPreviousSlide}
                  className="btn btn-circle bg-white hover:bg-white border-none"
                >
                  <img src={upArrow} alt="Previous" className="w-8 h-8" />
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  onClick={goToNextSlide}
                  className="btn btn-circle bg-white hover:bg-white border-none"
                >
                  <img src={downArrow} alt="Next" className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
