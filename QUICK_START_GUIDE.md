# Quick Start Guide - Portfolio Website

## 🚀 Getting Started

### 1. **Clone & Install**
```bash
git clone https://github.com/divyamsaraf/Portfolio-website.git
cd Portfolio-website
npm install
```

### 2. **Setup Environment Variables**
Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Admin Dashboard
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### 3. **Setup Supabase Database**
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run SQL scripts from `SUPABASE_SETUP.md` in Supabase SQL Editor
4. Copy your URL and Anon Key to `.env.local`

### 4. **Run Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000`

---

## 📋 What's New

### ✨ Recent Enhancements

#### 1. **Navbar Icons** 🎨
- All navigation items now have emoji icons
- Icons display on desktop and mobile
- Smooth hover animations with gradient underline

#### 2. **Dynamic Hero Section** 🎯
- Rotating roles every 3 seconds
- Smooth fade animations between roles
- Roles: Full Stack Developer, Backend Engineer, Software Architect, Cloud Engineer, DevOps Specialist
- Fetches from Supabase `hero.roles` array

#### 3. **Improved UI/UX** ✨
- Better color gradients and shadows
- Enhanced animations throughout
- Improved hover effects
- Better visual hierarchy
- Professional theme system

#### 4. **Admin Dashboard** 🔐
- Password-protected access
- Default password: `admin123`
- Manage all portfolio content
- CRUD operations for all sections

---

## 🎯 Key Features

### Navigation
- 🏠 Home - Hero section
- 👤 About - About me section
- 💼 Experience - Work experience
- 🛠️ Skills - Technical skills
- 📁 Projects - Featured projects
- 📄 Resume - Download resume

### Admin Dashboard
Access at `/admin`
- **Hero Form** - Update name, subtitle, roles, links
- **About Form** - Update about section
- **Experience Form** - Add/edit work experience
- **Skills Form** - Manage technical skills
- **Projects Form** - Add/edit projects
- **Resume Form** - Upload resume

### Dynamic Content
All content is fetched from Supabase:
- Hero section (title, subtitle, roles)
- About section
- Experience entries
- Skills list
- Projects portfolio
- Resume file

---

## 🗄️ Database Tables

### Hero Table
```sql
- id (Primary Key)
- title (Your name)
- subtitle (Main tagline)
- roles (Array of rotating roles)
- cta_github (GitHub URL)
- cta_resume (Resume URL)
```

### Projects Table
```sql
- id (Primary Key)
- title (Project name)
- slug (URL-friendly ID)
- description (Short description)
- long_description (Detailed description)
- tech_stack (Array of technologies)
- tags (Array of tags)
- github_url (GitHub link)
- live_url (Live demo link)
- screenshot (Project image URL)
- featured (Boolean - show on homepage)
- date (Project date)
```

### Other Tables
- **About** - About section content
- **Experience** - Work experience entries
- **Skills** - Technical skills
- **Resume** - Resume file URL

---

## 🎨 Customization

### Change Admin Password
Edit `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_new_password
```

### Update Theme Colors
Edit `/src/config/theme.ts`:
```typescript
export const THEME_COLORS = {
  primary: { /* Your colors */ },
  secondary: { /* Your colors */ },
  // ...
}
```

### Add More Roles
In Supabase `hero` table, update the `roles` array:
```sql
UPDATE hero SET roles = ARRAY[
  'Full Stack Developer',
  'Backend Engineer',
  'Your Custom Role'
];
```

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel will auto-deploy
# Or manually deploy:
vercel
```

### Environment Variables on Vercel
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add all variables from `.env.local`

---

## 📞 Troubleshooting

### Admin Page Not Loading
- Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`
- Clear browser cache
- Try incognito mode

### Projects Not Showing
- Verify Supabase connection
- Check `projects` table exists
- Ensure RLS policies allow public read

### Animations Not Working
- Check Framer Motion is installed: `npm list framer-motion`
- Verify browser supports CSS animations
- Check dark mode toggle works

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📚 Documentation

- **SUPABASE_SETUP.md** - Database setup guide
- **ENHANCEMENTS_SUMMARY.md** - Recent improvements
- **README.md** - General documentation

---

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com)

---

**Last Updated:** 2025-11-08
**Status:** ✅ Production Ready

