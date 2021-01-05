import { assertEquals } from "./deps.test.ts";

Deno.test({
  name: "version should match",
  fn: () => {
    // Given
    const expected = "1.6.3";
    // When
    const actual = Deno.version.deno;
    // Then
    assertEquals(actual, expected);
  },
});
