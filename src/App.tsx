import { useMemo, useState } from 'react'
import SizeSelector, { type BoardSize } from './components/SizeSelector'
import BingoBoard from './components/BingoBoard'
import BingoOverlay from './components/BingoOverlay'
import ZoomControls from './components/ZoomControls'
import PrintSection from './components/PrintSection'
import { loadWords, pickRandomWords } from './utils/words'
import { checkWin } from './utils/bingo'

const ZOOM_MIN = 0.5
const ZOOM_MAX = 2
const ZOOM_STEP = 0.1
const MOBILE_BREAKPOINT = 640

function getDefaultZoom() {
  return window.innerWidth < MOBILE_BREAKPOINT ? 0.5 : 1
}

function App() {
  const allWords = useMemo(() => loadWords(), [])

  const [size, setSize] = useState<BoardSize | null>(null)
  const [boardWords, setBoardWords] = useState<string[]>([])
  const [marked, setMarked] = useState<boolean[]>([])
  const [hasWon, setHasWon] = useState(false)
  const [zoom, setZoom] = useState(getDefaultZoom)
  const [view, setView] = useState<'game' | 'print'>('game')

  function startGame(chosenSize: BoardSize, keepZoom = false) {
    const words = pickRandomWords(allWords, chosenSize * chosenSize)
    setSize(chosenSize)
    setBoardWords(words)
    setMarked(new Array(words.length).fill(false))
    setHasWon(false)
    if (!keepZoom) setZoom(getDefaultZoom())
  }

  function handleToggle(index: number) {
    if (hasWon) return
    setMarked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      if (size && checkWin(next, size)) {
        setHasWon(true)
      }
      return next
    })
  }

  function reset() {
    setSize(null)
    setBoardWords([])
    setMarked([])
    setHasWon(false)
  }

  function playAgainSameSize() {
    if (size) startGame(size, true)
  }

  function zoomIn() {
    setZoom((prev) => Math.min(ZOOM_MAX, Math.round((prev + ZOOM_STEP) * 100) / 100))
  }

  function zoomOut() {
    setZoom((prev) => Math.max(ZOOM_MIN, Math.round((prev - ZOOM_STEP) * 100) / 100))
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-slate-100 p-6">
      <div className="no-print flex w-full max-w-4xl justify-end">
        <button
          type="button"
          onClick={() => setView(view === 'game' ? 'print' : 'game')}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
        >
          {view === 'game' ? 'Printable versions' : 'Back to game'}
        </button>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        {view === 'print' ? (
          <PrintSection allWords={allWords} />
        ) : size === null ? (
          <SizeSelector availableWordCount={allWords.length} onSelect={startGame} />
        ) : (
          <>
            <div className="no-print flex flex-col items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">Johans Claude Bingo — {size} x {size}</h1>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
                >
                  Back to start
                </button>
                <ZoomControls zoom={zoom} min={ZOOM_MIN} max={ZOOM_MAX} onZoomIn={zoomIn} onZoomOut={zoomOut} />
              </div>
            </div>
            <div className="max-w-full overflow-auto">
              <BingoBoard size={size} words={boardWords} marked={marked} zoom={zoom} onToggle={handleToggle} />
            </div>
          </>
        )}
      </div>
      {hasWon && <BingoOverlay onPlayAgain={playAgainSameSize} />}
    </div>
  )
}

export default App
