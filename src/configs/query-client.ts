import { Duration } from "@/lib/duration";
import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Duration.minutes(1),
      gcTime: 0,
    },
  },
} satisfies QueryClientConfig;
