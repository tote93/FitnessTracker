import { IAiCoachService } from "./IAiCoachService";
import { OllamaAiCoachService } from "./OllamaAiCoachService";
// import { OpenAiCoachService } from "./OpenAiCoachService";

let aiCoachServiceSingleton: IAiCoachService | null = null;

export function getAiCoachService(): IAiCoachService {
    if (!aiCoachServiceSingleton) {
        aiCoachServiceSingleton = new OllamaAiCoachService();
        // aiCoachServiceSingleton = new OpenAiCoachService();
    }
    return aiCoachServiceSingleton;
}
