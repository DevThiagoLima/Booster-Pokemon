import { useState } from "react";
import "./Booster.css";
import pikachu from "../assets/Img Pokemon/pikachu.png";
import pokebola from "../assets/Img Pokemon/pokebola.png";
import booster from "../assets/Img Pokemon/booster.png";
import BoosterAberto from "./BoosterAberto";
import type { CartaColecao } from "../types/CartaColecao";
import { adicionarCartasNaColecao } from "../services/colecaoService";

function Booster() {
  const [aberto, setAberto] = useState(false);
  const [pokemons, setPokemons] = useState<CartaColecao[]>([]);
  const [loading, setLoading] = useState(false);

  async function abrirBooster() {
    setLoading(true);

    const ids = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 1025) + 1
    );

    const resultados = await Promise.all(
      ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((resposta) =>
          resposta.json()
        )
      )
    );

    const pokemonsFormatados: CartaColecao[] = resultados.map((pokemon) => ({
      id: pokemon.id,
      nome: pokemon.name,
      imagem: pokemon.sprites.other["official-artwork"].front_default,
      tipos: pokemon.types.map(
        (tipo: { type: { name: string } }) => tipo.type.name
      ),
      quantidade: 1,
      favorita: false,
    }));

    adicionarCartasNaColecao(pokemonsFormatados);

    setPokemons(pokemonsFormatados);
    setLoading(false);
    setAberto(true);
  }

  return (
    <>
      <section className="section">
        <img className="img-esquerda" src={pikachu} alt="" />

        <div className="card-box">
          <img className="booster-img" src={booster} alt="" />

          <button className="card-box-button" onClick={abrirBooster} disabled={loading}>
            {loading ? "CARREGANDO..." : "ABRIR BOOSTER"}
          </button>
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