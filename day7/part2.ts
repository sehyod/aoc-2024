function isValid(value: number, numbers: number[]): boolean {
  if (numbers.length === 1) return value === numbers[0];

  const [first, second, ...rest] = numbers;
  if (first > value) return false;

  return isValid(value, [first + second, ...rest]) ||
    isValid(value, [first * second, ...rest]) ||
    isValid(value, [parseInt(`${first}${second}`), ...rest]);
}

export function part2(input: string) {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(": "))
    .map<[number, number[]]>((
      [value, numbers],
    ) => [parseInt(value), numbers.split(" ").map((n) => parseInt(n))])
    .filter(([value, numbers]) => isValid(value, numbers))
    .reduce(
      (sum, curr) => sum + curr[0],
      0,
    );
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
