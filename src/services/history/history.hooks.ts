import { useQuery } from "@tanstack/react-query";
import { getWorkoutHistory, GetWorkoutHistoryOptions } from "./history";
import { Workout } from "../types";

const query_keys = {
  history: (userId: string, opts: Partial<GetWorkoutHistoryOptions>) => ["history", userId, opts] as const,
};

export function useWorkoutHistoryQuery(userId?: string, opts: GetWorkoutHistoryOptions = {}) {
  return useQuery<Workout[]>({
    queryKey: query_keys.history(userId ?? "unknown", opts),
    queryFn: () => getWorkoutHistory(userId!, opts),
    enabled: !!userId,
    staleTime: 30_000,
  });
}
