'use server';

import { google } from 'googleapis';

interface WaitlistData {
  name: string;
  whatsapp: string;
}

const getGoogleSheetsClient = () => {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('As credenciais da conta de serviço do Google não foram encontradas nas variáveis de ambiente.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccountEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

const getSheetId = () => {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
        throw new Error('O ID da Planilha Google não foi encontrado nas variáveis de ambiente.');
    }
    return sheetId;
}


export async function appendToSheet(data: WaitlistData) {
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = getSheetId();
        const range = 'A1';

        const newRow = [data.name, data.whatsapp, new Date().toISOString()];
    
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
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
    try {
        const sheets = getGoogleSheetsClient();
        const spreadsheetId = getSheetId();
        const range = 'A:A'; 

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
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
