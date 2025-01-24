import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import Artifact from "../../Cards/Artifact";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyLikedArtifacts = () => {
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Toast, user } = useContext(AuthContext);
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
    <div className={`bg-black pt-32 md:pt-40 lg:pt-52`}>
      {/* Helmet for page title */}
      <Helmet>
        <title>My Liked Artifacts | Artifact Hub</title>
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
        <div className="container mx-auto">
          {/* Page Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
            My Liked Artifacts ❤️
          </h1>

          <p className="text-lg text-center text-gray-500 mb-10">
            Browse through the artifacts you have liked. Relive the stories and
            discoveries that captured your interest!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white pt-10 pb-32 md:pb-40 lg:pb-52">
        <div className="container mx-auto">
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
            <div className="flex flex-col items-center justify-center mt-12">
              <p className="text-2xl text-red-600 font-semibold">
                You have not liked any artifacts yet.
              </p>
              <p className="text-lg text-gray-500 mt-2">
                Start exploring and liking artifacts to fill this page!
              </p>
            </div>
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

export default MyLikedArtifacts;
