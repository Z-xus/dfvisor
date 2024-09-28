export function validateDFAStructure(nodes, edges) {
  const startStates = nodes.filter(node => node.data.isStartState);
  const acceptStates = nodes.filter(node => node.data.isAcceptState);

  if (startStates.length !== 1) {
    return { isValid: false, error: "DFA must have exactly one start state." };
  }

  // Check if there's at least one accept state
  if (acceptStates.length === 0) {
    return { isValid: false, error: "DFA must have at least one accept state." };
  }

  // Check if all transitions are deterministic
  const transitionMap = {};
  for (const edge of edges) {
    const key = `${edge.source}-${edge.id}`;
    if (transitionMap[key]) {
      return { isValid: false, error: `Multiple transitions found for state ${edge.source} with input ${edge.id}.` };
    }
    transitionMap[key] = edge.target;
  }

  return { isValid: true };
}

// Simulate running a string through the DFA
export function runDFA(input, nodes, edges) {
  const startState = nodes.find(node => node.data.isStartState);
  let currentState = startState;

  for (const symbol of input) {
    const transition = edges.find(edge => 
      edge.source === currentState.id && edge.id === symbol
    );

    if (!transition) {
      return { accepted: false, error: `No transition found for state ${currentState.id} with input ${symbol}.` };
    }

    currentState = nodes.find(node => node.id === transition.target);
  }

  return { accepted: currentState.data.isAcceptState };
}

// Main validation function
export function validateDFA(input, nodes, edges) {
  const structureValidation = validateDFAStructure(nodes, edges);
  if (!structureValidation.isValid) {
    return structureValidation;
  }

  return runDFA(input, nodes, edges);
}
