import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Booster from "./components/Booster";
import Footer from "./components/Footer";
import Colecao from "./pages/Colecao";
import Galeria from "./pages/Galeria";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Booster />} />
        <Route path="/boosters" element={<Booster />} />
        <Route path="/colecao" element={<Colecao />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;