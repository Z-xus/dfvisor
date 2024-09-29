import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, nodeTypes } from "../graphs/nodes";
import { initialEdges, edgeTypes } from "../graphs/edges";
import NodeCreatorButton from "../graphs/nodes/NodeCreatorButton";

export default function DFAtoUI() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [input, setInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [startState, setStartState] = useState("");
  const [endState, setEndState] = useState("");
  const [transitionSymbol, setTransitionSymbol] = useState("");
  const colorMode = "dark";

  const onConnect = useCallback(
    (params) => {
      const label = prompt("Enter transition symbol:");
      if (label) {
        setEdges((eds) => addEdge({ ...params, label, animated: true }, eds));
      } else {
        alert("Transition symbol cannot be empty.");
      }
    },
    [setEdges]
  );

  const addNode = useCallback(
    (nodeData) => {
      const gridSize = 100;
      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: "dfa",
        position: {
          x: (nodes.length % 5) * gridSize,
          y: Math.floor(nodes.length / 5) * gridSize,
        },
        data: {
          label: nodeData.label,
          isAcceptState: nodeData.isAcceptState,
          isStartState: nodes.length === 0,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const handleAddEdge = () => {
    if (startState && endState && transitionSymbol) {
      setEdges((eds) =>
        addEdge(
          {
            id: `edge-${edges.length + 1}`,
            source: startState,
            target: endState,
            label: transitionSymbol,
            animated: true,
          },
          eds
        )
      );
      // Resetting the states after adding an edge
      setStartState("");
      setEndState("");
      setTransitionSymbol("");
    } else {
      alert("Please select both states and enter a transition symbol.");
    }
  };

  const validateString = (inputString) => {
    let currentState = nodes.find(node => node.data.isStartState)?.id; // Start at the start state

    for (const char of inputString) {
      // Find the next state based on current state and transition symbol
      const edge = edges.find(e => e.source === currentState && e.label === char);

      if (edge) {
        currentState = edge.target; // Move to the next state
      } else {
        // If there is no valid transition, reject the string
        return false;
      }
    }

    // Check if the current state is an accepting state
    const finalState = nodes.find(node => node.id === currentState);
    return finalState?.data.isAcceptState;
  };

  const handleValidateInput = () => {
    const isValid = validateString(input);
    setValidationResult(isValid ? "Accepted" : "Rejected");
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex">
      <div className="flex flex-col w-full md:w-1/3 bg-black-900 p-5 rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Add a State:</h3>
        <NodeCreatorButton onAddNode={addNode} />

        <h3 className="text-lg font-semibold mt-6">Add an Edge:</h3>

        <h3 className="text-lg font-semibold mt-4">Select Start State:</h3>
        <select
          value={startState}
          onChange={(e) => setStartState(e.target.value)}
          className="w-full p-2 border border-black-600 rounded bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select start state</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.data.label} {node.data.isAcceptState ? "(Accept)" : ""}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold mt-4">Select End State:</h3>
        <select
          value={endState}
          onChange={(e) => setEndState(e.target.value)}
          className="w-full p-2 border border-black-600 rounded bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select end state</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.data.label} {node.data.isAcceptState ? "(Accept)" : ""}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold mt-4">Enter Transition Symbol:</h3>
        <input
          type="text"
          value={transitionSymbol}
          onChange={(e) => setTransitionSymbol(e.target.value)}
          placeholder="Enter transition symbol"
          className="w-full p-2 border border-black-600 rounded bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAddEdge}
          className="mt-4 w-full p-2 bg-black-600 rounded border-solid-white cursor-pointer text-white hover:bg-black-500 transition-colors"
        >
          Add Edge
        </button>

        <h3 className="text-lg font-semibold mt-6">Validate String:</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter string to validate"
          className="w-full p-2 border border-black-600 rounded bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleValidateInput}
          className="mt-4 w-full p-2 bg-black-600 rounded cursor-pointer text-white hover:bg-black-500 transition-colors"
        >
          Validate
        </button>

        {validationResult !== null && (
          <div className={`mt-4 text-lg font-semibold ${validationResult === "Accepted" ? "text-green-500" : "text-red-500"}`}>
            {validationResult}
          </div>
        )}
      </div>


      <div className="flex-1 mx-5 relative">
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
    </div>
  );
}
