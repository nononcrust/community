export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-md flex-col">{children}</div>;
}
