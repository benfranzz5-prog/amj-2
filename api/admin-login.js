import crypto from 'crypto'
import { makeSessionCookie } from './_auth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', () => {
    let password
    try { password = JSON.parse(body).password } catch { return res.status(400).json({ error: 'Invalid JSON' }) }

    const expected = process.env.ADMIN_PASSWORD || ''
    const match = password?.length > 0 &&
      crypto.timingSafeEqual(Buffer.from(password.padEnd(64)), Buffer.from(expected.padEnd(64))) &&
      password.length === expected.length

    if (!match) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    res.setHeader('Set-Cookie', makeSessionCookie())
    res.status(200).json({ ok: true })
  })
}
