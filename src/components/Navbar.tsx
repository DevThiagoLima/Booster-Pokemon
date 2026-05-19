import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Img Pokemon/logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/boosters">
        <img className="navbar-logo" src={logo} alt="Pokemon Logo" />
      </Link>

      <nav className="navbar-menu">
        <Link className="a" to="/galeria">GALERIA</Link>
        <Link className="a" to="/boosters">BOOSTERS</Link>
        <Link className="a" to="/colecao">COLEÇÃO</Link>
      </nav>
    </header>
  );
}

export default Navbar;