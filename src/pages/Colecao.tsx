import { useState } from "react";
import "./Colecao.css";
import { alternarFavorito, buscarColecao } from "../services/colecaoService";
import type { CartaColecao } from "../types/CartaColecao";
import cardVerso from "../assets/Img Pokemon/pokebola_footer.png";

function ordenarColecao(colecao: CartaColecao[]) {
  return [...colecao].sort((cartaA, cartaB) => {
    if (cartaA.favorita !== cartaB.favorita) {
      return cartaA.favorita ? -1 : 1;
    }

    return cartaA.nome.localeCompare(cartaB.nome);
  });
}

function Colecao() {
  const [exibirColecao, setExibirColecao] = useState(false);
  const [colecao, setColecao] = useState<CartaColecao[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [filtroQuantidade, setFiltroQuantidade] = useState("");

  const tiposDisponiveis = Array.from(
    new Set(colecao.flatMap((carta) => carta.tipos))
  ).sort();

  const colecaoFiltrada = ordenarColecao(
    colecao.filter((carta) => {
      const correspondeAoNome = carta.nome
        .toLowerCase()
        .includes(termoBusca.toLowerCase());

      const correspondeAoTipo =
        tipoSelecionado === "" || carta.tipos.includes(tipoSelecionado);

      const correspondeAQuantidade =
        filtroQuantidade === "" ||
        (filtroQuantidade === "1" && carta.quantidade === 1) ||
        (filtroQuantidade === "2" && carta.quantidade >= 2) ||
        (filtroQuantidade === "5" && carta.quantidade >= 5);

      return correspondeAoNome && correspondeAoTipo && correspondeAQuantidade;
    })
  );

  function carregarColecao() {
    const cartasSalvas = buscarColecao();
    setColecao(ordenarColecao(cartasSalvas));
    setExibirColecao(true);
  }

  function marcarFavorito(cartaId: number) {
    const colecaoAtualizada = alternarFavorito(cartaId);
    setColecao(ordenarColecao(colecaoAtualizada));
  }

  return (
    <main className="colecao-page"> 
      {!exibirColecao && (
        <section className="colecao-intro">
          <button className="colecao-botao" onClick={carregarColecao}>
            EXIBIR COLEÇÃO
          </button>
        </section>
      )}

      {exibirColecao && (
        <section className="colecao-painel">
          <button
            className="colecao-fechar"
            onClick={() => setExibirColecao(false)}
          >
            X
          </button>

          <div className="colecao-toolbar">
            <img src={cardVerso} alt="" className="colecao-toolbar-icon" />

            <input
              className="colecao-busca"
              type="text"
              placeholder="Pesquisar Pokemon ..."
              value={termoBusca}
              onChange={(event) => setTermoBusca(event.target.value)}
            />

            <select
              className="colecao-select"
              value={tipoSelecionado}
              onChange={(event) => setTipoSelecionado(event.target.value)}
            >
              <option value="">Todos os tipos</option>

              {tiposDisponiveis.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <select
              className="colecao-select"
              value={filtroQuantidade}
              onChange={(event) => setFiltroQuantidade(event.target.value)}
            >
              <option value="">Todas qtds</option>
              <option value="1">Tenho 1</option>
              <option value="2">Tenho 2+</option>
              <option value="5">Tenho 5+</option>
            </select>
          </div>

          {colecaoFiltrada.length === 0 ? (
            <p className="colecao-vazia">
              Nenhuma carta encontrada.
            </p>
          ) : (
            <div className="colecao-grid">
              {colecaoFiltrada.map((carta) => (
                <article className="colecao-carta" key={carta.id}>
                  <button
                    className={`colecao-favorito ${
                      carta.favorita ? "favorita" : ""
                    }`}
                    onClick={() => marcarFavorito(carta.id)}
                    type="button"
                    aria-label={
                      carta.favorita
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    {carta.favorita ? "★" : "☆"}
                  </button>

                  <img
                    className="colecao-carta-img"
                    src={carta.imagem}
                    alt={carta.nome}
                  />

                  <div className="colecao-carta-info">
                    <h2>{carta.nome}</h2>
                    <p>{carta.tipos.join(" / ")}</p>
                    <span>Qtd: {carta.quantidade}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Colecao;