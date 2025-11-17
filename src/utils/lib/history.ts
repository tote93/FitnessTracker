import { Workout, WorkoutExerciseEntry, WorkoutExerciseSet } from "@/services/types";

export const formatExerciseSummary = (entry?: WorkoutExerciseEntry) => {
  if (!entry?.sets?.length) return null;
  return entry.sets
    .map((set, index) => {
      const parts: string[] = [];
      if (set.weight !== undefined) parts.push(`${set.weight}${set.weightUnit ?? "kg"}`);
      if (set.reps !== undefined) parts.push(`${set.reps} reps`);
      return parts.join(" · ") || `Serie ${index + 1}`;
    })
    .join(" · ");
};

export const formatSetDetail = (set?: WorkoutExerciseSet, index?: number) => {
  if (!set) return `Serie ${index != null ? index + 1 : "-"}`;
  const weight = set.weight !== undefined ? `${set.weight}${set.weightUnit ?? "kg"}` : "Peso —";
  const reps = set.reps !== undefined ? `${set.reps} reps` : "Reps —";
  const rp = set.rp !== undefined ? `RP ${set.rp}` : null;
  return [weight, reps, rp].filter(Boolean).join(" · ");
};

export const getTotalWeightLifted = (workout?: Workout) => {
  if (!workout?.exercises) return 0;
  return workout.exercises.reduce((sum, exercise) => {
    const sets = exercise.sets ?? [];
    const delta = sets.reduce((setSum, set) => {
      const weight = set.weight ?? 0;
      const reps = set.reps ?? 1;
      return setSum + weight * reps;
    }, 0);
    return sum + delta;
  }, 0);
};

export const getPrimaryWeightUnit = (workout?: Workout) => {
  if (!workout?.exercises) return "kg";
  const unitCount: Record<string, number> = {};
  workout.exercises.forEach((exercise) => {
    exercise.sets?.forEach((set) => {
      const unit = set.weightUnit ?? "kg";
      unitCount[unit] = (unitCount[unit] ?? 0) + 1;
    });
  });
  const primaryUnit = Object.entries(unitCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  return primaryUnit ?? "kg";
};

export const getWorkoutMonthLabel = (date?: Date) =>
  date?.toLocaleDateString("es-ES", { month: "long", year: "numeric" }) ?? "Mes desconocido";

export const groupWorkoutsByMonth = (workouts: Workout[]) => {
  const sorted = [...workouts].sort((a, b) => b.date.getTime() - a.date.getTime());
  const groups: { title: string; data: Workout[] }[] = [];
  sorted.forEach((workout) => {
    const title = getWorkoutMonthLabel(workout.date);
    let section = groups.find((group) => group.title === title);
    if (!section) {
      section = { title, data: [] };
      groups.push(section);
    }
    section.data.push(workout);
  });
  return groups;
};
