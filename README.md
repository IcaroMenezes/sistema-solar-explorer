# Sistema Solar Explorer

Um sistema web interativo para explorar e aprender sobre os planetas do sistema solar, com funcionalidades de autenticação e gerenciamento de planetas.

## 🚀 Funcionalidades

- **Exploração de Planetas**
  - Visualização detalhada de todos os planetas do sistema solar
  - Dados sobre diâmetro, temperatura, rotação, translação e satélites

- **Autenticação de Usuários**
  - Registro e login de usuários
  - Proteção de rotas com JWT
  - Interface moderna e intuitiva

- **Gerenciamento de Planetas**
  - Adição de novos planetas
  - Visualização detalhada de cada planeta

## 🛠️ Tecnologias Utilizadas

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-solar-explorer.git
cd sistema-solar-explorer
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd ../frontend
npm install
```

4. Configure as variáveis de ambiente:

No diretório `backend`, crie um arquivo `.env`:
```env
PORT=3000
MONGODB_URI=sua_uri_mongodb
JWT_SECRET=seu_secret_jwt
```

No diretório `frontend`, crie um arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Executando o Projeto

1. Popule o banco de dados com os planetas do sistema solar:
```bash
cd backend
npm run populate
```

2. Inicie o servidor backend:
```bash
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```


## 📝 Uso

1. Acesse `http://localhost:8080` no seu navegador
2. Registre-se ou faça login
3. Explore os planetas do sistema solar
4. Adicione novos planetas (opcional)
5. Visualize detalhes de cada planeta

## 🌟 Características

- Design moderno e responsivo
- Interface intuitiva e fácil de usar
- Sistema de autenticação seguro
- Banco de dados populado com planetas do sistema solar

## 📧 Contato

Icaro Menezes - icarod.menezes@gmail.com

Link do Projeto: https://github.com/seu-usuario/sistema-solar-explorer