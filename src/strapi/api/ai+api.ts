import { Exercise } from "@/services/types";

export type AiGuidanceResponse = {
    text: string;
};

export async function getAiGuidance(exercise: Exercise): Promise<AiGuidanceResponse> {
    return;
}
