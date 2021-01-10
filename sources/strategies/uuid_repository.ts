import { v4 } from "../../deps.ts";
import { StrategyRepository } from "./strategy_repository.ts";

/**
 * A specific type of repository, which use generated UUID as keys.
 *
 * @template V The type of the values.
 */
export class UUIDRepository<V> extends StrategyRepository<string, V> {

    // --- Tool ---

  /**
   * Generate a key for an element of this repository.
   */
  generateKey(): string {
    return v4.generate();
  }

}
