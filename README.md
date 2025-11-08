# Professional Portfolio Website

A production-ready portfolio website built with Next.js 14, TypeScript, and Supabase.

Live Demo: https://portfolio-demo.vercel.app

## Features

- Modern responsive design with smooth animations
- Dark and light mode support
- Secure admin dashboard with authentication
- Real-time content management system
- Dynamic project showcase with live demos
- Resume download functionality
- Contact form with email notifications
- Optimized performance and SEO
- Type-safe codebase with TypeScript
- Production-ready security configuration

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript
- Styling: TailwindCSS, Framer Motion
- Backend: Supabase (PostgreSQL, Authentication, Storage)
- Email Service: Resend or Nodemailer
- Deployment: Vercel

## Project Structure

```
src/
├── components/
│   ├── sections/          - Reusable section components
│   ├── layout/            - Layout wrapper
│   ├── nav/               - Navigation components
│   ├── footer/            - Footer component
│   └── ContactForm.tsx    - Contact form
├── pages/
│   ├── api/               - API routes
│   │   └── admin/         - Admin CRUD endpoints
│   ├── admin/             - Admin dashboard
│   ├── projects/          - Projects pages
│   └── [page].tsx         - Main pages
├── lib/
│   ├── types.ts           - Type definitions
│   ├── supabaseClient.ts  - Supabase configuration
│   └── sendEmail.ts       - Email service
├── context/               - React context
├── data/                  - Static data files
└── styles/                - Global styles
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Run development server
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

## Admin Dashboard

Access the admin dashboard at /admin with Supabase authentication.

Features:
- Hero section editor
- About content editor
- Experience management
- Skills management
- Projects management
- Resume upload

## Performance

- Lighthouse Score: 90+
- First Load JS: ~171 kB
- Static Generation: 17 pages
- API Response Time: <100ms

## License

MIT License

---

Built by Divyam Saraf

