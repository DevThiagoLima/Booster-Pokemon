import "./Booster.css";
import pikachu from "../assets/Img Pokemon/pikachu.png"
import pokebola from "../assets/Img Pokemon/pokebola.png"
import booster from "../assets/Img Pokemon/booster.png"

function Footer() {
  return (
    <section className="section">
      <img className="img-esquerda" src={pikachu} alt="" />

      <div className="card-box">
        <img className="booster-img" src={booster} alt="" />

        <button className="card-box-button">ABRIR BOOSTER</button>
      </div>

      <img className="img-direita" src={pokebola} alt="" />
    </section>
  );
}

export default Footer;