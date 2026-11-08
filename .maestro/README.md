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
| `05-validacao-formulario-alerta.yaml` | E2E-05 | Validação de obrigatoriedade de campos e comportamento do botão Salvar. |

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

### Execução de Todos os Fluxos
Para rodar toda a suíte de testes E2E sequencialmente:
```bash
maestro test .maestro/
```

### Execução de um Fluxo Individual
```bash
maestro test .maestro/01-visualizar-criptomoedas.yaml
maestro test .maestro/02-conversao-criptomoeda.yaml
maestro test .maestro/03-criar-alerta-preco.yaml
maestro test .maestro/04-excluir-alerta-preco.yaml
```

### Executando com AppId Customizado (ex: Expo Go)
Caso esteja executando via Expo Go em vez do APK nativo:
```bash
maestro test -e APP_ID=host.exp.exponent .maestro/01-visualizar-criptomoedas.yaml
```

---

## 📹 Gravação de Vídeos e Capturas de Tela

O Maestro possui suporte integrado para gravação de tela durante a execução dos testes:

### Gravação de Vídeo (.mp4)
Para gerar uma gravação em vídeo de um fluxo em execução:
```bash
maestro record .maestro/03-criar-alerta-preco.yaml
```
O arquivo de vídeo (`.mp4`) será salvo no diretório corrente, pronto para ser anexado à entrega ou documentação.

### Captura de Telas (Screenshots)
Você pode adicionar o comando `- takeScreenshot: evidencias/nome_da_tela` dentro de qualquer fluxo ou inspecionar elementos interativamente com:
```bash
maestro studio
```
