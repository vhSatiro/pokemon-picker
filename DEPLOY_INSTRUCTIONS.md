# 🚀 Instruções para Deploy no GitHub Pages

## 📋 Passo a Passo

### 1. Criar Repositório no GitHub

1. **Acesse** [github.com](https://github.com) e faça login
2. **Clique** no botão "New" (novo repositório)
3. **Configure o repositório:**
   - **Nome**: `pokemon-picker`
   - **Descrição**: `🏆 Seletor de Times Pokémon com Interface Pokédex Autêntica`
   - **Visibilidade**: Public (para GitHub Pages gratuito)
   - **NÃO** marque "Add a README file" (já temos um)
   - **NÃO** marque "Add .gitignore" (já temos um)
   - **NÃO** marque "Choose a license"

4. **Clique** "Create repository"

### 2. Conectar Repositório Local ao GitHub

No terminal, execute os comandos que o GitHub vai mostrar:

```bash
# Adicionar origin remoto (já configurado para vhSatiro)
git remote add origin https://github.com/vhSatiro/pokemon-picker.git

# Renomear branch para main (se necessário)
git branch -M master

# Fazer push do código
git push -u origin master
```

### 3. Configurar GitHub Pages

1. **Vá para o repositório** no GitHub
2. **Clique na aba "Settings"** (Configurações)
3. **No menu lateral**, clique em "Pages"
4. **Na seção "Source"**, selecione:
   - Source: **GitHub Actions**
5. **Salve as configurações**

### 4. Aguardar Deploy Automático

1. **Vá para a aba "Actions"** do repositório
2. **Aguarde** o workflow "Deploy to GitHub Pages" ser executado
3. **Se tudo der certo**, você verá um ✅ verde
4. **O site estará disponível** em: `https://vhSatiro.github.io/pokemon-picker/`

## 🔧 Configurações Já Incluídas

✅ **Workflow GitHub Actions**: `.github/workflows/deploy.yml`
✅ **Configuração Vite**: `vite.config.js` com `base: '/pokemon-picker/'`
✅ **Bypass Jekyll**: `public/.nojekyll`
✅ **Scripts NPM**: `package.json` com todos os comandos necessários

## 🌐 URL Final

Seu projeto estará acessível em:
```
https://vhSatiro.github.io/pokemon-picker/
```

## 🛠️ Deploy Manual (Alternativo)

Se preferir fazer deploy manual:

```bash
# Build do projeto
npm run build

# Instalar gh-pages (se não tiver)
npm install -g gh-pages

# Deploy manual
gh-pages -d dist
```

## 🔍 Troubleshooting

### ❌ Erro 404
- Verifique se o `base` no `vite.config.js` está correto
- Verifique se o repositório é público
- Aguarde alguns minutos para propagação

### ❌ Erro de Build
- Verifique os logs na aba Actions
- Confirme que todas as dependências estão no `package.json`
- Teste o build local: `npm run build`

### ❌ Erro de Permissão
- Vá em Settings > Actions > General
- Configure "Workflow permissions" para "Read and write permissions"

### ❌ Erro "Custom domain not properly formatted"
Este erro acontece quando o GitHub Pages tenta usar um domínio personalizado incorreto:

1. **Vá em Settings > Pages** do seu repositório
2. **Na seção "Custom domain"**, verifique se há algo escrito
3. **Se houver qualquer texto**, DELETE completamente o campo
4. **Deixe o campo "Custom domain" VAZIO**
5. **Clique "Save"**
6. **Aguarde alguns minutos** e tente acessar novamente

O site deve funcionar apenas com a URL padrão do GitHub Pages:
`https://vhSatiro.github.io/pokemon-picker/`

## 🎉 Sucesso!

Quando tudo estiver funcionando, você terá:
- ✅ Repositório Git organizado
- ✅ Deploy automático a cada push
- ✅ Site público acessível via GitHub Pages
- ✅ Interface Pokédx funcionando com dados da PokeAPI

**Parabéns! Seu Seletor de Times Pokémon está no ar! 🚀**