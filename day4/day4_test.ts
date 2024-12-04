import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("Day 4", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(18);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(9);
  });
});
