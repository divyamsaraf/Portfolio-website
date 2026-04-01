import { render, screen, waitFor } from '@testing-library/react'
import AdminDashboard from '@/pages/admin/index'
import { useRouter } from 'next/router'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

jest.mock('@/hooks/useSupabaseAuth')
jest.mock('next/router')
jest.mock('@/pages/admin/components/HeroForm', () => function MockHeroForm() { return <div>Hero Form</div> })
jest.mock('@/pages/admin/components/AboutForm', () => function MockAboutForm() { return <div>About Form</div> })
jest.mock('@/pages/admin/components/ExperienceForm', () => function MockExperienceForm() { return <div>Experience Form</div> })
jest.mock('@/pages/admin/components/SkillsForm', () => function MockSkillsForm() { return <div>Skills Form</div> })
jest.mock('@/pages/admin/components/ProjectsForm', () => function MockProjectsForm() { return <div>Projects Form</div> })
jest.mock('@/pages/admin/components/ResumeForm', () => function MockResumeForm() { return <div>Resume Form</div> })

describe('Admin Dashboard', () => {
  const mockPush = jest.fn()
  const mockRouter = { push: mockPush, route: '/admin', pathname: '/admin', query: {}, asPath: '/admin' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('should display login screen if not authenticated', async () => {
    ;(useSupabaseAuth as jest.Mock).mockReturnValue({ user: null, loading: false })
    render(<AdminDashboard />)
    await waitFor(() => {
      expect(screen.getByText('Sign in to continue')).toBeInTheDocument()
    })
  })

  it('should display admin dashboard when authenticated', async () => {
    ;(useSupabaseAuth as jest.Mock).mockReturnValue({
      user: { email: 'admin@example.com' },
      loading: false,
      isAuthenticated: true
    })
    render(<AdminDashboard />)
    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
      expect(screen.getByText('admin@example.com')).toBeInTheDocument()
    })
  })

  it('should display logout button', async () => {
    ;(useSupabaseAuth as jest.Mock).mockReturnValue({
      user: { email: 'admin@example.com' },
      loading: false,
      isAuthenticated: true
    })
    render(<AdminDashboard />)
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })

  it('should render hero form by default', async () => {
    ;(useSupabaseAuth as jest.Mock).mockReturnValue({
      user: { email: 'admin@example.com' },
      loading: false,
      isAuthenticated: true
    })
    render(<AdminDashboard />)
    await waitFor(() => {
      expect(screen.getByText('Hero Form')).toBeInTheDocument()
    })
  })
})
