export interface StatsData {
  age: string
  sex: 'male' | 'female' | ''
  heightCm: string
  weightKg: string
  goalWeight: string
  pace: 'steady' | 'fast' | ''
}

export interface LifestyleData {
  jobType: 'desk' | 'feet' | 'manual' | ''
  exercisePerWeek: string
  exerciseType: string
  sleepHours: string
  stressLevel: 'low' | 'moderate' | 'high' | ''
  drinksAlcohol: 'yes' | 'no' | ''
  alcoholUnitsPerWeek: string
}

export interface FoodData {
  favoriteMeals: string
  hatedFoods: string
  restrictions: string
  cookingStyle: 'scratch' | 'quick' | 'batch' | ''
  adventureLevel: string
}

export interface SnackData {
  currentSnacks: string
  snackTrigger: 'hunger' | 'boredom' | 'habit' | 'mix' | ''
  snackPreference: 'sweet' | 'savoury' | 'both' | ''
  lateNightSnacking: 'yes' | 'no' | ''
}

export interface FormData {
  stats: StatsData
  lifestyle: LifestyleData
  food: FoodData
  snacks: SnackData
}

export interface NutritionPlan {
  bmr: number
  tdee: number
  targetCalories: number
  protein: number
  carbs: number
  fat: number
  activityMultiplier: number
  activityLabel: string
  waterLitres: number
  weeklyLoss: number
  weeksToGoal: number | null
}
