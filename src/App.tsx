// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./App.css";
import type { Problem } from "./types";
import { ClipboardCopy, Check } from "lucide-react";

SyntaxHighlighter.registerLanguage("javascript", js);

const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    fetch("/problems.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProblems(data.problems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching problems:", error);
        setLoading(false);
      });
  }, []);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  if (loading) {
    return <div className="p-6 text-lg"> Loading Problems...</div>;
  }
  return (
    <>
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">JavaScript Code Snippets</h1>
        {problems.map((problem, index) => (
          <div key={index} className="mb-4 border rounded-md shadow-sm">
            <details className="group">
              <summary className="cursor-pointer text-lg font-semibold p-3 bg-gray-100">
                {problem.title}
              </summary>
              <div className="p-4 space-y-4">
                {problem.solutions.map((solution, idx) => {
                const uniqueId = `${index}-${idx}`;
                return (
                  
                  <details key={idx} className="border rounded-md bg-white">
                    <summary className="p-2 font-medium bg-gray-50 cursor-pointer">
                      {solution.description}
                    </summary>
                                        <div className="relative">
                      <button
                        className="absolute right-3 top-3 text-gray-600 hover:text-black"
                        onClick={() => handleCopy(solution.code, uniqueId)}
                        aria-label="Copy code"
                      >
                        {copiedIndex === uniqueId ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <ClipboardCopy size={18} />
                        )}
                      </button>
                    <SyntaxHighlighter
                      language="javascript"
                      style={github}
                      className="p-4 overflow-x-auto text-sm"
                    >
                      {solution.code}
                    </SyntaxHighlighter>
                    </div>
                  </details>
                )})}
              </div>
            </details>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
