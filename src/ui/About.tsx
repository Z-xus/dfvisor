
const About = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto p-8 bg-blue-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl mb-6 text-teal-500 text-center">About Automataous</h2>
        <p className="text-lg leading-6 mb-8 text-gray-300">
          Automataous is a webapp
        </p>
        <a
          href="https://github.com/Z-xus/dfvisor"
          className="inline-block px-4 py-2 bg-teal-500 text-white font-bold rounded transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
        <div className="mt-8">
          <h3 className="text-2xl mb-4 text-gray-200">Tech Stack</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {['React', 'Vite', 'TypeScript', 'ESLint'].map((tech) => (
              <div key={tech} className="flex flex-col items-center text-sm text-gray-200">
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl mb-2 text-gray-200">Try Our Live Demo</h3>
          <p className="typewriter"></p>
        </div>
      </div>
    </div>
  );
};
export default About;
