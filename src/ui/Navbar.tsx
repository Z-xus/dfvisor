import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-3 fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-700 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
        <Link to="/" className="text-4xl font-bold text-white tracking-wide transition-transform duration-300 hover:scale-110">
          StateCraft
        </Link>
        <div className="flex gap-12">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dfatoui">DFA From UI</NavLink>
          <NavLink to="/regextodfa">Regex to FA</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 text-lg relative transition-all duration-300 hover:text-teal-400 group"  // Added group class for hover effect
  >
    {children}
    <span className="absolute block w-full h-[4px] bg-teal-500 left-0 bottom-[-6px] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 hover:opacity-20 bg-teal-400 rounded-md"></span> {/* Background hover effect */}
  </Link>
);

export default Navbar;
