# Medusa Store - Landing Page de Lista de Espera

Este é o repositório para a landing page da Medusa Store. O projeto consiste em uma página de captura para uma lista de espera, com o objetivo de coletar contatos de clientes interessados e engajá-los através de canais como WhatsApp e Instagram.

## Funcionalidades

- **Formulário de Lista de Espera:** Coleta o nome e o número de WhatsApp dos usuários através do **Formspree**.
- **Notificações por Email:** Cada novo cadastro é enviado diretamente para o seu e-mail.
- **Painel de Controle:** O Formspree oferece um painel onde você pode ver todos os inscritos e exportá-los como CSV.
- **Design Moderno e Imersivo:** Interface com tema escuro, fontes estilizadas e um fundo de vídeo para criar uma experiência de usuário atraente.
- **Botão Flutuante do WhatsApp:** Permite que os usuários iniciem uma conversa diretamente com a loja com uma mensagem pré-definida.
- **Botão para Instagram:** Promove o perfil da loja no Instagram.
- **Totalmente Responsivo:** O layout se adapta perfeitamente a dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN UI](https://ui.shadcn.com/)
- **Serviço de Formulário:** [Formspree](https://formspree.io/)
- **Deployment:** Otimizado para plataformas como [Vercel](https://vercel.com/).

## Configuração do Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA>
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador. O projeto já está pré-configurado para enviar os dados do formulário para uma conta Formspree.

## Deployment (Publicação na Vercel)

Não é necessário configurar nenhuma variável de ambiente na Vercel! Como o Form ID já está no código, basta fazer o deploy do seu projeto e ele funcionará automaticamente.
