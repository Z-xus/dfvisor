export function validateDFAStructure(nodes, edges) {
  const startStates = nodes.filter(node => node.data.isStartState);
  const acceptStates = nodes.filter(node => node.data.isAcceptState);

  if (startStates.length !== 1) {
    return { isValid: false, error: "DFA must have exactly one start state." };
  }

  if (acceptStates.length === 0) {
    return { isValid: false, error: "DFA must have at least one accept state." };
  }

  const transitionMap = {};
  for (const edge of edges) {
    const key = `${edge.source}-${edge.data.label}`;
    if (transitionMap[key]) {
      return { isValid: false, error: `Multiple transitions found for state ${edge.source} with input ${edge.data.label}.` };
    }
    transitionMap[key] = edge.target;
  }

  return { isValid: true };
}

export function runDFA(input, nodes, edges) {
  const startState = nodes.find(node => node.data.isStartState);
  let currentState = startState;

  for (const symbol of input) {
    const transition = edges.find(edge => 
      edge.source === currentState.id && edge.data.label === symbol
    );

    if (!transition) {
      return { accepted: false, error: `No transition found for state ${currentState.id} with input ${symbol}.` };
    }

    currentState = nodes.find(node => node.id === transition.target);
  }

  return { accepted: currentState.data.isAcceptState };
}

export function validateDFA(input, nodes, edges) {
  const structureValidation = validateDFAStructure(nodes, edges);
  if (!structureValidation.isValid) {
    return structureValidation;
  }

  return runDFA(input, nodes, edges);
}


export function validateInput(input, edges) {
        let currentState = 0;
        const transition = edges.find(edge => 
      edge.source === currentState.id && edge.data.label === symbol
    );

    
        for (let i = 0; i < input.length; i++) {
          const symbol = input[i];
    
          if (!transition[currentState]) {
            return "invalid";
          }
    
          currentState = this.transitions[currentState][symbol];
    
          if (currentState === "invalid" || currentState === undefined) {
            return "invalid";
          }
        }

        if (currentState === this.acceptingState) {
            return "valid";
        }
        console.log(currentState);
        return "invalid";
        
    }

