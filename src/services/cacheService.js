// Cache Service - Gerencia cache local e localStorage
export class CacheService {
  static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
  static DEVELOPMENT_MODE = import.meta.env.DEV || false; // Detecta se está em desenvolvimento
  static CACHE_ENABLED = true; // Controle manual do cache

  // Configurar se o cache está habilitado
  static setCacheEnabled(enabled) {
    this.CACHE_ENABLED = enabled;
    localStorage.setItem('pokemon_cache_enabled', enabled.toString());
    console.log(`Cache ${enabled ? 'habilitado' : 'desabilitado'}`);
  }

  // Verificar se o cache está habilitado
  static isCacheEnabled() {
    if (this.DEVELOPMENT_MODE) {
      // Em desenvolvimento, verifica configuração salva
      const saved = localStorage.getItem('pokemon_cache_enabled');
      if (saved !== null) {
        this.CACHE_ENABLED = saved === 'true';
      }
    }
    return this.CACHE_ENABLED;
  }

  static getCacheKey(type, identifier) {
    return `pokemon_${type}_${identifier}`;
  }

  static saveToCache(key, data) {
    if (!this.isCacheEnabled()) {
      console.log(`Cache desabilitado - não salvando: ${key}`);
      return;
    }

    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  static getFromCache(key) {
    if (!this.isCacheEnabled()) {
      console.log(`Cache desabilitado - não recuperando: ${key}`);
      return null;
    }

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > this.CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  }

  static clearCache() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('pokemon_')) {
        localStorage.removeItem(key);
      }
    });
  }

  static getCacheStats() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('pokemon_'));
    const listKeys = keys.filter(key => key.includes('_list_'));
    const detailKeys = keys.filter(key => key.includes('_details_'));
    
    return {
      totalCached: keys.length,
      listsCount: listKeys.length,
      detailsCount: detailKeys.length
    };
  }

  // Alias para getStats - usado pelo componente CacheStats
  static getStats() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('pokemon_'));
    
    // Contar requests e hits (simulado baseado no cache existente)
    const totalRequests = parseInt(localStorage.getItem('pokemon_total_requests') || '0');
    const cacheHits = parseInt(localStorage.getItem('pokemon_cache_hits') || '0');
    
    return {
      totalRequests,
      cacheHits,
      itemsInCache: keys.length,
      cacheEnabled: this.isCacheEnabled(),
      developmentMode: this.DEVELOPMENT_MODE
    };
  }

  // Incrementar contadores de estatísticas
  static incrementRequest() {
    const current = parseInt(localStorage.getItem('pokemon_total_requests') || '0');
    localStorage.setItem('pokemon_total_requests', (current + 1).toString());
  }

  static incrementCacheHit() {
    const current = parseInt(localStorage.getItem('pokemon_cache_hits') || '0');
    localStorage.setItem('pokemon_cache_hits', (current + 1).toString());
  }
}