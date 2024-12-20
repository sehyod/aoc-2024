import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";

const exampleInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

describe("Day 17", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe("4,6,3,5,6,3,5,2,1,0");
  });
});
