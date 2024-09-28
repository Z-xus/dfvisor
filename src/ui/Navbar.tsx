
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md p-4 z-50 border-b border-teal-200">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wide">
          Automataous
        </Link>
        <div className="flex gap-8">
          <Link
            to="/"
            className="text-gray-800 text-base relative transition-colors duration-300 hover:text-teal-500"
          >
            Home
            <span className="absolute block w-full h-[2px] bg-teal-500 left-0 bottom-[-5px] scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
          </Link>
          <Link
            to="/about"
            className="text-gray-800 text-base relative transition-colors duration-300 hover:text-teal-500"
          >
            About
            <span className="absolute block w-full h-[2px] bg-teal-500 left-0 bottom-[-5px] scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
