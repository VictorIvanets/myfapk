export const cleanStr = (s: string) => s.trim().replace(/\s+/g, ' ');

const cleanObjectStrings = <T extends Record<string, any>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'string' ? cleanStr(value) : value,
    ]),
  ) as T;
};

export default cleanObjectStrings;
