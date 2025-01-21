export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-page mx-auto mb-16 mt-8 flex min-h-dvh max-w-4xl flex-col">{children}</div>
  );
};
