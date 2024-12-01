import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("Day 1", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(11);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(31);
  });
});
