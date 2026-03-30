import type { SnackData } from '../types'
import { Field, Textarea, OptionGroup, NavButtons } from './FormField'

interface Props {
  data: SnackData
  onChange: (d: SnackData) => void
  onNext: () => void
  onBack: () => void
}

export default function SnacksSection({ data, onChange, onNext, onBack }: Props) {
  const set = (key: keyof SnackData) => (val: string) => onChange({ ...data, [key]: val })

  const isValid = data.snackTrigger && data.snackPreference && data.lateNightSnacking

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mt-4 space-y-5">
      <p className="text-sm text-gray-500">Snacking habits are where most fat loss plans quietly fall apart. Let's fix that.</p>

      <Field label="What snacks do you currently reach for?" hint="Be honest — no judgment here!">
        <Textarea
          value={data.currentSnacks}
          onChange={set('currentSnacks')}
          placeholder="e.g. crisps, chocolate, biscuits, fruit, nuts..."
          rows={2}
        />
      </Field>

      <Field label="Why do you usually snack?">
        <OptionGroup
          value={data.snackTrigger}
          onChange={val => onChange({ ...data, snackTrigger: val })}
          options={[
            { value: 'hunger', label: 'Genuine hunger', emoji: '😋' },
            { value: 'boredom', label: 'Boredom', emoji: '😴' },
            { value: 'habit', label: 'Habit', emoji: '🔄' },
            { value: 'mix', label: 'All of the above', emoji: '🤷' },
          ]}
        />
      </Field>

      <Field label="Snack preference">
        <OptionGroup
          value={data.snackPreference}
          onChange={val => onChange({ ...data, snackPreference: val })}
          options={[
            { value: 'sweet', label: 'Sweet 🍫', emoji: '' },
            { value: 'savoury', label: 'Savoury 🧀', emoji: '' },
            { value: 'both', label: 'Both!', emoji: '😅' },
          ]}
        />
      </Field>

      <Field label="Do you snack late at night?">
        <OptionGroup
          value={data.lateNightSnacking}
          onChange={val => onChange({ ...data, lateNightSnacking: val })}
          options={[
            { value: 'yes', label: 'Yes, regularly 🌙', emoji: '' },
            { value: 'no', label: 'Not really 😴', emoji: '' },
          ]}
        />
      </Field>

      <NavButtons
        onNext={onNext}
        onBack={onBack}
        nextLabel="Build My Plan 🚀"
        nextDisabled={!isValid}
      />
    </div>
  )
}
