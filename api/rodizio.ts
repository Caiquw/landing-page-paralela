import type { VercelRequest, VercelResponse } from '@vercel/node'

const SHEET_ID = process.env.SHEET_ID
const GID      = process.env.RODIZIO_GID ?? '1' // ID da aba "Rodizio" na planilha

// Segunda aba da mesma planilha
const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv&gid=${GID}`

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  console.log('SHEET_ID:', process.env.SHEET_ID)
  console.log('RODIZIO_GID:', process.env.RODIZIO_GID)
  console.log('CSV_URL:', CSV_URL)

  if (!SHEET_ID) {
    return res.status(500).json({ error: 'SHEET_ID não configurado.' })
  }

  try {
    const response = await fetch(CSV_URL)

    if (!response.ok) {
      return res.status(502).json({ error: `Google retornou status ${response.status}` })
    }

    const text = await response.text()

    if (text.trim().startsWith('<!')) {
      return res.status(502).json({ error: 'Aba Rodizio não está publicada corretamente.' })
    }

    // Monta um objeto { chave: valor } a partir das linhas
    const config: Record<string, string> = {}
    text.split('\n').slice(1).forEach((line) => {
      const [chave, valor] = line.split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      if (chave) config[chave] = valor ?? ''
    })

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(config)

  } catch {
    return res.status(500).json({ error: 'Erro ao buscar configurações do rodízio.' })
  }
}