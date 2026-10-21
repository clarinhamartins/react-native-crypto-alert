# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Testes automatizados

### Instalar dependências

```bash
npm install
```

### Executar os testes

```bash
npm test
```

### Gerar o relatório de cobertura

```bash
npm run test:coverage
```

O relatório em HTML é gerado em `coverage/lcov-report/index.html` (pasta ignorada pelo
git). Um resumo em texto da última execução está disponível em
[`coverage-summary.txt`](./coverage-summary.txt).

### O que foi testado

- **Funções puras / regras de negócio** (`src/utils/__tests__/formatters.test.ts`):
  `formatPrice` e `formatChange`, cobrindo casos de sucesso, limites (zero, negativo)
  e arredondamento.
- **Componentes visuais** (`src/components/CryptoCard/__tests__` e
  `src/components/AlertCard/__tests__`): renderização de textos, formatação de preço,
  exibição condicional do badge de alertas, interação de expandir/colapsar e o botão
  de exclusão de alerta.
- **Hook** (`src/context/AlertProvider/__tests__/useAlertProvider.test.tsx`): estado
  inicial, hidratação assíncrona a partir do `AsyncStorage` (mockado), criação e
  remoção de alertas, e persistência no armazenamento local.
- **Fluxo completo** (`src/screens/CreateAlertScreen/__tests__/CreateAlertFlow.test.tsx`):
  renderiza `CreateAlertScreen` e `PriceAlertsScreen` sob o mesmo `AlertProvider` real,
  simula a seleção de criptomoeda, preenchimento do preço-alvo, escolha da condição e
  envio do formulário, validando que o alerta aparece na listagem. O `expo-router` é
  mockado por ser um limite externo de navegação.

Mocks usados apenas nos limites externos: `@react-native-async-storage/async-storage`
(biblioteca nativa de armazenamento) e `expo-router` (navegação). Hooks, componentes e
regras de negócio envolvidos permanecem reais nos testes.

### Resultado da cobertura (última execução)

```
All files                      |   59.14 |    51.57 |   63.33 |   59.62
 components/AlertCard          |     100 |      100 |     100 |     100
 components/ConditionOptionRow |     100 |      100 |     100 |     100
 components/CryptoCard         |   93.75 |    76.19 |     100 |     100
 context/AlertProvider         |   97.22 |       80 |   93.33 |   96.77
 screens/CreateAlertScreen     |   81.81 |       65 |    87.5 |    86.2
 screens/PriceAlertsScreen     |    87.5 |      100 |      80 |    87.5
 utils                         |     100 |      100 |     100 |     100
```

Cobertura total de statements: **59.14%**, acima do mínimo de 50% exigido pela
atividade. Ver [`coverage-summary.txt`](./coverage-summary.txt) para o relatório completo.
