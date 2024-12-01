import {expect} from "@std/expect";
import {describe, it} from "@std/testing/bdd";
import {part1} from "./part1.ts";
import {part2} from "./part2.ts";

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("Part 1", () => {
  it("should return value from the example", () => {
    const res = part1(exampleInput);
    expect(res).toBe(11);
  });
});

describe("Part 2", () => {
  it("should return value from the example", () => {
    const res = part2(exampleInput);
    expect(res).toBe(31);
  });
});
