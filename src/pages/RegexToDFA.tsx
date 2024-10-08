"use client";

import { useToast } from "../hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontal, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import Symbols from "../utility/Symbols";
import TransitionsTable from "../utility/Transitions";
import { StatesTablemDFA, StatesTableuDFA } from "../utility/States";

import { useState, useRef, useEffect } from "react";

//import html2canvas from "html2canvas";

import Cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import {
  mDFA,
  uDFA,
  NFA,
  cytoscape_styles,
  cytoscape_layout,
} from "@davnpsh/automata";
import { runSimulation } from "../utility/utility";

Cytoscape.use(dagre);

export default function Home() {
  const cyRef = useRef<Cytoscape.Core | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regex, setRegex] = useState("");
  const [selectValue, setSelectValue] = useState("nfa");
  const [automata, setAutomata] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [testString, setTestString] = useState("");
  const [stringAccepted, setStringAccepted] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Handle
  useEffect(() => {
    if (stringAccepted === null && cyRef.current) {
      cyRef.current.elements().removeStyle();
    }
  }, [stringAccepted]);

  // Handle automaton generaton on Select change
  useEffect(() => {
    if (!regex) return;
    handleRegex();
  }, [selectValue]);

  const handleRegex = () => {
    setStringAccepted(null);
    setIsLoading(true);
    // API call
    setTimeout(() => {
      try {
        switch (selectValue) {
          case "nfa":
            setAutomata(new NFA(regex));
            break;
          case "udfa":
            setAutomata(new uDFA(regex));
            break;
          case "mdfa":
            setAutomata(new mDFA(regex));
            break;
        }
      } catch (e) {
        setAutomata(null);
        toast({
          variant: "destructive",
          title: "Error on user input:",
          description: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Just to show loading animation
  };

  const handleTest = () => {
    if (!automata) return;
    setStringAccepted(null);

    let result;
    try {
      result = automata.test(testString);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error on user input:",
        description: e.message,
      });
      return;
    }

    // Start animation process
    setAnimating(true);
    // Timeout to fix weird bug
    setTimeout(() => {
      runSimulation(cyRef, result).then(() => {
        setAnimating(false);
        setStringAccepted(result.accept);
      });
    }, 100);
  };


  return (
    <div className="h-screen w-screen bg-white text-black"> {/* Ensuring the background is white and text is black */}
      <div className="flex flex-col min-h-screen">
        {/* Top input */}
        <div className="p-4 bg-secondary">
          <div className="flex gap-2 max-w-md mx-auto w-full">
            <Input
              placeholder="Enter regular expression..."
              className="flex-1 text-black" // Setting text color to black for input
              value={regex}
              onChange={(e) => {
                setRegex(e.target.value);
              }}
              disabled={isLoading || animating}
            />
            <Button

              className="text-white"
              onClick={handleRegex}
              disabled={isLoading || animating || !regex.trim()}
            >
              <SendHorizontal className="h-6 w-6" />
            </Button>

          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row flex-1 p-4 gap-4 overflow-hidden">
          {/* Left panel */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-136px)]">
            {/* Symbols */}
            {automata ? (
              <Symbols automata={automata} className="text-black border border-gray-300 shadow-md p-4 rounded-md" />
            ) : (
              <></>
            )}

            {/* Transitions table */}
            {automata ? (
              <TransitionsTable automata={automata} className="text-black border border-gray-300 shadow-md p-4 rounded-md" />
            ) : (
              <></>
            )}

            {/* States table of uDFA */}
            {automata ? (
              <StatesTableuDFA automata={automata} className="text-black border border-gray-300 shadow-md p-4 rounded-md" />
            ) : (
              <></>
            )}

            {/* States table of mDFA */}
            {automata ? (
              <StatesTablemDFA automata={automata} className="text-black border border-gray-300 shadow-md p-4 rounded-md" />
            ) : (
              <></>
            )}
          </div>

          {/* Right panel */}
          <div className="w-full lg:w-2/3 flex flex-col mt-4 lg:mt-0">
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-full mb-4 text-black border border-gray-300 shadow-md p-2 rounded-md">
                {/* Text set to black */}
                <SelectValue placeholder="Select an option"></SelectValue>
              </SelectTrigger>
              <SelectContent className="text-black border border-gray-300 shadow-md rounded-md">
                <SelectItem value="nfa">Nondeterministic Finite Automaton (NFA)</SelectItem>
                <SelectItem value="udfa">Unoptimized Deterministic Finite Automaton (uDFA)</SelectItem>
                <SelectItem value="mdfa">Minimised Deterministic Finite Automaton (mDFA)</SelectItem>
              </SelectContent>
            </Select>

            {/* Graph */}
            <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-300 mb-4 p-4 overflow-auto min-h-[500px] lg:min-h-0 relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
              ) : automata ? (
                <>
                  <CytoscapeComponent
                    id="automaton"
                    elements={automata.cytograph()}
                    style={{ width: "100%", height: "100%" }}
                    stylesheet={cytoscape_styles}
                    layout={cytoscape_layout}
                    cy={(cy: Cytoscape.Core) => {
                      cyRef.current = cy;
                    }}
                    boxSelectionEnabled={false}
                    minZoom={1}
                    maxZoom={4}
                    wheelSensitivity={0.1}
                  />
                  <p className="absolute bottom-5 left-5 text-sm text-gray-500 select-none">
                    In some cases, the edges may overlap. To fix this, just drag and drop the nodes until you see all of the edges.
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 select-none">
                  Enter a regular expression on the top
                </div>
              )}
            </div>

            {/* Testing area */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter a string to test with the automaton..."
                  value={testString}
                  onChange={(e) => {
                    setTestString(e.target.value);
                    setStringAccepted(null);
                  }}
                  disabled={isLoading || animating}
                  className={`text-black border border-gray-300 shadow-md rounded-md p-2 ${stringAccepted === true
                    ? "border-green-500 border-4"
                    : stringAccepted === false
                      ? "border-red-500 border-4"
                      : ""
                    }`}
                />
                {stringAccepted === true ? (
                  <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-green-500" />
                ) : stringAccepted === false ? (
                  <X className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-red-500" />
                ) : null}
              </div>
              <Button
                onClick={handleTest}
                disabled={isLoading || animating || !testString.trim()}
                className="whitespace-nowrap text-white bg-primary shadow-lg border border-primary hover:bg-primary-dark rounded-md"
              >
                Test String
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
