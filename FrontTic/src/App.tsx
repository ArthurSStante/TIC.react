import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./style/global.css";
import Login from "./Funcionalidades/Login";
import { ProdutoCads } from "./Funcionalidades/ProdutoCads";
import { Estoque } from "./Funcionalidades/Estoque";
import NavBar from "./Funcionalidades/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Estoque />} />
        <Route path="/cadastros" element={<ProdutoCads />} />
      </Routes>
    </Router>
  );
}

export default App;
