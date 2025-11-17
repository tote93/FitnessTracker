import { WorkoutExerciseEntry } from "@/services/types";

export const formatExerciseSummary = (entry?: WorkoutExerciseEntry) => {
  if (!entry) return null;
  const parts: string[] = [];
  if (entry.sets) parts.push(`${entry.sets} set${entry.sets === 1 ? "" : "s"}`);
  if (entry.reps) parts.push(`${entry.reps} rep${entry.reps === 1 ? "" : "s"}`);
  if (entry.weight) parts.push(`${entry.weight} kg`);
  return parts.length ? parts.join(" · ") : null;
};
