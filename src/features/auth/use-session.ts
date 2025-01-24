import { User, USER_ID } from "@/services/user";

type Session = {
  user: {
    id: User["id"];
    name: string;
  };
};

export const useSession = (): { session: Session | null } => {
  const session = {
    user: {
      id: USER_ID,
      name: "노논",
    },
  };

  return { session };
};

export const useAuthenticatedSession = () => {
  const { session } = useSession();

  if (!session) {
    throw new Error("세션이 존재하지 않습니다.");
  }

  return { session };
};
