# Professional Portfolio Website

A production-ready, MAANG-level portfolio website built with Next.js 14, React 18, TypeScript, and Supabase. Features a modern, polished UI with professional animations, dark/light mode, and a comprehensive admin dashboard for content management.

**Live Demo:** 
**Repository:** https://github.com/divyamsaraf/Portfolio-website

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Professional, polished design suitable for senior engineers
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent preferences
- ✨ **Smooth Animations** - Framer Motion animations on sections, cards, and buttons
- 📱 **Fully Responsive** - Mobile-first design with perfect scaling
- ⚡ **Performance Optimized** - Lighthouse score 90+, optimized images and code splitting
- 🔍 **SEO Ready** - Meta tags, structured data, sitemap generation

### Backend & Admin
- 🔐 **Secure Admin Dashboard** - Supabase email/magic link authentication
- 📝 **Content Management** - Edit all 9 sections with live updates
- 🗄️ **Real-time Database** - PostgreSQL with Supabase for instant updates
- 📊 **Type-Safe** - Full TypeScript support with Zod validation
- 🔄 **Live Updates** - Changes reflect immediately without rebuild
- 👥 **Role-Based Access** - Admin-only authorization via admin_users table
- 🔐 **Row Level Security** - Public read, admin write policies

### Content Features (9 Sections)
- 🎯 **Hero Section** - Animated intro with social links and CTA buttons
- 👤 **About Section** - Professional bio with stats and animations
- 💼 **Experience Timeline** - Detailed work history with month/year dates
- 📁 **Projects Gallery** - With expandable descriptions and tech stack
- 🛠️ **Skills Showcase** - Organized by category with proficiency bars (1-5 scale)
- 🎓 **Education Timeline** - Institutions, degrees, GPA display (NEW)
- 📄 **Resume** - Large PDF preview with download (NEW)
- 🤝 **Collaboration** - Open source & partnership opportunities (NEW)
- 📧 **Contact Form** - Email integration with Resend
- ⬆️ **Go to Top Button** - Smooth scroll navigation (NEW)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | TailwindCSS, Framer Motion |
| **Backend** | Supabase (PostgreSQL, Auth, Storage) |
| **Validation** | Zod for runtime type checking |
| **Email** | Resend or Nodemailer |
| **Deployment** | Vercel with CI/CD |
| **Testing** | Jest, React Testing Library |

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/              - Page sections (Hero, About, Experience, Skills, Projects, Resume)
│   ├── SocialLinks.tsx        - Reusable social media links component
│   ├── nav/
│   │   └── Navbar.tsx         - Navigation with social links
│   ├── footer/
│   │   └── Footer.tsx         - Footer with social links and links
│   └── ContactForm.tsx        - Contact form component
├── pages/
│   ├── api/
│   │   ├── contact.ts         - Contact form endpoint
│   │   └── admin/             - Admin CRUD endpoints
│   ├── admin/
│   │   ├── index.tsx          - Admin dashboard
│   │   └── components/        - Admin form components
│   ├── resume.tsx             - Resume page
│   ├── index.tsx              - Homepage
│   └── _app.tsx               - App wrapper with providers
├── lib/
│   ├── types.ts               - TypeScript type definitions
│   ├── schemas.ts             - Zod validation schemas
│   ├── supabaseClient.ts      - Supabase client configuration
│   └── sendEmail.ts           - Email service integration
├── config/
│   └── social.ts              - Social media links configuration
├── constants/
│   └── index.ts               - Global constants and configuration
├── context/
│   └── ThemeContext.tsx       - Dark/light mode context
├── styles/
│   └── globals.css            - Global styles and Tailwind
└── public/
    └── assets/                - Images and static files
```

## 🎯 Key Components

### SocialLinks Component
Reusable component for displaying social media links with animations:
- GitHub, LinkedIn, Email, Twitter
- Configurable sizes (sm, md, lg)
- Framer Motion hover effects
- Used in Hero, Navbar, and Footer

### Admin Dashboard
Comprehensive content management system:
- Tab-based interface for different content types
- Real-time form validation
- Error handling and success notifications
- Responsive design for mobile admin access

### Section Components
- **Hero**: Animated intro with social links
- **About**: Professional bio with stats
- **Experience**: Timeline with current role badge
- **Skills**: Organized by category with proficiency bars
- **Projects**: Gallery with tech stack and links
- **Resume**: Download and preview

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (required by Supabase) - check with `node --version`
- **npm** 10+ package manager
- **Supabase** account (free tier available)
- **Vercel** account (for deployment)
- **Git** for version control
- **GitHub** account for repository

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/divyamsaraf/Portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create `.env.local` in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Email (for contact form)
   NEXT_PUBLIC_RESEND_API_KEY=your-resend-api-key
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com

   # Optional
   NEXT_PUBLIC_ENABLE_ANALYTICS=false
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Access admin dashboard**
   - Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Log in with your Supabase credentials

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run type-check   # Check TypeScript types
```

