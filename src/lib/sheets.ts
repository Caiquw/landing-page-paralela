export interface PizzaItem {
  id: string
  name: string
  description: string
  tag: string
  imageUrl: string
}

const SHEET_ID = import.meta.env.VITE_SHEET_ID

// /pub?output=csv é a URL correta para planilhas publicadas — sem bloqueio de CORS
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/pub?output=csv`

export async function fetchPizzas(): Promise<PizzaItem[]> {
  if (!SHEET_ID) {
    console.warn('VITE_SHEET_ID não definido — usando dados locais.')
    return []
  }

  const res = await fetch(CSV_URL, { cache: 'no-store' })

  if (!res.ok) throw new Error(`Erro ao buscar planilha: ${res.status}`)

  const text = await res.text()

  // Se retornou HTML em vez de CSV, a planilha não está publicada corretamente
  if (text.trim().startsWith('<!')) {
    console.warn('Google retornou HTML — verifique se a planilha está publicada como CSV.')
    return []
  }

  const rows = parseCSV(text)

  return rows
    .slice(1) // pula cabeçalho
    .map((cols, i) => ({
      id:          String(i),
      name:        cols[0]?.trim() ?? '',
      description: cols[1]?.trim() ?? '',
      tag:         cols[2]?.trim() ?? '',
      imageUrl:    cols[3]?.trim() ?? '',
    }))
    .filter((p) => p.name !== '')
}

function parseCSV(text: string): string[][] {
  return text
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((line) => {
      const cols: string[] = []
      let cur = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (ch === '"') {
          inQuotes = !inQuotes
        } else if (ch === ',' && !inQuotes) {
          cols.push(cur)
          cur = ''
        } else {
          cur += ch
        }
      }
      cols.push(cur)
      return cols
    })
}