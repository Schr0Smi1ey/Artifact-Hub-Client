import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import Artifact from "../../../Cards/Artifact";
import useCustomAxios from "../../../../Hooks/useCustomAxios";

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const navigate = useNavigate();
  const { Toast } = useContext(AuthContext);
  const customAxios = useCustomAxios();
  useEffect(() => {
    customAxios(`/Artifacts`)
      .then((data) => {
        const sortedArtifacts = [...data.data].sort(
          (a, b) => b.likeCount - a.likeCount
        );
        const featuredArtifacts = sortedArtifacts.slice(0, 6);
        setArtifacts(featuredArtifacts);
      })
      .catch((err) => Toast(err.message, "error"));
  }, [Toast, customAxios]);

  return (
    <div className={`bg-white`}>
      <section className={`container mx-auto pt-[5%] px-4`}>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6`}
        >
          Discover Rare Historical Artifacts 🏺✨
        </h2>
        <p
          className={`text-lg md:text-xl text-center w-[90%] sm:w-[80%] md:w-[55%] mx-auto mb-14`}
        >
          Unearth the stories of the past through rare and valuable artifacts
          from ancient civilizations. Explore, learn, and marvel at these
          timeless treasures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {artifacts.map((artifact) => (
            <Artifact key={artifact._id} artifact={artifact} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/all-artifacts")}
            className="px-6 py-3 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105 bg-primary text-white"
          >
            See All Artifacts
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturedArtifacts;
