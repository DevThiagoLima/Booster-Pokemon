import { useState } from "react";
import "./BoosterAberto.css";
import cardVerso from "../assets/Img Pokemon/bakground_card.png";

type Pokemon = {
  id: number;
  nome: string;
  imagem: string;
};

type Props = {
  pokemons: Pokemon[];
  onFechar: () => void;
};

function BoosterAberto({ pokemons, onFechar }: Props) {
  const [viradas, setViradas] = useState<boolean[]>(Array(10).fill(false));

  function virarCarta(index: number) {
    setViradas(prev => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div className="overlay">
      <div className="overlay-box">
        <button className="fechar" onClick={onFechar}>X</button>
        <div className="cartas-grid">
          {pokemons.map((pokemon, index) => (
            <div
              key={pokemon.id}
              className={`carta ${viradas[index] ? "virada" : ""}`}
              onClick={() => virarCarta(index)}
            >
              <div className="carta-inner">
                <div className="carta-verso">
                  <img src={cardVerso} alt="verso da carta" />
                </div>
                <div className="carta-frente">
                  <img src={pokemon.imagem} alt={pokemon.nome} />
                  <span>{pokemon.nome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoosterAberto;
