import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";

const exampleInput = `125 17`;

describe("Day 11", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(55312);
  });
});
