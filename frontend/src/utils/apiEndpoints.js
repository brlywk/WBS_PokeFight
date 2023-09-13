const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT || "";
const basePath = import.meta.env.VITE_API_BASE;
const pokePath = import.meta.env.VITE_API_POKEMON;
const fightPath = import.meta.env.VITE_API_FIGHTS;
const typePath = import.meta.env.VITE_API_TYPES;

const apiEndpoint = `${host}${port ? ":" : ""}${port}/${basePath}`;

export const pokemonEndpoint = `${apiEndpoint}/${pokePath}`;
export const fightEndpoint = `${apiEndpoint}/${fightPath}`;
export const typeEndpoint = `${apiEndpoint}/${typePath}`;
