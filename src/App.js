import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import "./app.css";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import CafePage from "./pages/CafePage";
import OwnerPage from "./pages/OwnerPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Cafe/:id" element={<CafePage />} />
            <Route path="/OwnerPage" element={<OwnerPage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
