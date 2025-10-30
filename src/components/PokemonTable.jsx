import { formatPokemonName, formatPokemonNumber, isImageUrl, getLocalPokemonImage } from '../utils/formatters';
import './PokemonTable.css';

const PokemonTable = ({ 
  generations, 
  teamPositions, 
  selectedPokemon, 
  onCellClick 
}) => {
  return (
    <div className="table-container">
      <table className="pokemon-table">
        <thead>
          <tr>
            <th className="generation-header">Geração</th>
            {teamPositions.map((position, index) => (
              <th key={index} className="position-header">{position}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generations.map((generation, rowIndex) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTable;