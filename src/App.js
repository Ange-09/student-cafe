import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import "./app.css";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import CafePage from "./pages/CafePage";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/CafePage" element={<CafePage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
