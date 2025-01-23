import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import Artifact from "../../Cards/Artifact";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyLikedArtifacts = () => {
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, Toast, user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axiosSecure
      .get(`http://localhost:3000/liked-artifacts?user_email=${user.email}`)
      .then((res) => setLikedArtifacts(res.data))
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [user.email, Toast, axiosSecure]);

  return (
    <div
      className={`min-h-screen container mx-auto px-4 py-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Helmet for page title */}
      <Helmet>
        <title>My Liked Artifacts | Artifact Hub</title>
      </Helmet>

      {/* Page Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
        My Liked Artifacts ❤️
      </h1>

      <p className="text-lg text-center text-gray-500 mb-10">
        Browse through the artifacts you have liked. Relive the stories and
        discoveries that captured your interest!
      </p>

      {/* Content */}
      {loading ? (
        // Loader when fetching data
        <div className="flex items-center justify-center min-h-[300px]">
          <BounceLoader color="#fb9c28" size={110} />
        </div>
      ) : likedArtifacts.length > 0 ? (
        // Display liked artifacts in a responsive grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {likedArtifacts.map((artifact) => (
            <Artifact key={artifact._id} artifact={artifact} />
          ))}
        </div>
      ) : (
        // No liked artifacts fallback message
        <div className="flex flex-col items-center justify-center mt-12">
          <img
            src="https://i.imgur.com/9sQqZIw.png"
            alt="No Liked Artifacts"
            className="w-40 h-40 mb-6"
          />
          <p className="text-2xl text-gray-600 font-semibold">
            You have not liked any artifacts yet.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Start exploring and liking artifacts to fill this page!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyLikedArtifacts;
