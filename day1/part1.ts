import {BinaryHeap} from "@std/data-structures";

function part1(input: string) {
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

  return sum;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
