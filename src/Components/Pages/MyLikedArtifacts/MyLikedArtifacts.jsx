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
  const [numberOfArtifacts, setNumberOfArtifacts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [artifactsPerPage, setArtifactsPerPage] = useState(6);
  const numberOfPages = Math.ceil(numberOfArtifacts / artifactsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const handleArtifactsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setArtifactsPerPage(val);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    axiosSecure(`/MyLikedArtifactCount?user_email=${user?.email}`)
      .then((res) => {
        setNumberOfArtifacts(res.data.count);
      })
      .catch((error) => Toast(error.message, "error"));
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axiosSecure
      .get(
        `/liked-artifacts?user_email=${user.email}&page=${
          currentPage - 1
        }&size=${artifactsPerPage}`
      )
      .then((res) => setLikedArtifacts(res.data))
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [user.email, Toast, axiosSecure, currentPage, artifactsPerPage]);

  return (
    <div className={`bg-black pt-32 md:pt-40 lg:pt-52`}>
      <Helmet>
        <title>Artifact-Hub | My-Liked-Artifacts</title>
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
      <div className="bg-white pt-10 pb-24 px-4 md:pb-32 2xl:pb-[9%]">
        <div className="container mx-auto">
          {loading ? (
            // Loader when fetching data
            <div className="flex items-center justify-center min-h-[300px]">
              <BounceLoader color="#fb9c28" size={110} />
            </div>
          ) : likedArtifacts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {likedArtifacts.map((artifact) => (
                  <Artifact key={artifact._id} artifact={artifact} />
                ))}
              </div>
              <div className="mx-auto flex flex-col items-center flex-wrap mt-14 space-y-4">
                <div className="flex items-center flex-wrap gap-2 justify-center space-x-2">
                  <button
                    className="font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    onClick={handlePrevPage}
                  >
                    Prev
                  </button>
                  {
                    <div className="flex space-x-2 gap-2 justify-center items-center flex-wrap">
                      {pages.map((page) => (
                        <button
                          key={page}
                          className={`font-semibold px-4 py-2 rounded-full ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-primary hover:bg-primary hover:text-white"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  }
                  <button
                    className="font-semibold px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center flex-wrap justify-center space-x-2">
                  <span className="text-gray-600 font-medium">Show:</span>
                  <select
                    value={artifactsPerPage}
                    onChange={handleArtifactsPerPage}
                    className="block input input-bordered w-fit p-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-primary font-semibold"
                  >
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                  </select>
                  <span className="text-gray-600 font-medium">
                    artifacts per page
                  </span>
                </div>
              </div>
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
