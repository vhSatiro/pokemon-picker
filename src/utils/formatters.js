// Utility functions for Pokemon data formatting
export const formatPokemonName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatPokemonNumber = (id) => {
  if (!id) return '';
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatTypeName = (type) => {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const formatHeight = (height) => {
  if (!height) return 'N/D';
  return `${height / 10} m`;
};

export const formatWeight = (weight) => {
  if (!weight) return 'N/D';
  return `${weight / 10} kg`;
};

export const formatAbilities = (abilities) => {
  if (!abilities || abilities.length === 0) return 'Nenhuma';
  return abilities.map(formatPokemonName).join(', ');
};

export const isImageUrl = (url) => {
  return typeof url === 'string' && url.startsWith('http');
};

// Pokemon type colors mapping
export const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  
  return typeColors[type?.toLowerCase()] || '#68A090';
};

// Format Pokemon type for display
export const formatPokemonType = (type) => {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Format stat names for display
export const formatStatName = (statName) => {
  const statNames = {
    'hp': 'HP',
    'attack': 'ATQ',
    'defense': 'DEF',
    'special-attack': 'ATQ.ESP',
    'special-defense': 'DEF.ESP',
    'speed': 'VEL'
  };
  
  return statNames[statName] || statName.toUpperCase();
};

// Get local Pokemon image path
export const getLocalPokemonImage = (pokemonId) => {
  if (!pokemonId) return null;
  const paddedId = pokemonId.toString().padStart(4, '0');
  try {
    return new URL(`../assets/120px-Menu_HOME_${paddedId}.png`, import.meta.url).href;
  } catch (error) {
    console.error(`Erro ao carregar imagem local para Pokemon ID ${pokemonId}:`, error);
    return null;
  }
};

// Get local type image path
export const getLocalTypeImage = (typeName) => {
  if (!typeName) return null;
  try {
    return new URL(`../assets/${typeName.toLowerCase()}.png`, import.meta.url).href;
  } catch (error) {
    console.error(`Erro ao carregar imagem do tipo ${typeName}:`, error);
    return null;
  }
};