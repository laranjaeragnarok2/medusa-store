import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

/**
 * Converte um array de objetos em uma string no formato CSV.
 * @param {Record<string, any>[]} data - O array de objetos a ser convertido.
 * @returns {string} - A string formatada como CSV.
 */
function toCsv(data: Record<string, any>[]) {
  if (!data || data.length === 0) {
    return "";
  }
  const headers = Object.keys(data[0]);
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map(header => {
      // Escapa aspas duplas dentro dos campos e envolve o campo com aspas.
      const escaped = ('' + row[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}

/**
 * Rota da API para buscar todos os inscritos no Firestore e servi-los como um arquivo CSV para download.
 */
export async function GET() {
  try {
    // A inicialização do Admin SDK agora é "lazy" (preguiçosa) e acontece aqui, em tempo de execução.
    const adminDb = getAdminDb();
    const waitlistSnapshot = await adminDb.collection('waitlist').orderBy('timestamp', 'asc').get();
    
    if (waitlistSnapshot.empty) {
      return new NextResponse('Nenhum usuário na lista de espera.', { 
        status: 200, 
        headers: { 'Content-Type': 'text/plain' } 
      });
    }

    const waitlistData = waitlistSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        whatsapp: data.whatsapp || '',
        timestamp: data.timestamp?.toDate().toISOString() || '',
      };
    });

    const csvData = toCsv(waitlistData);
    
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv; charset=utf-8');
    headers.set('Content-Disposition', 'attachment; filename="waitlist.csv"');

    // Adiciona um Byte Order Mark (BOM) para garantir a compatibilidade com o Excel
    const dataWithBom = '\uFEFF' + csvData;

    return new NextResponse(dataWithBom, { status: 200, headers });

  } catch (error) {
    console.error('Error fetching waitlist for download:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return new NextResponse(`Erro ao gerar o arquivo: ${errorMessage} Verifique se as variáveis de ambiente do servidor estão configuradas corretamente na Vercel e se as regras do Firestore permitem a leitura pelo servidor.`, { status: 500 });
  }
}
