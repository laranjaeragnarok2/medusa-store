# Medusa Store - Landing Page de Lista de Espera

Este é o repositório para a landing page da Medusa Store. O projeto consiste em uma página de captura para uma lista de espera, com o objetivo de coletar contatos de clientes interessados e engajá-los através de canais como WhatsApp e Instagram.

## Funcionalidades

- **Formulário de Lista de Espera:** Coleta o nome e o número de WhatsApp dos usuários.
- **Integração com Firebase Firestore:** Os dados submetidos no formulário são salvos em tempo real no banco de dados Firestore do Firebase, garantindo segurança e escalabilidade.
- **Contador de Inscritos:** Exibe dinamicamente o número de pessoas que já se inscreveram, buscando a contagem diretamente do Firestore.
- **Design Moderno e Imersivo:** Interface com tema escuro, fontes estilizadas e um fundo de vídeo para criar uma experiência de usuário atraente.
- **Botão Flutuante do WhatsApp:** Permite que os usuários iniciem uma conversa diretamente com a loja com uma mensagem pré-definida, facilitando o contato.
- **Botão para Instagram:** Promove o perfil da loja no Instagram com um efeito de gradiente interativo.
- **Totalmente Responsivo:** O layout se adapta perfeitamente a dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Deployment:** Otimizado para plataformas como [Vercel](https://vercel.com/) e [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

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

### 3. Configurar Variáveis de Ambiente (Arquivo `.env`)

Para que o formulário e o contador funcionem, você precisa conectar o projeto ao Firebase.

1.  Acesse o **[Console do Firebase](https://console.firebase.google.com/)** e selecione seu projeto.
2.  Clique no ícone de engrenagem (Configurações do projeto) no canto superior esquerdo.
3.  Na aba **Geral**, role para baixo até a seção **"Seus apps"**.
4.  Selecione seu aplicativo da web (ou crie um se não houver).
5.  Escolha a opção **"Configuração"** (Config) para ver suas chaves de API.
6.  Crie um arquivo `.env` na raiz do projeto e copie os valores para ele, como no exemplo abaixo. Substitua `"seu-valor..."` pelos valores do seu projeto.

```env
# Firebase Client SDK Config
NEXT_PUBLIC_FIREBASE_API_KEY="seu-valor-da-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu-valor-do-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu-valor-do-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu-valor-do-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="seu-valor-do-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="seu-valor-do-app-id"
```

### 4. Configurar o Banco de Dados (Firebase Firestore)

1.  No **[Console do Firebase](https://console.firebase.google.com/)**, no menu lateral (seção "Build"), clique em **"Firestore Database"**.
2.  Clique em **"Criar banco de dados"**.
3.  Inicie no **Modo de produção** e clique em "Avançar".
4.  Selecione uma localização (ex: `southamerica-east1`) e clique em **"Ativar"**.

### 5. Configurar Regras de Segurança do Firestore

Para permitir que o formulário salve os dados, você precisa ajustar as regras de segurança.

1.  No seu banco de dados Firestore, clique na aba **"Regras"**.
2.  Substitua o conteúdo existente pelas regras abaixo e clique em **"Publicar"**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{documentId} {
      // Permite que qualquer um leia a contagem e se inscreva.
      allow list, create;
    }
  }
}
```

### 6. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver o resultado.

## Deployment (Publicação)

Para publicar seu site, recomendamos plataformas que oferecem integração contínua com repositórios Git:

- **[Vercel](https://vercel.com/):** É a plataforma dos criadores do Next.js. A integração é extremamente simples: crie uma conta, importe seu repositório do GitHub/GitLab/Bitbucket e a Vercel fará o build e o deploy automaticamente.
- **[Firebase App Hosting](https://firebase.google.com/docs/app-hosting):** Também é uma ótima opção, totalmente integrada com o ecossistema do Firebase.

Em ambos os casos, você poderá conectar seu próprio domínio personalizado.
