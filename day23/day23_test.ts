import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1 } from "./part1.ts";

const exampleInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

describe("Day 23", () => {
  it("Part 1", () => {
    const res = part1(exampleInput);
    expect(res).toBe(7);
  });
});
