import { BaseEdge, BezierEdge, EdgeProps } from '@xyflow/react';

export default function SelfConnecting(props: EdgeProps) {
    // If the source and target nodes are different, render a default bezier edge
    if (props.source !== props.target) {
        return <BezierEdge {...props} />;
    }

    // For self-looping edges (where source and target are the same)
    const { sourceX, sourceY, markerEnd } = props;

    // Adjust the radius for the circular self-loop
    const radius = 30;

    // SVG path for a self-loop that creates a full circle
    const edgePath = `M ${sourceX} ${sourceY} 
                      m -${radius}, 0 
                      a ${radius},${radius} 0 1,1 ${2 * radius},0 
                      a ${radius},${radius} 0 1,1 -${2 * radius},0`;

    return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
}
