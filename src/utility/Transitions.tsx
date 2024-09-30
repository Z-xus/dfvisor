import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Transition {
  label: string;
  transitions: Map<string | number, string[] | string>;
}

interface Automaton {
  NFA?: {
    regexp: {
      symbols: (string | number)[];
    };
  };
  regexp: {
    symbols: (string | number)[];
  };
  empty_symbol?: string;
  transitions: {
    table: Transition[];
  };
}

interface TransitionsTableProps {
  automata: Automaton;
  className?: string;
}

export default function TransitionsTable({ automata, className }: TransitionsTableProps) {
  let symbols: (string | number)[];

  // If the automaton is a NFA
  if (automata.NFA) {
    symbols = automata.NFA.regexp.symbols;
  } else {
    // If it is a DFA
    symbols = automata.regexp.symbols.concat(automata.empty_symbol || []);
  }

  return (
    <div className="flex-none">
      <h2 className="font-bold text-center text-xl">Transitions</h2>
      <Table className="select-none">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-center text-lg">
              State
            </TableHead>
            {symbols.map((symbol, index) => (
              <TableHead key={index} className="font-bold text-center text-lg">
                {symbol}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(automata.transitions.table).map((transition, index) => (
            <TableRow key={index}>
              <TableCell className="text-md text-center">
                {transition.label}
              </TableCell>
              {symbols.map((symbol, symbolIndex) => {
                const transitionValue = transition.transitions.get(symbol);
                if (transitionValue) {
                  return (
                    <TableCell
                      key={symbolIndex}
                      className="text-md text-center"
                    >
                      {Array.isArray(transitionValue)
                        ? transitionValue.length > 1
                          ? "{" + transitionValue.join(", ") + "}"
                          : transitionValue
                        : transitionValue}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={symbolIndex}
                      className="text-md text-center"
                    >
                      -
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
