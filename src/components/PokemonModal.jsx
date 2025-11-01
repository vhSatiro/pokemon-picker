import React, { useState, useEffect, useRef } from 'react';
import { formatPokemonType, formatStatName, getLocalPokemonImage, getLocalTypeImage } from '../utils/formatters';
import { PokemonService } from '../services/pokemonService';
import './PokemonModal.css';

const PokemonModal = ({ isOpen, onClose, selectedPokemon, onPokemonSelect, selectedGeneration, pokemonList, isLoading, isLoadingDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const dropdownRef = useRef(null);

  // Filtrar lista quando mudar o termo de busca
  useEffect(() => {
    if (pokemonList && searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = pokemonList.filter(pokemon => {
        const nameMatch = pokemon.name.toLowerCase().includes(term);
        const idMatch = pokemon.id.toString().includes(term);
        return nameMatch || idMatch;
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(pokemonList || []);
    }
  }, [searchTerm, pokemonList]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Limpar ao fechar modal
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setShowDropdown(false);
    }
  }, [isOpen]);

  // Atualizar texto quando selecionar pokemon
  useEffect(() => {
    if (selectedPokemon && !showDropdown) {
      setSearchTerm(`#${selectedPokemon.id.toString().padStart(3, '0')} ${selectedPokemon.name}`);
    }
  }, [selectedPokemon, showDropdown]);
  
  if (!isOpen) return null;

  // Helper function to safely get Pokemon stats
  const getSafeStats = (pokemon) => {
    if (!pokemon) return [];
    
    // Verificar se temos stats no formato padrão da PokeAPI (array)
    if (pokemon.stats && Array.isArray(pokemon.stats)) {
      return pokemon.stats;
    }
    
    // Verificar se temos stats no formato do nosso serviço (objeto)
    if (pokemon.stats && typeof pokemon.stats === 'object') {
      const stats = pokemon.stats;
      return [
        { stat: { name: 'hp' }, base_stat: stats.hp || 0 },
        { stat: { name: 'attack' }, base_stat: stats.attack || 0 },
        { stat: { name: 'defense' }, base_stat: stats.defense || 0 },
        { stat: { name: 'special-attack' }, base_stat: stats.specialAttack || 0 },
        { stat: { name: 'special-defense' }, base_stat: stats.specialDefense || 0 },
        { stat: { name: 'speed' }, base_stat: stats.speed || 0 }
      ];
    }
    
    // Verificar se stats estão diretamente no pokemon (fallback)
    if (pokemon.hp || pokemon.attack || pokemon.defense) {
      return [
        { stat: { name: 'hp' }, base_stat: pokemon.hp || 0 },
        { stat: { name: 'attack' }, base_stat: pokemon.attack || 0 },
        { stat: { name: 'defense' }, base_stat: pokemon.defense || 0 },
        { stat: { name: 'special-attack' }, base_stat: pokemon.specialAttack || 0 },
        { stat: { name: 'special-defense' }, base_stat: pokemon.specialDefense || 0 },
        { stat: { name: 'speed' }, base_stat: pokemon.speed || 0 }
      ];
    }
    
    return [];
  };

  // Helper function to safely get Pokemon types
  const getSafeTypes = (pokemon) => {
    if (!pokemon || !pokemon.types) return [];
    return Array.isArray(pokemon.types) ? pokemon.types : [];
  };



  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handlePokemonSelect = (pokemon) => {
    onPokemonSelect(pokemon);
    setSearchTerm(`#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`);
    setShowDropdown(false);
  };

  const handleConfirm = () => {
    if (selectedPokemon) {
      onClose(selectedPokemon);
    }
  };

  const handleCancel = () => {
    onClose(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="pokedex-container">
          
          {/* Header */}
          <div className="pokedex-header">
            <div className="header-lights">
              <div className="light large-light blue"></div>
              <div className="small-lights">
                <div className="light small-light red"></div>
                <div className="light small-light yellow"></div>
                <div className="light small-light green"></div>
              </div>
            </div>
            <h2 className="header-title">POKÉDEX</h2>
            <button onClick={handleCancel} className="close-btn">×</button>
          </div>

          {/* Body */}
          <div className="pokedex-body">
            
            {/* Main Screen Section */}
            <div className="main-section">
              <div className="screen-container">
                <div className="main-screen">
                  <div className="screen-content">
                    {isLoading || isLoadingDetails ? (
                      <div className="loading-screen">
                        <div className="scan-line"></div>
                        <div className="loading-text">
                          {isLoading ? 'CARREGANDO POKÉMON...' : 'ANALISANDO...'}
                        </div>
                      </div>
                    ) : selectedPokemon ? (
                      <div className="pokemon-display">
                        <img 
                          src={getLocalPokemonImage(selectedPokemon.id)} 
                          alt={selectedPokemon.name}
                          className="pokemon-image"
                          onError={(e) => {
                            // Fallback para imagem da API se a local não existir
                            if (e.target.src.includes('Menu_HOME_')) {
                              e.target.src = selectedPokemon.sprites?.front_default || selectedPokemon.image;
                            } else {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                        <div className="pokemon-name">
                          #{selectedPokemon.id.toString().padStart(3, '0')} {selectedPokemon.name.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className="empty-screen">
                        <div className="empty-text">SELECIONE UM POKÉMON</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Section */}
            <div className="control-section">
              
              {/* Controls */}
              <div className="control-panel">
                <div className="control-title">PAINEL DE SELEÇÃO</div>
                
                <div className="control-group">
                  <label className="control-label">POKÉMON</label>
                  <div className="autocomplete-container" ref={dropdownRef}>
                    <input
                      type="text"
                      className="pokedex-select autocomplete-input"
                      placeholder="Digite para pesquisar..."
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      disabled={isLoading}
                    />
                    {showDropdown && filteredList.length > 0 && (
                      <div className="autocomplete-dropdown">
                        {filteredList.map(pokemon => (
                          <div
                            key={pokemon.id}
                            className={`autocomplete-item ${selectedPokemon?.id === pokemon.id ? 'selected' : ''}`}
                            onClick={() => handlePokemonSelect(pokemon)}
                          >
                            <span className="autocomplete-id">
                              #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                            <span className="autocomplete-name">{pokemon.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {showDropdown && filteredList.length === 0 && searchTerm && (
                      <div className="autocomplete-dropdown">
                        <div className="autocomplete-empty">
                          Nenhum Pokémon encontrado
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Display */}
              <div className="info-display">
                <div className="lcd-screen">
                  {selectedPokemon && getSafeTypes(selectedPokemon).length > 0 ? (
                    <div className="pokemon-stats">
                      
                      {/* Basic Info Section */}
                      <div className="basic-info-section">
                        <div className="stat-row">
                          <span className="stat-label">TIPO:</span>
                          <div className="type-images">
                            {getSafeTypes(selectedPokemon).map((type, index) => {
                              const typeName = type.type?.name || type;
                              return (
                                <img
                                  key={index}
                                  src={getLocalTypeImage(typeName)}
                                  alt={formatPokemonType(typeName)}
                                  className="type-icon"
                                  onError={(e) => {
                                    // Fallback para texto se a imagem não existir
                                    e.target.style.display = 'none';
                                    const textSpan = document.createElement('span');
                                    textSpan.className = 'type-text';
                                    textSpan.textContent = formatPokemonType(typeName);
                                    e.target.parentNode.appendChild(textSpan);
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>
                        
                        {selectedPokemon.height && (
                          <div className="stat-row">
                            <span className="stat-label">ALTURA:</span>
                            <span className="stat-value">{(selectedPokemon.height / 10).toFixed(1)}m</span>
                          </div>
                        )}
                        
                        {selectedPokemon.weight && (
                          <div className="stat-row">
                            <span className="stat-label">PESO:</span>
                            <span className="stat-value">{(selectedPokemon.weight / 10).toFixed(1)}kg</span>
                          </div>
                        )}
                      </div>

                      {/* Base Stats Section */}
                      <div className="base-stats-section">
                        <div className="section-title">STATS BASE</div>
                        {getSafeStats(selectedPokemon).length > 0 ? (
                          <div className="stats-grid">
                            {getSafeStats(selectedPokemon).slice(0, 6).map((stat, index) => (
                              <div key={index} className="stat-item">
                                <div className="stat-name">{formatStatName(stat.stat?.name || 'unknown')}</div>
                                <div className="stat-bar-container">
                                  <div 
                                    className="stat-bar"
                                    style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                                  ></div>
                                </div>
                                <div className="stat-number">{stat.base_stat || 0}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="stats-loading">
                            <div className="loading-stats-text">Carregando stats...</div>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  ) : (
                    <div className="no-data">DADOS NÃO DISPONÍVEIS</div>
                  )}
                </div>
              </div>
              
            </div>
          </div>

          {/* Footer */}
          <div className="pokedex-footer">
            <button onClick={handleCancel} className="action-btn cancel-btn">
              CANCELAR
            </button>
            <button 
              onClick={handleConfirm} 
              className="action-btn confirm-btn"
              disabled={!selectedPokemon}
            >
              CONFIRMAR
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonModal;