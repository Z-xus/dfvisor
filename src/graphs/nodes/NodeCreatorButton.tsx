import React, { useState } from 'react';

const NodeCreatorButton = ({ onAddNode }) => {
    const [nodeName, setNodeName] = useState('');
    const [isAcceptState, setIsAcceptState] = useState(false);

    const handleAddNode = () => {
        if (nodeName.trim() === '') return;

        onAddNode({
            label: nodeName,
            isAcceptState: isAcceptState
        });

        setNodeName('');
        setIsAcceptState(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', borderRadius: '5px' }}>
            <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Add state"
                className="w-full p-2 border border-black-600 rounded bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label style={{ color: 'white' }}>
                <input
                    type="checkbox"
                    checked={isAcceptState}
                    onChange={(e) => setIsAcceptState(e.target.checked)}
                />
                Accept State
            </label>
            <button
                onClick={handleAddNode}
                className="mt-4 w-full p-2 bg-black-600 rounded cursor-pointer text-white hover:bg-black-500 transition-colors"
            >
                Add State
            </button>
        </div>
    );
};

export default NodeCreatorButton;