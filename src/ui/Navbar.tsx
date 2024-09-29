import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-2 fixed top-0 left-0 right-0 bg-opacity-80 backdrop-blur-md p-4 z-50 border-b border-gray-700">
      <div className="flex justify-between items-center max-w-5xl mx-auto container px-4">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Automataous
        </Link>
        <div className="flex gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/editor">Editor</NavLink>
          <NavLink to="/dfatoui">DFA From UI</NavLink>
          <NavLink to="/regextodfa">Refex to FA</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 text-base relative transition-colors duration-300 hover:text-teal-400"
  >
    {children}
    <span className="absolute block w-full h-[2px] bg-teal-400 left-0 bottom-[-5px] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
  </Link>
);

export default Navbar;
