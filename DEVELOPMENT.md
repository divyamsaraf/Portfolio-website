# Development Guide

Complete guide for developing and maintaining the portfolio website.

## Quick Start

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn
- Git
- Supabase account

### Setup Steps

1. Clone repository
```bash
git clone https://github.com/divyamsaraf/Portfolio-website.git
cd Portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure Supabase (see SUPABASE_SETUP.md)

5. Run development server
```bash
npm run dev
```

6. Open http://localhost:3000

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Project Structure

```
src/
├── components/
│   ├── sections/        - Page sections (Hero, About, etc)
│   ├── layout/          - Layout wrapper
│   ├── nav/             - Navigation components
│   ├── ErrorBoundary.tsx
│   └── ContactForm.tsx
├── pages/
│   ├── api/             - API routes
│   ├── admin/           - Admin dashboard
│   ├── projects/        - Project pages
│   └── [page].tsx       - Main pages
├── lib/
│   ├── types.ts         - Type definitions
│   ├── supabaseClient.ts
│   └── utils.ts
├── hooks/
│   ├── useFetch.ts
│   └── usePerformance.ts
├── context/
│   └── ThemeContext.tsx
├── styles/
│   └── globals.css
└── __tests__/           - Test files
```

## Environment Variables

Create `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
RESEND_API_KEY=your_resend_key (optional)
```

## Database Setup

See SUPABASE_SETUP.md for complete database setup instructions.

## Testing

Run tests with: `npm test`

Test coverage:
- API route tests (5 tests)
- Component tests (5 tests)
- Authentication tests
- Error handling tests

All tests passing: 10/10

## Code Style

- Use TypeScript strict mode
- Use functional components with hooks
- Use const for variables
- Use arrow functions
- Add JSDoc comments for complex functions
- Keep functions small and focused

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to GitHub
git push origin feature/feature-name

# Create pull request on GitHub
```

## Commit Convention

Format: `type(scope): subject`

Types:
- feat - New feature
- fix - Bug fix
- docs - Documentation
- style - Code style changes
- refactor - Code refactoring
- perf - Performance improvements
- test - Test additions
- chore - Build/dependency changes

Example:
```
feat(admin): add project management CRUD operations

- Implement create, read, update, delete for projects
- Add form validation and error handling
- Integrate with Supabase API
```

## Performance Targets

- Lighthouse Score: 90+
- First Load JS: ~173 kB
- Time to Interactive: <3s
- API Response Time: <100ms

## Security

- All environment variables are kept secret
- Row Level Security (RLS) is configured
- API routes validate input
- CORS is properly configured
- Security headers are set

## Troubleshooting

See TROUBLESHOOTING.md for common issues and solutions.

## Common Issues

### React Error #321
See TROUBLESHOOTING.md - useContext Error section

### Supabase 404/406 Errors
See SUPABASE_SETUP.md - ensure tables are created

### Environment Variables Not Loading
See TROUBLESHOOTING.md - Environment Variables section

## Performance Optimization Tips

1. Use Next.js Image component for images
2. Implement code splitting with dynamic imports
3. Use React.memo for expensive components
4. Optimize bundle size with webpack analysis
5. Use lazy loading for below-the-fold content
6. Implement route prefetching
7. Use CSS-in-JS sparingly

## Deployment

See DEPLOYMENT.md for complete deployment instructions.

## Useful Resources

- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- TailwindCSS Documentation: https://tailwindcss.com/docs
- React Documentation: https://react.dev
- TypeScript Documentation: https://www.typescriptlang.org/docs

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel, GitHub

## Completed Phases

- Phase 1: Project Setup & Structure ✓
- Phase 2: Core Components & Pages ✓
- Phase 3: Supabase Integration ✓
- Phase 4: Testing & Authentication ✓
- Phase 5: Frontend Data Fetching ✓
- Phase 6: UI/UX Polish ✓
- Phase 7: Performance Optimization ✓
- Phase 8: Deployment ✓

All phases completed successfully!

