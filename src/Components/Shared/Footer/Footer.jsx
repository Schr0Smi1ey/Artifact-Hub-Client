import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <footer className="bg-black mt-52 text-white">
      <div className="container mx-auto py-12 px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center border-b border-gray-700 pb-8">
          {/* Branding Section */}
          <div data-aos="fade-right" className="text-center md:text-left">
            <h3 className="text-4xl font-bold mb-3">
              Artifact <span className="text-primary">Hub</span>
            </h3>
            <p className="text-base font-medium">
              Discover and share historical artifacts with the world.
            </p>
          </div>

          {/* Navigation Links */}
          <div data-aos="fade-up" className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/"
                className="text-sm hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/all-artifacts"
                className="text-sm hover:text-primary transition-colors"
              >
                All Artifacts
              </Link>
              <Link
                to="/add-artifact"
                className="text-sm hover:text-primary transition-colors"
              >
                Add Artifact
              </Link>
              <Link
                to="/my-artifact"
                className="text-sm hover:text-primary transition-colors"
              >
                My Artifacts
              </Link>
              <Link
                to="/about"
                className="text-sm hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/privacy-policy"
                className="text-sm hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          {/* Join Now */}
          <div data-aos="fade-up" className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4">Join Now</h4>
            <p className="text-sm mb-4">
              Become a part of our community and explore the world of artifacts.
            </p>
            <button
              onClick={() => navigate(!user ? "/signup" : "/all-artifacts")}
              className="bg-primary text-black font-bold py-2 px-4 rounded hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Follow Us */}
          <div data-aos="fade-left" className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ArtifactHub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
