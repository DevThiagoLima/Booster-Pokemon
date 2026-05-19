import { useState } from "react";
import "./Galeria.css";
import { buscarColecao } from "../services/colecaoService";
import { buscarGaleria, salvarGaleria } from "../services/galeriaService";
import type { CartaColecao } from "../types/CartaColecao";
import cardVerso from "../assets/Img Pokemon/bakground_card.png";

function Galeria() {
  const [exibirGaleria, setExibirGaleria] = useState(false);
  const [colecao, setColecao] = useState<CartaColecao[]>([]);
  const [galeria, setGaleria] = useState<CartaColecao[]>([]);
  const [selecionadas, setSelecionadas] = useState<CartaColecao[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemLimite, setMensagemLimite] = useState("");

  function carregarGaleria() {
    const colecaoSalva = buscarColecao();
    const galeriaSalva = buscarGaleria();

    setColecao(colecaoSalva);
    setGaleria(galeriaSalva);
    setSelecionadas(galeriaSalva);
    setMensagemLimite("");
    setModoEdicao(galeriaSalva.length === 0);
    setExibirGaleria(true);
  }

  function cartaEstaSelecionada(cartaId: number) {
    return selecionadas.some((carta) => carta.id === cartaId);
  }

  function alternarSelecao(carta: CartaColecao) {
    const jaSelecionada = cartaEstaSelecionada(carta.id);

    if (jaSelecionada) {
      setSelecionadas((cartasAtuais) =>
        cartasAtuais.filter((item) => item.id !== carta.id)
      );
      setMensagemLimite("");
      return;
    }

    if (selecionadas.length >= 9) {
      setMensagemLimite("Você pode selecionar no máximo 9 cartas.");
      return;
    }

    setSelecionadas((cartasAtuais) => [...cartasAtuais, carta]);
    setMensagemLimite("");
  }

  function salvarGaleriaSelecionada() {
    salvarGaleria(selecionadas);
    setGaleria(selecionadas);
    setMensagemLimite("");
    setModoEdicao(false);
  }

  return (
    <main className="galeria-page">
      {!exibirGaleria && (
        <section className="galeria-intro">
          <button className="galeria-botao" onClick={carregarGaleria}>
            EXIBIR GALERIA
          </button>
        </section>
      )}

      {exibirGaleria && (
        <section className="galeria-painel">
          <button
            className="galeria-fechar"
            onClick={() => setExibirGaleria(false)}
          >
            X
          </button>

          {modoEdicao ? (
            <>
              <div className="galeria-toolbar">
                <img src={cardVerso} alt="" className="galeria-toolbar-icon" />

                <div className="galeria-contador">
                  {selecionadas.length}/9 CARTAS SELECIONADAS
                </div>

                <button
                  className="galeria-salvar"
                  onClick={salvarGaleriaSelecionada}
                  disabled={selecionadas.length === 0}
                >
                  SALVAR GALERIA
                </button>
              </div>

              {mensagemLimite && (
                <p className="galeria-mensagem-limite">
                  {mensagemLimite}
                </p>
              )}

              {colecao.length === 0 ? (
                <p className="galeria-vazia">
                  Abra boosters para adicionar cartas à coleção.
                </p>
              ) : (
                <div className="galeria-grid-selecao">
                  {colecao.map((carta) => (
                    <button
                      className={`galeria-carta-selecao ${
                        cartaEstaSelecionada(carta.id) ? "selecionada" : ""
                      }`}
                      key={carta.id}
                      onClick={() => alternarSelecao(carta)}
                      type="button"
                    >
                      <img src={carta.imagem} alt={carta.nome} />
                      <span>{carta.nome}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h1 className="galeria-titulo">MINHA GALERIA</h1>

              {galeria.length === 0 ? (
                <p className="galeria-vazia">
                  Nenhuma carta adicionada à galeria.
                </p>
              ) : (
                <div className="galeria-grid-final">
                  {galeria.map((carta) => (
                    <article className="galeria-carta-final" key={carta.id}>
                      <img src={carta.imagem} alt={carta.nome} />
                      <span>{carta.nome}</span>
                    </article>
                  ))}
                </div>
              )}

              <button
                className="galeria-editar"
                onClick={() => setModoEdicao(true)}
              >
                EDITAR GALERIA
              </button>
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default Galeria;