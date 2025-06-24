# Medusa Store - Landing Page de Lista de Espera

Este é o repositório para a landing page da Medusa Store. O projeto consiste em uma página de captura para uma lista de espera, com o objetivo de coletar contatos de clientes interessados e engajá-los através de canais como WhatsApp e Instagram.

## Funcionalidades

- **Formulário de Lista de Espera:** Coleta o nome e o número de WhatsApp dos usuários.
- **Integração com Firebase Firestore:** Os dados submetidos no formulário são salvos em tempo real no banco de dados Firestore do Firebase, garantindo segurança e escalabilidade.
- **Contador de Inscritos:** Exibe dinamicamente o número de pessoas que já se inscreveram, buscando a contagem diretamente do Firestore.
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
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
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

### 3. Configurar o Banco de Dados (Firebase Firestore)

Para que o formulário da lista de espera funcione, você precisa ativar o Firestore no seu projeto Firebase. É um processo muito mais simples que o anterior:

1.  Acesse o **[Console do Firebase](https://console.firebase.google.com/)** e selecione seu projeto.
2.  No menu lateral (seção "Build"), clique em **"Firestore Database"**.
3.  Clique em **"Criar banco de dados"**.
4.  Escolha iniciar no **Modo de produção** (Production mode) e clique em "Avançar".
5.  Selecione uma localização para seus dados (ex: `southamerica-east1` para São Paulo) e clique em **"Ativar"**.

**Pronto!** O aplicativo se conectará ao banco de dados automaticamente quando for publicado no Firebase. Nenhuma chave de API precisa ser manuseada no seu arquivo `.env` para esta funcionalidade.

### 4. Configurar Variáveis de Ambiente (Opcional)

Se você desejar usar a funcionalidade de geração de tagline com IA, precisará de uma chave de API do Google AI.

1.  Crie um arquivo chamado `.env` na raiz do seu projeto.
2.  Adicione sua chave de API:

```env
# Opcional: Google AI (Genkit)
# Obtenha sua chave na Google AI Studio: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY="SUA_API_KEY_DO_GOOGLE_AI"
```

### 5. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador para ver o resultado.
