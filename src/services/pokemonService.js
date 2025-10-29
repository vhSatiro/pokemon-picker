import { CacheService } from './cacheService';
import { PokemonBasic, PokemonDetailed, PokemonGeneration } from '../models/Pokemon';

// Pokemon API Service - Gerencia todas as chamadas para a PokeAPI
export class PokemonService {
  static BASE_URL = 'https://pokeapi.co/api/v2';

  // Mapeamento de gerações para IDs da PokeAPI
  static generationMapping = {
    'Kanto': { id: 1, name: 'generation-i' },
    'Johto': { id: 2, name: 'generation-ii' },
    'Hoenn': { id: 3, name: 'generation-iii' },
    'Sinnoh': { id: 4, name: 'generation-iv' },
    'Unova': { id: 5, name: 'generation-v' },
    'Kalos': { id: 6, name: 'generation-vi' },
    'Alola': { id: 7, name: 'generation-vii' },
    'Galar': { id: 8, name: 'generation-viii' },
    'Paldea': { id: 9, name: 'generation-ix' },
    'Hisui': { id: 8, name: 'generation-viii', isLegends: true },
    'Outras': { id: 'mixed', name: 'mixed' }
  };

  // Buscar lista básica de Pokémon por geração
  static async fetchPokemonList(generation) {
    CacheService.incrementRequest();
    
    const cacheKey = CacheService.getCacheKey('list', generation);
    const cached = CacheService.getFromCache(cacheKey);
    
    if (cached) {
      CacheService.incrementCacheHit();
      return [...cached].sort((a, b) => a.id - b.id);
    }

    try {
      const genInfo = this.generationMapping[generation];
      
      if (genInfo.id === 'mixed') {
        const mixedPokemonData = [
          { id: 25, name: 'pikachu' },
          { id: 149, name: 'dragonite' },
          { id: 150, name: 'mewtwo' },
          { id: 493, name: 'arceus' },
          { id: 6, name: 'charizard' },
          { id: 448, name: 'lucario' }
        ];
        
        const pokemonList = mixedPokemonData
          .map(data => PokemonBasic.fromMixed(data))
          .sort((a, b) => a.id - b.id);
        
        // Não precisamos criar instância PokemonGeneration aqui, só retornar a lista
        CacheService.saveToCache(cacheKey, pokemonList);
        return pokemonList;
      }

      const response = await fetch(`${this.BASE_URL}/generation/${genInfo.id}/`);
      if (!response.ok) throw new Error('Erro ao buscar geração');
      
      const generationData = await response.json();
      // Removido o slice - agora carrega todos os Pokémon da geração
      const pokemonSpecies = generationData.pokemon_species;
      
      const pokemonList = pokemonSpecies
        .map(species => PokemonBasic.fromSpecies(species))
        .sort((a, b) => a.id - b.id);
      
      // Não precisamos criar instância PokemonGeneration aqui, só retornar a lista
      CacheService.saveToCache(cacheKey, pokemonList);
      return pokemonList;
      
    } catch (error) {
      console.error('Erro ao buscar lista de Pokémon:', error);
      throw new Error('Erro ao carregar lista de Pokémon. Tente novamente.');
    }
  }

  // Buscar detalhes completos de um Pokémon
  static async fetchPokemonDetails(pokemonId) {
    CacheService.incrementRequest();
    
    const cacheKey = CacheService.getCacheKey('details', pokemonId);
    const cached = CacheService.getFromCache(cacheKey);
    
    if (cached) {
      CacheService.incrementCacheHit();
      return cached;
    }

    try {
      const response = await fetch(`${this.BASE_URL}/pokemon/${pokemonId}/`);
      if (!response.ok) return null;
      
      const pokemonData = await response.json();
      const pokemonDetailed = new PokemonDetailed(pokemonData);
      
      CacheService.saveToCache(cacheKey, pokemonDetailed);
      return pokemonDetailed;
      
    } catch (error) {
      console.error(`Erro ao buscar detalhes do Pokémon ${pokemonId}:`, error);
      return null;
    }
  }

  static getGenerations() {
    return Object.keys(this.generationMapping);
  }

  // Buscar múltiplos Pokémon por IDs
  static async fetchMultiplePokemon(pokemonIds) {
    const promises = pokemonIds.map(id => this.fetchPokemonDetails(id));
    const results = await Promise.allSettled(promises);
    
    return results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);
  }

  // Buscar Pokémon por tipo
  static async searchByType(typeName) {
    try {
      const response = await fetch(`${this.BASE_URL}/type/${typeName.toLowerCase()}/`);
      if (!response.ok) return [];
      
      const typeData = await response.json();
      const pokemonList = typeData.pokemon.slice(0, 50); // Limitar a 50 para performance
      
      return pokemonList.map(p => ({
        id: parseInt(p.pokemon.url.split('/').filter(Boolean).pop()),
        name: p.pokemon.name
      }));
    } catch (error) {
      console.error('Erro ao buscar Pokémon por tipo:', error);
      return [];
    }
  }

  // Validar se um Pokémon existe
  static async validatePokemon(pokemonId) {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon/${pokemonId}/`, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Obter informações de uma geração específica
  static getGenerationInfo(generationName) {
    return this.generationMapping[generationName] || null;
  }

  // Contar total de Pokémon por geração (estimativa baseada no cache)
  static async getGenerationCount(generationName) {
    const cacheKey = CacheService.getCacheKey('list', generationName);
    const cached = CacheService.getFromCache(cacheKey);
    
    if (cached) {
      return cached.length;
    }
    
    // Se não estiver em cache, retorna estimativa baseada na geração
    const genInfo = this.getGenerationInfo(generationName);
    if (!genInfo || genInfo.id === 'mixed') return 6; // Pokémon especiais
    
    // Estimativas por geração (aproximadas)
    const estimates = {
      1: 151, 2: 100, 3: 135, 4: 107,
      5: 156, 6: 72, 7: 81, 8: 89, 9: 103
    };
    
    return estimates[genInfo.id] || 100;
  }
}