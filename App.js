import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import TestQuestions from "./components/TestQuestions";
import GameIntro from "./components/GameIntro";
import Grants from "./components/Grants";
import WealthAid from "./components/WealthAid";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/test-questions" element={<TestQuestions />} />
        <Route path="/game-intro" element={<GameIntro />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/wealth-aid" element={<WealthAid />} />
      </Routes>
    </Router>
  );
}

export default App;
