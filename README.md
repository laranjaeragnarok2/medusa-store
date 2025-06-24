# Medusa Store - Landing Page de Lista de Espera

Este é o repositório para a landing page da Medusa Store. O projeto consiste em uma página de captura para uma lista de espera, com o objetivo de coletar contatos de clientes interessados e engajá-los através de canais como WhatsApp e Instagram.

## Funcionalidades

- **Formulário de Lista de Espera:** Coleta o nome e o número de WhatsApp dos usuários.
- **Integração com Firebase Firestore:** Os dados submetidos no formulário são salvos em tempo real no banco de dados Firestore do Firebase, garantindo segurança e escalabilidade.
- **Contador de Inscritos:** Exibe dinamicamente o número de pessoas que já se inscreveram, buscando a contagem diretamente do Firestore.
- **Download da Lista de Espera:** Gere e baixe um arquivo `.csv` com todos os inscritos acessando a rota `/api/download-waitlist` no seu domínio.
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

Para que a aplicação se conecte ao Firebase, você precisa configurar chaves tanto para o lado do cliente (navegador) quanto para o servidor (para o download da lista).

#### Variáveis do Cliente (para Formulário e Contador)

1.  Acesse o **[Console do Firebase](https://console.firebase.google.com/)** e selecione seu projeto.
2.  Clique no ícone de engrenagem (Configurações do projeto).
3.  Na aba **Geral**, role até **"Seus apps"** e selecione seu aplicativo da web.
4.  Escolha a opção **"Configuração"** (Config) para ver suas chaves.
5.  Crie um arquivo `.env` na raiz do projeto e copie os valores para ele, como no exemplo abaixo.

```env
# Firebase Client SDK Config
NEXT_PUBLIC_FIREBASE_API_KEY="seu-valor-da-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu-valor-do-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu-valor-do-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu-valor-do-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="seu-valor-do-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="seu-valor-do-app-id"
```

#### Variáveis do Servidor (para Download da Lista de Espera)

1.  No **[Console do Firebase](https://console.firebase.google.com/)**, vá para Configurações do projeto > **Contas de serviço**.
2.  Clique no botão **"Gerar nova chave privada"**. Um arquivo JSON será baixado.
3.  Abra o arquivo JSON. Você precisará dos valores de `project_id`, `client_email` e `private_key`.
4.  Adicione essas três chaves ao seu arquivo `.env`.

```env
# Firebase Admin SDK Config (para o servidor)
FIREBASE_PROJECT_ID="seu-project-id-do-arquivo-json"
FIREBASE_CLIENT_EMAIL="seu-client-email-do-arquivo-json"
FIREBASE_PRIVATE_KEY="sua-private-key-do-arquivo-json"
```
**Importante:** Ao copiar a `private_key`, certifique-se de que ela permaneça em uma única linha no arquivo `.env`.

### 4. Configurar o Banco de Dados (Firebase Firestore)

1.  No **[Console do Firebase](https://console.firebase.google.com/)**, vá para **"Firestore Database"**.
2.  Clique em **"Criar banco de dados"** no **Modo de produção**.
3.  Selecione uma localização e clique em **"Ativar"**.

### 5. Configurar Regras de Segurança do Firestore

1.  No seu banco de dados Firestore, clique na aba **"Regras"**.
2.  Substitua as regras existentes pelas seguintes e clique em **"Publicar"**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{documentId} {
      // Permite que qualquer um leia a contagem e se inscreva.
      allow list, create;
      // Permite que o servidor leia todos os dados.
      allow read: if request.auth.token.email == "<seu-client-email-do-arquivo-json>";
    }
  }
}
```
**Atenção:** Substitua `<seu-client-email-do-arquivo-json>` pelo mesmo `client_email` que você usou nas variáveis de ambiente.

### 6. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador.

## Deployment (Publicação)

Ao fazer o deploy em plataformas como **Vercel** ou **Firebase App Hosting**, lembre-se de configurar as mesmas variáveis de ambiente (`NEXT_PUBLIC_*` e `FIREBASE_*`) no painel de configurações do seu projeto na plataforma de hospedagem.
