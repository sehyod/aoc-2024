import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe("Day 8", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(14);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(34);
  });
});