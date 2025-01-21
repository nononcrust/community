import { Header } from "@/components/layout/header";
import { MainContainer } from "@/components/layout/main-container";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
