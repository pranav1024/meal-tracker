# Nutritionist

A personal fat-loss planner built with React, TypeScript, and Tailwind CSS.

## What it does

A 5-step form that collects your stats, lifestyle, food preferences, and snack habits, then generates a personalized nutrition plan including:

- **Calorie target** — TDEE calculated via Mifflin-St Jeor BMR formula, minus a 500 kcal deficit
- **Macros** — High-protein split (2.2g/kg goal weight), 25% fat, remaining carbs
- **Hydration** — Daily water intake based on body weight, activity, and job type
- **Timeline** — Estimated weeks to goal weight at ~0.45 kg/week loss

## Steps

1. **Your Stats** — Age, sex, height, current weight, goal weight, pace
2. **Lifestyle** — Job type, exercise frequency/type, sleep, stress, alcohol
3. **Food Prefs** — Favorite meals, restrictions, cooking style, adventure level
4. **Snack Habits** — Current snacks, triggers, preferences, late-night habits
5. **Your Plan** — Generated nutrition plan

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```
