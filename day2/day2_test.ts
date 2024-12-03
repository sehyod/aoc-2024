import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("Day 2", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(2);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(4);
  });
});
