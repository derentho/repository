
/**
 * A predicate is a filtering function on a set of `(key, value)` pair.
 */
export type Predicate<K, V> = (key: K, value: V) => boolean;
