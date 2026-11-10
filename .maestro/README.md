# Suíte de Testes End-to-End com Maestro - Crypto Alert

Este diretório contém os fluxos de teste End-to-End (E2E) desenvolvidos para validação automatizada da aplicação **React Native Crypto Alert** utilizando o **Maestro**.

---

## 📁 Estrutura dos Fluxos

| Arquivo | Cenário | Descrição |
|---|---|---|
| `01-visualizar-criptomoedas.yaml` | E2E-01 | Inicialização do app, validação dos ativos principais (Bitcoin, Ethereum) e rolagem vertical na lista. |
| `02-conversao-criptomoeda.yaml` | E2E-02 | Navegação para aba Convert, inserção de montante, seleção de criptoativo e verificação do cálculo dinâmico. |
| `03-criar-alerta-preco.yaml` | E2E-03 | Navegação para Alerts, preenchimento do formulário no modal, seleção de condição e validação do card criado. |
| `04-excluir-alerta-preco.yaml` | E2E-04 | Exclusão de alerta via botão de lixeira acessível e validação da restauração do Empty State. |

---

## 🚀 Como Executar os Testes

### Pré-requisitos
1. Emulador Android ou Simulador iOS em execução com o aplicativo instalado.
2. CLI do Maestro instalada na máquina:
   - **Windows (PowerShell):**
     ```powershell
     powershell -ExecutionPolicy ByPass -c "irm https://get.maestro.mobile.dev | iex"
     ```
   - **Linux / macOS:**
     ```bash
     curl -fsSL "https://get.maestro.mobile.dev" | bash
     ```

### Execução no Expo Go (Android)
Para executar toda a suíte de testes diretamente no Expo Go:
```bash
npm run test:e2e:go
```
Ou individualmente:
```bash
maestro test -e APP_ID=host.exp.exponent .maestro/01-visualizar-criptomoedas.yaml
maestro test -e APP_ID=host.exp.exponent .maestro/02-conversao-criptomoeda.yaml
maestro test -e APP_ID=host.exp.exponent .maestro/03-criar-alerta-preco.yaml
maestro test -e APP_ID=host.exp.exponent .maestro/04-excluir-alerta-preco.yaml
```

### Execução no App Nativo (Development Build)
```bash
npm run test:e2e
# ou fluxo individual:
maestro test .maestro/01-visualizar-criptomoedas.yaml
```

---

## 📹 Gravação de Vídeos e Capturas de Tela

O Maestro possui suporte integrado para gravação de tela durante a execução dos testes:

### Gravação de Vídeo (.mp4) com Expo Go
Para gerar uma gravação em vídeo de um fluxo em execução:
```bash
maestro -e APP_ID=host.exp.exponent record .maestro/03-criar-alerta-preco.yaml
maestro -e APP_ID=host.exp.exponent record .maestro/02-conversao-criptomoeda.yaml
```
O arquivo de vídeo (`.mp4`) será salvo no diretório corrente, pronto para ser anexado à entrega ou documentação.

### Captura de Telas (Screenshots)
Você pode adicionar o comando `- takeScreenshot: evidencias/nome_da_tela` dentro de qualquer fluxo ou inspecionar elementos interativamente com:
```bash
maestro studio
```
