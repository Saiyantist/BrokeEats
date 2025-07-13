# BrokeEats
**Share what you eat. Even if you're broke.**

A recipe sharing app made with React and Laravel, for college students who want to save and share their favorite and budget-friendly meals.

Users can add their own recipes, edit and delete their own recipes, browse other recipes from other users, and favorite any recipe they like.

---

## 1. Development Process 🧑🏻‍💻
I used a full-stack architecture combining **Laravel 12** (API backend) and **React (Vite + shadcn/ui)** for the frontend, structured inside a monorepo. I followed a step-by-step agile-like approach, implementing features incrementally:

1. Set up Laravel API with Sanctum for authentication
2. Created a modern React frontend using TypeScript and shadcn/ui
3. Implemented core CRUD (create, read, update, delete) for recipes
4. Built a favorites system with real-time feedback and multi-user support
5. Added search, filter, tabs (All / My Recipes / Favorites), and pagination
6. Connected frontend to backend with secure auth-protected routes
7. Created test data for users and recipes.

### Challenges & How I Solved Them ⚠️
- **Controlled AI usage (Using AI tools)** I asked clarifying questions and reviewed every line before applying any AI-assisted suggestions to ensure the code matched my logic and goals.
- **Favorites per user** Instead of storing a simple `is_favorite` boolean, I used a many-to-many relationship (`recipe_user`) and computed `is_favorite` based on the logged-in user.
- **Clean UI structure** Managing state across components (e.g., toggling favorites or re-fetching recipes) was challenging but solved using `React Query` and custom hooks which were both something new to me.

---

## 2. Tools & Libraries 🛠️

### Frontend ⚛️
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [React Query (@tanstack/react-query)](https://tanstack.com/query)
- [Axios](https://axios-http.com/)
- [shadcn/ui](https://ui.shadcn.com/) — component system for fast, modern UI
- [Lucide Icons](https://lucide.dev/)

### Backend ⚙️
- [Laravel 12](https://laravel.com/)
- Sanctum for token-based authentication

### DevTools 🧰
- [GitHub Desktop App](https://github.com/apps/desktop) - for efficient version control (GUI)
- [TablePlus](https://tableplus.com/) - for efficient database management (GUI)
- [XAMPP](https://www.apachefriends.org/) - for local development
- [Notion](https://www.notion.com/) - my information storage companion, for light progress tracking and note-storing


### AI Tools Used 🤖
- **ChatGPT**: For the whole planning process to implementation until documentation. It specifically included planning the feature step-by-step, solving edge cases (e.g. favorite mechanism for multi-user support, toast notifications for UX).
- **Cursor**: Used inside my editor for autocompletion (TAB = ⚡), code generation, refactoring suggestions, generating functional comments. It helped most especially in the rapid development of this project.

---

## 3. External Resources

- [Laravel Sanctum Docs](https://laravel.com/docs/sanctum)
- [shadcn/ui components](https://ui.shadcn.com/docs/components)
- [Lucide Icons](https://lucide.dev/icons/)

---

## 4. Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed:

#### For Backend (Laravel):
- [PHP 8.2+](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/)

#### For Frontend (React):
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) — `npm` is used in this project
- [Vite](https://vitejs.dev/) (installed automatically)

### Backend ⚙️ (Laravel)
```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
composer install

# 3. Copy .env and paste the provided .env by me (.env will be provided upon submission via email)
cp .env.example .env

# 4. Set up database credentials inside .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=brokeeats
# DB_USERNAME=root
# DB_PASSWORD=

# 4. Generate app key
php artisan key:generate

# 5. Run migrations and seed the test data
php artisan migrate --seed

# 6. Serve the backend
php artisan serve

```

### Frontend ⚛️ (React)
```bash

# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

```

--- 

## User Guide
- Create a user via Register page
- Login to access features
- Add, edit, or delete your own recipes
- Use tabs to switch between 'All Recipes', 'My Recipes', and 'My Favorites'
- Use search and filters to find recipes quickly (searchable by ingredients and recipe name)
- Favorite other users’ recipes to track your favorite recipes in the 'My Favorites' tab