import "./Navbar.css";
import logo from "../assets/Img Pokemon/logo.png";

function Navbar() {
  return (
    <header className="navbar">

        <a href=""><img className="navbar-logo" src={logo} alt="Pokemon Logo" /></a>

        <nav className="navbar-menu">
            <a className="a" href="/">GALERIA</a>
            <a className="a" href="/">BOOSTERS</a>
            <a className="a" href="/">COLEÇÃO</a>
        </nav>
    </header>
  );
}

export default Navbar;