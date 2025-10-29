# Organização dos Arquivos CSS

## Estrutura Atual

### 📁 `/src/App.css`
**Estilos Globais da Aplicação**
- Layout principal (.app)
- Header e título
- Rodapé
- Stats panel (container geral)
- Media queries globais

### 📁 `/src/styles/shared.css`
**Estilos Utilitários Compartilhados**
- Type colors (usado em múltiplos componentes)
- Loading states (spinner, error messages)
- Pokemon number styling
- Pokemon types display
- Animações globais (@keyframes)
- Media queries compartilhados

### 📁 `/src/components/PokemonTable.css`
**Estilos Específicos da Tabela de Pokémon**
- Table container e estrutura
- Pokemon cells e estados (hover, selected)
- Generation headers
- Empty slots e placeholders
- Sprites e imagens da tabela
- Cache indicators
- Responsive design da tabela

### 📁 `/src/components/PokemonModal.css`
**Estilos Específicos do Modal Pokédx**
- Modal overlay e container
- Design completo da Pokédex (header, lights, screens)
- Main screen e display do Pokémon
- Control panel e seletores
- Button panel e directional pad
- Info panel LCD
- Action buttons
- Animações específicas (scan, powerOn)
- Responsive design do modal

### 📁 `/src/components/CacheStats.css`
**Estilos Específicos do Painel de Cache**
- Cache stats container
- Stats grid e items
- Cache controls (buttons)
- Team stats
- Cache status indicators
- Responsive design dos controles

## Imports Atualizados

### App.jsx
```jsx
import './App.css'           // Estilos globais
import './styles/shared.css' // Estilos compartilhados
```

### PokemonTable.jsx
```jsx
import './PokemonTable.css'  // Estilos específicos da tabela
```

### PokemonModal.jsx
```jsx
import './PokemonModal.css'  // Estilos específicos do modal
```

### CacheStats.jsx
```jsx
import './CacheStats.css'    // Estilos específicos do cache
```

## Vantagens da Nova Organização

✅ **Modularidade**: Cada componente tem seus estilos isolados
✅ **Manutenibilidade**: Fácil localizar e modificar estilos específicos
✅ **Reutilização**: Estilos compartilhados em arquivo separado
✅ **Performance**: CSS mais focado em cada componente
✅ **Escalabilidade**: Fácil adicionar novos componentes
✅ **Legibilidade**: Código mais organizado e limpo

## Tipos de Estilos por Arquivo

- **Globais**: Layout geral, tipografia base, cores principais
- **Compartilhados**: Utilitários, type colors, loading states, animações
- **Específicos**: Funcionalidades únicas de cada componente