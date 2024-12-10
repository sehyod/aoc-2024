import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
const exampleInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("Day 10", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(36);
  });
  });
