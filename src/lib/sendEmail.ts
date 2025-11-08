import nodemailer from 'nodemailer';
import { Resend } from 'resend';
type Payload = { to:string; from:string; subject:string; html:string; };
export default async function sendEmail(payload:Payload){
  const resendKey = process.env.RESEND_API_KEY;
  if(resendKey){
    const resend = new Resend(resendKey);
    await resend.emails.send({ from: payload.from, to: payload.to, subject: payload.subject, html: payload.html });
    return;
  }
  const host = process.env.SMTP_HOST, portRaw = process.env.SMTP_PORT, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  const port = portRaw ? parseInt(portRaw,10) : 587;
  if(!host || !user || !pass) throw new Error('No email provider configured');
  const transporter = nodemailer.createTransport({ host, port, secure: port===465, auth:{ user, pass }});
  await transporter.sendMail({ from: payload.from, to: payload.to, subject: payload.subject, html: payload.html });
}
