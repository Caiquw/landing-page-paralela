import type { VercelRequest, VercelResponse } from '@vercel/node'

const SHEET_ID = process.env.VITE_SHEET_ID
const CSV_URL  = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`

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

    const items = parseCSV(text)

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(items)

  } catch (err) {
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
        if (ch === '"')                   inQuotes = !inQuotes
        else if (ch === ',' && !inQuotes) { cols.push(cur); cur = '' }
        else                              cur += ch
      }
      cols.push(cur)
      return cols
    })

  // Cabeçalho esperado: Nome | Descrição | Categoria | Preço | Tag | ImagemURL
  return rows.slice(1).map((cols, i) => ({
    id:          String(i),
    name:        cols[0]?.trim() ?? '',
    description: cols[1]?.trim() ?? '',
    category:    cols[2]?.trim() ?? '',
    price:       cols[3]?.trim() ?? '',
    tag:         cols[4]?.trim() ?? '',
    imageUrl:    cols[5]?.trim() ?? '',
  })).filter((p) => p.name !== '')
}