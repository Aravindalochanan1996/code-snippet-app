import React, { useState } from "react";
import Problems from "./Problems";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import LetTab from "./letTab";

const Tabs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabList = [
    "Problems",
    "let",
    "const",
    "var"
  ];

  const tabContents = [
    <Problems />,
    <LetTab />,
    // (
    //   <div className="p-4">
    //     <h2 className="text-xl font-semibold mb-2">let</h2>
    //     <p>
    //       <code>let</code> allows you to declare block-scoped variables. It can be updated but not re-declared in the same scope.
    //     </p>
    //     <SyntaxHighlighter language="javascript">
    //       {`let x = 10;\nx = 20; // valid`}
    //     </SyntaxHighlighter>
    //   </div>
    // ),
    (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">const</h2>
        <p>
          <code>const</code> declares block-scoped constants. The value cannot be reassigned.
        </p>
        <SyntaxHighlighter language="javascript">
          {`const y = 5;\ny = 10; // Error`}
        </SyntaxHighlighter>
      </div>
    ),
    (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">var</h2>
        <p>
          <code>var</code> declares function-scoped or globally-scoped variables. It can be updated and re-declared.
        </p>
        <SyntaxHighlighter language="javascript">
          {`var z = 1;\nz = 2;\nvar z = 3;`}
        </SyntaxHighlighter>
      </div>
    ),
  ];

  return (
    <div>
      <div className="flex border-b mb-4">
        {tabList.map((label, idx) => (
          <button
            key={label}
            className={`px-4 py-2 font-medium ${
              activeIndex === idx
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{tabContents[activeIndex]}</div>
    </div>
  );
};

export default Tabs;