import type { CartaColecao } from "../types/CartaColecao";

const COLECAO_STORAGE_KEY = "pokemon-colecao";

export function buscarColecao(): CartaColecao[] {
  const colecaoSalva = localStorage.getItem(COLECAO_STORAGE_KEY);

  if (!colecaoSalva) {
    return [];
  }

  return JSON.parse(colecaoSalva);
}

export function salvarColecao(colecao: CartaColecao[]) {
  localStorage.setItem(COLECAO_STORAGE_KEY, JSON.stringify(colecao));
}

export function adicionarCartasNaColecao(novasCartas: CartaColecao[]) {
  const colecaoAtual = buscarColecao();

  novasCartas.forEach((novaCarta) => {
    const cartaExistente = colecaoAtual.find(
      (carta) => carta.id === novaCarta.id
    );

    if (cartaExistente) {
      cartaExistente.quantidade += 1;
    } else {
      colecaoAtual.push(novaCarta);
    }
  });

  salvarColecao(colecaoAtual);
}

export function alternarFavorito(cartaId: number): CartaColecao[] {
  const colecaoAtual = buscarColecao();

  const colecaoAtualizada = colecaoAtual.map((carta) => {
    if (carta.id !== cartaId) {
      return carta;
    }

    return {
      ...carta,
      favorita: !carta.favorita,
    };
  });

  salvarColecao(colecaoAtualizada);

  return colecaoAtualizada;
}