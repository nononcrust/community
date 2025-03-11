"use client";

import { createContext } from "@/lib/context";
import { useState } from "react";
import { Session } from "./session";

type SessionContextValue = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

const [SessionContext, useSessionContext] = createContext<SessionContextValue>("Session");
export { useSessionContext };

type SessionContextProviderProps = {
  children: React.ReactNode;
  initialSession: Session | null;
};

export const SessionContextProvider = ({
  children,
  initialSession,
}: SessionContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(initialSession);

  const providerValue = {
    session,
    setSession,
  };

  return <SessionContext value={providerValue}>{children}</SessionContext>;
};
