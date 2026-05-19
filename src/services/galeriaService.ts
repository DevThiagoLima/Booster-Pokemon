import type { CartaColecao } from "../types/CartaColecao";

const GALERIA_STORAGE_KEY = "pokemon-galeria";

export function buscarGaleria(): CartaColecao[] {
  const galeriaSalva = localStorage.getItem(GALERIA_STORAGE_KEY);

  if (!galeriaSalva) {
    return [];
  }

  return JSON.parse(galeriaSalva);
}

export function salvarGaleria(galeria: CartaColecao[]) {
  localStorage.setItem(GALERIA_STORAGE_KEY, JSON.stringify(galeria));
}