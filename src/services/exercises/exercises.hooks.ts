import { useQuery } from "@tanstack/react-query";
import { getExercises, getExerciseById, GetExercisesOptions } from "@/services/exercises/exercises";
import { Exercise } from "@/services/types";

const query_keys = {
  list: (opts: Partial<GetExercisesOptions>) => ["exercises", opts] as const,
  detail: (id: number | string) => ["exercise", id] as const,
};

/** List query hook for exercises */
export function useExercisesQuery(opts: GetExercisesOptions) {
  return useQuery<Exercise[]>({
    queryKey: query_keys.list(opts),
    queryFn: () => getExercises(opts),
    staleTime: 30_000,
  });
}

/** Detailed query hook for a single exercise by ID */
export function useExerciseQuery(id?: number | string) {
  return useQuery({
    queryKey: query_keys.detail(id ?? "unknown"),
    queryFn: () => getExerciseById(id!),
    enabled: !!id, // only run if id is provided
    staleTime: 30_000,
  });
}
