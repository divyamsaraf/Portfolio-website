# Contributing Guidelines

Thank you for your interest in contributing to this professional portfolio website. This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Git
- GitHub account
- Supabase account (for testing)

### Setup Development Environment

1. Fork the repository on GitHub

2. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   cd portfolio-website
   ```

3. Add upstream remote
   ```bash
   git remote add upstream https://github.com/original-owner/portfolio-website.git
   ```

4. Install dependencies
   ```bash
   npm install
   ```

5. Create environment file
   ```bash
   cp .env.example .env.local
   ```

6. Start development server
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout main
git pull upstream main
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update types in src/lib/types.ts if needed

### 3. Test Your Changes

```bash
npm run dev
npm run build
npm run type-check
```

### 4. Commit Your Changes

Follow the commit convention:

```bash
git add .
git commit -m "type(scope): subject

- Detailed explanation of changes
- List key modifications
- Reference related issues

Closes #123"
```

Commit Types:
- feat - New feature
- fix - Bug fix
- docs - Documentation
- style - Code style
- refactor - Code refactoring
- perf - Performance improvements
- test - Test additions
- chore - Build/dependency changes

### 5. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Fill in the PR template
4. Reference related issues
5. Submit for review

## Pull Request Guidelines

PR Title Format:
type(scope): brief description

PR Description Template:

Description
Brief description of changes

Type of Change
- New feature
- Bug fix
- Documentation update
- Performance improvement

Related Issues
Closes #123

Testing
- Tested locally
- No console errors
- Responsive design verified
- Dark mode tested

Checklist
- Code follows style guidelines
- Self-review completed
- Comments added for complex logic
- Documentation updated
- No new warnings generated
- Tests pass locally

## Code Style Guidelines

### TypeScript
- Use strict mode
- Avoid any types
- Use interfaces for object types
- Add JSDoc comments for functions

### React Components
- Use functional components
- Use hooks for state management
- Extract reusable logic to custom hooks
- Add prop types

### CSS/Tailwind
- Use Tailwind utility classes
- Avoid inline styles
- Use consistent spacing
- Follow mobile-first approach

## Testing

Manual Testing Checklist:
- Feature works as expected
- No console errors
- Responsive on mobile/tablet/desktop
- Dark mode works
- Accessibility verified
- Performance acceptable

Browser Testing:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Documentation

Update documentation for:
- New features
- API changes
- Configuration changes
- Breaking changes

## Reporting Bugs

Bug Report Template:

Description
Clear description of the bug

Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

Expected Behavior
What should happen

Actual Behavior
What actually happens

Environment
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/Safari
- Node version: 18/20

## Feature Requests

Feature Request Template:

Description
Clear description of the feature

Use Case
Why is this feature needed?

Proposed Solution
How should it work?

Alternatives
Other possible approaches

## Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update README if needed
- Add JSDoc comments

## Review Process

1. Automated Checks
   - TypeScript compilation
   - Linting
   - Build success

2. Code Review
   - Code quality
   - Style consistency
   - Performance impact
   - Security concerns

3. Testing
   - Manual testing
   - Edge cases
   - Browser compatibility

4. Approval
   - At least one approval required
   - All checks passing
   - No conflicts

## Merging

- Squash commits for cleaner history
- Use descriptive merge commit message
- Delete feature branch after merge

## Questions

- Check existing issues and PRs
- Read the README and DEVELOPMENT.md
- Ask in PR comments
- Create a discussion

## Thank You

Your contributions help make this project better for everyone!

---

Happy Contributing!

