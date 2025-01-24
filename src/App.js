import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StartGame from "./components/StartGame";
import Gameplay from "./components/Gameplay";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/gameplay" element={<Gameplay />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
