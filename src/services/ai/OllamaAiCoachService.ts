import { IAiCoachService } from "./IAiCoachService";

export class OllamaAiCoachService implements IAiCoachService {
    async getGuidanceForExercise(exerciseName: string): Promise<string> {
        if (!exerciseName) {
            throw new Error("exerciseName is required");
        }
        const res = await fetch(`${process.env.EXPO_PUBLIC_AI_TEST_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exerciseName,
            }),
        });

        if (!res.ok) {
            throw new Error("AI server error");
        }

        const data = await res.json();

        if (!data?.text) {
            throw new Error("Empty AI response");
        }
        return data.text as string;
    }
}
