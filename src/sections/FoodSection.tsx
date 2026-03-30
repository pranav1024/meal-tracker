import type { FoodData } from '../types'
import { Field, Textarea, OptionGroup, NavButtons } from './FormField'

interface Props {
  data: FoodData
  onChange: (d: FoodData) => void
  onNext: () => void
  onBack: () => void
}

export default function FoodSection({ data, onChange, onNext, onBack }: Props) {
  const set = (key: keyof FoodData) => (val: string) => onChange({ ...data, [key]: val })

  const isValid = data.favoriteMeals && data.cookingStyle && data.adventureLevel

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mt-4 space-y-5">
      <p className="text-sm text-gray-500">The more you tell me, the more personalised your plan will be.</p>

      <Field label="Your top 5 favourite meals or dishes" hint="Any cuisine — be specific! e.g. chicken tikka masala, pad thai, burgers...">
        <Textarea
          value={data.favoriteMeals}
          onChange={set('favoriteMeals')}
          placeholder="e.g. Spaghetti bolognese, chicken stir fry, tacos, Greek salad, pizza..."
          rows={3}
        />
      </Field>

      <Field label="Foods you absolutely hate" hint="Optional — helps avoid putting things you dread on your plan">
        <Textarea
          value={data.hatedFoods}
          onChange={set('hatedFoods')}
          placeholder="e.g. mushrooms, olives, fish..."
          rows={2}
        />
      </Field>

      <Field label="Dietary restrictions or allergies" hint="e.g. vegetarian, vegan, gluten-free, dairy-free, nut allergy">
        <Textarea
          value={data.restrictions}
          onChange={set('restrictions')}
          placeholder="None, or list any here..."
          rows={2}
        />
      </Field>

      <Field label="Cooking style preference">
        <OptionGroup
          value={data.cookingStyle}
          onChange={val => onChange({ ...data, cookingStyle: val })}
          options={[
            { value: 'scratch', label: 'From scratch', emoji: '👨‍🍳' },
            { value: 'quick', label: 'Quick & easy', emoji: '⚡' },
            { value: 'batch', label: 'Batch prepping', emoji: '📦' },
          ]}
        />
      </Field>

      <Field label="Food adventurousness (1–10)" hint="1 = meat and potatoes only · 10 = I'll try anything">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="10"
            value={data.adventureLevel || '5'}
            onChange={e => set('adventureLevel')(e.target.value)}
            className="flex-1 accent-emerald-600"
          />
          <span className="text-lg font-bold text-emerald-700 w-8 text-center">{data.adventureLevel || '5'}</span>
        </div>
      </Field>

      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!isValid} />
    </div>
  )
}
