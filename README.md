# 🏥 Sistema de Gerenciamento de Pacientes e Diagnóstico de Escolise com IA (Ortho AI)

## 📌 Visão Geral

Este projeto é um **aplicativo WEB/Desktop desenvolvido em React Native (JavaScript)** para gerenciamento de pacientes e médicos, integrado a um sistema de Inteligência Artificial que analisa imagens de raio-x da coluna e determina a presença ou ausência de escoliose.

O objeto é fornecer uma solução prática para clínicas e hospitais, unindo **gestão de informações médicas** com **suporte diagnóstico inteligente**.

## 🚀 Funcionalidades

### 👤 Gestão de Usuários

- Cadastro, edição e exclusão de pacientes.
- Cadastro, edição e exclusão de médicos.
- Associação de pacientes a médicos responsáveis.

### 📂 Gestão Clínica

- Histórico de consultas e exames.
- Upload de imagens de raio-x diretamente pelo aplicativo.
- Armazenamento segurno dos dados médicos.

### 🤖 Inteligência Artificial

- Envio da imagem de raio-x para análise em um servidor de IA.
- Cálculo automatizado do **ângulo de Cobb** para detecção de escoliose.
- Retorno de resultado em formato de laudo automático (com probabilidade e grau de curvatura).

### 📊 Relatórios

- Histórico de exames por pacientes.
- Evolução do quadro clínico com comparativos de exames anteriores.
- Exportação de relatórios em PDF.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)

## 📱 Estrutura de Telas

- **Tela Inicial (Dashboard)** - Visão geral dos pacientes e exames recentes.
- **Pacientes/Médicos** - Cadastro, edição e histórico de cada paciente/médicos.
- **Upload de Raio-X** - Envio da imagem para a IA.
- **Histórico de Exames** - Resultados de diagnósticos anteriores.
- **Relatórios** - Visualização e exportação de laudos.

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js >= 18
- React Native

### Passos

```bash
  # Clone o repositório
  git clone https://github.com/enzolozano/ortho-ai-front.git

  # Acesse o diretório
  cd seu-repositório

  # Instale as dependências
  npm install

  # Execute no ambiente Desktop
  npm run dev
```

## 🔒 Segurança

- Criptografia de dados sensíveis
- Conformidade com **LGPD** (Brasil)
