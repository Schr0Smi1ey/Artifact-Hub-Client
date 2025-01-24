import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../../../../assets/slide1.png";
import slide2 from "../../../../assets/slide2.png";
import slide3 from "../../../../assets/slide3.png";
import slide4 from "../../../../assets/slide3.png";
import slide5 from "../../../../assets/slide3.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";

const Banner = () => {
  const sliderContent = [
    {
      id: "slide1",
      title: "Explore Timeless Treasures",
      description:
        "Journey through history with Artifact Hub. Discover, learn, and share the stories behind the world's most remarkable artifacts.",
      buttonText: "Start Exploring",
      imgSrc: slide1,
    },
    {
      id: "slide2",
      title: "Preserve History Together",
      description:
        "Join a community of history enthusiasts! Contribute your knowledge, add artifacts, and help keep the past alive for generations to come.",
      buttonText: "Join the Community",
      imgSrc: slide2,
    },
    {
      id: "slide3",
      title: "Unlock Ancient Secrets",
      description:
        "From the Rosetta Stone to the Antikythera Mechanism, uncover the mysteries and marvels of ancient civilizations.",
      buttonText: "View Artifacts",
      imgSrc: slide3,
    },
    {
      id: "slide4",
      title: "Your Gateway to Discovery",
      description:
        "Search, browse, and save your favorite artifacts. Artifact Hub makes exploring history engaging and accessible to everyone.",
      buttonText: "Browse Collections",
      imgSrc: slide4,
    },
    {
      id: "slide5",
      title: "Celebrate Humanity's Heritage",
      description:
        "Every artifact has a story to tell. Be part of the mission to celebrate and share humanity's incredible cultural legacy.",
      buttonText: "Learn More",
      imgSrc: slide5,
    },
  ];
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const { id, title, description, buttonText, imgSrc } =
    sliderContent[currentSlide];

  return (
    <section className={`relative bg-black mx-auto pb-[5%] text-white`}>
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
      <div className="container mx-auto py-32 z-0">
        <div className="carousel w-full">
          <div
            key={id}
            className={`carousel-item relative w-full`}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div
              className={`w-full md:p-10 md:px-16 lg:px-28 flex justify-center items-center`}
            >
              <div className="text-center md:text-left flex flex-col items-center md:flex-row">
                <div className="flex justify-center items-center md:w-4/6 lg:w-3/6">
                  <img
                    src={imgSrc}
                    alt={`Slide ${id}`}
                    className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full hover:scale-105 border-4 border-primary p-2"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                  />
                </div>
                <div className="w-4/6 mb-4 mt-4 md:mt-0 md:ml-4 lg:ml-6">
                  <h1 data-aos="fade-left">
                    <Slide direction="right">
                      <h1
                        className={`font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5`}
                      >
                        <Typewriter
                          words={[title]}
                          loop={1}
                          cursor
                          cursorStyle=""
                          typeSpeed={70}
                          deleteSpeed={50}
                          delaySpeed={800}
                        />
                      </h1>
                    </Slide>
                  </h1>
                  <p
                    className={`font-normal text-gray-200 mb-6`}
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    {description}
                  </p>
                  <button
                    onClick={() =>
                      navigate(
                        buttonText === "Get Started" && !user
                          ? "/signup"
                          : "/all-artifact"
                      )
                    }
                    className="btn bg-primary/90 hover:bg-white hover:text-black hover:border-2 hover:border-primary font-semibold text-lg text-white"
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
              <div
                key={id}
                className="absolute left-2 right-2 md:left-4 md:right-4 lg:left-14 lg:right-14 top-1/2 flex -translate-y-1/2 transform justify-between"
              >
                <button
                  onClick={goToPreviousSlide}
                  className="btn btn-circle bg-white text-lg border-none hover:bg-white"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  ❮
                </button>
                <button
                  onClick={goToNextSlide}
                  className="btn btn-circle bg-white text-lg border-none hover:bg-white"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
