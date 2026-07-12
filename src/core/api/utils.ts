export const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const convertSnakeToCamel = <T>(data: unknown): T => {
  if (Array.isArray(data)) {
    return data.map(item => convertSnakeToCamel(item)) as T;
  }

  if (data !== null && typeof data === 'object') {
    const result: Record<string, unknown> = {};
    Object.entries(data).forEach(([key, value]) => {
      const camelKey = snakeToCamel(key);
      result[camelKey] = convertSnakeToCamel(value);
    });
    return result as T;
  }

  return data as T;
};
