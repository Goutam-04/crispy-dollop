import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ImagePage from "./ImagePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:slug" element={<ImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
