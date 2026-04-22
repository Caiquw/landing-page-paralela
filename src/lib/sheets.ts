export interface CardapioItem {
  id: string
  name: string
  description: string
  category: string
  price: string
  tag: string
  imageUrl: string
}

export async function fetchCardapio(): Promise<CardapioItem[]> {
  const res = await fetch('/api/cardapio')

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Erro ao carregar cardápio.')
  }

  return res.json()
}