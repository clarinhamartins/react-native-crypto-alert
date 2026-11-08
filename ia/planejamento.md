# Planejamento de Testes E2E com IA Generativa - Crypto Alert

> **Documento:** Registro de Engenharia de Prompts, Respostas e Análise Crítica  
> **Aplicação:** React Native Crypto Alert  
> **Ferramenta de Automação:** Maestro

---

## 1. Prompt Utilizado

O seguinte prompt estruturado foi submetido à IA generativa para levantamento e estruturação dos cenários de teste E2E para a aplicação:

```text
Você é um especialista sênior em Engenharia de Software, Garantia da Qualidade (QA) e Automação de Testes Mobile.
Analise a aplicação mobile "React Native Crypto Alert", desenvolvida com Expo Router e TypeScript, que possui as seguintes funcionalidades e telas principais:
1. Aba "List" (Home): exibe a lista de criptomoedas com nome, código/ticker, cotação atual formatada em dólar e variação percentual de 24h.
2. Aba "Convert": conversor de moedas onde o usuário insere um montante numérico, seleciona a criptomoeda de origem em um seletor modal, seleciona a moeda fiduciária de destino (USD, EUR, BRL) e visualiza o resultado convertido calculado dinamicamente na tela.
3. Aba "Alerts" (Price Alerts): exibe os alertas de preço cadastrados ou uma tela vazia (Empty State) se não houver alertas. Possui botão para criar novo alerta ("New Alert" ou "Create Alert"), levando para a tela "Create Alert".
4. Tela "Create Alert": formulário contendo campo de seleção de criptomoeda (SelectField com modal), campo numérico de preço alvo ("Target Price (USD)"), seleção da condição de disparo ("Above target price" ou "Below target price") e botão "Save Alert" (que deve permanecer desabilitado se os dados forem inválidos ou incompletos).
5. Exclusão de alerta: no card de alerta da lista, o usuário pode tocar no ícone de lixeira para remover o alerta, retornando ao estado vazio caso seja o único.

Proponha uma suíte de cenários de teste End-to-End (E2E) estruturados para o Maestro (YAML). Para cada cenário, apresente:
- Identificador e Objetivo;
- Pré-condições;
- Passos de Execução do Usuário;
- Resultados Esperados / Oráculo de Teste (Asserções);
- Rascunho inicial do fluxo em formato Maestro YAML.
```

---

## 2. Resposta Original da IA Generativa

Abaixo está a íntegra da resposta fornecida pela IA generativa com base no prompt:

```markdown
### Suíte de Cenários de Testes E2E Sugerida para Crypto Alert

#### Cenário 1: Visualização da Listagem de Criptomoedas e Rolagem
- **Identificador:** E2E-01-CRYPTO-LIST
- **Objetivo:** Garantir que o aplicativo carrega a tela inicial com a lista de criptomoedas, exibindo as principais moedas e permitindo rolagem fluida.
- **Pré-condições:** Aplicativo instalado e aberto na tela inicial (aba "List").
- **Passos:**
  1. Abrir o aplicativo.
  2. Verificar se o título "Cryptocurrencies" está visível.
  3. Verificar se as moedas "Bitcoin" e "Ethereum" estão visíveis.
  4. Realizar rolagem para baixo (scroll) para carregar mais ativos da lista.
  5. Verificar se ativos adicionais (ex: "Solana" ou "Cardano") tornam-se visíveis.
- **Asserções:**
  - Título visível na tela inicial.
  - Cards de cotação presentes com valores monetários formatados.
- **Rascunho Maestro:**
```yaml
appId: com.cryptoalert
---
- launchApp
- assertVisible: "Cryptocurrencies"
- assertVisible: "Bitcoin"
- assertVisible: "Ethereum"
- scroll
- assertVisible: "Solana"
```

---

#### Cenário 2: Conversão de Criptomoeda para Moeda Fiduciária
- **Identificador:** E2E-02-CONVERT-CRYPTO
- **Objetivo:** Validar o cálculo e exibição do valor convertido a partir da inserção de quantidade e seleção de moedas.
- **Pré-condições:** Aplicativo aberto na aba "Convert".
- **Passos:**
  1. Tocar na aba "Convert" na barra de navegação inferior.
  2. Validar que o título "Convert Crypto" é exibido.
  3. Tocar no campo "Amount" e digitar "2".
  4. Tocar no seletor de criptomoeda e selecionar "Ethereum".
  5. Verificar se a caixa "Converted Amount" atualiza de "Enter an amount" para o valor convertido formatado.
- **Asserções:**
  - O valor convertido não deve mais exibir o placeholder "Enter an amount".
  - O resultado deve apresentar símbolo monetário e valor numérico compatível.
- **Rascunho Maestro:**
```yaml
appId: com.cryptoalert
---
- launchApp
- tapOn: "Convert"
- assertVisible: "Convert Crypto"
- tapOn:
    id: "amount_input"
