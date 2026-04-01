import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => {
  const useRouter = jest.fn()
  useRouter.mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  })
  return { useRouter }
})

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock Supabase
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      signOut: jest.fn(),
      signInWithPassword: jest.fn(),
    },
    from: jest.fn(),
  },
}))

// Set dummy environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://mock.supabase.co"
process.env.SUPABASE_SERVICE_ROLE_KEY = "mock-key"
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key"
