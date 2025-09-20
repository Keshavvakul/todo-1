# 🚀 Futuristic ToDo App

A cutting-edge task management application built with Next.js 15, featuring a futuristic dark theme, neon accents, and seamless user experience.

## ✨ Features

- **Futuristic UI**: Glassmorphism design with neon glow effects
- **Secure Authentication**: JWT-based auth with HttpOnly cookies
- **Real-time Updates**: Server Actions with automatic cache revalidation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom futuristic theme
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database URL and secrets:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"
   JWT_SECRET="your-super-secret-jwt-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker run --name todo-postgres -e POSTGRES_DB=todo_app -e POSTGRES_USER=todo_user -e POSTGRES_PASSWORD=todo_password -p 5432:5432 -d postgres:15-alpine
   
   # Run migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set up production database**
   - Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)
   - Get your production PostgreSQL connection string

5. **Configure environment variables in Vercel**
   ```bash
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   ```

6. **Run database migrations in production**
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure environment variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   DATABASE_URL = your-production-postgresql-url
   JWT_SECRET = your-super-secret-jwt-key
   NEXTAUTH_URL = https://your-app-name.vercel.app
   NEXTAUTH_SECRET = your-nextauth-secret
   NODE_ENV = production
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

## 🗄️ Database Setup

### Production Database Options

1. **Neon (Recommended)**
   - Visit [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Supabase**
   - Visit [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Settings → Database
   - Copy the connection string

3. **Railway**
   - Visit [railway.app](https://railway.app)
   - Create a new PostgreSQL service
   - Copy the connection string

### Run Migrations

```bash
# Local development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | NextAuth secret | `your-nextauth-secret` |
| `NODE_ENV` | Environment | `production` |

## 📱 App Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── dashboard/         # Dashboard with todos
├── lib/                   # Utilities and actions
│   ├── auth.ts           # Authentication helpers
│   ├── prisma.ts         # Prisma client
│   └── actions/          # Server Actions
│       ├── auth.ts       # Auth actions
│       └── todos.ts      # Todo actions
└── prisma/
    ├── schema.prisma     # Database schema
    └── migrations/       # Database migrations
```

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css` to customize the futuristic theme:
- `--neon-cyan`: Primary neon color
- `--neon-purple`: Secondary neon color  
- `--neon-pink`: Accent neon color
- `--neon-green`: Success neon color

### Adding Features
- **Email verification**: Add email service integration
- **File uploads**: Add file storage for todo attachments
- **Categories**: Extend todo model with categories
- **Due dates**: Add date/time fields to todos
- **Sharing**: Add todo sharing functionality

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check your `DATABASE_URL` format
   - Ensure database is running and accessible
   - Verify network connectivity

2. **Build errors on Vercel**
   - Check environment variables are set
   - Ensure `postinstall` script runs `prisma generate`
   - Verify Node.js version compatibility

3. **Authentication issues**
   - Check JWT_SECRET is set
   - Verify cookie settings match domain
   - Ensure HTTPS in production

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, Prisma & PostgreSQL**