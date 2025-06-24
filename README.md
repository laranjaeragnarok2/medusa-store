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

### 3. Configurar o Formspree

Para que o formulário funcione, você precisa de um "Form ID" do Formspree.

1.  **Crie uma Conta:** Acesse [formspree.io](https://formspree.io/) e crie uma conta gratuita.
2.  **Crie um Novo Formulário:** No painel do Formspree, clique em "+ New form". Dê um nome ao formulário (ex: "Lista de Espera Medusa") e clique em "Create Form".
3.  **Copie o Form ID:** Você será levado para a página de integração do seu novo formulário. A URL no seu navegador será algo como `https://formspree.io/f/{FORM_ID}`. O Form ID é essa sequência de letras e números aleatórios.
4.  **Atualize o Código:** Abra o arquivo `src/components/waitlist-form.tsx` no seu editor de código. Encontre a linha que diz `const [state, handleSubmit] = useForm('YOUR_FORM_ID_HERE');` e substitua `'YOUR_FORM_ID_HERE'` pelo ID que você copiou.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) no seu navegador. Agora, ao enviar um teste, você deverá receber um e-mail e ver o envio no seu painel do Formspree.

## Deployment (Publicação na Vercel)

Não é necessário configurar nenhuma variável de ambiente na Vercel! Como o Form ID já está no código, basta fazer o deploy do seu projeto e ele funcionará automaticamente.
