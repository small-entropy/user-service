export interface ISimpelAnswer<T> {
  data: T[] | T | null;
  errors: Error[] | null;
  meta: Record<string, unknown> | null;
}
