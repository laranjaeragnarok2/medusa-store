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

### 3. Configurar Variáveis de Ambiente (Credenciais do Google)

Para que a integração com o Google Sheets funcione, você precisa configurar suas credenciais. Siga este passo a passo detalhado:

#### Etapa 1: Criar uma Conta de Serviço no Google Cloud

1.  Acesse o [Console do Google Cloud](https://console.cloud.google.com/).
2.  Selecione seu projeto ou crie um novo.
3.  No menu de navegação, vá para **"IAM e Admin"** > **"Contas de Serviço"**.
4.  Clique em **"+ CRIAR CONTA de SERVIÇO"**.
5.  Dê um nome para a conta (ex: `sheets-updater`) e uma descrição. Clique em **"CRIAR E CONTINUAR"**.
6.  Na seção de permissões (papel), selecione **"Projeto"** > **"Editor"**. Clique em **"CONTINUAR"**.
7.  Pule a terceira etapa (conceder acesso aos usuários) e clique em **"CONCLUÍDO"**.

#### Etapa 2: Gerar uma Chave para a Conta de Serviço

1.  Na lista de contas de serviço, encontre a que você acabou de criar.
2.  Clique nos três pontos (ações) na coluna da direita e selecione **"Gerenciar chaves"**.
3.  Clique em **"ADICIONAR CHAVE"** > **"Criar nova chave"**.
4.  Selecione o tipo **JSON** e clique em **"CRIAR"**.
5.  Um arquivo `.json` será baixado para o seu computador. **Guarde este arquivo em um local seguro, ele contém suas credenciais.**

#### Etapa 3: Compartilhar a Planilha Google

1.  Abra o arquivo `.json` que você baixou. Você verá um campo chamado `"client_email"`. Copie este endereço de e-mail (algo como `...gserviceaccount.com`).
2.  Vá para a sua [Planilha Google](https://docs.google.com/spreadsheets/d/1nkIO_LJ0X1qsPrQlcUB9TI2t9ecOTYrVmM_3ARaINmM/).
3.  Clique em **"Compartilhar"** no canto superior direito.
4.  Cole o `"client_email"` no campo de adicionar pessoas e grupos.
5.  Garanta que a permissão seja de **Editor** e clique em **"Enviar"**.

#### Etapa 4: Configurar o Arquivo `.env`

1.  Crie um arquivo chamado `.env` na raiz do seu projeto.
2.  Abra o arquivo `.json` novamente.
3.  Copie e cole as informações nos campos correspondentes no arquivo `.env`:

```env
# Google Sheets API Credentials
# O ID da sua planilha já está aqui. Ele é extraído da URL.
GOOGLE_SHEET_ID="1nkIO_LJ0X1qsPrQlcUB9TI2t9ecOTYrVmM_3ARaINmM"

# Cole o valor do campo "client_email" do seu arquivo .json aqui.
GOOGLE_SERVICE_ACCOUNT_EMAIL="seu-email-de-servico@....iam.gserviceaccount.com"

# Cole o valor do campo "private_key" do seu arquivo .json aqui.
# IMPORTANTE: Mantenha as aspas e substitua as quebras de linha por "\n".
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI...\n-----END PRIVATE KEY-----\n"

# Opcional: Google AI (Genkit)
# Obtenha sua chave na Google AI Studio: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY="SUA_API_KEY_DO_GOOGLE_AI"
```

> **Nota:** A `GOOGLE_PRIVATE_KEY` deve ser copiada exatamente como está no arquivo `.json`, incluindo `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`. As quebras de linha `\n` dentro da chave precisam ser preservadas como texto `\n` dentro das aspas no arquivo `.env`.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver o resultado.
