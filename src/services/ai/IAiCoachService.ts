export interface IAiCoachService {
    getGuidanceForExercise(exerciseName: string): Promise<string>;
}
