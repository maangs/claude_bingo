interface PrintPreviewProps {
  boards: string[][]
  size: number
  onBack: () => void
}

export default function PrintPreview({ boards, size, onBack }: PrintPreviewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="no-print flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Print / Save as PDF
        </button>
        <span className="text-sm text-slate-500">
          {boards.length} board{boards.length === 1 ? '' : 's'} — {size} x {size}
        </span>
      </div>

      <div className="print-area flex w-full flex-col items-center gap-10">
        {boards.map((words, i) => (
          <div
            key={i}
            className="print-page flex w-full max-w-xl flex-col items-center gap-4 border-b-2 border-dashed border-slate-300 pb-10 last:border-b-0"
          >
            <h2 className="text-3xl font-extrabold tracking-wide text-slate-800">Johans Claude Bingo</h2>
            <div
              className="grid w-full gap-2"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {words.map((word, idx) => (
                <div
                  key={idx}
                  className="flex aspect-square items-center justify-center break-words border-2 border-slate-800 p-2 text-center text-sm font-semibold text-slate-800"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
