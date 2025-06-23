# Medusa Store - Landing Page de Lista de Espera

Este é o repositório para a landing page da Medusa Store. O projeto consiste em uma página de captura para uma lista de espera, com o objetivo de coletar contatos de clientes interessados e engajá-los através de canais como WhatsApp e Instagram.

## Funcionalidades

- **Formulário de Lista de Espera:** Coleta o nome e o número de WhatsApp dos usuários.
- **Integração com Google Sheets:** Os dados submetidos no formulário são salvos automaticamente em uma planilha do Google Sheets em tempo real.
- **Contador de Inscritos:** Exibe dinamicamente o número de pessoas que já se inscreveram, buscando a contagem diretamente da planilha.
- **Design Moderno e Imersivo:** Interface com tema escuro, fontes estilizadas (Orbitron para títulos) e um fundo de vídeo para criar uma experiência de usuário atraente.
- **Botão Flutuante do WhatsApp:** Permite que os usuários iniciem uma conversa diretamente com a loja com uma mensagem pré-definida, facilitando o contato.
- **Botão para Instagram:** Promove o perfil da loja no Instagram com um efeito de gradiente interativo.
- **Totalmente Responsivo:** O layout se adapta perfeitamente a dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Inteligência Artificial:** [Genkit](https://firebase.google.com/docs/genkit) com o modelo Gemini do Google para a funcionalidade de geração de tagline (presente no código).
- **Armazenamento de Dados:** [Google Sheets API](https://developers.google.com/sheets/api)
- **Deployment:** Preparado para [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## Configuração do Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA>
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Para que a integração com o Google Sheets e Genkit funcione, você precisa configurar suas credenciais em um arquivo `.env`.

1. **Crie uma Planilha Google** com as colunas `Nome` e `WhatsApp` na primeira linha.
2. **Siga o guia de autenticação do Google** para [criar uma Conta de Serviço](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account) e baixe as credenciais em formato `.json`.
3. **Compartilhe sua planilha** com o `client_email` da Conta de Serviço (encontrado no arquivo `.json`) e dê a ele permissão de **Editor**.
4. **Crie um arquivo `.env`** na raiz do projeto e adicione as seguintes variáveis, preenchendo com os seus dados:

```env
# Google Sheets API Credentials
GOOGLE_SHEET_ID="COLE_O_ID_DA_SUA_PLANILHA_AQUI"
GOOGLE_SERVICE_ACCOUNT_EMAIL="seu-email-de-servico@....iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"

# Opcional: Google AI (Genkit)
# Obtenha sua chave na Google AI Studio: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY="SUA_API_KEY_DO_GOOGLE_AI"
```

> **Nota:** A `GOOGLE_PRIVATE_KEY` deve ser copiada do arquivo `.json` e as quebras de linha devem ser substituídas por `\n` para que o ambiente a leia corretamente.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver o resultado.
