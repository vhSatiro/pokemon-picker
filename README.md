# 🏆 Seletor de Times Pokémon

Uma aplicação React estática para criar e gerenciar times Pokémon para cada geração, otimizada para deploy no GitHub Pages.

## 🎮 Funcionalidades

- **Seleção por Geração**: Monte times para Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea, Hisui e outras gerações
- **Posições Estratégicas**: Organize seu time em 6 posições - Líder, Atacante, Defensor, Suporte, Especialista e Reserva
- **Interface Temática**: Design inspirado no universo Pokémon com cores vibrantes e animações
- **Totalmente Estático**: Funciona perfeitamente no GitHub Pages sem necessidade de servidor

## 🚀 Como Usar

1. **Clique nas células vazias** para adicionar Pokémon ao seu time
2. **Clique nas células preenchidas** para remover Pokémon
3. **Organize estrategicamente** cada posição do seu time
4. **Complete todas as gerações** para se tornar um Mestre Pokémon!

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18 ou superior
- npm

### Instalação
```bash
git clone https://github.com/seu-usuario/pokemon-picker.git
cd pokemon-picker
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Preview da build
```bash
npm run preview
```

## 🌐 Deploy no GitHub Pages

### Configuração Automática (Recomendado)

1. **Faça push do código** para o repositório GitHub
2. **Vá nas Configurações** do repositório
3. **Na seção Pages**, configure:
   - Source: "GitHub Actions"
4. **O deploy será automático** a cada push na branch main

### Deploy Manual
```bash
npm run deploy
```

### Configurações Importantes

- **Base Path**: Configurado em `vite.config.js` como `/pokemon-picker/`
- **GitHub Actions**: Workflow em `.github/workflows/deploy.yml`
- **Static Export**: Build gera arquivos estáticos na pasta `dist/`

## 🛠️ Tecnologias Utilizadas

- **React 19**: Biblioteca para interface de usuário
- **Vite**: Build tool e dev server
- **CSS3**: Estilização com gradientes e animações
- **GitHub Pages**: Hospedagem estática gratuita
- **GitHub Actions**: CI/CD para deploy automático

## 📁 Estrutura do Projeto

```
pokemon-picker/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions workflow
│   └── copilot-instructions.md # Instruções para Copilot
├── public/
│   └── .nojekyll              # Bypass Jekyll no GitHub Pages
├── src/
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos temáticos
│   └── main.jsx               # Entry point
├── package.json               # Dependências e scripts
├── vite.config.js            # Configuração do Vite
└── README.md                 # Esta documentação
```

## 🎨 Personalização

### Cores do Tema
As cores principais estão definidas no CSS e seguem a paleta Pokémon:
- **Primário**: Gradientes azul-roxo (`#667eea` → `#764ba2`)
- **Secundário**: Laranja-vermelho (`#ff6b6b` → `#ee5a24`)
- **Destaque**: Amarelo-laranja (`#ffd54f` → `#ffb74d`)

### Responsividade
A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela.

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).

## 🎯 Roadmap

- [ ] Integração com API de Pokémon
- [ ] Sistema de busca de Pokémon
- [ ] Salvar times no Local Storage
- [ ] Exportar times como imagem
- [ ] Modo escuro
- [ ] Informações detalhadas dos Pokémon
- [ ] Sistema de tipos e fraquezas

---

**Feito com ❤️ para treinadores Pokémon!**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
