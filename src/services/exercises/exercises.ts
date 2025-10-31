import { client } from "../client";
import { Exercise } from "../types";

export type GetExercisesOptions = {
  fields?: string[];
  populate?: any;
  publicationState?: "live" | "preview";
  filters?: Record<string, any>;
  sort?: string[];
};

/**
 * Fetches a list of exercises from Strapi.
 *
 * @param {Object} [options] - Optional query parameters.
 * @param {string[]} [options.fields] - Fields to retrieve.
 * @param {any} [options.populate] - Relations to populate.
 * @param {'live'|'preview'} [options.publicationState] - Publication state filter.
 * @param {Record<string, any>} [options.filters] - Strapi-style filters.
 * @param {string[]} [options.sort] - Sorting options, e.g. ['name:asc'].
 * @returns {Promise<Exercise[]>} List of exercises.
 */

export async function getExercises(options: GetExercisesOptions = {}): Promise<Exercise[]> {
  const { fields = ["name", "description", "difficulty", "videoUrl"], populate = { image: { fields: ["url", "formats"] } }, publicationState = "live", filters, sort } = options;
  const res = await client.get("/exercises", {
    params: {
      fields,
      populate,
      publicationState,
      filters,
      sort,
    },
  });
  return res.data as Exercise[];
}

/**
 * Fetches a single exercise by its ID from Strapi.
 *
 * @param {number|string} id - The ID of the exercise to fetch.
 * @param {Object} [options] - Optional query parameters.
 * @param {string[]} [options.fields] - Fields to retrieve.
 * @param {any} [options.populate] - Relations to populate.
 * @param {'live'|'preview'} [options.publicationState] - Publication state filter.
 * @returns {Promise<Exercise>} The exercise data.
 */
export async function getExerciseById(
  id: number | string,
  options: {
    fields?: string[];
    populate?: any;
    publicationState?: "live" | "preview";
  } = {}
): Promise<Exercise> {
  const { fields = ["name", "description", "difficulty", "videoUrl"], populate = { image: { fields: ["url", "formats"] } }, publicationState = "live" } = options;

  const res = await client.get("/exercises", {
    params: {
      fields,
      populate,
      publicationState,
      filters: { id: { $eq: id } },
    },
  });
  const arr = Array.isArray(res.data) ? res.data : res.data?.data;

  const record = arr?.[0];
  if (!record) {
    const e: any = new Error("NOT_FOUND");
    e.status = 404;
    throw e;
  }
  return record as Exercise;
}
