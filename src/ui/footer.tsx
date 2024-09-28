
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">© 2024 Automataous. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://github.com/Z-xus/dfvisor" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition duration-300 mx-2">
            GitHub
          </a>
          <a href="/privacy" className="text-teal-400 hover:text-teal-300 transition duration-300 mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-teal-400 hover:text-teal-300 transition duration-300 mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

