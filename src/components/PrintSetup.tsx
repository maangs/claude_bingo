import { useState } from 'react'
import type { BoardSize } from './SizeSelector'

const SIZES: BoardSize[] = [3, 4, 5]
const MAX_COPIES = 100

interface PrintSetupProps {
  availableWordCount: number
  onGenerate: (config: { size: BoardSize; copies: number; sameWords: boolean }) => void
}

export default function PrintSetup({ availableWordCount, onGenerate }: PrintSetupProps) {
  const [size, setSize] = useState<BoardSize>(3)
  const [copies, setCopies] = useState(1)
  const [sameWords, setSameWords] = useState(true)

  const sizeDisabled = (s: BoardSize) => s * s > availableWordCount

  function handleCopiesChange(value: string) {
    const parsed = Number.parseInt(value, 10)
    if (Number.isNaN(parsed)) {
      setCopies(1)
      return
    }
    setCopies(Math.min(MAX_COPIES, Math.max(1, parsed)))
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-slate-300 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Johans Claude Bingo — Printable boards</h2>

      <div className="flex w-full flex-col items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Board size</label>
        <div className="flex gap-3">
          {SIZES.map((s) => {
            const disabled = sizeDisabled(s)
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => setSize(s)}
                title={disabled ? `Needs ${s * s} unique words, only ${availableWordCount} available` : undefined}
                className={`flex h-16 w-16 items-center justify-center rounded-lg border-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  size === s
                    ? 'border-indigo-600 bg-indigo-500 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'
                }`}
              >
                {s} x {s}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <label htmlFor="copies" className="text-sm font-medium text-slate-600">
          Number of copies
        </label>
        <input
          id="copies"
          type="number"
          min={1}
          max={MAX_COPIES}
          value={copies}
          onChange={(e) => handleCopiesChange(e.target.value)}
          className="w-24 rounded-md border border-slate-300 px-3 py-1 text-center text-slate-700 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Words per copy</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSameWords(true)}
            className={`rounded-md border-2 px-3 py-2 text-sm font-medium transition ${
              sameWords
                ? 'border-indigo-600 bg-indigo-500 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-indigo-400'
            }`}
          >
            Same words on every copy
          </button>
          <button
            type="button"
            onClick={() => setSameWords(false)}
            className={`rounded-md border-2 px-3 py-2 text-sm font-medium transition ${
              !sameWords
                ? 'border-indigo-600 bg-indigo-500 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-indigo-400'
            }`}
          >
            Random words per copy
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={sizeDisabled(size)}
        onClick={() => onGenerate({ size, copies, sameWords })}
        className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Generate
      </button>
    </div>
  )
}
