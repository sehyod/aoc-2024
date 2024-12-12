import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

describe("Day 12", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(1930);
  });

  it("Part 2", () => {
    const res = part2(exampleInput);
    expect(res).toBe(1206);
  });
});
