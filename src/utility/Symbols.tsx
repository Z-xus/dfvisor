interface Automaton {
  NFA?: {
    regexp: {
      symbols: (string | number)[];
    };
  };
  regexp: {
    symbols: (string | number)[];
  };
}

interface SymbolsProps {
  automata: Automaton;
}

export default function Symbols({ automata }: SymbolsProps) {
  let symbols: (string | number)[];

  // If the automaton is a NFA
  if (automata.NFA) {
    symbols = automata.NFA.regexp.symbols;
  } else {
    // If it is a DFA
    symbols = automata.regexp.symbols;
  }

  symbols.sort((a: string | number, b: string | number) => {
    // Convert both elements to strings for comparison
    const strA = String(a);
    const strB = String(b);

    // Compare the two strings
    if (strA < strB) {
      return -1; // a comes before b
    }
    if (strA > strB) {
      return 1; // a comes after b
    }
    return 0; // a and b are equal
  });

  return (
    <div className="flex-none">
      <h2 className="font-bold text-center text-xl">Symbols</h2>
      <p className="text-md text-center">
        &Sigma; = {"{"}
        {symbols.join(", ")}
        {"}"}
      </p>
    </div>
  );
}
