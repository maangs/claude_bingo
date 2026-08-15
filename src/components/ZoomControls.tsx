interface ZoomControlsProps {
  zoom: number
  min: number
  max: number
  onZoomIn: () => void
  onZoomOut: () => void
}

export default function ZoomControls({ zoom, min, max, onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-slate-300 bg-white shadow-sm">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= min}
        aria-label="Zoom out"
        className="px-3 py-1 text-lg font-bold text-slate-600 transition hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-600"
      >
        −
      </button>
      <span className="w-12 text-center text-sm font-medium text-slate-500">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= max}
        aria-label="Zoom in"
        className="px-3 py-1 text-lg font-bold text-slate-600 transition hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-600"
      >
        +
      </button>
    </div>
  )
}
