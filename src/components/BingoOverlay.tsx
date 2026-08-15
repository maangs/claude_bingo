interface BingoOverlayProps {
  onPlayAgain: () => void
}

export default function BingoOverlay({ onPlayAgain }: BingoOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/80">
      <h1 className="animate-bounce text-7xl font-black tracking-widest text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] sm:text-9xl">
        BINGO!
      </h1>
      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-lg bg-yellow-400 px-6 py-3 text-lg font-bold text-slate-900 shadow-lg transition hover:bg-yellow-300"
      >
        Play again
      </button>
    </div>
  )
}
