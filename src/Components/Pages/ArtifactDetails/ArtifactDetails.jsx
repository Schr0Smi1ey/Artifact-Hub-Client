import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // For Love/Dislike Icons

const ArtifactDetails = () => {
  const { id } = useParams();
  const { Toast, theme, user } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/Artifacts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArtifact(data);
        setLikeCount(data.likeCount || 0);
        fetch(
          `http://localhost:3000/check-like-status/${id}?user_email=${user.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setIsLiked(data.isLiked);
          });
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleLikeToggle = () => {
    const updatedLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    const updatedIsLiked = !isLiked;

    fetch(`http://localhost:3000/toggle-like/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user.email,
      }),
    })
      .then((response) => response.json())
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
    <div
      className={`container mx-auto px-4 py-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Helmet>
        <title>{artifact.artifactName} | Artifact Details</title>
      </Helmet>

      {/* Artifact Image */}
      <div className="text-center mb-8 relative group">
        <img
          src={artifact.artifactImage}
          alt={artifact.artifactName}
          className="rounded-lg shadow-2xl transition-transform transform group-hover:scale-105 w-full max-w-lg mx-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 rounded-lg"></div>
      </div>

      {/* Artifact Info */}
      <div
        className={`bg-${
          theme === "dark" ? "gray-800" : "gray-100"
        } p-8 rounded-lg shadow-lg`}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-center text-primary">
          {artifact.artifactName}
        </h1>

        <div className="space-y-6 text-lg font-medium">
          <p>
            <strong>Artifact Type:</strong> {artifact.artifactType}
          </p>
          <p>
            <strong>Historical Context:</strong> {artifact.historicalContext}
          </p>
          <p>
            <strong>Created At:</strong> {artifact.createdAt}
          </p>
          <p>
            <strong>Discovered At:</strong> {artifact.discoveredAt}
          </p>
          <p>
            <strong>Discovered By:</strong> {artifact.discoveredBy}
          </p>
          <p>
            <strong>Present Location:</strong> {artifact.presentLocation}
          </p>
          <p>
            <strong>Added By:</strong> {artifact.adderName} (
            {artifact.adderEmail})
          </p>
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
    </div>
  );
};

export default ArtifactDetails;
