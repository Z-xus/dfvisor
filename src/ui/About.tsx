import { Users, Book, History } from 'lucide-react';
import Navbar from './Navbar'; 

const AboutSection = ({ icon: Icon, title, children }) => (
  <div className="mb-12">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-teal-400 mr-3" />
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
    <div className="text-gray-300 space-y-4">
      {children}
    </div>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="bg-gray-800 p-6 rounded-lg text-center">
    <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
    <p className="text-gray-400">{role}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            About StateCraft
          </h1>
          
          <AboutSection icon={Book} title="Our Mission">
            <p>
              At StateCraft, we're passionate about making the complex world of automata theory accessible and engaging for everyone. Our mission is to empower learners, researchers, and enthusiasts with cutting-edge tools and comprehensive resources to explore, understand, and apply the principles of formal languages and computation.
            </p>
            <p>
              We believe that by democratizing access to advanced theoretical concepts, we can foster innovation and drive progress in computer science, linguistics, and related fields.
            </p>
          </AboutSection>
          
          <AboutSection icon={History} title="Our Journey">
            <p>
              Founded in 2020 by a group of computer science professors and industry experts, StateCraft began as a small project to create interactive visualizations for automata theory concepts. As our tools gained popularity among students and researchers, we expanded our platform to include comprehensive learning paths, collaborative features, and powerful simulation capabilities.
            </p>
            <p>
              Today, StateCraft serves a global community of over 100,000 users, from curious beginners to seasoned professionals, all united by their fascination with the fundamental principles that underlie computation and language.
            </p>
          </AboutSection>
          
          <AboutSection icon={Users} title="Our Team">
            <p className="mb-6">
              Behind StateCraft is a diverse team of passionate individuals, each bringing unique expertise and perspective to our mission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TeamMember 
                name="Naufil Asar" 
                role="SWE | Linux Enthusiast" 
                image="https://avatars.githubusercontent.com/u/145439464?v=4"
              />
              <TeamMember 
                name="Manjiri Chavande" 
                role="SWE | Open Source" 
                image="https://avatars.githubusercontent.com/u/82377810?v=4"
              />
              <TeamMember 
                name="Sumit Patel" 
                role="DevOps | Linux Enthusiast" 
                image="https://avatars.githubusercontent.com/u/89197795?v=4"
              />
            </div>
          </AboutSection>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 StateCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
