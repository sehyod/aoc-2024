import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe("Day 19", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(6);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(16);
  });
});
