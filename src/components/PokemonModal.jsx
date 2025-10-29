import React, { useState } from 'react';
import { formatPokemonType, formatStatName } from '../utils/formatters';
import { PokemonService } from '../services/pokemonService';
import './PokemonModal.css';

const PokemonModal = ({ isOpen, onClose, selectedPokemon, onPokemonSelect, selectedGeneration, pokemonList, isLoading, isLoadingDetails }) => {
  
  if (!isOpen) return null;

  // Debug: log da estrutura do selectedPokemon para verificar os dados
  if (selectedPokemon) {
    console.log('Selected Pokemon data:', selectedPokemon);
  }

  // Helper function to safely get Pokemon stats
  const getSafeStats = (pokemon) => {
    if (!pokemon || !pokemon.stats) return [];
    return Array.isArray(pokemon.stats) ? pokemon.stats : [];
  };

  // Helper function to safely get Pokemon types
  const getSafeTypes = (pokemon) => {
    if (!pokemon || !pokemon.types) return [];
    return Array.isArray(pokemon.types) ? pokemon.types : [];
  };

  const handlePokemonChange = (e) => {
    const pokemonId = parseInt(e.target.value);
    if (pokemonId && pokemonList) {
      const pokemon = pokemonList.find(p => p.id === pokemonId);
      if (pokemon) {
        onPokemonSelect(pokemon);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedPokemon) {
      onClose(selectedPokemon);
    }
  };

  const handleCancel = () => {
    onClose(null);
  };

  // Get generations for the dropdown
  const generations = Object.entries(PokemonService.generationMapping);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="pokedex-container">
          {/* Pokédex Header */}
          <div className="pokedex-header">
            <div className="header-lights">
              <div className="light large-light blue"></div>
              <div className="small-lights">
                <div className="light small-light red"></div>
                <div className="light small-light yellow"></div>
                <div className="light small-light green"></div>
              </div>
            </div>
            <div className="header-title">POKÉDEX</div>
            <button onClick={onClose} className="close-btn">×</button>
          </div>

          {/* Main Screen */}
          <div className="main-screen">
            <div className="screen-border">
              <div className="screen-content">
                {isLoading || isLoadingDetails ? (
                  <div className="loading-screen">
                    <div className="scan-line"></div>
                    <div className="loading-text">
                      {isLoading ? 'LOADING POKÉMON...' : 'SCANNING...'}
                    </div>
                  </div>
                ) : selectedPokemon ? (
                  <div className="pokemon-display">
                    <img 
                      src={selectedPokemon.sprites?.front_default || selectedPokemon.image} 
                      alt={selectedPokemon.name}
                      className="pokemon-image"
                    />
                    <div className="pokemon-name">
                      #{selectedPokemon.id.toString().padStart(3, '0')} {selectedPokemon.name.toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <div className="empty-screen">
                    <div className="empty-text">SELECT A POKÉMON</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="control-panel">
            <div className="selection-controls">
              <div className="control-group">
                <label className="control-label">GENERATION</label>
                <select 
                  value={selectedGeneration || ''} 
                  disabled
                  className="pokedex-select"
                >
                  <option value={selectedGeneration}>
                    {selectedGeneration ? selectedGeneration.toUpperCase() : 'NONE'}
                  </option>
                </select>
              </div>
              
              <div className="control-group">
                <label className="control-label">POKÉMON</label>
                <select 
                  onChange={handlePokemonChange}
                  className="pokedex-select"
                  value={selectedPokemon?.id || ''}
                  disabled={isLoading}
                >
                  <option value="">Select...</option>
                  {pokemonList && pokemonList.map(pokemon => (
                    <option key={pokemon.id} value={pokemon.id}>
                      #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Decorative buttons */}
            <div className="button-panel">
              <div className="button-row">
                <button className="pokedex-btn red"></button>
                <button className="pokedex-btn blue"></button>
                <button className="pokedex-btn green"></button>
              </div>
              <div className="directional-pad">
                <div className="d-pad-vertical"></div>
                <div className="d-pad-horizontal"></div>
                <div className="d-pad-center"></div>
              </div>
            </div>
          </div>

          {/* LCD Info Panel */}
          <div className="info-panel">
            <div className="lcd-screen">
              {selectedPokemon && getSafeTypes(selectedPokemon).length > 0 ? (
                <div className="pokemon-stats">
                  <div className="stat-row">
                    <span className="stat-label">TYPE:</span>
                    <span className="stat-value">
                      {getSafeTypes(selectedPokemon).map(type => 
                        formatPokemonType(type.type?.name || type)
                      ).join('/')}
                    </span>
                  </div>
                  {selectedPokemon.height && (
                    <div className="stat-row">
                      <span className="stat-label">HEIGHT:</span>
                      <span className="stat-value">{(selectedPokemon.height / 10).toFixed(1)}m</span>
                    </div>
                  )}
                  {selectedPokemon.weight && (
                    <div className="stat-row">
                      <span className="stat-label">WEIGHT:</span>
                      <span className="stat-value">{(selectedPokemon.weight / 10).toFixed(1)}kg</span>
                    </div>
                  )}
                  
                  {getSafeStats(selectedPokemon).length > 0 && (
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
                  )}
                </div>
              ) : (
                <div className="no-data">NO DATA</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleCancel} className="action-btn cancel-btn">
              CANCEL
            </button>
            <button 
              onClick={handleConfirm} 
              className="action-btn confirm-btn"
              disabled={!selectedPokemon}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;