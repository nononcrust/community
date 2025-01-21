import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParam = (key: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const setSearchParam = (value: string) => {
    router.push(pathname + "?" + createQueryString(key, value));
  };

  return {
    value: searchParams.get(key),
    setSearchParam,
  };
};
