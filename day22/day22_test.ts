import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";

describe("Day 22", () => {
  it("Part 1", () => {
    const exampleInput = `1
10
100
2024`;

    const res = part1(exampleInput);
    expect(res).toBe(37327623);
  });
});
