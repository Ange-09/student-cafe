import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import OwnerPage from "./pages/OwnerPage";
import "./app.css";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/OwnerPage" element={<OwnerPage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
