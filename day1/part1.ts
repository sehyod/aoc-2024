import {BinaryHeap} from "@std/data-structures";

const input = await Deno.readTextFile("./input");

const left = new BinaryHeap<number>();
const right = new BinaryHeap<number>();

input.split("\n").forEach((line) => {
  if (!line) {
    return;
  }
  const regex = /\d+/g;
  const matches = line.match(regex)!;
  left.push(-matches[0]);
  right.push(-matches[1]);
});

let sum = 0;

for (const leftLocId of left.drain()) {
  const rightLocId = right.pop()!;
  sum += Math.abs(leftLocId - rightLocId);
}

console.log(sum);
