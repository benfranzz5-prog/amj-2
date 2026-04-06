import { verifyRequest } from './_auth.js'

export default function handler(req, res) {
  if (verifyRequest(req)) {
    return res.status(200).json({ ok: true })
  }
  res.status(401).json({ error: 'Unauthorized' })
}
