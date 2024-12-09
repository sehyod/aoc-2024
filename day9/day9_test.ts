import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `2333133121414131402`;

describe("Day 9", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(1928);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(2858);
  });
});
