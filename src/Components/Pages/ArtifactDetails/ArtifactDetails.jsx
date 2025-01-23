import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import {
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaHistory,
} from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { Toast, user } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const customAxios = useCustomAxios();
  const secureAxios = useAxiosSecure();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    customAxios(`/Artifacts/${id}`)
      .then((res) => {
        setArtifact(res.data);
        setLikeCount(res.data.likeCount || 0);
        secureAxios
          .get(`/check-like-status/${id}?user_email=${user.email}`)
          .then((res) => setIsLiked(res.data.isLiked));
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [Toast, customAxios, secureAxios, id, user.email]);

  const handleLikeToggle = () => {
    const updatedLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    const updatedIsLiked = !isLiked;
    customAxios
      .patch(`/toggle-like/${id}`, { user_email: user.email })
      .then(() => {
        setLikeCount(updatedLikeCount);
        setIsLiked(updatedIsLiked);
        Toast(
          updatedIsLiked ? "Liked!" : "Disliked!",
          updatedIsLiked ? "success" : "warning"
        );
      })
      .catch((error) => Toast(error.message, "error"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BounceLoader color="#fb9c28" size={110} />
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-6 py-32 rounded-xl shadow-xl`}>
      <Helmet>
        <title>{artifact.artifactName} | Artifact Details</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {artifact.artifactName}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 italic">
          &quot;A glimpse into history&quot;
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Artifact Image */}
        <div className="relative group">
          <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-lg">
            <img
              src={artifact.artifactImage}
              alt={artifact.artifactName}
              className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 rounded-3xl"></div>
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold flex items-center space-x-2">
              <HiOutlinePhotograph className="text-2xl" />
              <span>{artifact.artifactName}</span>
            </div>
          </div>

          {/* Like/Dislike Section */}
          <div className="flex items-center justify-center mt-6 space-x-6">
            <button
              onClick={handleLikeToggle}
              className={`text-4xl transition-all duration-300 transform ${
                isLiked ? "text-red-500" : "text-gray-600"
              } hover:scale-110 hover:text-red-600`}
            >
              {isLiked ? (
                <FaHeart className="block" />
              ) : (
                <FaRegHeart className="block" />
              )}
            </button>
            <p className="text-2xl font-semibold">
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </p>
          </div>
        </div>

        {/* Artifact Information */}
        <div className={`p-8 rounded-2xl shadow-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base md:text-lg font-medium">
            <div className="space-y-4">
              <p className="flex items-center space-x-2">
                <FaHistory className="text-primary" />
                <span>
                  <strong>Artifact Type:</strong> {artifact.artifactType}
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <FaCalendarAlt className="text-primary" />
                <span>
                  <strong>Created At:</strong> {artifact.createdAt}
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>
                  <strong>Present Location:</strong> {artifact.presentLocation}
                </span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="flex space-x-2">
                <FaUser className="text-primary" />
                <span>
                  <strong>Discovered By:</strong> {artifact.discoveredBy}
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <FaCalendarAlt className="text-primary" />
                <span>
                  <strong>Discovered At:</strong> {artifact.discoveredAt}
                </span>
              </p>
              <p className="flex space-x-2">
                <FaUser className="text-primary" />
                <span>
                  <strong>Added By:</strong> {artifact.addedBy}
                </span>
              </p>
            </div>
          </div>

          {/* Historical Context */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Historical Context</h2>
            <p className="text-lg leading-relaxed text-justify">
              {artifact.historicalContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
