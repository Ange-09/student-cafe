import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import CafePage from "./pages/CafePage";
import "./app.css";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CafePage" element={<CafePage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
