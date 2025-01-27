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
    customAxios(`/Artifacts?page=${0}&size=${6}&search=featuredArtifacts`)
      .then((data) => {
        setArtifacts(data.data.artifacts || []);
        console.log(data.data.artifacts);
      })
      .catch((err) => Toast(err.message, "error"));
  }, [Toast, customAxios]);

  return (
    <div className={`bg-white`}>
      <section className={`container mx-auto pt-[5%] px-4`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6">
          Featured Artifact:{" "}
          <span className="text-primary">Unveiling the Past</span> 🌟📜
        </h2>
        <p className="text-lg md:text-xl text-center w-[90%] sm:w-[80%] md:w-[55%] mx-auto mb-14">
          Discover this month&apos;s featured artifact—a timeless relic that
          connects us to ancient stories and traditions. Explore its unique
          history and legacy.
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
