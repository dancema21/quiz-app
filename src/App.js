import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-amber-400">
      <main className="lg:w-1/3 sm:w-1/2 m-5 lg:h-2/3 sm:h-1/2 m-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-lg drop-shadow-md">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<QuizPage />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
