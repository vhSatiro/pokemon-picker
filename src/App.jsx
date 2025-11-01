import { useState, useEffect, useRef } from 'react'
import './App.css'
import './styles/shared.css'
import { PokemonService } from './services/pokemonService'
import PokemonTable from './components/PokemonTable'
import PokemonModal from './components/PokemonModal'
import CacheStats from './components/CacheStats'
import ExportButton from './components/ExportButton'
import DevUtils from './utils/devUtils'

function App() {
  // Constante para a chave do localStorage
  const STORAGE_KEY = 'pokemon-picker-selections';

  // Ref para a tabela (para exportação)
  const tableRef = useRef(null);

  // Inicializar dev utilities
  useEffect(() => {
    DevUtils.init();
  }, []);

  // Carregar seleções salvas do localStorage
  const loadSavedSelections = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar seleções salvas:', error);
    }
    return {};
  };

  const [selectedPokemon, setSelectedPokemon] = useState(loadSavedSelections)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSelection, setCurrentSelection] = useState({ generation: '', position: '' })
  const [selectedInModal, setSelectedInModal] = useState(null)
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState(null)

  // Gerações de Pokémon
  const generations = Object.keys(PokemonService.generationMapping)

  // Posições do time
  const teamPositions = ['1', '2', '3', '4', '5', '6']

  // Salvar seleções no localStorage sempre que houver mudanças
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPokemon));
    } catch (error) {
      console.error('Erro ao salvar seleções:', error);
    }
  }, [selectedPokemon])

  const handleCellClick = async (generation, position) => {
    const key = `${generation}-${position}`
    if (selectedPokemon[key]) {
      // Se já tem Pokémon, remove
      const newSelected = { ...selectedPokemon }
      delete newSelected[key]
      setSelectedPokemon(newSelected)
    } else {
      // Abre modal para seleção de Pokémon
      setCurrentSelection({ generation, position })
      setSelectedInModal(null)
      setModalOpen(true)
      
      // Buscar lista de Pokémon da geração
      setLoading(true)
      setError(null)
      try {
        const list = await PokemonService.fetchPokemonList(generation)
        setPokemonList(list)
      } catch (err) {
        setError('Erro ao carregar lista de Pokémon. Tente novamente.')
        console.error('Erro ao buscar Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePokemonSelect = async (pokemon) => {
    try {
      setLoadingDetails(true)
      // Buscar detalhes completos apenas quando o Pokémon é selecionado
      const details = await PokemonService.fetchPokemonDetails(pokemon.id)
      if (details) {
        setSelectedInModal(details)
      } else {
        setSelectedInModal(pokemon) // Fallback para dados básicos
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes do Pokémon:', err)
      setSelectedInModal(pokemon) // Fallback
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleCloseModal = (confirmedPokemon = null) => {
    if (confirmedPokemon && currentSelection.generation && currentSelection.position) {
      // Confirmação de seleção
      const key = `${currentSelection.generation}-${currentSelection.position}`
      setSelectedPokemon({
        ...selectedPokemon,
        [key]: {
          ...confirmedPokemon,
          types: confirmedPokemon.type || confirmedPokemon.types // Normalizar propriedade types
        }
      })
    }
    
    // Fechar modal
    setModalOpen(false)
    setSelectedInModal(null)
    setCurrentSelection({ generation: '', position: '' })
    setLoadingDetails(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">🏆 Seletor de Times Pokémon</h1>
        <p className="subtitle">Monte seu time perfeito para cada geração!</p>
      </header>

      <main className="main-content">
        <ExportButton 
          tableRef={tableRef}
          disabled={Object.keys(selectedPokemon).length === 0}
        />

        <PokemonTable 
          ref={tableRef}
          generations={generations}
          teamPositions={teamPositions}
          selectedPokemon={selectedPokemon}
          onCellClick={handleCellClick}
        />

        <div className="stats-panel">
          <CacheStats />
          <div className="team-stats">
            <h3>📊 Estatísticas do Time</h3>
            <p>Times criados: {Object.keys(selectedPokemon).length}</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Feito com ❤️ para treinadores Pokémon</p>
      </footer>

      <PokemonModal 
        isOpen={modalOpen}
        selectedGeneration={currentSelection.generation}
        pokemonList={pokemonList}
        isLoading={loading}
        isLoadingDetails={loadingDetails}
        selectedPokemon={selectedInModal}
        onClose={handleCloseModal}
        onPokemonSelect={handlePokemonSelect}
      />
    </div>
  )
}

export default App
