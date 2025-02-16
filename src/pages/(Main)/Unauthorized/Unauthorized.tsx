import { useNavigate } from "react-router";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-lg mb-8">
          You do not have permission to view this page. Please go back to the
          home page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
