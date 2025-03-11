import { useSessionContext } from "./session-context-provider";

export const useSession = () => {
  const { session } = useSessionContext();

  return { session };
};

export const useAuthenticatedSession = () => {
  const { session } = useSession();

  if (!session) {
    throw new Error("세션이 존재하지 않습니다.");
  }

  return { session };
};
