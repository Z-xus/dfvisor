import { useCallback, useState } from "react";
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
import { validateDFA, validateInput } from "./DFAValidator";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [input, setInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);

const onConnect = useCallback((params) => {
    const label = prompt("Enter transition symbol (a or b):");
    if (label === 'a' || label === 'b') {
      setEdges((eds) => addEdge({ ...params, label, animated: true }, eds));
    } else {
      alert("Invalid transition symbol. Use 'a' or 'b'.");
    }
  }, [setEdges]);

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
    // const result = validateDFA(input, nodes, edges);
    const result = validateInput(input, edges);

    setValidationResult(result);
  };

  return (
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
