import { useState } from "react";
import "./Booster.css";
import pikachu from "../assets/Img Pokemon/pikachu.png";
import pokebola from "../assets/Img Pokemon/pokebola.png";
import booster from "../assets/Img Pokemon/booster.png";
import BoosterAberto from "./BoosterAberto";
import type { CartaColecao } from "../types/CartaColecao";
import { adicionarCartasNaColecao } from "../services/colecaoService";
import { buscarPokemonsAleatorios } from "../services/pokemonService";

function Booster() {
  const [aberto, setAberto] = useState(false);
  const [pokemons, setPokemons] = useState<CartaColecao[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function abrirBooster() {
    setLoading(true);
    setErro("");

    try {
      const pokemonsFormatados = await buscarPokemonsAleatorios();
      adicionarCartasNaColecao(pokemonsFormatados);
      setPokemons(pokemonsFormatados);
      setAberto(true);
    } catch {
      setErro("Failed to open booster. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="section">
        <img className="img-esquerda" src={pikachu} alt="" />

        <div className="card-box">
          <img className="booster-img" src={booster} alt="" />

          <button
            className="card-box-button"
            onClick={abrirBooster}
            disabled={loading}
          >
            {loading ? "CARREGANDO..." : "ABRIR BOOSTER"}
          </button>

          {erro && <p className="card-box-erro">{erro}</p>}
        </div>

        <img className="img-direita" src={pokebola} alt="" />
      </section>

      {aberto && (
        <BoosterAberto pokemons={pokemons} onFechar={() => setAberto(false)} />
      )}
    </>
  );
}

export default Booster;
