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
        <div className="flex flex-col gap-4 p-4 rounded-md bg-black text-white">
            <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Add state"
                className="w-full p-2 border border-gray-700 rounded bg-[#222222] text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <div className="relative">
                <label htmlFor="nodeType" className="block text-sm mb-1">
                    Select State Type
                </label>
                <select
                    id="nodeType"
                    value={nodeType}
                    onChange={(e) => setNodeType(e.target.value)}
                    className="w-full p-2 bg-[#222222] border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <option value="normal">Normal State</option>
                    <option value="accept">Accept State</option>
                </select>
            </div>

            <button
                onClick={handleAddNode}
                className="w-full p-2 bg-black rounded cursor-pointer text-white border-gray-600 hover:bg-gray-800 transition-colors"
            >
                Add State
            </button>
        </div>
    );
};

export default NodeCreatorButton;
