import type { CartaColecao } from "../types/CartaColecao";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const BOOSTER_SIZE = 10;
const POKEDEX_SIZE = 1025;

function gerarIdsAleatorios(quantidade: number): number[] {
  const ids = new Set<number>();
  while (ids.size < quantidade) {
    ids.add(Math.floor(Math.random() * POKEDEX_SIZE) + 1);
  }
  return Array.from(ids);
}

export async function buscarPokemonsAleatorios(): Promise<CartaColecao[]> {
  const ids = gerarIdsAleatorios(BOOSTER_SIZE);

  const resultados = await Promise.all(
    ids.map(async (id) => {
      const resposta = await fetch(`${POKEAPI_BASE_URL}/${id}`);

      if (!resposta.ok) {
        throw new Error(
          `Failed to fetch pokemon with id ${id}: ${resposta.status}`,
        );
      }

      return resposta.json();
    }),
  );

  return resultados.map((pokemon) => ({
    id: pokemon.id,
    nome: pokemon.name,
    imagem: pokemon.sprites.other["official-artwork"].front_default,
    tipos: pokemon.types.map(
      (tipo: { type: { name: string } }) => tipo.type.name,
    ),
    quantidade: 1,
    favorita: false,
  }));
}
