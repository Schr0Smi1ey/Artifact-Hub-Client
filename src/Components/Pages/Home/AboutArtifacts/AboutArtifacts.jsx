import { Link } from "react-router-dom";

const AboutArtifacts = () => {
  return (
    <div className="container mx-auto py-16 px-6 text-center bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-extrabold mb-4">
        About the{" "}
        <span className="text-primary">Mysterious World of Artifacts</span>
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        Step into a world where history and artistry converge. Discover
        exceptional artifacts that have withstood the test of time and carry
        stories of ancient civilizations, intriguing mysteries, and human
        creativity.
      </p>
      <button className="bg-primary/80 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-primary transition-colors">
        <Link to={"/all-artifacts"}>Explore More</Link>
      </button>
    </div>
  );
};

export default AboutArtifacts;
