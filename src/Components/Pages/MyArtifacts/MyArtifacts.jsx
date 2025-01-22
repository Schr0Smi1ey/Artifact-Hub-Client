import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FaClipboardList } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import Aos from "aos";
import { BounceLoader } from "react-spinners";

const MyArtifacts = () => {
  const { user, Toast, theme } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [artifactData, setArtifactData] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, [artifacts]);

  useEffect(() => {
    fetch(`http://localhost:3000/Artifacts`)
      .then((response) => response.json())
      .then((data) => {
        const userArtifacts = data.filter(
          (artifact) => artifact.addedBy === user?.email
        );
        setArtifacts(userArtifacts);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [user, Toast]);

  let filteredArtifacts = artifacts.filter((artifact) =>
    artifact.artifactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtifactData({ ...artifactData, [name]: value });
  };

  const handleUpdate = (artifact) => {
    setSelectedArtifact(artifact);
    setArtifactData({
      artifactName: artifact.artifactName,
      artifactImage: artifact.artifactImage,
      artifactType: artifact.artifactType,
      historicalContext: artifact.historicalContext,
      createdAt: artifact.createdAt,
      discoveredAt: artifact.discoveredAt,
      discoveredBy: artifact.discoveredBy,
      presentLocation: artifact.presentLocation,
    });
    document.getElementById("update_modal").showModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedArtifact = { ...artifactData };
    fetch(`http://localhost:3000/Artifacts/${selectedArtifact._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArtifact),
    })
      .then(() => {
        setArtifacts(
          artifacts.map((artifact) =>
            artifact._id === selectedArtifact._id ? updatedArtifact : artifact
          )
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Artifact updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) =>
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  const handleDelete = (artifactId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4500",
      cancelButtonColor: "#32CD32",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/Artifacts/${artifactId}`, {
          method: "DELETE",
        })
          .then(() => {
            setArtifacts(
              artifacts.filter((artifact) => artifact._id !== artifactId)
            );
          })
          .catch((error) => Toast(error.message, "error"));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div
      className={`container ${
        theme === "dark" ? "text-white" : "text-black"
      } mx-auto px-4`}
    >
      <Helmet>
        <title>Artifact-Hub | My-Artifacts</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 text-primary">
        My Added Artifacts 🏺
      </h1>
      <p className="text-xl text-center w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-gray-500 mb-6">
        Manage and view all the artifacts you’ve added to the platform. Search
        by artifact name for easy access.
      </p>

      <div className="flex flex-col w-[95%] md:w-3/4 lg:w-[60%] mx-auto md:flex-row items-center gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by artifact name"
          className="input flex-grow input-bordered w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <BounceLoader color="#fb9c28" size={110} />
        </div>
      ) : (
        <div>
          {artifacts.length === 0 ? (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              You have not added any artifacts yet.
            </p>
          ) : filteredArtifacts.length === 0 ? (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              No artifacts found for this name.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArtifacts.map((artifact, index) => (
                <div
                  key={index}
                  className={`flex ${
                    theme === "dark" ? "bg-gray-950" : "bg-white"
                  } flex-col rounded-lg shadow-lg p-2 md:p-3 lg:p-4`}
                >
                  <img
                    src={artifact.artifactImage}
                    alt={artifact.artifactName}
                    className="border-2 border-gray-100 mx-auto object-cover rounded-lg mb-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl mb-2">
                      {artifact.artifactName}
                    </h3>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FaClipboardList className="text-teal-500 text-xl" />
                      <strong>Artifact Type:</strong> {artifact.artifactType}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BiTimeFive className="text-blue-500 text-xl" />
                      <strong>Created At:</strong> {artifact.createdAt}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleDelete(artifact._id)}
                      className="px-4 py-1 rounded-md bg-red-500 text-white font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(artifact)}
                      className="px-4 py-1 bg-sky-500 text-white rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <dialog
            id="update_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box w-full max-w-lg rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Update {artifactData.artifactName} Artifact
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="artifactName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Artifact Name
                  </label>
                  <input
                    type="text"
                    id="artifactName"
                    name="artifactName"
                    value={artifactData.artifactName}
                    onChange={handleInputChange}
                    placeholder="Artifact Name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="artifactImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Artifact Image URL
                  </label>
                  <input
                    type="text"
                    id="artifactImage"
                    name="artifactImage"
                    value={artifactData.artifactImage}
                    onChange={handleInputChange}
                    placeholder="Artifact Image URL"
                    className="input input-bordered w-full"
                  />
                </div>

                <div data-aos="fade-up" className="mb-4">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="artifactType"
                  >
                    Artifact Type
                  </label>
                  <select
                    id="artifactType"
                    name="artifactType"
                    value={artifactData.artifactType}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Choose Artifact Type
                    </option>
                    <option value="Tools">Tools</option>
                    <option value="Weapons">Weapons</option>
                    <option value="Documents">Documents</option>
                    <option value="Writings">Writings</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="historicalContext"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Historical Context
                  </label>
                  <textarea
                    id="historicalContext"
                    name="historicalContext"
                    value={artifactData.historicalContext}
                    onChange={handleInputChange}
                    placeholder="Historical Context"
                    className="input input-bordered w-full"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="createdAt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Created At
                  </label>
                  <input
                    type="text"
                    id="createdAt"
                    name="createdAt"
                    value={artifactData.createdAt}
                    onChange={handleInputChange}
                    placeholder="Created At"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="discoveredAt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Discovered At
                  </label>
                  <input
                    type="text"
                    id="discoveredAt"
                    name="discoveredAt"
                    value={artifactData.discoveredAt}
                    onChange={handleInputChange}
                    placeholder="Discovered At"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="discoveredBy"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Discovered By
                  </label>
                  <input
                    type="text"
                    id="discoveredBy"
                    name="discoveredBy"
                    value={artifactData.discoveredBy}
                    onChange={handleInputChange}
                    placeholder="Discovered By"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="presentLocation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Present Location
                  </label>
                  <input
                    type="text"
                    id="presentLocation"
                    name="presentLocation"
                    value={artifactData.presentLocation}
                    onChange={handleInputChange}
                    placeholder="Present Location"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-between mt-5">
                  <button
                    type="submit"
                    onClick={() =>
                      document.getElementById("update_modal").close()
                    }
                    className="px-6 py-2 bg-green-500 text-white rounded-md"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("update_modal").close()
                    }
                    className="px-6 py-2 bg-red-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default MyArtifacts;
