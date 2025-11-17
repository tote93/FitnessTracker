import { client } from "../client";
import {
  Difficulty,
  Exercise,
  Media,
  MediaFormat,
  Workout,
  WorkoutExerciseEntry,
} from "../types";

export type GetWorkoutHistoryOptions = {
  fields?: string[];
  populate?: any;
  publicationState?: "live" | "preview";
  filters?: Record<string, any>;
  sort?: string[];
};

const DEFAULT_FIELDS = ["userId", "date", "duration", "calories_estimate", "createdAt", "updatedAt", "publishedAt"];
const DEFAULT_POPULATE = {
  exercises: {
    populate: {
      exercise: {
        populate: {
          image: {
            fields: ["url", "formats", "name", "alternativeText", "caption", "provider", "createdAt", "updatedAt"],
          },
        },
      },
    },
  },
};
const DEFAULT_SORT = ["date:desc"];

const toNumber = (value: unknown): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const parseDate = (value: unknown): Date | undefined => {
  if (value === undefined || value === null) return undefined;
  const parsed = value instanceof Date ? value : new Date(value as string);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const createFormat = (format?: Record<string, any>): MediaFormat => ({
  name: format?.name ?? "",
  hash: format?.hash ?? "",
  ext: format?.ext ?? "",
  mime: format?.mime ?? "",
  width: format?.width ?? 0,
  height: format?.height ?? 0,
  size: format?.size ?? 0,
  path: format?.path ?? "",
  url: format?.url ?? "",
});

const normalizeFormats = (formats?: Record<string, any>): Media["formats"] => ({
  thumbnail: createFormat(formats?.thumbnail),
  small: createFormat(formats?.small),
  medium: createFormat(formats?.medium),
  large: createFormat(formats?.large),
});

const normalizeMedia = (value: any): Media | undefined => {
  const entry = value?.data ?? value;
  const attributes = entry?.attributes ?? entry;
  if (!attributes) return undefined;
  return {
    id: entry?.id ?? attributes?.id ?? 0,
    name: attributes?.name ?? "",
    alternativeText: attributes?.alternativeText ?? "",
    caption: attributes?.caption ?? "",
    width: attributes?.width ?? 0,
    height: attributes?.height ?? 0,
    formats: normalizeFormats(attributes?.formats),
    hash: attributes?.hash ?? "",
    ext: attributes?.ext ?? "",
    mime: attributes?.mime ?? "",
    size: attributes?.size ?? 0,
    path: attributes?.path ?? "",
    url: attributes?.url ?? "",
    previewUrl: attributes?.previewUrl ?? "",
    provider: attributes?.provider ?? "",
    createdAt: parseDate(attributes?.createdAt) ?? new Date(),
    updatedAt: parseDate(attributes?.updatedAt) ?? new Date(),
  };
};

const normalizeExercise = (entry: any): Exercise => {
  const data = entry?.attributes ?? entry;
  return {
    id: entry?.id ?? data?.id ?? 0,
    createdAt: parseDate(data?.createdAt) ?? new Date(),
    updatedAt: parseDate(data?.updatedAt) ?? new Date(),
    publishedAt: parseDate(data?.publishedAt),
    name: data?.name ?? "",
    description: data?.description,
    difficulty: (data?.difficulty as Difficulty) ?? undefined,
    image: normalizeMedia(data?.image),
    videoUrl: data?.videoUrl,
    isActive: data?.isActive,
  };
};

const normalizeWorkoutExerciseEntry = (component: any): WorkoutExerciseEntry => {
  if (!component) return {};
  const exerciseRelation = component?.exercise;
  const exerciseData = exerciseRelation?.data ?? exerciseRelation;
  const normalizedExercise = exerciseData ? normalizeExercise(exerciseData) : undefined;

  return {
    id: component?.id,
    exercise: normalizedExercise,
    weight: toNumber(component?.weight),
    reps: toNumber(component?.reps),
    sets: toNumber(component?.sets),
    raw: component,
  };
};

const normalizeWorkoutExercises = (payload: any): WorkoutExerciseEntry[] => {
  if (!payload) return [];
  const items = Array.isArray(payload) ? payload : payload?.data ?? payload?.results ?? [];
  return items.map(normalizeWorkoutExerciseEntry);
};

const normalizeWorkout = (entry: any): Workout => {
  const attributes = entry?.attributes ?? entry ?? {};
  return {
    id: entry?.id ?? attributes?.id ?? 0,
    createdAt: parseDate(attributes?.createdAt ?? entry?.createdAt) ?? new Date(),
    updatedAt: parseDate(attributes?.updatedAt ?? entry?.updatedAt) ?? new Date(),
    publishedAt: parseDate(attributes?.publishedAt ?? entry?.publishedAt),
    userId: attributes?.userId ?? entry?.userId ?? "",
    date: parseDate(attributes?.date ?? entry?.date) ?? new Date(),
    duration: attributes?.duration ?? entry?.duration ?? 0,
    calories_estimate: attributes?.calories_estimate ?? entry?.calories_estimate,
    exercises: normalizeWorkoutExercises(attributes?.exercises ?? entry?.exercises),
  };
};

const extractDataArray = (payload: any): any[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

export async function getWorkoutHistory(
  userId: string,
  options: GetWorkoutHistoryOptions = {}
): Promise<Workout[]> {
  const {
    fields = DEFAULT_FIELDS,
    populate = DEFAULT_POPULATE,
    publicationState = "live",
    filters,
    sort = DEFAULT_SORT,
  } = options;

  const paramsFilters = {
    ...filters,
    userId: { $eq: userId },
  };

  const res = await client.get("/workouts", {
    params: {
      fields,
      populate,
      publicationState,
      filters: paramsFilters,
      sort,
    },
  });

  const data = extractDataArray(res);
  return data.map(normalizeWorkout);
}
