function isLineSafe(line: string): boolean {
  let direction: number | null = null;

  const numbers = line.split(" ").map((number) => parseInt(number));
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] === numbers[i + 1]) {
      return false;
    }
    if (!direction) {
      direction = numbers[i] > numbers[i + 1] ? -1 : 1;
    }
    const diff = numbers[i + 1] - numbers[i];
    if ((Math.abs(diff) > 3) || (diff * direction < 0)) {
      return false;
    }
  }

  return true;
}

export function part1(input: string) {
  const lines = input.split("\n");

  const safeLines = lines.filter((line) => line.length > 0 && isLineSafe(line));

  return safeLines.length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
