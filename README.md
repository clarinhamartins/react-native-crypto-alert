# 📈 Crypto Alert

Aplicativo em [Expo](https://expo.dev) / React Native para acompanhar preços de
criptomoedas e criar alertas de preço ("avise-me quando o Bitcoin passar de X").
Este repositório contém, além do app, uma suíte de **testes automatizados** criada
como atividade da disciplina de Engenharia de Software III, cobrindo regras de
negócio, componentes visuais, um hook com efeitos assíncronos e um fluxo completo
de uso real do app.

---

## 🧪 Testes automatizados

### 1. Instalar as dependências

```bash
npm install
```

### 2. Executar os testes

```bash
npm test
```

Também disponível em modo watch, útil durante o desenvolvimento:

```bash
npm run test:watch
```

### 3. Gerar o relatório de cobertura

```bash
npm run test:coverage
```

O comando imprime a tabela de cobertura no terminal e gera um relatório navegável em
`coverage/lcov-report/index.html` (pasta ignorada pelo git, pois é conteúdo gerado).
Um resumo em texto da última execução fica salvo em
[`coverage-summary.txt`](./coverage-summary.txt), já versionado no repositório.

### 4. O que foi testado e por quê

| Camada | Arquivo | O que é validado |
|---|---|---|
| **Funções puras / regras de negócio** | [`src/utils/__tests__/formatters.test.ts`](./src/utils/__tests__/formatters.test.ts) | `formatPrice` e `formatChange`: formatação padrão, casos de limite (zero, valor negativo) e arredondamento de casas decimais. |
| **Componente visual 1** | [`src/components/CryptoCard/__tests__/CryptoCard.test.tsx`](./src/components/CryptoCard/__tests__/CryptoCard.test.tsx) | Renderização de nome, símbolo, preço e variação da moeda; exibição condicional do badge de alertas (singular/plural); expandir/recolher a lista de alertas ao tocar no badge. |
| **Componente visual 2** | [`src/components/AlertCard/__tests__/AlertCard.test.tsx`](./src/components/AlertCard/__tests__/AlertCard.test.tsx) | Renderização da moeda, condição (`acima`/`abaixo`) e preço-alvo formatado; chamada de `onDelete` com o `id` correto ao tocar no botão de excluir. |
| **Hook** | [`src/context/AlertProvider/__tests__/useAlertProvider.test.tsx`](./src/context/AlertProvider/__tests__/useAlertProvider.test.tsx) | Estado inicial (`alerts` vazio), hidratação assíncrona a partir do `AsyncStorage` (mockado) via `waitFor`, criação (`addAlert`) com geração de `id`/`createdAt`, remoção (`deleteAlert`) e persistência automática no armazenamento após mudanças de estado. |
| **Fluxo completo (E2E)** | [`src/screens/CreateAlertScreen/__tests__/CreateAlertFlow.test.tsx`](./src/screens/CreateAlertScreen/__tests__/CreateAlertFlow.test.tsx) | Renderiza `CreateAlertScreen` e `PriceAlertsScreen` juntas, sob o mesmo `AlertProvider` real. Simula: abrir o seletor de criptomoeda, escolher "Bitcoin", digitar o preço-alvo, escolher a condição "abaixo de", tocar em "Save Alert" e verificar que o alerta criado aparece de fato na listagem (saindo do estado "No alerts yet"). Também valida que o botão de salvar permanece desabilitado com o formulário incompleto. |

### 5. Mocks: apenas nos limites externos

Para manter os testes realistas, **só foram mockadas as dependências externas**:

- `@react-native-async-storage/async-storage` — biblioteca nativa de armazenamento local, mockada com o mock oficial da própria lib (`async-storage/jest/async-storage-mock`).
- `expo-router` — usado apenas para navegação (`router.replace/push/back`), mockado no teste de fluxo completo.

Componentes, hooks, contexto (`AlertProvider`) e regras de formatação envolvidos no
comportamento testado permanecem **reais**, sem simulação.

### 6. Boas práticas seguidas

- Consultas semânticas da RNTL (`getByText`, `getByRole`, `getByPlaceholderText`)
  antes de recorrer a `testID`.
- Nenhum `setTimeout` para esperar atualização de estado — uso de `waitFor` sempre
  que há comportamento assíncrono (hidratação do AsyncStorage, submissão do formulário).
- Nenhuma chamada real a API, banco de dados ou armazenamento do dispositivo durante
  os testes.
- Cada teste tem nome descritivo explicando o comportamento verificado.
- Testes adicionados em commits progressivos (configuração → unitários → componentes
  → hook → fluxo completo → documentação), não em um único commit monolítico.

### 7. Resultado da cobertura (última execução)

```
-------------------------------|---------|----------|---------|---------|
File                           | % Stmts | % Branch | % Funcs | % Lines |
-------------------------------|---------|----------|---------|---------|
All files                      |   59.14 |    51.57 |   63.33 |   59.62 |
 components/AlertCard          |     100 |      100 |     100 |     100 |
 components/ConditionOptionRow |     100 |      100 |     100 |     100 |
 components/CryptoCard         |   93.75 |    76.19 |     100 |     100 |
 context/AlertProvider         |   97.22 |       80 |   93.33 |   96.77 |
 screens/CreateAlertScreen     |   81.81 |       65 |    87.5 |    86.2 |
 screens/PriceAlertsScreen     |    87.5 |      100 |      80 |    87.5 |
 utils                         |     100 |      100 |     100 |     100 |
-------------------------------|---------|----------|---------|---------|
Test Suites: 5 passed, 5 total
Tests:       23 passed, 23 total
```

✅ **Cobertura total de statements: 59.14%** — acima do mínimo de 50% exigido pela
atividade. Os arquivos diretamente cobertos pela suíte (regras de formatação,
`AlertCard`, `CryptoCard`, `useAlertProvider`, `CreateAlertScreen`,
`PriceAlertsScreen`) ficaram entre 81% e 100%. Telas fora do escopo desta entrega
(ex.: `ConversionScreen`, `CryptoListScreen`) aparecem com 0%, pois não fizeram
parte do objetivo da atividade.

Relatório completo em texto: [`coverage-summary.txt`](./coverage-summary.txt).
Relatório navegável (HTML, gerado localmente): `coverage/lcov-report/index.html`
após rodar `npm run test:coverage`.

---

## 🚀 Rodando o app

1. Instale as dependências:

   ```bash
   npm install
   ```

2. (Opcional) Configure a chave da API de criptomoedas em um arquivo `.env`, com
   base em [`.env.example`](./.env.example). A chave pode ser obtida em
   [coingecko.com](https://www.coingecko.com/).

3. Inicie o app:

   ```bash
   npx expo start
   ```

No terminal, você verá opções para abrir o app em:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

O código principal do app fica na pasta **src**, com rotas em `src/app` (file-based
routing do [expo-router](https://docs.expo.dev/router/introduction)).

## 📁 Estrutura relevante

```
src/
├── app/                  # rotas (expo-router)
├── components/           # componentes visuais reutilizáveis
├── context/AlertProvider/# estado global de alertas + persistência
├── data/                 # dados mockados de criptomoedas
├── screens/              # telas da aplicação
└── utils/                # formatadores e funções puras
```

## 🛠 Outros comandos úteis

- `npx expo lint` — roda o ESLint.
- `npm run reset-project` — reseta o projeto para o estado inicial do template Expo.

## 📚 Aprenda mais

- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [Testing Library para React Native](https://callstack.github.io/react-native-testing-library/)
