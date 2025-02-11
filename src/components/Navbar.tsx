import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-200 to-red-300 shadow-md py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          ❤️ Valentine Week
        </h1>
        <Link 
          to="/" 
          className="text-white text-lg font-medium px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 transition duration-300"
        >
          Home 🏠
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
