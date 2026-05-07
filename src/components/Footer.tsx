import "./Footer.css";
import github from "../assets/Img Pokemon/github.png"
import pokebola from "../assets/Img Pokemon/pokebola_footer.png"

function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-box">

        <a className="nome" href=""><img src={github} alt=""  /> Marcell Texeira</a>
        <a className="nome" href=""><img src={github} alt=""  /> Thiago Lima</a>

        <img className="pokebola-footer" src={pokebola} alt="Pokebola" />

        <a className="nome" href=""><img src={github} alt=""  /> Marcelo Ferreira</a>
        <a className="nome" href=""><img src={github} alt=""  /> Camonn Ritse</a>
      </div>
    </footer>
  );
}

export default Footer;