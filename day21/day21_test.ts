import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";
import { part2 } from "./part2.ts";

const exampleInput = `029A
980A
179A
456A
379A`;

describe("Day 21", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(126384);
  });
});
