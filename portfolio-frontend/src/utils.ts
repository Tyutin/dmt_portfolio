
export function getPlainObject<T>(object:T):T {
  return JSON.parse(JSON.stringify(object)) as T
}