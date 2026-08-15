const BASE_CELL_SIZE = 192

interface BingoBoardProps {
  size: number
  words: string[]
  marked: boolean[]
  zoom: number
  onToggle: (index: number) => void
}

export default function BingoBoard({ size, words, marked, zoom, onToggle }: BingoBoardProps) {
  const cellSize = BASE_CELL_SIZE * zoom

  return (
    <div
      className="grid gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {words.map((word, index) => {
        const isMarked = marked[index]
        return (
          <button
            key={index}
            type="button"
            onClick={() => onToggle(index)}
            style={{ width: cellSize, height: cellSize, fontSize: cellSize * 0.09 }}
            className={`flex items-center justify-center rounded-lg border-2 p-2 text-center font-semibold break-words shadow-sm transition ${
              isMarked
                ? 'border-indigo-600 bg-indigo-500 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'
            }`}
          >
            {word}
          </button>
        )
      })}
    </div>
  )
}
