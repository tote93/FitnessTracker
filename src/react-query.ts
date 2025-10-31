// src/react-query.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // data is fresh for 60 seconds
      gcTime: 5 * 60_000, // cache garbage collected after 5 minutes
      retry: 1, // retry once on transient network errors
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // do not retry mutations
    },
  },
});
