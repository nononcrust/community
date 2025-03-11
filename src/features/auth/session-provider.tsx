import { cookies } from "next/headers";
import { getSession } from "./session";
import { SessionContextProvider } from "./session-context-provider";

export const SessionProvider = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const session = await getSession(cookieStore);

  return <SessionContextProvider initialSession={session}>{children}</SessionContextProvider>;
};
