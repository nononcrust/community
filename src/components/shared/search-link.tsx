"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type SearchLinkProps = Omit<LinkProps, "href"> & {
  className?: string;
  query: Record<string, string | number | null>;
  children?: React.ReactNode;
};

export const SearchLink = ({ className, query, children, ...props }: SearchLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const allSearchParams = Object.fromEntries(searchParams);

  const filteredSearchParamsEntries = Object.entries(allSearchParams).filter(([key]) => {
    return !(key in query);
  });

  const filteredSearchParams = Object.fromEntries(filteredSearchParamsEntries);

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter((entry) => entry[1] !== null),
  );

  return (
    <Link
      className={className}
      href={{
        pathname,
        query: {
          ...filteredSearchParams,
          ...filteredQuery,
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
