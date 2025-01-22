import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";
import { HashLoader } from "react-spinners";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { Toast } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(artifact);

  useEffect(() => {
    fetch(`http://localhost:3000/Artifacts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArtifact(data);
        setLikeCount(data.likeCount || 0);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [id, Toast]);

  const handleLike = () => {
    const updatedLikeCount = likeCount + 1;

    fetch(`http://localhost:3000/Artifacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likeCount: updatedLikeCount }),
    })
      .then((response) => response.json())
      .then(() => {
        setLikeCount(updatedLikeCount);
        Toast("Liked successfully!", "success");
      })
      .catch((error) => Toast(error.message, "error"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HashLoader color="#387478" size={110} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{artifact.artifactName} | Artifact Details</title>
      </Helmet>
      <img
        src={artifact.artifactImage}
        alt={artifact.artifactName}
        className="rounded-lg shadow-md w-full max-w-lg mx-auto mb-6"
      />
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {artifact.artifactName}
        </h1>
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
          <strong>Added By:</strong> {artifact.adderName} ({artifact.adderEmail}
          )
        </p>
        <div className="flex items-center mt-6">
          <button
            onClick={handleLike}
            className="btn btn-primary px-6 py-2 rounded-lg shadow-md"
          >
            Like
          </button>
          <p className="ml-4 text-xl">
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
