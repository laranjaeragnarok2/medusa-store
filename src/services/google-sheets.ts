'use server';

import { google } from 'googleapis';

interface WaitlistData {
  name: string;
  whatsapp: string;
}

function getGoogleSheetsApi() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
    if (process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_PRIVATE_KEY) {
         console.warn("Google Sheets credentials are not fully configured. API calls will be skipped.");
    }
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccountEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}

export async function appendToSheet(data: WaitlistData) {
    const api = getGoogleSheetsApi();
    if (!api) return; 

    try {
        const newRow = [data.name, data.whatsapp, new Date().toISOString()];
        await api.sheets.spreadsheets.values.append({
          spreadsheetId: api.spreadsheetId,
          range: 'A1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [newRow],
          },
        });
    } catch (error) {
        console.error('Erro ao adicionar dados na Planilha Google:', error);
        throw new Error('Não foi possível salvar os dados na planilha.');
    }
}


export async function getSheetRowCount(): Promise<number> {
    const api = getGoogleSheetsApi();
    if (!api) return 0;

    try {
        const response = await api.sheets.spreadsheets.values.get({
            spreadsheetId: api.spreadsheetId,
            range: 'A:A',
        });
        
        return response.data.values ? response.data.values.length : 0;
    } catch (error: any) {
        if (error.code === 404 || (error.response?.data?.error?.code === 404)) {
            return 0;
        }
        console.error('Erro ao buscar a contagem de linhas da Planilha Google:', error);
        return 0;
    }
}
