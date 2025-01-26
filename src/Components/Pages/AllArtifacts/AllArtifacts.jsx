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
  const { Toast } = useContext(AuthContext);
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
    <div className={`bg-black pt-32 md:pt-40 lg:pt-52`}>
      <Helmet>
        <title>Artifact-Hub | All-Artifacts</title>
      </Helmet>
      <div className="relative pb-[12%]">
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
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary">
            Explore Our Collection of Artifacts 🏺📜
          </h1>

          <p className="text-xl text-center text-gray-500 mb-8">
            Dive into our extensive collection of artifacts and discover
            treasures that tell fascinating stories of the past and present.
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
        </div>
      </div>

      <div className="bg-white pt-10 pb-32 md:pb-40 lg:pb-52">
        <div className={`container px-4 mx-auto`}>
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
  );
};

export default AllArtifacts;
