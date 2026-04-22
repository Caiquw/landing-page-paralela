export interface PizzaItem {
  id: string
  name: string
  description: string
  tag: string
  imageUrl: string
}

export async function fetchPizzas(): Promise<PizzaItem[]> {
  // Chama a API route da Vercel — sem CORS, sem bloqueio do Google
  const res = await fetch('/api/cardapio')

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Erro ao carregar cardápio.')
  }

  return res.json()
}