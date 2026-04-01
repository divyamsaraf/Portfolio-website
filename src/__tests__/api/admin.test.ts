import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/admin/projects'

const mockFrom = jest.fn()

jest.mock('@/lib/supabaseAdmin', () => ({
  getSupabaseAdmin: jest.fn(() => ({
    from: mockFrom,
  })),
}))

jest.mock('@/lib/adminAuth', () => ({
  requireAdminAuth: jest.fn().mockResolvedValue(true),
}))
import { requireAdminAuth } from '@/lib/adminAuth'

describe('/api/admin/projects', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all projects', async () => {
      const mockProjects = [
        { id: 1, title: 'Project 1', description: 'Desc 1' },
        { id: 2, title: 'Project 2', description: 'Desc 2' },
      ]

      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockProjects,
              error: null,
            }),
          }),
        }),
      })

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual(mockProjects)
    })

    it('should handle database errors', async () => {
      const mockError = { message: 'Database error' }

      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: null,
              error: mockError,
            }),
          }),
        }),
      })

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toEqual({ error: mockError.message })
    })
  })

  describe('POST', () => {
    it('should insert new projects', async () => {
      const newProjects = [
        { title: 'New Project', description: 'New Desc' },
      ]

      mockFrom.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          neq: jest.fn().mockResolvedValue({ error: null }),
        }),
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: newProjects,
            error: null,
          }),
        }),
      })

      const { req, res } = createMocks({
        method: 'POST',
        body: { projects: newProjects },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
    })

    it('should reject non-array projects', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { projects: 'not-an-array' },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Projects must be an array',
      })
    })
  })

  describe('Unsupported Methods', () => {
    it('should return 405 for DELETE', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
    })
  })
})

