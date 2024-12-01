export function part2(input: string) {
  const left: Array<number> = [];
  const right: Record<number, number> = {};

  input.split("\n").forEach((line) => {
    if (!line) {
      return;
    }
    const regex = /\d+/g;
    const matches = line.match(regex)!;
    left.push(parseInt(matches[0]));

    const rightValue = parseInt(matches[1]);
    if (!(rightValue in right)) right[rightValue] = 0;
    right[rightValue] += 1;
  });

  return left.map((leftValue) =>
    leftValue in right ? leftValue * right[leftValue] : 0
  )
    .reduce((sum, currentValue) => sum + currentValue, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}
if (import.meta.main) {
  await main();
}
