import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import Artifact from "../../Cards/Artifact";
import useCustomAxios from "../../../Hooks/useCustomAxios";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme, Toast } = useContext(AuthContext);
  const customAxios = useCustomAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    customAxios("/Artifacts")
      .then((res) => setArtifacts(res.data))
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [Toast, customAxios]);

  const filteredArtifacts = artifacts.filter((artifact) =>
    artifact?.artifactName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`container mx-auto px-4 py-32 md:py-40 lg:py-52 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <Helmet>
        <title>Artifact-Hub | All-Artifacts</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary">
        Explore Our Collection of Artifacts 🏺📜
      </h1>

      <p className="text-xl text-center text-gray-500 mb-8">
        Dive into our extensive collection of artifacts and discover treasures
        that tell fascinating stories of the past and present.
      </p>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by artifact name..."
          className="input input-bordered w-full md:w-1/3 py-2 px-4 text-lg font-medium border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <BounceLoader color="#fb9c28" size={110} />
        </div>
      ) : filteredArtifacts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtifacts.map((artifact) => (
            <Artifact key={artifact._id} artifact={artifact} />
          ))}
        </div>
      ) : (
        <p className="text-5xl text-center font-bold text-red-500 mt-5">
          No artifacts available.
        </p>
      )}
    </div>
  );
};

export default AllArtifacts;
