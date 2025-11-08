# Quick Start Guide

Get your portfolio website up and running in 5 minutes!

## 🚀 5-Minute Setup

### Step 1: Clone & Install (2 min)

```bash
# Clone the repository
git clone https://github.com/divyamsaraf/Portfolio-website.git
cd portfolio-website

# Install dependencies
npm install
```

### Step 2: Configure Environment (1 min)

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

### Step 3: Run Development Server (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Access Admin Dashboard (1 min)

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Sign in with Supabase
3. Start editing your portfolio!

## 📝 Essential Configuration

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your credentials from project settings
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

### Database Tables

Run these SQL queries in Supabase SQL editor:

```sql
-- Hero
CREATE TABLE hero (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_github TEXT,
  cta_resume TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- About
CREATE TABLE about (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Experience
CREATE TABLE experience (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  bullets TEXT[],
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  proficiency INTEGER,
  icon_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[],
  screenshot TEXT,
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Resume
CREATE TABLE resume (
  id BIGSERIAL PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Enable Row Level Security

```sql
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON hero FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON about FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON resume FOR SELECT USING (true);
```

## 🎨 Customization

### Update Social Links

Edit `src/config/social.ts`:

```typescript
export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    name: "GitHub",
    url: "https://github.com/YOUR_USERNAME",
    icon: "github",
    label: "Visit GitHub profile",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/YOUR_PROFILE",
    icon: "linkedin",
    label: "Visit LinkedIn profile",
  },
  // ... more links
};
```

### Update Site Name

Edit `src/constants/index.ts`:

```typescript
export const SITE_NAME = "Your Name";
export const SITE_DESCRIPTION = "Your professional description";
```

### Update Colors

Edit `tailwind.config.ts` to customize the color scheme.

## 📱 Admin Dashboard

### Access

- URL: `/admin`
- Authentication: Supabase email/password
- Admin Email: Set in `NEXT_PUBLIC_ADMIN_EMAIL`

### Features

| Tab | Purpose |
|-----|---------|
| Hero | Update intro section |
| About | Edit bio |
| Experience | Manage work history |
| Skills | Add/edit skills |
| Projects | Showcase projects |
| Resume | Upload resume |

## 🚢 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables
5. Click "Deploy"

### 3. Configure Domain

1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records
4. Wait for propagation

## 🧪 Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality
npm test             # Run tests
npm run type-check   # Check TypeScript
```

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment
- [IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md) - What's new
- [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) - Pre-launch checklist

## 🆘 Troubleshooting

### Port 3000 already in use

```bash
npm run dev -- -p 3001
```

### Supabase connection fails

- Verify URL and keys in `.env.local`
- Check RLS policies allow public read
- Ensure tables exist in database

### Build fails

```bash
rm -rf node_modules .next
npm install
npm run build
```

## 💡 Tips

- Use dark mode toggle to test both themes
- Check admin dashboard for content management
- Test on mobile devices
- Monitor performance with Lighthouse
- Keep dependencies updated

## 🎯 Next Steps

1. ✅ Set up Supabase
2. ✅ Configure environment variables
3. ✅ Run development server
4. ✅ Populate content via admin dashboard
5. ✅ Deploy to Vercel
6. ✅ Configure custom domain
7. ✅ Monitor analytics

## 📞 Need Help?

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Review [README.md](./README.md)
- Check browser console for errors
- Review Vercel deployment logs

---

**Happy coding! 🚀**

