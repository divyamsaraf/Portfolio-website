import { z } from 'zod';
import sendEmail from '@/lib/sendEmail';
import type { NextApiRequest, NextApiResponse } from 'next';

const ContactSchema = z.object({ name: z.string().min(1).max(200), email: z.string().email(), role: z.string().max(200).optional(), message: z.string().min(1).max(2000) });

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error: 'Method not allowed' });
  const parse = ContactSchema.safeParse(req.body);
  if(!parse.success) return res.status(400).json({ error: 'Invalid request', details: parse.error.format() });
  const { name, email, role, message } = parse.data;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'no-reply@portfolio.local';
  if(!to) return res.status(500).json({ error: 'CONTACT_TO_EMAIL not set' });
  try{
    const subject = `[Portfolio Contact] ${name} — ${role ?? 'N/A'}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Role:</strong> ${role ?? 'N/A'}</p><p>${message.replace(/\n/g,'<br/>')}</p>`;
    await sendEmail({ to, from, subject, html });
    return res.status(200).json({ ok:true });
  }catch(err:any){
    console.error(err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
