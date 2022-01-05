import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<QuizPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
