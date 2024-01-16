export function compareByKey<T>(key: string | ((obj: T) => string)) {
  return function (a: T, b: T) {
    const valueA = typeof key === "function" ? key(a) : getNestedValue(a, key);
    const valueB = typeof key === "function" ? key(b) : getNestedValue(b, key);

    const valueAUpperCase = (valueA as string).toUpperCase();
    const valueBUpperCase = (valueB as string).toUpperCase();

    if (valueAUpperCase < valueBUpperCase) {
      return -1;
    }
    if (valueAUpperCase > valueBUpperCase) {
      return 1;
    }

    // Values are equal
    return 0;
  };
}

// Function to get nested values in an object
function getNestedValue(obj: any, key: string) {
  const keys = key.split(".");
  return keys.reduce(
    (value, key) =>
      value && value[key] !== undefined ? value[key] : undefined,
    obj
  );
}
