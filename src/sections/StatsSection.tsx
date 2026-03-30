import type { StatsData } from '../types'
import { Field, Input, OptionGroup, NavButtons } from './FormField'

interface Props {
  data: StatsData
  onChange: (d: StatsData) => void
  onNext: () => void
}

export default function StatsSection({ data, onChange, onNext }: Props) {
  const set = (key: keyof StatsData) => (val: string) => onChange({ ...data, [key]: val })

  const isValid =
    data.age &&
    data.sex &&
    data.heightCm &&
    data.weightKg &&
    data.goalWeight &&
    data.pace

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mt-4 space-y-5">
      <p className="text-sm text-gray-500">Let's start with the basics. Don't worry — this stays on your device.</p>

      <Field label="Age">
        <Input value={data.age} onChange={set('age')} placeholder="e.g. 32" type="number" min="16" max="90" />
      </Field>

      <Field label="Biological Sex">
        <OptionGroup
          value={data.sex}
          onChange={val => onChange({ ...data, sex: val })}
          options={[
            { value: 'male', label: 'Male', emoji: '♂️' },
            { value: 'female', label: 'Female', emoji: '♀️' },
          ]}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Height (cm)">
          <Input value={data.heightCm} onChange={set('heightCm')} placeholder="e.g. 178" type="number" />
        </Field>
        <Field label="Current Weight (kg)">
          <Input value={data.weightKg} onChange={set('weightKg')} placeholder="e.g. 90" type="number" />
        </Field>
      </div>

      <Field label="Goal Weight (kg)" hint="Or describe your goal look/feel in kg equivalent">
        <Input value={data.goalWeight} onChange={set('goalWeight')} placeholder="e.g. 78" type="number" />
      </Field>

      <Field label="How fast do you want to lose it?">
        <OptionGroup
          value={data.pace}
          onChange={val => onChange({ ...data, pace: val })}
          options={[
            { value: 'steady', label: 'Steady & sustainable', emoji: '🐢' },
            { value: 'fast', label: 'As fast as safely possible', emoji: '🚀' },
          ]}
        />
      </Field>

      <NavButtons onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
