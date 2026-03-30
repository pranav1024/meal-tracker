import type { FormData, NutritionPlan } from './types'

function getActivityMultiplier(jobType: string, exercisePerWeek: number): { multiplier: number; label: string } {
  const ex = exercisePerWeek

  if (jobType === 'manual') {
    if (ex >= 4) return { multiplier: 1.9, label: 'Extremely Active' }
    return { multiplier: 1.725, label: 'Very Active' }
  }
  if (jobType === 'feet') {
    if (ex >= 4) return { multiplier: 1.725, label: 'Very Active' }
    if (ex >= 1) return { multiplier: 1.55, label: 'Moderately Active' }
    return { multiplier: 1.375, label: 'Lightly Active' }
  }
  // desk job
  if (ex >= 4) return { multiplier: 1.55, label: 'Moderately Active' }
  if (ex >= 1) return { multiplier: 1.375, label: 'Lightly Active' }
  return { multiplier: 1.2, label: 'Sedentary' }
}

export function calculatePlan(data: FormData): NutritionPlan {
  const { stats, lifestyle } = data

  const age = parseInt(stats.age) || 30
  const weightKg = parseFloat(stats.weightKg) || 80
  const heightCm = parseFloat(stats.heightCm) || 170
  const sex = stats.sex || 'male'
  const exercisePerWeek = parseInt(lifestyle.exercisePerWeek) || 0
  const goalWeightKg = parseFloat(stats.goalWeight) || weightKg - 10

  // Mifflin-St Jeor BMR
  let bmr: number
  if (sex === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  }

  const { multiplier, label } = getActivityMultiplier(lifestyle.jobType, exercisePerWeek)
  const tdee = Math.round(bmr * multiplier)

  // 500 kcal deficit for ~1 lb/week loss
  const deficit = 500
  const targetCalories = tdee - deficit

  // Macros: high protein to preserve muscle
  // Protein: 2.2g per kg of goal bodyweight
  const protein = Math.round(2.2 * goalWeightKg)
  // Fat: 25% of target calories
  const fatCalories = targetCalories * 0.25
  const fat = Math.round(fatCalories / 9)
  // Carbs: remainder
  const proteinCalories = protein * 4
  const carbCalories = targetCalories - proteinCalories - fatCalories
  const carbs = Math.round(Math.max(carbCalories, 0) / 4)

  // Hydration: 35ml/kg + 500ml per hour of exercise
  const exerciseHoursPerDay = (exercisePerWeek * 1) / 7
  const jobBonus = lifestyle.jobType === 'manual' ? 1 : lifestyle.jobType === 'feet' ? 0.5 : 0
  const waterLitres = parseFloat(((35 * weightKg) / 1000 + exerciseHoursPerDay * 0.5 + jobBonus).toFixed(1))

  // Timeline
  const weightToLoseKg = weightKg - goalWeightKg
  const weeklyLoss = (deficit * 7) / 7700 // 7700 kcal ≈ 1 kg fat
  const weeksToGoal = weightToLoseKg > 0 ? Math.ceil(weightToLoseKg / weeklyLoss) : null

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    protein,
    carbs,
    fat,
    activityMultiplier: multiplier,
    activityLabel: label,
    waterLitres,
    weeklyLoss: Math.round(weeklyLoss * 10) / 10,
    weeksToGoal,
  }
}
