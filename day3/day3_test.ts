import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

describe("Day 1", () => {
  it("Part 1", () => {
    const exampleInput =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const res = part1(exampleInput);
    expect(res).toBe(161);
  });

  it("Part 2", () => {
    const exampleInput =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const res = part2(exampleInput);
    expect(res).toBe(48);
  });
});
