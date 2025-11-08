# Troubleshooting Guide

This guide covers common errors and how to fix them.

## React Error #321: useContext Error

### Error Message
```
Error: Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321
```

### Cause
Using hooks outside of a React component context or calling hooks conditionally.

### Solution
1. Ensure hooks are called at the top level of components
2. Don't call hooks inside loops, conditions, or nested functions
3. Check that hooks are imported correctly from React
4. Verify component is wrapped with necessary providers

### Example Fix
```typescript
// WRONG - calling hook inside useEffect
useEffect(() => {
  const router = useRouter(); // This will fail
}, []);

// CORRECT - call hook at component level
const router = useRouter();
useEffect(() => {
  // Use router here
}, [router]);
```

## Supabase 404 Error

### Error Message
```
Failed to load resource: the server responded with a status of 404
```

### Cause
- Table doesn't exist in Supabase
- Incorrect table name
- Database not initialized

### Solution
1. Go to Supabase dashboard
2. Check SQL Editor for table creation
3. Run SQL queries from SUPABASE_SETUP.md
4. Verify table names match exactly
5. Check RLS policies are enabled

## Supabase 406 Error

### Error Message
```
Failed to load resource: the server responded with a status of 406
```

### Cause
- Row Level Security (RLS) policy issue
- Missing read permissions
- Authentication header problem

### Solution
1. Go to Authentication > Policies
2. Enable RLS for the table
3. Add public read policy:
```sql
CREATE POLICY "Enable read access for all users" ON table_name
  FOR SELECT USING (true);
```
4. Verify policy is active

## Supabase 400 Error

### Error Message
```
Failed to load resource: the server responded with a status of 400
```

### Cause
- Invalid query syntax
- Missing required fields
- Incorrect column names

### Solution
1. Check query syntax in component
2. Verify column names match table schema
3. Test query in Supabase SQL Editor
4. Check for typos in field names

## Environment Variables Not Loading

### Error Message
```
Cannot read property 'url' of undefined
```

### Cause
- Environment variables not set
- Variables not prefixed with NEXT_PUBLIC_
- .env.local file not created

### Solution
1. Create .env.local file in project root
2. Add all required variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
```
3. Restart development server
4. Verify variables are accessible: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`

## Build Fails with TypeScript Errors

### Error Message
```
Type error: Property 'X' does not exist on type 'Y'
```

### Solution
1. Run `npm run build` to see full error
2. Check type definitions in src/lib/types.ts
3. Verify all imports are correct
4. Use `as any` as temporary fix (not recommended for production)
5. Add proper type definitions

## Dark Mode Not Working

### Error Message
Dark mode toggle doesn't change theme

### Solution
1. Check ThemeContext is wrapping app
2. Verify localStorage is enabled
3. Check CSS classes are applied correctly
4. Verify TailwindCSS dark mode is configured
5. Clear browser cache and localStorage

## Admin Dashboard Authentication Fails

### Error Message
```
Auth check failed: Error
```

### Solution
1. Verify Supabase authentication is enabled
2. Check redirect URLs in Supabase settings
3. Verify SUPABASE_SERVICE_ROLE_KEY is set
4. Check browser console for detailed error
5. Test with different email/password

## Images Not Loading

### Error Message
```
Failed to load image
```

### Solution
1. Check image URL is correct
2. Verify domain is added to next.config.js
3. Check image exists at URL
4. Verify CORS is configured
5. Use Next.js Image component for optimization

## API Routes Returning 500 Error

### Error Message
```
Internal Server Error
```

### Solution
1. Check server logs in terminal
2. Verify database connection
3. Check API route syntax
4. Verify request body format
5. Add error logging to API route

## Performance Issues

### Symptoms
- Slow page load
- High bundle size
- Laggy animations

### Solution
1. Run Lighthouse audit
2. Check bundle size: `npm run build`
3. Optimize images
4. Enable code splitting
5. Remove unused dependencies
6. Check for memory leaks in components

## CORS Errors

### Error Message
```
Access to XMLHttpRequest blocked by CORS policy
```

### Solution
1. Check Supabase CORS settings
2. Verify request headers
3. Check API route configuration
4. Add CORS headers to API routes:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
```

## Database Connection Issues

### Error Message
```
Connection refused
```

### Solution
1. Verify Supabase project is active
2. Check SUPABASE_URL is correct
3. Verify network connectivity
4. Check firewall settings
5. Test connection in Supabase dashboard

## Getting Help

1. Check browser console for detailed errors
2. Review server logs in terminal
3. Check Supabase dashboard for issues
4. Review SUPABASE_SETUP.md for configuration
5. Check GitHub issues for similar problems
6. Review Next.js documentation

## Common Commands

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run development server with verbose logging
npm run dev -- --debug

# Build with detailed output
npm run build -- --debug

# Run tests with coverage
npm test -- --coverage

# Check for TypeScript errors
npx tsc --noEmit

# Format code
npm run format

# Lint code
npm run lint
```

## Quick Fixes Checklist

- [ ] Restart development server
- [ ] Clear browser cache
- [ ] Clear node_modules and reinstall
- [ ] Check .env.local file
- [ ] Verify Supabase tables exist
- [ ] Check browser console for errors
- [ ] Verify all environment variables
- [ ] Check network tab in DevTools
- [ ] Review server logs
- [ ] Test in incognito mode

