import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div className={`bg-black mt-52 relative text-white`}>
      <div className="container py-7 mx-auto z-0">
        <div data-aos="fade-down" className="text-center z-0">
          <h3 className="flex justify-center items-center gap-3 font-bold text-3xl mb-3">
            Artifact <span className="text-primary">Hub</span>
          </h3>
          <p className="font-medium text-base">
            Discover and share historical artifacts with the world.
          </p>
        </div>

        <div data-aos="fade-down" className="divider my-5"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Navigation Section */}
          <div
            data-aos="fade-up"
            className="flex mx-auto items-center md:items-start flex-col gap-2"
          >
            <h2 className="mb-3 font-bold text-xl">Navigation</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/">
              Home
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/all-artifacts"
            >
              All Artifacts
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/add-artifact"
            >
              Add Artifact
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/my-artifact"
            >
              My Artifacts
            </Link>
          </div>

          {/* Company Section */}
          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl">Company</h2>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/careers"
            >
              Careers
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Resources Section */}
          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl">Resources</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/faq">
              FAQs
            </Link>
            <Link className="hover:text-primary hover:font-semibold" to="/blog">
              Blog
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/support"
            >
              Support Center
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/guides"
            >
              Artifact Guides
            </Link>
          </div>

          {/* Follow Us Section */}
          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center mt-10">
          &copy; {new Date().getFullYear()} ArtifactHub. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
