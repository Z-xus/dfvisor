import { useCallback } from "react";
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

import Navbar from "./ui/Navbar";
import About from "./ui/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./graphs/nodes";
import { initialEdges, edgeTypes } from "./graphs/edges";



export default function App() {
    return (
        <div className="bg-gray-900 text-white min-h-screen h-screen w-full">
        <Router>
        <div className="app">
        <header className="h-screen w-full flex items-center justify-center text-center bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Automataous</h1>
        <p className="text-lg mb-6">
        A cutting-edge web application that makes automation seamless and efficient.
            </p>
        <a href="/get-started" className="bg-teal-500 text-white px-6 py-3 rounded shadow hover:bg-teal-400 transition duration-300">
        Get Started
        </a>
        </div>
        </header>
        <section className="py-20">
        <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {['Feature One', 'Feature Two', 'Feature Three'].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{feature}</h3>
            <p className="text-gray-400">Description of {feature.toLowerCase()}.</p>
            </div>
        ))}
        </div>
        </div>
        </section>

        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        </Routes>
        </div>
        </Router>
        </div>
    );
}

function Home() {
    return <h1>Home Page</h1>;
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
