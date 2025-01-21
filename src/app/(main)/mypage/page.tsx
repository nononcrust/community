import { getTime } from "@/actions/time";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const time = getTime();

  return <main>{time}</main>;
}
