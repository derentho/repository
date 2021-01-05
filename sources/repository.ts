import { Predicate } from "./predicate.ts";
import { Updater } from "./updater.ts";

/**
 * A repository is a set of `value` (type `V`), accessibles by `key` (type `K`),
 *  on which you can perform basics `CRUD` operations (`create`, `retrieve`,
 *  `update` and `delete`).
 * 
 * @template K The type of the keys.
 * @template V The type of the values.
 */
export class Repository<K extends string | number | symbol, V> {

    // --- Attributes ---

  #path: string;
  #data: Record<K, V>;


    // --- Constructor ---

  constructor(path: string) {
    this.#path = path;
    this.#data = {} as Record<K, V>;
  }


    // --- Getters ---

  /**
   * @returns The number of entries of this repository.
   */
  get size(): number {
    return Object.entries(this.#data).length;
  }


    // --- Methods ---

  /**
   * Saves the repository to the file system.
   */
  async save(): Promise<void> {
    const content = JSON.stringify(this.#data, null, 2);
    await Deno.writeTextFile(this.#path, content);
  }

  /**
   * Loads the repository from the file system.
   */
  async load(): Promise<void> {
    try {
      const content = await Deno.readTextFile(this.#path);
      this.#data = JSON.parse(content);
    } catch {
      this.#data = {} as Record<K, V>;
    }
  }

  /**
   * Adds a `(key, value)` pair to the repository.
   * 
   * @param key The pair key.
   * @param value The pair value.
   * @returns Whether a pair has been deleted or not.
   */
  create(key: K, value: V): boolean {
    const erased = this.#data[key] ? true : false;
    this.#data[key] = value;
    return erased;
  }

  /**
   * Retrieves a subset of the repository.
   * 
   * @param predicate A function filtering the repository.
   * @returns The computed subset.
   */
  retrieve(predicate: Predicate<K, V>): Record<K, V> {
    const data = {} as Record<K, V>;
    for (const key in this.#data) {
      const value = this.#data[key];
      if (predicate(key, value)) {
        data[key] = value;
      }
    }
    return data;
  }

  /**
   * Retrieves the entire repository.
   * 
   * @returns The full repository.
   */
  retrieveAll(): Record<K, V> {
    return this.retrieve(() => true);
  }

  /**
   * Updates a subset of the repository.
   * 
   * @param predicate A function filtering the repository.
   * @param updater A function modifying the subset.
   * @returns The number of updated entry.
   */
  update(predicate: Predicate<K, V>, updater: Updater<V>): number {
    let updated = 0;
    for (const key in this.#data) {
      const value = this.#data[key];
      if (predicate(key, value)) {
        this.#data[key] = updater(value);
        updated += 1;
      }
    }
    return updated;
  }

  /**
   * Deletes a subset of the repository.
   * 
   * @param predicate A function filtering the repository.
   * @returns The number of deleted entry.
   */
  delete(predicate: Predicate<K, V>): number {
    let deleted = 0;
    for (const key in this.#data) {
      if (predicate(key, this.#data[key])) {
        delete this.#data[key];
        deleted += 1;
      }
    }
    return deleted;
  }

}
