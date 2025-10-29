import { useState, useEffect } from 'react';
import { CacheService } from '../services/cacheService';
import './CacheStats.css';

const CacheStats = () => {
  const [cacheStats, setCacheStats] = useState(CacheService.getStats());

  useEffect(() => {
    // Atualizar stats quando o componente montar
    setCacheStats(CacheService.getStats());
  }, []);

  const clearCache = () => {
    CacheService.clearCache();
    setCacheStats(CacheService.getStats());
    // Force a re-render by triggering a state update in parent component
    window.location.reload();
  };

  const toggleCache = () => {
    const newState = !cacheStats.cacheEnabled;
    CacheService.setCacheEnabled(newState);
    setCacheStats(CacheService.getStats());
  };

  return (
    <div className="cache-stats">
      <h3>📊 Estatísticas de Cache</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total de solicitações:</span>
          <span className="stat-value">{cacheStats.totalRequests}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Cache hits:</span>
          <span className="stat-value">{cacheStats.cacheHits}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Taxa de acerto:</span>
          <span className="stat-value">
            {cacheStats.totalRequests > 0 
              ? `${((cacheStats.cacheHits / cacheStats.totalRequests) * 100).toFixed(1)}%`
              : '0%'
            }
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Itens em cache:</span>
          <span className="stat-value">{cacheStats.itemsInCache}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Cache:</span>
          <span className={`stat-value ${cacheStats.cacheEnabled ? 'cache-enabled' : 'cache-disabled'}`}>
            {cacheStats.cacheEnabled ? '✅ Habilitado' : '❌ Desabilitado'}
          </span>
        </div>
        {cacheStats.developmentMode && (
          <div className="stat-item">
            <span className="stat-label">Modo:</span>
            <span className="stat-value">🛠️ Desenvolvimento</span>
          </div>
        )}
      </div>
      
      <div className="cache-controls">
        {cacheStats.developmentMode && (
          <button 
            className={`toggle-cache-button ${cacheStats.cacheEnabled ? 'disable' : 'enable'}`} 
            onClick={toggleCache}
          >
            {cacheStats.cacheEnabled ? '❌ Desabilitar Cache' : '✅ Habilitar Cache'}
          </button>
        )}
        <button className="clear-cache-button" onClick={clearCache}>
          🗑️ Limpar Cache
        </button>
      </div>
    </div>
  );
};

export default CacheStats;