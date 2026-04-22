// api/cardapio.ts
// Roda no servidor da Vercel — sem CORS, sem bloqueio do Google

import type { VercelRequest, VercelResponse } from '@vercel/node'

const SHEET_ID = process.env.VITE_SHEET_ID
const CSV_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/pub?output=csv`

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!SHEET_ID) {
    return res.status(500).json({ error: 'VITE_SHEET_ID não configurado.' })
  }

  try {
    const response = await fetch(CSV_URL)

    if (!response.ok) {
      return res.status(502).json({ error: `Google retornou status ${response.status}` })
    }

    const text = await response.text()

    if (text.trim().startsWith('<!')) {
      return res.status(502).json({
        error: 'Planilha não está publicada. Vá em Arquivo → Publicar na web → CSV.',
      })
    }

    const pizzas = parseCSV(text)

    // Cache de 5 minutos na CDN da Vercel
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(pizzas)

  } catch {
    return res.status(500).json({ error: 'Erro ao buscar planilha.' })
  }
}

function parseCSV(text: string) {
  const rows = text
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((line) => {
      const cols: string[] = []
      let cur = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (ch === '"')              inQuotes = !inQuotes
        else if (ch === ',' && !inQuotes) { cols.push(cur); cur = '' }
        else                              cur += ch
      }
      cols.push(cur)
      return cols
    })

  // Pula o cabeçalho
  return rows.slice(1).map((cols, i) => ({
    id:          String(i),
    name:        cols[0]?.trim() ?? '',
    description: cols[1]?.trim() ?? '',
    tag:         cols[2]?.trim() ?? '',
    imageUrl:    cols[3]?.trim() ?? '',
  })).filter((p) => p.name !== '')
}