import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('POST /api/leads', () => {
  const createRequest = (body: unknown) => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return request
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Readiness Lead', () => {
    const validReadinessPayload = {
      name: 'John Doe',
      email: 'john@example.com',
      readinessLevel: 'Practitioner',
      score: 15,
      recommendations: [
        'Start with low-risk file organization tasks',
        'Build custom workflows for recurring processes',
        'Explore MCP integrations for your tech stack',
      ],
    }

    it('should successfully process readiness lead with valid data', async () => {
      let emailSent = false
      let contactCreated = false

      server.use(
        http.post('https://api.resend.com/emails', async ({ request }) => {
          emailSent = true
          const body = await request.json()

          expect(body).toMatchObject({
            from: 'ID8Labs <hello@mail.deepstack.trade>',
            to: 'john@example.com',
            subject: 'Your AI Readiness Results: Practitioner Level',
          })
          expect(body.html).toContain('John Doe')
          expect(body.html).toContain('Practitioner')

          return HttpResponse.json({
            id: 'email_test_123',
          })
        }),
        http.post('https://api.resend.com/audiences/*/contacts', async ({ request }) => {
          contactCreated = true
          const body = await request.json()

          expect(body).toMatchObject({
            email: 'john@example.com',
            firstName: 'John Doe',
            unsubscribed: false,
          })

          return HttpResponse.json({
            id: 'contact_test_123',
          })
        })
      )

      const request = createRequest(validReadinessPayload)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject({
        success: true,
        messageId: 'email_test_123',
      })
      expect(emailSent).toBe(true)
      expect(contactCreated).toBe(true)
    })

    it('should return 400 when name is missing', async () => {
      const request = createRequest({
        email: 'john@example.com',
        readinessLevel: 'Practitioner',
        score: 15,
        recommendations: [],
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when email is missing', async () => {
      const request = createRequest({
        name: 'John Doe',
        readinessLevel: 'Practitioner',
        score: 15,
        recommendations: [],
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when readinessLevel is missing', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        score: 15,
        recommendations: [],
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when email format is invalid', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'invalid-email',
        readinessLevel: 'Practitioner',
        score: 15,
        recommendations: [],
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should accept various email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@company.co.uk',
        'user+tag@domain.com',
        'test123@test-domain.org',
      ]

      for (const email of validEmails) {
        const request = createRequest({
          name: 'Test User',
          email,
          readinessLevel: 'Explorer',
          score: 5,
          recommendations: [],
        })

        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })

    it('should reject invalid email formats', async () => {
      const invalidEmails = [
        'not-an-email',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
      ]

      for (const email of invalidEmails) {
        const request = createRequest({
          name: 'Test User',
          email,
          readinessLevel: 'Explorer',
          score: 5,
          recommendations: [],
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Invalid email format')
      }
    })

    it('should handle email sending failure', async () => {
      server.use(
        http.post('https://api.resend.com/emails', () => {
          return HttpResponse.json(
            { error: { message: 'Email sending failed' } },
            { status: 500 }
          )
        })
      )

      const request = createRequest(validReadinessPayload)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to send email')
    })

    it('should continue even if contact creation fails', async () => {
      server.use(
        http.post('https://api.resend.com/audiences/*/contacts', () => {
          return HttpResponse.json(
            { error: { message: 'Contact already exists' } },
            { status: 400 }
          )
        })
      )

      const request = createRequest(validReadinessPayload)
      const response = await POST(request)

      // Should still succeed
      expect(response.status).toBe(200)
    })
  })

  describe('Waitlist Lead', () => {
    const validWaitlistPayload = {
      email: 'user@example.com',
      source: 'claude-for-knowledge-workers-waitlist',
    }

    it('should successfully process course waitlist lead', async () => {
      let emailSent = false
      let emailData: any = null

      server.use(
        http.post('https://api.resend.com/emails', async ({ request }) => {
          emailSent = true
          const body = await request.json()
          emailData = body

          return HttpResponse.json({
            id: 'email_waitlist_123',
          })
        })
      )

      const request = createRequest(validWaitlistPayload)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject({
        success: true,
        messageId: 'email_waitlist_123',
        source: 'claude-for-knowledge-workers-waitlist',
      })
      expect(emailSent).toBe(true)
      expect(emailData.subject).toBe("You're on the waitlist: Claude Code for Knowledge Workers")
      expect(emailData.html).toContain('Module 0')
    })

    it('should successfully process generic waitlist lead', async () => {
      let emailData: any = null

      server.use(
        http.post('https://api.resend.com/emails', async ({ request }) => {
          const body = await request.json()
          emailData = body

          return HttpResponse.json({
            id: 'email_generic_123',
          })
        })
      )

      const request = createRequest({
        email: 'user@example.com',
        source: 'homepage',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject({
        success: true,
        source: 'homepage',
      })
      expect(emailData.subject).toBe("You're on the ID8Labs waitlist")
    })

    it('should return 400 when email is missing', async () => {
      const request = createRequest({
        source: 'homepage',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when source is missing', async () => {
      const request = createRequest({
        email: 'user@example.com',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when email format is invalid', async () => {
      const request = createRequest({
        email: 'invalid-email',
        source: 'homepage',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should accept optional metadata', async () => {
      const request = createRequest({
        email: 'user@example.com',
        source: 'homepage',
        metadata: {
          utm_source: 'twitter',
          utm_campaign: 'launch',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.metadata).toMatchObject({
        utm_source: 'twitter',
        utm_campaign: 'launch',
      })
    })

    it('should add contact to audience', async () => {
      let contactCreated = false
      let contactData: any = null

      server.use(
        http.post('https://api.resend.com/audiences/*/contacts', async ({ request }) => {
          contactCreated = true
          const body = await request.json()
          contactData = body

          return HttpResponse.json({
            id: 'contact_waitlist_123',
          })
        })
      )

      const request = createRequest(validWaitlistPayload)
      await POST(request)

      expect(contactCreated).toBe(true)
      expect(contactData).toMatchObject({
        email: 'user@example.com',
        unsubscribed: false,
      })
    })
  })

  describe('Error Handling', () => {
    it('should return 500 when email sending fails', async () => {
      server.use(
        http.post('https://api.resend.com/emails', () => {
          return HttpResponse.json(
            { message: 'Email service error' },
            { status: 500 }
          )
        })
      )

      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        readinessLevel: 'Explorer',
        score: 5,
        recommendations: [],
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to send email')
    })

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/leads', {
        method: 'POST',
        body: 'invalid json {',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })
})
