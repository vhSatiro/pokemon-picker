import React from 'react';
import { formatPokemonName, formatPokemonNumber, isImageUrl, getLocalPokemonImage, getLocalTypeImage } from '../utils/formatters';
import './PokemonTable.css';

const PokemonTable = React.forwardRef(({ 
  generations, 
  teamPositions, 
  selectedPokemon, 
  onCellClick 
}, ref) => {
  // Função para obter todos os tipos de uma geração
  const getGenerationTypes = (generation) => {
    const types = [];
    teamPositions.forEach(position => {
      const cellKey = `${generation}-${position}`;
      const pokemon = selectedPokemon[cellKey];
      if (pokemon && pokemon.types) {
        // Adicionar todos os tipos do Pokémon
        pokemon.types.forEach(type => {
          const typeName = type.type?.name || type;
          types.push(typeName);
        });
      }
    });
    return types;
  };

  return (
    <div className="table-container" ref={ref}>
      <div className="export-title">
        <h2>🏆 Meus Times Pokémon</h2>
        <p>Gerado em: {new Date().toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
      <table className="pokemon-table">
        <thead>
          <tr>
            <th className="generation-header">Geração</th>
            {teamPositions.map((position, index) => (
              <th key={index} className="position-header">{position}</th>
            ))}
            <th className="summary-header">Resumo de Tipos</th>
          </tr>
        </thead>
        <tbody>
          {generations.map((generation, rowIndex) => {
            const generationTypes = getGenerationTypes(generation);
            return (
              <tr key={rowIndex} className="generation-row">
                <td className="generation-cell">{generation}</td>
                {teamPositions.map((position, colIndex) => {
                  const cellKey = `${generation}-${position}`;
                  const isSelected = selectedPokemon[cellKey];
                  return (
                    <td 
                      key={colIndex} 
                      className={`pokemon-cell ${isSelected ? 'selected' : ''}`}
                      onClick={() => onCellClick(generation, position)}
                    >
                      <div className="pokemon-slot">
                        {isSelected ? (
                          <div className="pokemon-placeholder">
                            <img 
                              src={getLocalPokemonImage(isSelected.id)} 
                              alt={isSelected.name} 
                              className="pokemon-sprite-img"
                              onError={(e) => {
                                // Fallback para imagem da API se a local não existir
                                if (e.target.src.includes('Menu_HOME_')) {
                                  e.target.src = isSelected.sprite || isSelected.sprites?.front_default;
                                } else {
                                  e.target.style.display = 'none';
                                }
                              }}
                            />
                            <span className="pokemon-name">
                              <span className="cell-pokemon-number">
                                {formatPokemonNumber(isSelected.id)}
                              </span>
                              {formatPokemonName(isSelected.name)}
                            </span>
                          </div>
                        ) : (
                          <div className="empty-slot">
                            <span className="plus-icon">+</span>
                            <span className="add-text">Adicionar</span>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
                <td className="summary-cell">
                  <div className="type-summary">
                    {generationTypes.length > 0 ? (
                      <div className="type-sprites-container">
                        {generationTypes.map((typeName, index) => (
                          <img
                            key={`${typeName}-${index}`}
                            src={getLocalTypeImage(typeName)}
                            alt={typeName}
                            className="type-sprite"
                            title={typeName}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="empty-summary">-</div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

PokemonTable.displayName = 'PokemonTable';

export default PokemonTable;