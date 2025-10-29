// Pokemon Model Classes

export class PokemonBasic {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprite || '❓';
    this.hasDetails = data.hasDetails || false;
  }

  static fromSpecies(species) {
    const speciesId = species.url.split('/').filter(Boolean).pop();
    return new PokemonBasic({
      id: parseInt(speciesId),
      name: species.name,
      sprite: '❓',
      hasDetails: false
    });
  }

  static fromMixed(pokemonData) {
    return new PokemonBasic({
      id: pokemonData.id,
      name: pokemonData.name,
      sprite: '❓',
      hasDetails: false
    });
  }
}

export class PokemonStats {
  constructor(stats) {
    this.hp = stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
    this.attack = stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
    this.defense = stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
    this.speed = stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
    this.specialAttack = stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0;
    this.specialDefense = stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0;
  }

  get total() {
    return this.hp + this.attack + this.defense + this.speed + this.specialAttack + this.specialDefense;
  }
}

export class PokemonDetailed extends PokemonBasic {
  constructor(apiData) {
    super({
      id: apiData.id,
      name: apiData.name,
      sprite: apiData.sprites.front_default || 
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${apiData.id}.png`,
      hasDetails: true
    });

    this.types = apiData.types.map(t => t.type.name);
    this.stats = new PokemonStats(apiData.stats);
    this.height = apiData.height;
    this.weight = apiData.weight;
    this.abilities = apiData.abilities.map(a => a.ability.name);
    this.baseExperience = apiData.base_experience || 0;
    
    // Sprites adicionais
    this.sprites = {
      front_default: apiData.sprites.front_default,
      front_shiny: apiData.sprites.front_shiny,
      back_default: apiData.sprites.back_default,
      back_shiny: apiData.sprites.back_shiny,
      official_artwork: apiData.sprites.other?.['official-artwork']?.front_default
    };
  }

  // Métodos utilitários
  get heightInMeters() {
    return this.height / 10;
  }

  get weightInKilograms() {
    return this.weight / 10;
  }

  get primaryType() {
    return this.types[0];
  }

  get secondaryType() {
    return this.types[1] || null;
  }

  hasType(typeName) {
    return this.types.includes(typeName.toLowerCase());
  }

  // Para compatibilidade com código existente
  get type() {
    return this.types;
  }

  get sprite() {
    return this.sprites.front_default || this._sprite;
  }

  set sprite(value) {
    this._sprite = value;
  }
}

export class PokemonGeneration {
  constructor(name, pokemonList = []) {
    this.name = name;
    this.pokemon = pokemonList;
    this.count = pokemonList.length;
  }

  addPokemon(pokemon) {
    this.pokemon.push(pokemon);
    this.count = this.pokemon.length;
  }

  sortById() {
    this.pokemon.sort((a, b) => a.id - b.id);
    return this;
  }

  filterByType(typeName) {
    return this.pokemon.filter(p => 
      p.hasDetails && p.hasType(typeName)
    );
  }

  findById(id) {
    return this.pokemon.find(p => p.id === id);
  }

  findByName(name) {
    return this.pokemon.find(p => 
      p.name.toLowerCase() === name.toLowerCase()
    );
  }
}