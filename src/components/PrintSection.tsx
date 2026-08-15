import { useState } from 'react'
import PrintSetup from './PrintSetup'
import PrintPreview from './PrintPreview'
import { pickRandomWords } from '../utils/words'
import type { BoardSize } from './SizeSelector'

interface PrintSectionProps {
  allWords: string[]
}

interface GeneratedSet {
  size: BoardSize
  boards: string[][]
}

export default function PrintSection({ allWords }: PrintSectionProps) {
  const [generated, setGenerated] = useState<GeneratedSet | null>(null)

  function handleGenerate({
    size,
    copies,
    sameWords,
  }: {
    size: BoardSize
    copies: number
    sameWords: boolean
  }) {
    const boards: string[][] = []
    const sharedWords = sameWords ? pickRandomWords(allWords, size * size) : null
    for (let i = 0; i < copies; i++) {
      boards.push(sharedWords ?? pickRandomWords(allWords, size * size))
    }
    setGenerated({ size, boards })
  }

  if (generated) {
    return (
      <PrintPreview
        boards={generated.boards}
        size={generated.size}
        onBack={() => setGenerated(null)}
      />
    )
  }

  return <PrintSetup availableWordCount={allWords.length} onGenerate={handleGenerate} />
}
