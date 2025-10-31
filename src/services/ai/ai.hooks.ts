import { useQuery } from "@tanstack/react-query";
import { getAiCoachService } from "./index";

const aiQueryKeys = {
  guidance: (exerciseName: string | undefined) =>
    ["ai", "guidance", exerciseName ?? "unknown"] as const,
};

/**
 * React Query hook to fetch AI guidance for a given exercise name.
 *
 * @param exerciseName Name of the exercise to generate guidance for.
 * @param enabled Whether the query should execute automatically when the name is available.
 *                Defaults to false so callers can trigger the fetch manually via refetch().
 */
export function useAiGuidanceQuery(
  exerciseName: string | undefined,
  enabled: boolean = false,
) {
  return useQuery<string, Error>({
    queryKey: aiQueryKeys.guidance(exerciseName),
    queryFn: async () => {
      if (!exerciseName) {
        throw new Error("exerciseName is required");
      }

      const service = getAiCoachService();
      const guidance = await service.getGuidanceForExercise(exerciseName);

      if (!guidance) {
        throw new Error("Empty AI guidance response");
      }

      return guidance;
    },
    enabled: Boolean(exerciseName) && enabled,
    retry: 1,
    staleTime: 0,
  });
}
