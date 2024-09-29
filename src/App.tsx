import { useCallback } from "react";
import { Play, BookOpen, Code, Users, Menu, X, ChevronRight } from 'lucide-react';

import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    ColorMode,
    type OnConnect,
} from "@xyflow/react";

import "./App.css";
import Navbar from "./ui/Navbar";
import About from "./ui/About";
import Footer from "./ui/footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectionDisplay } from "./utils";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./graphs/nodes";
import { initialEdges, edgeTypes } from "./graphs/edges";
import DFAtoUI from "./pages/DFAtoUI";



const Header = () => (
    <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Automataous</h1>
        </div>
    </header>
);

const Hero = () => (
    <section className="pt-24 pb-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                    Explore the Infinite Realms of Automata
                </h2>
                <p className="text-xl mb-10 text-gray-300">
                    Dive into the fascinating world of formal languages and computation with Automataous.
                    Unleash the power of abstract machines and discover the beauty of theoretical computer science.
                </p>
                <button className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300 transform hover:scale-105">
                    Begin Your Journey
                </button>
            </div>
        </div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
    </section>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
        <div className="flex items-center mb-4">
            <Icon className="w-8 h-8 text-teal-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-300">{description}</p>
    </div>
);

const Features = () => (
    <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Unlock the Power of Automata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                    icon={Play}
                    title="Interactive Simulations"
                    description="Visualize and manipulate various automata models in real-time, from finite state machines to Turing machines."
                />
                <FeatureCard
                    icon={BookOpen}
                    title="Comprehensive Learning Paths"
                    description="Master automata theory through carefully curated lessons, interactive exercises, and challenging problem sets."
                />
                <FeatureCard
                    icon={Code}
                    title="Algorithm Playground"
                    description="Implement and experiment with key automata algorithms, including regex matching and grammar parsing."
                />
                <FeatureCard
                    icon={Users}
                    title="Collaborative Challenges"
                    description="Engage with a global community of learners through automata design competitions and collaborative projects."
                />
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Dive Deeper?</h2>
            <p className="text-xl mb-10 text-gray-100">
                Join thousands of learners and enthusiasts exploring the fascinating world of automata theory.
            </p>
            <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Start Your Free Trial
            </button>
        </div>
    </section>
);



export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/editor" element={<DFAtoUI />} />
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white w-screen">
            <Navbar />
            <main className="w-screen">
                <Hero />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>);
}


export function Editor() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    const colorMode: ColorMode = "dark";

    return (
        <>
            <div style={{ height: "100vh", width: "100vw" }}>
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    colorMode={colorMode}
                    fitView
                >
                    <Background />
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
