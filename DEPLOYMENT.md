# Deployment Guide

This guide covers deploying the portfolio website to Vercel.

## Prerequisites

- GitHub account with repository pushed
- Vercel account (free tier available)
- Supabase project with environment variables

## Environment Variables

Before deployment, ensure these variables are set in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
RESEND_API_KEY=your_resend_api_key (optional)
SMTP_HOST=your_smtp_host (optional)
SMTP_PORT=your_smtp_port (optional)
SMTP_USER=your_smtp_user (optional)
SMTP_PASS=your_smtp_password (optional)
```

## Deployment Steps

### 1. Connect GitHub Repository

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and repository
4. Click "Import"

### 2. Configure Project

1. Set Project Name (e.g., "portfolio-website")
2. Select Framework: Next.js
3. Root Directory: ./ (default)
4. Click "Continue"

### 3. Add Environment Variables

1. In the "Environment Variables" section, add all required variables
2. Select which environments (Production, Preview, Development)
3. Click "Add"

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Once complete, you'll get a production URL

## Post-Deployment

### 1. Update DNS (Optional)

To use a custom domain:

1. Go to Vercel Project Settings > Domains
2. Add your custom domain
3. Update your domain registrar's DNS settings with Vercel's nameservers

### 2. Verify Deployment

- Check homepage loads correctly
- Test dark/light mode toggle
- Verify admin dashboard authentication
- Test contact form
- Check performance metrics

### 3. Monitor Performance

- Use Vercel Analytics dashboard
- Check Core Web Vitals
- Monitor API response times
- Review error logs

## Continuous Deployment

The project is configured for automatic deployment:

- Push to main branch triggers automatic deployment
- Preview deployments for pull requests
- Automatic rollback on failed builds

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure Node.js version is 18+
4. Check for TypeScript errors: `npm run build`

### Environment Variables Not Working

1. Verify variables are set in Vercel dashboard
2. Check variable names match exactly
3. Redeploy after adding variables
4. Use NEXT_PUBLIC_ prefix for client-side variables

### Database Connection Issues

1. Verify Supabase URL and keys are correct
2. Check Supabase project is active
3. Verify Row Level Security (RLS) policies
4. Check network access in Supabase settings

## Performance Optimization

The project includes:

- Static page generation (17 pages)
- Image optimization with AVIF/WebP
- Automatic code splitting
- CSS minification
- Security headers configured

Expected metrics:
- Lighthouse Score: 90+
- First Load JS: ~171 kB
- Time to Interactive: <3s

## Security Checklist

Before production:

- [ ] All environment variables set securely
- [ ] Supabase RLS policies configured
- [ ] Admin authentication working
- [ ] CORS properly configured
- [ ] Security headers enabled
- [ ] SSL certificate active
- [ ] Rate limiting configured
- [ ] Error logging enabled

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Project > Deployments
2. Find the deployment to rollback to
3. Click the three dots menu
4. Select "Promote to Production"

## Support

For issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Review Supabase documentation: https://supabase.com/docs
3. Check project logs in Vercel dashboard
4. Review browser console for client-side errors

