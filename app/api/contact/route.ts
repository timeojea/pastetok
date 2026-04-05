import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString } from '@/lib/security';

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const name = sanitizeString(body.name || '');
  const email = sanitizeString(body.email || '');
  const message = sanitizeString(body.message || '');

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json({ error: 'Message trop court.' }, { status: 400 });
  }

  // TODO: integrate Resend or SMTP here
  // For now, just log and return success
  console.log('[Contact]', { name, email, message: message.slice(0, 100) });

  return NextResponse.json({ success: true });
}
