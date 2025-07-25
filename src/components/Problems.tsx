import React, { useEffect, useState } from "react";
import ProblemsAccordion from "./ProblemsAccordion";
import type { Problem } from "../types";

const Problems: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    fetch("/problems.json")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data.problems);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading Problems...</div>;
  }

  return (
    <ProblemsAccordion
      problems={problems}
      copiedIndex={copiedIndex}
      handleCopy={handleCopy}
    />
  );
};

export default Problems;