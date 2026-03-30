import type { LifestyleData } from '../types'
import { Field, Input, OptionGroup, NavButtons } from './FormField'

interface Props {
  data: LifestyleData
  onChange: (d: LifestyleData) => void
  onNext: () => void
  onBack: () => void
}

export default function LifestyleSection({ data, onChange, onNext, onBack }: Props) {
  const set = (key: keyof LifestyleData) => (val: string) => onChange({ ...data, [key]: val })

  const isValid = data.jobType && data.exercisePerWeek && data.sleepHours && data.stressLevel && data.drinksAlcohol

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mt-4 space-y-5">
      <p className="text-sm text-gray-500">Your lifestyle shapes your calorie needs more than anything else.</p>

      <Field label="Job Type">
        <OptionGroup
          value={data.jobType}
          onChange={val => onChange({ ...data, jobType: val })}
          options={[
            { value: 'desk', label: 'Desk / office', emoji: '💻' },
            { value: 'feet', label: 'On my feet', emoji: '🛒' },
            { value: 'manual', label: 'Manual labour', emoji: '🔨' },
          ]}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Exercise sessions/week">
          <Input value={data.exercisePerWeek} onChange={set('exercisePerWeek')} placeholder="e.g. 3" type="number" min="0" max="14" />
        </Field>
        <Field label="Type of exercise">
          <Input value={data.exerciseType} onChange={set('exerciseType')} placeholder="e.g. gym, running" />
        </Field>
      </div>

      <Field label="Hours of sleep per night">
        <Input value={data.sleepHours} onChange={set('sleepHours')} placeholder="e.g. 7" type="number" min="3" max="12" />
      </Field>

      <Field label="Current stress levels">
        <OptionGroup
          value={data.stressLevel}
          onChange={val => onChange({ ...data, stressLevel: val })}
          options={[
            { value: 'low', label: 'Low 😌', emoji: '' },
            { value: 'moderate', label: 'Moderate 😐', emoji: '' },
            { value: 'high', label: 'High 😤', emoji: '' },
          ]}
        />
      </Field>

      <Field label="Do you drink alcohol?">
        <OptionGroup
          value={data.drinksAlcohol}
          onChange={val => onChange({ ...data, drinksAlcohol: val })}
          options={[
            { value: 'yes', label: 'Yes 🍺', emoji: '' },
            { value: 'no', label: 'No 🚫', emoji: '' },
          ]}
        />
      </Field>

      {data.drinksAlcohol === 'yes' && (
        <Field label="Roughly how many units per week?" hint="1 pint beer ≈ 2 units, 1 glass wine ≈ 2 units, 1 shot ≈ 1 unit">
          <Input value={data.alcoholUnitsPerWeek} onChange={set('alcoholUnitsPerWeek')} placeholder="e.g. 10" type="number" min="0" />
        </Field>
      )}

      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!isValid} />
    </div>
  )
}
