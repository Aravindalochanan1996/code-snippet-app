import React from "react";
import "./App.css";
import Tabs from "./components/Tabs";

const App: React.FC = () => (
  <div className="px-4 py-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center">JavaScript Code Snippets</h1>
    <Tabs />
  </div>
);

export default App;