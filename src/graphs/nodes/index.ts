import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import NodeCreatorButton from "./NodeCreatorButton";
import DFANode from "./DFANode";

export type DFANodeData = {
  label: string;
  isAcceptState: boolean;
  isStartState: boolean;
};

export type AppNode = Node<DFANodeData>;

export const initialNodes: AppNode[] = [
  { id: '1', type: 'dfa', position: { x: 100, y: 100 }, data: { label: 'Start', isStartState: true, isAcceptState: false } },
  { id: '2', type: 'dfa', position: { x: 300, y: 100 }, data: { label: 'State 2', isStartState: false, isAcceptState: false } },
  { id: '3', type: 'dfa', position: { x: 500, y: 100 }, data: { label: 'Accept', isStartState: false, isAcceptState: true } },
];

export const nodeTypes: NodeTypes = {
  dfa: DFANode,
};

// export type PositionLoggerNode = Node<
//     {
//         label?: string;
//     },
//     "position-logger"
// >;

// export type AppNode = BuiltInNode | PositionLoggerNode;

// export const initialNodes: AppNode[] = [
//     { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
//     {
//         id: "b",
//         type: "position-logger",
//         position: { x: -100, y: 100 },
//         data: { label: "drag me!" },
//     },
//     { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
//     {
//         id: "d",
//         type: "output",
//         position: { x: 0, y: 200 },
//         data: { label: "with React Flow" },
//     },
// ];

// export const nodeTypes = {
//     "position-logger": PositionLoggerNode,
//     // Add any of your custom nodes here!
// } satisfies NodeTypes;

export { NodeCreatorButton };
