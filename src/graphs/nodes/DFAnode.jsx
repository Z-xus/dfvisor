import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const DFANode = ({ data, isConnectable }) => {
  return (
    <div style={{
      padding: '10px',
      borderRadius: '50%',
      border: '1px solid #777',
      background: data.isAcceptState ? '#6ede87' : '#ffffff',
      color: '#333',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {data.isStartState && (
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20px'
        }}>
          →
        </div>
      )}
      {data.isAcceptState && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          left: '5px',
          bottom: '5px',
          borderRadius: '50%',
          border: '2px solid #000',
          pointerEvents: 'none'
        }} />
      )}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(DFANode);
