import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-amber-400">
      <main className="lg:w-1/3 w-11/12 m-5 min-h-2/3 m-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-lg drop-shadow-md">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<QuizPage />} />
          </Routes>
        </HashRouter>
      </main>
    </div>
  );
}

export default App;
