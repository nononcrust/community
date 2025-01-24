import { NonEmptyArray } from "@/lib/array";
import { Category } from "@/services/category";
import { createParser, parseAsFloat, parseAsString } from "nuqs/server";

export const postSearchParamsSchema = {
  page: parseAsFloat.withDefault(1),
  limit: parseAsFloat.withDefault(20),
  search: parseAsString.withDefault(""),
};

export const createCategorySearchParamsSchema = (categoryIds: NonEmptyArray<Category["id"]>) => {
  const parseAsCategory = createParser({
    parse: (queryValue) => {
      if (categoryIds.includes(queryValue)) {
        return queryValue;
      }

      return null;
    },
    serialize: (value) => value,
  });

  return {
    category: parseAsCategory,
  };
};
