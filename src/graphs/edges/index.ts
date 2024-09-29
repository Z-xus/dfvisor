import type { Edge, EdgeTypes } from "@xyflow/react";
import { AnimatedSVGEdge } from "./AnimatedSVGEdge";
import SelfConnecting from "./SelfLoopEdge";

export const initialEdges = [
    { id: "a->c", source: "a", target: "c", animated: true },
    { id: "b->d", source: "b", target: "d" },
    { id: "c->d", source: "c", target: "d", animated: true },
] satisfies Edge[];

export const edgeTypes = {
    // Add your custom edge types here!
    //
    animatedSvg: AnimatedSVGEdge,
    selfLoop: SelfConnecting
} satisfies EdgeTypes;
