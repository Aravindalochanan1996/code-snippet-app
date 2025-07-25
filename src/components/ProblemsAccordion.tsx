import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ClipboardCopy, Check } from "lucide-react";
import type { Problem } from "../types";

interface ProblemsAccordionProps {
  problems: Problem[];
  copiedIndex: string | null;
  handleCopy: (code: string, id: string) => void;
}

const ProblemsAccordion: React.FC<ProblemsAccordionProps> = ({
  problems,
  copiedIndex,
  handleCopy,
}) => (
  <>
    {problems.map((problem, index) => (
      <div key={index} className="mb-4 border rounded-md shadow-sm">
        <details className="group">
          <summary className="cursor-pointer text-lg font-semibold p-3 bg-gray-100">
            {problem.title}
          </summary>
          {problem.description && (
            <p className="px-3 pb-2 text-gray-700">
              {problem.description}
            </p>
          )}
          <p></p>
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
              );
            })}
          </div>
        </details>
      </div>
    ))}
  </>
);

export default ProblemsAccordion;