- inputText: "2"
- tapOn: "Cryptocurrency"
- tapOn: "Ethereum"
- assertNotVisible: "Enter an amount"
- assertVisible:
    text: ".*\\$.*"
```

---

#### Cenário 3: Criação de Novo Alerta de Preço (Caminho Feliz)
- **Identificador:** E2E-03-CREATE-ALERT-SUCCESS
- **Objetivo:** Cadastrar com sucesso um alerta de preço com condição de alta e validar sua persistência e exibição na listagem de alertas.
- **Pré-condições:** Usuário na aba "Alerts".
- **Passos:**
  1. Tocar na aba "Alerts".
  2. Tocar no botão "New Alert" (ou "Create Alert" no empty state).
  3. Na tela "Create Alert", tocar no campo "Cryptocurrency" e escolher "Bitcoin".
  4. Tocar no campo "Target Price (USD)" e digitar "95000".
  5. Selecionar a opção de condição "Above target price".
  6. Tocar no botão "Save Alert".
  7. Verificar o redirecionamento de volta para a tela de lista de alertas.
  8. Validar a presença do card com "Bitcoin", "above" e "$95,000.00".
- **Asserções:**
  - Redirecionamento correto para "Price Alerts".
  - Card exibindo a criptomoeda, condição e valor formatado.
- **Rascunho Maestro:**
```yaml
appId: com.cryptoalert
---
- launchApp
- tapOn: "Alerts"
- tapOn: "New Alert"
- assertVisible: "Create Alert"
- tapOn: "Select cryptocurrency"
- tapOn: "Bitcoin"
- tapOn: "0.00"
- inputText: "95000"
- tapOn: "Above target price"
- tapOn: "Save Alert"
- assertVisible: "Price Alerts"
- assertVisible: "Bitcoin"
- assertVisible: "\\$95,000\\.00"
```

---

#### Cenário 4: Exclusão de Alerta de Preço e Retorno ao Empty State
- **Identificador:** E2E-04-DELETE-ALERT
- **Objetivo:** Excluir um alerta de preço existente na listagem e confirmar que a tela retorna ao estado de lista vazia.
- **Pré-condições:** Existência de pelo menos um alerta cadastrado na aba "Alerts".
- **Passos:**
  1. Acessar a aba "Alerts".
  2. Localizar o alerta existente na lista.
  3. Tocar no botão de exclusão (ícone de lixeira).
  4. Verificar que o card do alerta é removido.
  5. Verificar que a mensagem de Empty State "No alerts yet" e o botão "Create Alert" passam a ser exibidos.
- **Asserções:**
  - Desaparecimento do item excluído.
  - Exibição de "No alerts yet" e descrição de orientação.
- **Rascunho Maestro:**
```yaml
appId: com.cryptoalert
---
- launchApp
- tapOn: "Alerts"
- tapOn:
    id: "btn_delete_alert"
- assertVisible: "No alerts yet"
- assertVisible: "Create Alert"
```

---

#### Cenário 5: Validação de Campos Obrigatórios na Criação de Alerta
- **Identificador:** E2E-05-CREATE-ALERT-VALIDATION
- **Objetivo:** Verificar se o botão de salvar permanece inativo/desabilitado enquanto o formulário não for preenchido com dados válidos.
- **Passos:**
  1. Navegar até a tela de criação de alertas.
  2. Verificar que o botão "Save Alert" está desabilitado inicialmente.
  3. Preencher apenas a moeda, sem preço; verificar que o botão continua desabilitado.
  4. Inserir preço 0; verificar validação de erro.
```yaml
appId: com.cryptoalert
---
- launchApp
- tapOn: "Alerts"
- tapOn: "New Alert"
- assertVisible: "Save Alert"
```

---

#### Cenário 6: Notificação Push em Segundo Plano
- **Identificador:** E2E-06-PUSH-NOTIFICATION-TRIGGER
- **Objetivo:** Simular alteração de preço no mercado externo e validar o disparo de notificação push no sistema operacional do dispositivo quando o app estiver em segundo plano.
```

---

## 3. Cenários Selecionados

A partir da proposta inicial da IA, foram selecionados os **quatro fluxos principais** mais relevantes, coesos e que cobrem de ponta a ponta as funcionalidades centrais do Crypto Alert:

