import { useLogout } from "@/services/auth";
import { useSessionContext } from "./session-context-provider";

export const useAuth = () => {
  const { setSession } = useSessionContext();
  const logoutMutation = useLogout();

  const logout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setSession(null);
      },
    });
  };

  return { logout };
};
