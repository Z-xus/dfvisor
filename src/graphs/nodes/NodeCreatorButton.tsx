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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '5px' }}>
      <input
        type="text"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
        placeholder="Enter state name"
        style={{ padding: '5px', width: '150px' }}
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
        style={{
          padding: '5px 10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Add State
      </button>
    </div>
  );
};

export default NodeCreatorButton;
