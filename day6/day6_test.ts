import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("Day 6", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(41);
  });

  it("Part 2", () => {
    const progress = () => ({ next: () => {} });
    const res = part2(exampleInput, progress);
    expect(res).toBe(6);
  });
});
