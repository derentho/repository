import { Repository } from "../repository.ts";

/**
 * An abstract type of repository, wich use a specific strategy (to be
 *  specified using `generateKey`) to generate keys.
 *
 * @template K The type of the keys.
 * @template V The type of the values.
 */
export abstract class StrategyRepository<K extends string | number | symbol, V>
  extends Repository<K, V> {

    // --- Methods ---

  /**
   * Adds a `(key, value)` pair to the repository, with a automatically
   *  generated key.
   *
   * @param value The pair value.
   * @returns The inserted pair key.
   */
  createWithoutKey(value: V): K {
    return this.create(this.generateKey(), value);
  }

  /**
   * Retrieves a value from this repository, stored with a specific key.
   *
   * @param id The pair key.
   * @returns The pair value, or `undefined` if not present.
   */
  retrieveByKey(key: K): V | undefined {
    return this.retrieve((k, v) => k == key)[key];
  }


    // --- Tool ---

  /**
   * Generate a key for an element of this repository.
   */
  abstract generateKey(): K;

}
