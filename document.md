# Futuristic Dark Themed ToDo App — Instructions

**Goal:** Build a full‑stack ToDo webapp (Next.js app router, TypeScript) with a futuristic dark UI, using Prisma + PostgreSQL for persistence. Backend logic should use **Next.js Server Actions**. The app includes a landing page, login, and a dashboard showing the user's todos with create/delete functionality.

---

## High-level step-by-step instructions

### 1. Scaffold the project

- Create a new Next.js app with TypeScript and the app router enabled.
- Initialize Git for version control.

### 2. Install dependencies

- Add Prisma, PostgreSQL client, and JWT-related libraries.
- Add Tailwind CSS and configure PostCSS and Autoprefixer.

### 3. Configure Tailwind and global styles

- Enable dark mode and extend the theme with futuristic accent colors (e.g., neon cyan and purple).
- Add global CSS for gradients, background, and glass effect.

### 4. Set up Prisma schema

- Create `User` and `Todo` models with relations.
- Run Prisma generate and migrate commands.

### 5. Create utility files

- A reusable Prisma client file.
- Authentication helpers for signing and verifying JWT tokens.

### 6. Implement Server Actions

- `signIn`: authenticates/creates a user and sets an HttpOnly cookie with a JWT.
- `createTodo`: adds a todo for the logged-in user.
- `deleteTodo`: deletes a todo owned by the user.
- `logout`: clears the cookie.

### 7. Build UI pages

- **Landing page**: app name, product description, and a button to go to the login page.
- **Login page**: form with an email input that triggers `signIn`.
- **Dashboard page**: shows todos in a table (serial number, title, created time, delete button). Include a form to add todos and a logout button.

### 8. Styling guidelines

- Use a futuristic dark theme with gradients and neon glow effects.
- Apply glassmorphism for cards.
- Style buttons with hover glow and animations.
- Tables should have alternating rows with subtle highlights.

### 9. Environment variables

- Store PostgreSQL connection string and JWT secret in `.env`.
- Add `.env.example` for reference.

### 10. Add scripts and documentation

- Update `package.json` with Prisma and dev scripts.
- Write a `README.md` that explains setup (install, configure `.env`, run migrations, start dev server).

### 11. Deployment notes

- Use Vercel for frontend deployment.
- Use a hosted Postgres (Supabase, Railway, Neon, etc.).
- Add env variables in deployment settings.

### 12. Optional enhancements

- Add `completed` status for todos.
- Add small animations for row addition/deletion.
- Add filters or pagination.

---

## Deliverables expected

- Scaffolded Next.js app with Tailwind styling.
- Prisma schema with migrations applied.
- Server Actions for authentication and todos.
- Landing, login, and dashboard pages with styled UI.
- `README.md` with environment setup and usage instructions.

---

**End of instructions.**
