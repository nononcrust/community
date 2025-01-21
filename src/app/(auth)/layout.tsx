export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-2xl flex-col">{children}</div>;
}
