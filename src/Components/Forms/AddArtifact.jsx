import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Aos from "aos";
import "aos/dist/aos.css";

const AddArtifact = () => {
  const { user, theme } = useContext(AuthContext);
  const [artifactData, setArtifactData] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    adderName: user.displayName,
    addedBy: user.email,
    likeCount: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtifactData({ ...artifactData, [name]: value });
  };

  const handleAddArtifact = (e) => {
    e.preventDefault();
    console.log(artifactData);
    fetch("http://localhost:3000/Artifacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artifactData),
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-unused-vars
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Artifact added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setArtifactData({
          artifactName: "",
          artifactImage: "",
          artifactType: "",
          historicalContext: "",
          createdAt: "",
          discoveredAt: "",
          discoveredBy: "",
          presentLocation: "",
          adderName: user.name,
          addedBy: user.email,
        });
        e.target.reset();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: { error },
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h1
        data-aos="zoom-in"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary"
      >
        Add New Artifact 🏺📜
      </h1>

      <p data-aos="zoom-in" className="text-xl text-center text-gray-500 mb-8">
        Fill out the form below to add a new artifact to the database.
      </p>

      <form
        onSubmit={handleAddArtifact}
        className={`${
          theme === "dark" ? "bg-gray-950" : "bg-white"
        } shadow-lg rounded-lg p-6 max-w-3xl mx-auto`}
      >
        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="artifactName"
          >
            Artifact Name
          </label>
          <input
            type="text"
            id="artifactName"
            name="artifactName"
            value={artifactData.artifactName}
            onChange={handleInputChange}
            placeholder="Enter artifact name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="artifactImage"
          >
            Artifact Image URL
          </label>
          <input
            type="url"
            id="artifactImage"
            name="artifactImage"
            value={artifactData.artifactImage}
            onChange={handleInputChange}
            placeholder="Enter artifact image URL"
            className="input input-bordered w-full"
            required
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

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="historicalContext"
          >
            Historical Context
          </label>
          <textarea
            id="historicalContext"
            name="historicalContext"
            value={artifactData.historicalContext}
            onChange={handleInputChange}
            placeholder="Describe the historical context"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="createdAt"
          >
            Created At
          </label>
          <input
            type="text"
            id="createdAt"
            name="createdAt"
            value={artifactData.createdAt}
            onChange={handleInputChange}
            placeholder="e.g., 100 BC"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="discoveredAt"
          >
            Discovered At
          </label>
          <input
            type="text"
            id="discoveredAt"
            name="discoveredAt"
            value={artifactData.discoveredAt}
            onChange={handleInputChange}
            placeholder="e.g., 1799"
            className="input input-bordered w-full"
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="discoveredBy"
          >
            Discovered By
          </label>
          <input
            type="text"
            id="discoveredBy"
            name="discoveredBy"
            value={artifactData.discoveredBy}
            onChange={handleInputChange}
            placeholder="Enter the name of the discoverer"
            className="input input-bordered w-full"
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="presentLocation"
          >
            Present Location
          </label>
          <input
            type="text"
            id="presentLocation"
            name="presentLocation"
            value={artifactData.presentLocation}
            onChange={handleInputChange}
            placeholder="Enter the current location"
            className="input input-bordered w-full"
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label className="block text-lg font-semibold mb-2">Added By</label>
          <input
            type="text"
            value={artifactData.adderName}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Adder Email
          </label>
          <input
            type="text"
            value={artifactData.addedBy}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <button
          data-aos="fade-up"
          type="submit"
          className="py-2 rounded-lg bg-primary/[130] text-xl w-full mt-4 text-white font-bold"
        >
          Add Artifact
        </button>
      </form>
    </div>
  );
};

export default AddArtifact;
