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
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import Select from "react-select";

const MyArtifacts = () => {
  const { user, Toast, theme } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [updated, setUpdated] = useState(false);
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
  const axiosSecure = useAxiosSecure();
  const customAxios = useCustomAxios();
  const artifactTypes = [
    { label: "Pottery", value: "Pottery" },
    { label: "Mosaic Art", value: "Mosaic Art" },
    { label: "Jewelry", value: "Jewelry" },
    { label: "Weapon", value: "Weapon" },
    { label: "Funerary Items", value: "Funerary Items" },
    { label: "Seals", value: "Seals" },
    { label: "Stone Artifact", value: "Stone Artifact" },
    { label: "Documents", value: "Documents" },
    { label: "Sculpture", value: "Sculpture" },
    { label: "Cave Art", value: "Cave Art" },
    { label: "Reliefs", value: "Reliefs" },
    { label: "Statue", value: "Statue" },
    { label: "Armor", value: "Armor" },
    { label: "Monument", value: "Monument" },
    { label: "Statues", value: "Statues" },
    { label: "Funerary Mask", value: "Funerary Mask" },
    { label: "Ship", value: "Ship" },
    { label: "Mechanical Device", value: "Mechanical Device" },
    { label: "Textile Art", value: "Textile Art" },
    { label: "Law Code", value: "Law Code" },
    { label: "Manuscripts", value: "Manuscripts" },
    { label: "Portrait", value: "Portrait" },
    { label: "Fossil", value: "Fossil" },
    { label: "Stele", value: "Stele" },
  ];
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
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, [artifacts]);
  useEffect(() => {
    customAxios;
  });
  useEffect(() => {
    const queryParam = searchTerm ? `&search=${searchTerm}` : "";
    axiosSecure
      .get(
        `/MyArtifacts?addedBy=${user?.email}&page=${
          currentPage - 1
        }&size=${artifactsPerPage}&${queryParam}`
      )
      .then((res) => {
        setArtifacts(res.data.artifacts);
        setNumberOfArtifacts(artifacts.length);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [
    Toast,
    user?.email,
    axiosSecure,
    updated,
    currentPage,
    artifactsPerPage,
    searchTerm,
    artifacts.length,
  ]);

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
    customAxios
      .put(`/Artifacts/${selectedArtifact._id}`, updatedArtifact)
      .then(() => {
        setUpdated(!updated);
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
        customAxios
          .delete(`/Artifacts/${artifactId}`)
          .then(() => {
            setUpdated(!updated);
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
    <div className={`bg-black pt-32 md:pt-40 lg:pt-52`}>
      <Helmet>
        <title>Artifact-Hub | My-Artifacts</title>
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 text-primary">
            My Added Artifacts 🏺
          </h1>
          <p className="text-xl text-center w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-gray-500 mb-6">
            Manage and view all the artifacts you’ve added to the platform.
            Search by artifact name for easy access.
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
        </div>
      </div>

      <div className="bg-white pt-10 pb-24 px-4 md:pb-32 2xl:pb-[9%]">
        <div className="container mx-auto">
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
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {artifacts.map((artifact, index) => (
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
                            <strong>Artifact Type:</strong>{" "}
                            {artifact.artifactType}
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
                  <div className="mx-auto flex flex-col items-center mt-14 space-y-4">
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
              )}
              <dialog
                id="update_modal"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box w-full max-w-lg rounded-lg shadow-lg p-6 bg-black text-white">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Update {artifactData.artifactName} Artifact
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="artifactName"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="artifactImage"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      />
                    </div>
                    <label
                      className="block text-lg font-semibold mb-2"
                      htmlFor="artifactImage"
                    >
                      Artifact Type
                    </label>

                    <Select
                      id="artifactType"
                      name="artifactType"
                      options={artifactTypes}
                      value={
                        artifactTypes.find(
                          (option) => option.value === artifactData.artifactType
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: {
                            name: "artifactType",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        });
                      }}
                      className="w-full mb-4"
                      required
                      placeholder="Choose Artifact Type"
                      isSearchable
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          position: "relative",
                          zIndex: 50,
                          borderColor: state.isFocused
                            ? "#fb9c28"
                            : provided.borderColor,
                          borderWidth: "3px",
                          transition:
                            "border-color 0.2s ease, box-shadow 0.2s ease",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 100,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#fb9c28"
                            : state.isFocused
                            ? "rgba(251, 156, 40, 0.8)"
                            : "transparent",
                          color: state.isSelected ? "white" : "black",
                          cursor: "pointer",
                        }),
                      }}
                    />

                    <div className="mb-3">
                      <label
                        htmlFor="historicalContext"
                        className="block text-lg font-semibold mb-2"
                      >
                        Historical Context
                      </label>
                      <textarea
                        id="historicalContext"
                        name="historicalContext"
                        value={artifactData.historicalContext}
                        onChange={handleInputChange}
                        placeholder="Historical Context"
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="createdAt"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="discoveredAt"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="discoveredBy"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="presentLocation"
                        className="block text-lg font-semibold mb-2"
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
                        className="input input-bordered w-full text-black focus:ring-primary focus:border-[3px] focus:border-primary"
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
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
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

export default MyArtifacts;