1. **Fluxo 1 (`01-visualizar-criptomoedas.yaml`):** Visualização e rolagem da lista de criptomoedas na aba inicial.
2. **Fluxo 2 (`02-conversao-criptomoeda.yaml`):** Conversão de valores entre criptomoeda e fiat currency com cálculo interativo.
3. **Fluxo 3 (`03-criar-alerta-preco.yaml`):** Criação de um novo alerta de preço com seleção via modal, preenchimento de valor e validação de persistência.
4. **Fluxo 4 (`04-excluir-alerta-preco.yaml`):** Exclusão de alerta de preço com verificação da remoção do card e restauração do Empty State.

---

## 4. Análise Crítica: O que foi Aproveitado, Corrigido ou Descartado

### 4.1. O que foi Aproveitado
- **Estrutura lógica dos fluxos:** A decomposição dos testes em quatro etapas operacionais (Listar -> Converter -> Criar Alerta -> Excluir Alerta) representou com precisão a jornada do usuário.
- **Critérios de oráculo e asserções:** O uso de asserções duplas (ex: validar tanto a transição de telas quanto o conteúdo textual renderizado, como `$95,000.00` e o título do alerta) foi integralmente mantido.
- **Dados de teste realistas:** O uso de moedas representativas ("Bitcoin", "Ethereum") e valores numéricos coerentes garantiu clareza nas asserções.

### 4.2. O que foi Corrigido (Refinamento Humano)
- **Correção de Seletores Alucinados:**
  - *Problema gerado pela IA:* No Cenário 2 e 4, a IA sugeriu seletores inexistentes como `id: "amount_input"` e `id: "btn_delete_alert"`. O código React Native original não declarava tais identificadores via `testID`.
  - *Correção aplicada:* No Cenário 2, usamos a combinação de texto visível e placeholder do campo (`placeholder: "0.00"` e `text: "Amount"`). No Cenário 4, identificamos que o botão de lixeira possui o seletor de acessibilidade padrão `accessibilityLabel: "Delete alert"` (em `AlertCard.tsx`), corrigindo o seletor no Maestro para:
    ```yaml
    - tapOn:
        accessibilityLabel: "Delete alert"
    ```
- **Ajuste na Interação com Modais (`SelectField`):**
  - *Problema gerado pela IA:* A IA assumiu que selecionar uma criptomoeda seria um clique direto em um dropdown padrão de sistema operacional.
  - *Correção aplicada:* No Crypto Alert, o componente `SelectField` abre um `Modal` customizado com fundo escurecido e uma lista `FlatList`. Foi necessário estruturar o fluxo para clicar no seletor, aguardar a abertura da janela modal, tocar na opção correspondente e garantir que o fechamento da modal retornou o foco à tela de formulário.
- **Tratamento do Teclado Numérico em Dispositivos Móveis:**
  - *Problema gerado pela IA:* A IA não inseriu comandos para ocultar o teclado virtual após digitar valores numéricos nos campos `TextInput`. No Android e iOS, o teclado numérico aberto pode encobrir o botão "Save Alert" ou a caixa de resultado da conversão.
  - *Correção aplicada:* Inclusão de comandos `hideKeyboard` no Maestro após o preenchimento de inputs numéricos.
- **Idempotência e Estado Prévio no Teste de Exclusão:**
  - *Problema gerado pela IA:* O Cenário 4 assumia que já existia um alerta pronto para ser excluído, o que geraria falha caso o teste fosse executado isoladamente ou com o armazenamento limpo.
  - *Correção aplicada:* O fluxo `04-excluir-alerta-preco.yaml` foi desenhado de forma autocontida e idempotente: ele cria um alerta temporário antes de acionar a exclusão, garantindo que o teste passe mesmo se executado em uma instalação limpa.

### 4.3. O que foi Descartado
- **Cenário 6 (Notificação Push em Segundo Plano):** Descartado pois a aplicação Crypto Alert é um projeto de demonstração educacional que mantém o estado de alertas em armazenamento local (`AsyncStorage`) e não possui serviço nativo de mensageria em nuvem (como Firebase Cloud Messaging ou Apple Push Notification service) configurado no código-fonte. Tentar simular push notification geraria um teste falso-positivo ou artificial.
- **Cenário de Perda Súbita de Conexão com Mock Dinâmico:** Descartado temporariamente do escopo E2E básico para priorizar a robustez e estabilidade dos 4 fluxos nucleares solicitados na especificação da atividade.
