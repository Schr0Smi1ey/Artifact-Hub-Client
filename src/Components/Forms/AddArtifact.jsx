import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCustomAxios from "../../Hooks/useCustomAxios";

const AddArtifact = () => {
  const { user, Toast } = useContext(AuthContext);
  const [artifactData, setArtifactData] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    adderName: user?.displayName,
    addedBy: user?.email,
    likeCount: 0,
  });
  const secureAxios = useAxiosSecure();
  const customAxios = useCustomAxios();
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
    secureAxios.get(`/check-auth?email=${user.email}`).catch((error) => {
      Toast(error.message, "error");
    });
  }, [secureAxios, user.email, Toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtifactData({ ...artifactData, [name]: value });
  };

  const handleAddArtifact = (e) => {
    e.preventDefault();
    customAxios
      .post("/Artifacts", artifactData)
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
    <div className={`bg-black pt-32 md:pt-40 lg:pt-52 text-white`}>
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
          <h1
            data-aos="zoom-in"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary"
          >
            Add New Artifact 🏺📜
          </h1>

          <p
            data-aos="zoom-in"
            className="text-xl text-center text-gray-500 mb-8"
          >
            Fill out the form below to add a new artifact to the database.
          </p>
        </div>
      </div>

      <div className="bg-white pt-10 pb-24 md:pb-32 2xl:pb-52">
        <div className="container mx-auto">
          <form
            onSubmit={handleAddArtifact}
            className={`bg-black shadow-lg rounded-lg p-6 max-w-3xl mx-auto`}
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
                className="input text-black input-bordered w-full"
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
                className="input text-black input-bordered w-full"
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
                className="select text-black select-bordered w-full"
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
                className="textarea text-black textarea-bordered w-full"
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
                className="input text-black input-bordered w-full"
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
                className="input text-black input-bordered w-full"
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
                className="input text-black input-bordered w-full"
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
                className="input text-black input-bordered w-full"
              />
            </div>

            <div data-aos="fade-up" className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Added By
              </label>
              <input
                type="text"
                value={artifactData.adderName}
                className="input text-black input-bordered w-full"
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
                className="input input-bordered text-black w-full"
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

export default AddArtifact;
