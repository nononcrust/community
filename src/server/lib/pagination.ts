export const getTotalPages = (total: number, limit: number) => {
  if (total === 0 || limit === 0) {
    return 1;
  }

  return Math.ceil(total / limit);
};
