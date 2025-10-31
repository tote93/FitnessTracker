import { Exercise } from "@/services/types";
const API_URL = process.env.EXPO_PUBLIC_STRAPI_PUBLIC_URL || process.env.EXPO_PUBLIC_STRAPI_TEST_URL;

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-green-500";
    case "intermediate":
      return "bg-yellow-500";
    case "advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getDifficultyText = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

export const getMediaUrl = (item: Exercise) => {
  const imageUrl = item.image.url ? `${API_URL}${item.image.url}` : null;
  return imageUrl;
};
