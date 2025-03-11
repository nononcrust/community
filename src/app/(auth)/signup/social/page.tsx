import { ROUTE } from "@/configs/route";
import { ProviderInfo } from "@/services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignupForm } from "./_components/form";

export default async function SocialSignupPage() {
  const cookieStore = await cookies();
  const provider = cookieStore.get("provider");

  if (!provider) {
    return redirect(ROUTE.AUTH.SIGNUP.EMAIL);
  }

  const providerInfo = JSON.parse(provider.value) as ProviderInfo;

  return (
    <Suspense>
      <SignupForm providerInfo={providerInfo} />
    </Suspense>
  );
}
