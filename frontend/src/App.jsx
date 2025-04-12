import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./assets/screens/main";
import Crud from "./assets/screens/crud";
import Detailed from "./assets/screens/detailed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/detailed/:userId" element={<Detailed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
