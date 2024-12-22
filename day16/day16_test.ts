import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
const exampleInput = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

describe("Day 16", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(7046);
  });
});
