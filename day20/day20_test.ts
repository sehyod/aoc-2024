import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe("Day 20", () => {
  it("Part 1", () => {
    const res = part1(exampleInput, 20);
    expect(res).toBe(5);
  });

  it("Part 2", () => {
    const res = part2(exampleInput, 70);
    expect(res).toBe(41);
  });
});
