export class DFA {
    initial: string;
    final: Set<string>;
    delta: Record<string, Record<string, string>>;
    alphabet: Set<string>;

    constructor(initial: string, final: string[], delta: Record<string, Record<string, string>>, alphabet: string[]) {
        this.initial = initial;
        this.final = new Set(final);
        this.delta = delta;
        this.alphabet = new Set(alphabet);
    }

    accepts(input: string): boolean {
        let currentState = this.initial;
        for (const symbol of input) {
            if (!this.alphabet.has(symbol)) {
                throw new Error(`Symbol ${symbol} is not in the alphabet`);
            }
            currentState = this.delta[currentState][symbol];
            if (currentState === undefined) {
                return false;
            }
        }
        return this.final.has(currentState);
    }
}

