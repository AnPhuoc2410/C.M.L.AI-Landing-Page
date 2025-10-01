import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import HomePage from "./components/HomePage";
import WhyThisProjectPage from "./pages/WhyThisProjectPage";
import GoalsPage from "./pages/GoalsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ExperiencePage from "./pages/ExperiencePage";

const App = () => {
  return (
    <AudioProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/why-project" element={<WhyThisProjectPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
          </Routes>
        </main>
      </Router>
    </AudioProvider>
  );
};

export default App;
