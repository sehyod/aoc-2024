const input = await Deno.readTextFile("./input");

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

console.log(
  left.map((leftValue) => leftValue in right ? leftValue * right[leftValue] : 0)
    .reduce((sum, currentValue) => sum + currentValue, 0),
);
