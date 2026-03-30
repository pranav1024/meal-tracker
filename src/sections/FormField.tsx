import type { ReactNode } from 'react'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  )
}

export function Input({
  value, onChange, placeholder, type = 'text', min, max,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  min?: string
  max?: string
}) {
  return (
    <input
      type={type}
      value={value}
      min={min}
      max={max}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white placeholder-gray-300"
    />
  )
}

export function Textarea({
  value, onChange, placeholder, rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white placeholder-gray-300 resize-none"
    />
  )
}

export function OptionGroup<T extends string>({
  value, onChange, options,
}: {
  value: T | ''
  onChange: (v: T) => void
  options: { value: T; label: string; emoji?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
            value === opt.value
              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
              : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50'
          }`}
        >
          {opt.emoji && <span>{opt.emoji}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function NavButtons({
  onNext, onBack, nextLabel = 'Continue', nextDisabled = false,
}: {
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl py-3 text-sm font-semibold transition-colors"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-2 flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-semibold transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  )
}
