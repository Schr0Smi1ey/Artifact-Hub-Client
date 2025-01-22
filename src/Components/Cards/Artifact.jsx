import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiHeart } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";

const Artifact = ({ artifact }) => {
  const {
    artifactName,
    artifactImage,
    historicalContext,
    likeCount,
    presentLocation,
  } = artifact;
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <div
      className={`shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-900"
      }`}
      data-aos="fade-up"
    >
      {/* Artifact Image */}
      <div className="relative">
        <img src={artifactImage} alt={artifactName} className="w-full" />
        <div className="absolute top-0 left-0 bg-black/30 text-white px-3 py-1 rounded-br-lg text-sm">
          {artifactName}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 truncate">{artifactName}</h3>

        <div className="flex-grow">
          {/* Historical Context */}
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
            {historicalContext.length > 100
              ? `${historicalContext.slice(0, 100)}...`
              : historicalContext}
          </p>

          {/* Location and Like Count */}
          <div className="flex justify-between items-center text-sm mb-4">
            <div className="flex items-center gap-2">
              <MdOutlineLocationOn className="text-blue-500 text-xl" />
              <span>{presentLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiHeart className="text-red-500 text-xl" />
              <span>{likeCount} Likes</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Link
            to={`/artifact-details/${artifact._id}`}
            className={`block text-center text-sm px-4 py-2 rounded-md font-medium transition ${
              theme === "dark"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};
Artifact.propTypes = {
  artifact: PropTypes.shape({
    artifactName: PropTypes.string,
    artifactImage: PropTypes.string,
    historicalContext: PropTypes.string,
    likeCount: PropTypes.number,
    presentLocation: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Artifact;
