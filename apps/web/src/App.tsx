import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import AddPack from "./components/pages/add-pack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pack" element={<AddPack />} />
      </Routes>
    </Router>
  );
}

export default App;
