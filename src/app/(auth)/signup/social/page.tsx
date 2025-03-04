import { ProviderInfo } from "@/services/auth";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { SignupForm } from "./_components/form";

export default async function SocialSignupPage() {
  const cookieStore = await cookies();
  const provider = cookieStore.get("provider");

  const providerInfo = provider ? (JSON.parse(provider.value) as ProviderInfo) : null;

  return (
    <Suspense>
      <SignupForm providerInfo={providerInfo} />
    </Suspense>
  );
}
