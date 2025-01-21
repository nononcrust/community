import { useSuspenseQuery } from "@tanstack/react-query";
import { api, QUERY_KEY } from "./shared";

export const usePosts = (request: Parameters<typeof api.posts.$get>[0]) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.POST.LIST],
    queryFn: () => api.posts.$get(request),
  });
};
