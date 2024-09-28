const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Automataous</h3>
          <p>Empowering minds through the magic of automata theory.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Tutorials</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Community</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">GitHub</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Discord</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center">
        <p>&copy; 2024 Automataous. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
export default Footer;

