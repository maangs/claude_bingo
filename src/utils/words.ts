import wordsRaw from '../data/words.md?raw'

export function loadWords(): string[] {
  const words = wordsRaw
    .split('\n')
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter((line) => line.length > 0)

  return Array.from(new Set(words))
}

export function pickRandomWords(words: string[], count: number): string[] {
  const shuffled = [...words]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}