## 📊 Admin Dashboard

Access at `/admin` with Supabase authentication.

### Authentication Methods

1. **Email & Password** - Use Supabase auth credentials
2. **Magic Link** - Receive sign-in link via email (recommended)

### Features

| Feature | Description |
|---------|-------------|
| **Hero Editor** | Update title, subtitle, roles, and CTA links |
| **About Editor** | Manage professional bio with line breaks |
| **Experience Manager** | Add/edit/delete work experience with dates |
| **Skills Manager** | Organize skills by category with proficiency (1-5) |
| **Projects Manager** | Showcase projects with expandable descriptions |
| **Education Manager** | Add education history with GPA (NEW) |
| **Collaboration Manager** | Manage open source opportunities (NEW) |
| **Resume Upload** | Upload and manage resume file |

### Admin Access Setup

1. Create Supabase project
2. Run SQL migrations from `SUPABASE_MIGRATIONS.sql`
3. Add your email to `admin_users` table
4. Go to `/admin` and sign in
5. Make changes - they're live immediately!

## ⚡ Performance Metrics

| Metric | Score |
|--------|-------|
| **Lighthouse** | 90+ |
| **First Load JS** | ~171 kB |
| **Time to Interactive** | <2s |
| **API Response Time** | <100ms |
| **Static Pages** | 17 |
| **Dynamic Routes** | 5 |

## 🔐 Security Features

- ✅ Row Level Security (RLS) on all database tables
- ✅ Supabase authentication with email verification
- ✅ Environment variables for sensitive data
- ✅ Type-safe API routes with validation
- ✅ CORS configuration for API endpoints
- ✅ Rate limiting on contact form

## 🚢 Deployment

### Pre-Deployment Checklist

- ✅ Node.js 20+ installed locally
- ✅ Supabase project created
- ✅ Database migrations run (`SUPABASE_MIGRATIONS.sql`)
- ✅ Admin email added to `admin_users` table
- ✅ Environment variables configured
- ✅ Build passes: `npm run build`
- ✅ Lint passes: `npm run lint`

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Select this repository

3. **Configure Environment Variables**
   - Add all variables from `.env.local` to Vercel project settings:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_RESEND_API_KEY`
     - `NEXT_PUBLIC_CONTACT_EMAIL`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

### Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

### Documentation

For detailed deployment instructions, see:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Step-by-step guide
- [PRODUCTION_READY.md](./PRODUCTION_READY.md) - Production checklist
- [SUPABASE_MIGRATIONS.sql](./SUPABASE_MIGRATIONS.sql) - Database setup

## 🐛 Troubleshooting

### Build Issues

**Problem:** Build fails with TypeScript errors
```bash
# Solution: Check types
npm run type-check

# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Problem:** Environment variables not working
- Verify variables are set in `.env.local`
- Restart dev server after changes
- Check variable names match exactly

### Runtime Issues

**Problem:** Supabase connection fails
- Verify URL and keys are correct
- Check RLS policies allow public read
- Ensure tables exist in database
- Check browser console for CORS errors

**Problem:** Admin dashboard not accessible
- Verify Supabase authentication is configured
- Check email is in `NEXT_PUBLIC_ADMIN_EMAIL`
- Clear browser cache and cookies
- Try incognito/private mode

### Performance Issues

- Enable Vercel Analytics for insights
- Check Supabase query performance
- Optimize images (use WebP format)
- Enable caching headers
- Use CDN for static assets

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [PROJECT_AUDIT.md](./PROJECT_AUDIT.md) - Code audit and recommendations
- [.env.example](./.env.example) - Environment variables template

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Divyam Saraf**
- GitHub: [@divyamsaraf](https://github.com/divyamsaraf)
- LinkedIn: [Divyam Saraf](https://linkedin.com/in/divyam-saraf)
- Email: divyam@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Vercel for hosting and deployment
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling

---

**Made with ❤️ by Divyam Saraf**

⭐ If you found this helpful, please consider giving it a star!

