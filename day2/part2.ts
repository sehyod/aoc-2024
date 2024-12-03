function isLineSafe(numbers: number[], tolerateUnsafe = true): boolean {
  let direction: number | null = null;

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] === numbers[i]) {
      if (tolerateUnsafe) {
        return [i - 1, i, i + 1].some((
          index,
        ) => isLineSafe(numbers.toSpliced(index, 1), false));
      }
      return false;
    }

    const diff = numbers[i + 1] - numbers[i];
    if (!direction) {
      direction = diff > 0 ? 1 : -1;
    }
    if ((Math.abs(diff) > 3) || (diff * direction < 0)) {
      if (tolerateUnsafe) {
        return [i - 1, i, i + 1].some((
          index,
        ) => isLineSafe(numbers.toSpliced(index, 1), false));
      }
      return false;
    }
  }

  return true;
}

export function part2(input: string) {
  const lines = input.split("\n");

  const safeLines = lines.filter((line) =>
    line.length > 0 &&
    isLineSafe(line.split(" ").map((number) => parseInt(number)))
  );

  return safeLines.length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
