import { useCallback, useEffect, useState } from "react";
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
import "@xyflow/react/dist/style.css";
import { initialNodes, nodeTypes } from "./graphs/nodes";
import { initialEdges, edgeTypes } from "./graphs/edges";
import NodeCreatorButton from "./graphs/nodes/NodeCreatorButton";
import { validateDFA } from "./DFAValidator";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [input, setInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);

const [edgeSymbol, setEdgeSymbol] = useState('');
const [isEdgeFormVisible, setIsEdgeFormVisible] = useState(false);
const [newEdgeParams, setNewEdgeParams] = useState(null);


const onConnect = useCallback((params) => {
  setIsEdgeFormVisible(true);
  setNewEdgeParams(params);
}, [setIsEdgeFormVisible]);

const handleEdgeSubmit = () => {
  if (['a', 'b'].includes(edgeSymbol)) {
    setEdges((eds) => addEdge({ ...newEdgeParams, label: edgeSymbol, animated: true }, eds));
  } else {
    alert("Invalid symbol. Use 'a' or 'b'.");
  }
  setIsEdgeFormVisible(false);
  setEdgeSymbol('');
};
  const colorMode: ColorMode = "dark";

const addNode = useCallback((nodeData) => {
  const gridSize = 100; // Adjust as needed
  const newNode = {
    id: `node-${nodes.length + 1}`,
    type: 'dfa',
    position: {
      x: (nodes.length % 5) * gridSize, // Simple grid layout
      y: Math.floor(nodes.length / 5) * gridSize,
    },
    data: {
      label: nodeData.label,
      isAcceptState: nodeData.isAcceptState,
      isStartState: nodes.length === 0 // First node is the start state
    },
  };
  setNodes((nds) => nds.concat(newNode));
}, [nodes, setNodes]);



const handleValidation = () => {
  const result = validateDFA(input, nodes, edges);
  if (!result.isValid) {
    if (result.error.includes('start state')) {
      setNodes((nds) => nds.map((node) => {
        if (node.data.isStartState === false) {
          return { ...node, style: { borderColor: 'red' } };
        }
        return node;
      }));
    }
  }
  setValidationResult(result);
};
  const onEdgeClick = useCallback((event, edge) => {
  const action = prompt("Enter 'edit' to change symbol, 'delete' to remove edge");
  if (action === 'edit') {
    const newSymbol = prompt("Enter new transition symbol (a or b):");
    if (newSymbol === 'a' || newSymbol === 'b') {
      setEdges((eds) => eds.map((e) => e.id === edge.id ? { ...e, label: newSymbol } : e));
    }
  } else if (action === 'delete') {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }
}, [setEdges]);



  return (
    <div style={{ height: "100vh", width: "100vw" }}>
    {isEdgeFormVisible && (
  <div className="edge-popup">
    <select value={edgeSymbol} onChange={(e) => setEdgeSymbol(e.target.value)}>
      <option value="">Select symbol</option>
      <option value="a">a</option>
      <option value="b">b</option>
    </select>
    <button onClick={handleEdgeSubmit}>Submit</button>
  </div>
)}
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        onEdgeClick={onEdgeClick}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 4 }}>
        <NodeCreatorButton onAddNode={addNode} />
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 4 }}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input string a's b's "
        />
        <button onClick={handleValidation}>Validate</button>
        {validationResult && (
              <p>
                Input is {validationResult.isValid ? validationResult.message : `Error: ${validationResult.error}`}
                {console.log(validationResult)}
              </p>
            // )}
          // </div>
        )}
      </div>
    </div>
  );
}
