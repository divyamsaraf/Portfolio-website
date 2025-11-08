import { render, screen, waitFor } from '@testing-library/react'
import AdminDashboard from '@/pages/admin/index'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

jest.mock('@/lib/supabaseClient')
jest.mock('next/router')
jest.mock('@/pages/admin/components/HeroForm', () => {
  return function MockHeroForm() {
    return <div>Hero Form</div>
  }
})
jest.mock('@/pages/admin/components/AboutForm', () => {
  return function MockAboutForm() {
    return <div>About Form</div>
  }
})
jest.mock('@/pages/admin/components/ExperienceForm', () => {
  return function MockExperienceForm() {
    return <div>Experience Form</div>
  }
})
jest.mock('@/pages/admin/components/SkillsForm', () => {
  return function MockSkillsForm() {
    return <div>Skills Form</div>
  }
})
jest.mock('@/pages/admin/components/ProjectsForm', () => {
  return function MockProjectsForm() {
    return <div>Projects Form</div>
  }
})
jest.mock('@/pages/admin/components/ResumeForm', () => {
  return function MockResumeForm() {
    return <div>Resume Form</div>
  }
})

describe('Admin Dashboard', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    route: '/admin',
    pathname: '/admin',
    query: {},
    asPath: '/admin',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('should redirect to home if not authenticated', async () => {
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
    })

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should display admin dashboard when authenticated', async () => {
    const mockUser = {
      id: '123',
      email: 'admin@example.com',
      user_metadata: {},
    }

    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: mockUser } },
    })

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
      expect(screen.getByText('admin@example.com')).toBeInTheDocument()
    })
  })

  it('should display logout button', async () => {
    const mockUser = {
      id: '123',
      email: 'admin@example.com',
      user_metadata: {},
    }

    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: mockUser } },
    })

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })

  it('should render hero form by default', async () => {
    const mockUser = {
      id: '123',
      email: 'admin@example.com',
      user_metadata: {},
    }

    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: mockUser } },
    })

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Hero Form')).toBeInTheDocument()
    })
  })

  it('should handle auth errors gracefully', async () => {
    ;(supabase.auth.getSession as jest.Mock).mockRejectedValue(
      new Error('Auth error')
    )

    render(<AdminDashboard />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})

