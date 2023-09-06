const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT || "";
const basePath = import.meta.env.VITE_API_BASE_PATH;
const pokePath = import.meta.env.VITE_API_POKEMON_PATH;
const fightPath = import.meta.env.VITE_API_FIGHT_PATH;
const typePath = import.meta.env.VITE_API_TYPE_PATH;

const apiEndpoint = `${host}${port ? ":" : ""}${port}/${basePath}`;

export const pokemonEndpoint = `${apiEndpoint}/${pokePath}`;
export const fightEndpoint = `${apiEndpoint}/${fightPath}`;
export const typeEndpoint = `${apiEndpoint}/${typePath}`;
