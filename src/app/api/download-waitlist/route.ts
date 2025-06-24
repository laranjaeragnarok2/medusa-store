import { NextResponse } from 'next/server';

// Rota desativada após a migração para o Formspree.
// Retorna um status 410 (Gone) para indicar que este endpoint não existe mais.
export async function GET() {
  return new NextResponse('This API route is no longer in use.', {
    status: 410,
    headers: { 'Content-Type': 'text/plain' },
  });
}
