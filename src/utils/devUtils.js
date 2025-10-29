// Development utilities for cache control
import { CacheService } from '../services/cacheService';

class DevUtils {
  static init() {
    // Apenas expor utilities em modo de desenvolvimento
    if (import.meta.env.DEV) {
      // Adicionar utilitários globais para o console
      window.pokemonDevUtils = {
        // Controle de cache
        disableCache: () => {
          CacheService.setCacheEnabled(false);
          console.log('🚫 Cache desabilitado para desenvolvimento');
        },
        
        enableCache: () => {
          CacheService.setCacheEnabled(true);
          console.log('✅ Cache habilitado');
        },
        
        toggleCache: () => {
          const current = CacheService.isCacheEnabled();
          CacheService.setCacheEnabled(!current);
          console.log(`🔄 Cache ${!current ? 'habilitado' : 'desabilitado'}`);
        },
        
        clearCache: () => {
          CacheService.clearCache();
          console.log('🗑️ Cache limpo');
        },
        
        getCacheStats: () => {
          const stats = CacheService.getStats();
          console.table(stats);
          return stats;
        },
        
        // Informações de ajuda
        help: () => {
          console.log(`
🛠️ Pokemon Picker - Utilitários de Desenvolvimento

Comandos disponíveis:
• pokemonDevUtils.disableCache()  - Desabilita o cache
• pokemonDevUtils.enableCache()   - Habilita o cache
• pokemonDevUtils.toggleCache()   - Alterna o estado do cache
• pokemonDevUtils.clearCache()    - Limpa todo o cache
• pokemonDevUtils.getCacheStats() - Mostra estatísticas do cache
• pokemonDevUtils.help()          - Mostra esta ajuda

Exemplo de uso:
pokemonDevUtils.disableCache(); // Desabilita cache para testes
// ... teste sua funcionalidade ...
pokemonDevUtils.enableCache();  // Reabilita cache
          `);
        }
      };
      
      console.log('🛠️ Modo de desenvolvimento detectado!');
      console.log('Digite "pokemonDevUtils.help()" no console para ver os comandos disponíveis.');
    }
  }
}

export default DevUtils;