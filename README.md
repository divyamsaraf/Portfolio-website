# Portfolio Website

A modern, production-ready portfolio built with Next.js 14, React 18, TypeScript, and Supabase.

**Repository:** https://github.com/divyamsaraf/Portfolio-website

## ✨ Features

- 🎨 **Dark Mode** - Clean, modern dark theme
- ✨ **Smooth Animations** - Framer Motion animations
- 📱 **Fully Responsive** - Mobile-first design
- 🔐 **Secure Admin Dashboard** - Magic link authentication
- 📝 **Content Management** - Edit all sections live
- 📧 **Contact Form** - Email integration with Resend
- 🚀 **Production Ready** - Deployed on Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **Email**: Resend API
- **Deployment**: Vercel

## 🚀 Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Quick Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

## 📁 Project Structure

```
src/
├── components/      # React components
├── pages/          # Next.js pages and API routes
├── lib/            # Utilities and helpers
├── hooks/          # Custom React hooks
├── context/        # React context
└── styles/         # CSS files
```

## 📊 Admin Dashboard

Access at `/admin` with magic link authentication.

- **Hero**: Update title, subtitle, and roles
- **About**: Manage professional bio
- **Experience**: Add/edit work history
- **Skills**: Organize by category with proficiency (1-5)
- **Projects**: Showcase portfolio projects
- **Education**: Add degrees and institutions
- **Resume**: Upload PDF
- **Contact**: Manage collaboration roles

## 🔐 Security

- ✅ Magic link authentication (no passwords)
- ✅ Admin-only access via `admin_users` table
- ✅ Row Level Security (RLS) on database
- ✅ Environment variables for secrets
- ✅ Type-safe API routes

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Setup and deployment guide
- [SUPABASE_MIGRATIONS.sql](./SUPABASE_MIGRATIONS.sql) - Database schema
- [.env.example](./.env.example) - Environment variables template

## 📝 License

MIT License - see LICENSE file for details

