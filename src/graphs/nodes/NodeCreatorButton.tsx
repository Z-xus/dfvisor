import React, { useState } from 'react';

interface NodeCreatorButtonProps {
    onAddNode: (node: { label: string; type: string }) => void;
}

const NodeCreatorButton: React.FC<NodeCreatorButtonProps> = ({ onAddNode }) => {
    const [nodeName, setNodeName] = useState('');
    const [nodeType, setNodeType] = useState('normal'); // Default to 'normal'

    const handleAddNode = () => {
        if (nodeName.trim() === '') return;

        onAddNode({
            label: nodeName,
            type: nodeType
        });

        setNodeName('');
        setNodeType('normal'); // Reset to default
    };

    return (
        <div className="flex flex-col gap-4 p-4 rounded-m text-white">
            <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Add state"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
                <label htmlFor="nodeType" className="block text-sm mb-1">
                    Select State Type
                </label>
                <select
                    id="nodeType"
                    value={nodeType}
                    onChange={(e) => setNodeType(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="normal">Normal State</option>
                    <option value="accept">Accept State</option>
                </select>
            </div>
            <button
                onClick={handleAddNode}
                className="mt-4 w-full p-2 bg-gray-600 rounded border-solid-white cursor-pointer text-white hover:bg-gray-500 transition-colors"
            >
                Add State
            </button>
        </div>
    );
};

export default NodeCreatorButton;
