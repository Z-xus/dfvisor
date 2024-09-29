import React, { useState } from 'react';
import { NFA, mDFA, cytoscape_styles, cytoscape_layout } from '@davnpsh/automata';
import CytoscapeComponent from 'react-cytoscapejs';
import 'cytoscape-dagre';

const RegexToDFA = () => {
  const [regex, setRegex] = useState('');
  const [graph, setGraph] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    const trimmedRegex = regex.trim();
    if (!trimmedRegex) {
      setError('Please enter a regular expression.');
      return;
    }

    try {
      const nfa = new NFA(trimmedRegex);
      console.log('NFA created:', nfa);
      const mdfa = new mDFA(nfa);
      console.log('Minimized DFA created:', mdfa);
      setGraph(mdfa.cytograph());
      setError('');
    } catch (err) {
      console.error('Error during conversion:', err);
      setError('Invalid regular expression. Please try again.');
      setGraph(null);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Regular Expression to NFA Converter
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter a regular expression"
            className="w-full p-3 bg-[#252a3d] border border-[#3a4158] rounded focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <button
            onClick={handleConvert}
            className="w-full py-3 px-4 bg-black-600 hover:bg-black-700 rounded transition duration-200"
          >
            Convert to NFA
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">NFA Graph</h2>
          <div className="bg-[#252a3d] border border-[#3a4158] rounded p-4 min-h-[300px]">
            {graph ? (
              <CytoscapeComponent
                elements={graph}
                style={{ width: "100%", height: "100%" }}
                stylesheet={cytoscape_styles}
                layout={cytoscape_layout}
              />
            ) : (
              <p className="text-center text-gray-500">NFA graph will be displayed here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexToDFA;
