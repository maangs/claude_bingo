type BoardSize = 3 | 4 | 5

interface SizeSelectorProps {
  availableWordCount: number
  onSelect: (size: BoardSize) => void
}

const SIZES: BoardSize[] = [3, 4, 5]

export default function SizeSelector({ availableWordCount, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Johans Claude Bingo</h1>
      <p className="text-slate-500">Choose your board size</p>
      <div className="flex gap-4">
        {SIZES.map((size) => {
          const needed = size * size
          const disabled = needed > availableWordCount
          return (
            <button
              key={size}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(size)}
              title={disabled ? `Needs ${needed} unique words, only ${availableWordCount} available` : undefined}
              className="flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-lg font-semibold text-slate-700 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700"
            >
              <span>{size} x {size}</span>
              {disabled && <span className="mt-1 text-xs font-normal text-slate-400">not enough words</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export type { BoardSize }
