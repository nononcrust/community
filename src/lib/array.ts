export type NonEmptyArray<T> = [T, ...T[]];

export const isNonEmptyArray = <T>(array: T[]): array is NonEmptyArray<T> => array.length > 0;

export const mapNonEmptyArray = <T, R>(
  array: NonEmptyArray<T>,
  callback: (value: T, index: number) => R,
) => {
  return array.map(callback) as NonEmptyArray<R>;
};
