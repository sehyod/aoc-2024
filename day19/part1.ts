function matchTowel(
  towel: string,
  pattern: string,
): boolean {
  return pattern.startsWith(towel);
}

function match(
  pattern: string,
  towels: string[],
): boolean {
  if (pattern.length === 0) {
    return true;
  }

  return towels.some((towel) =>
    matchTowel(towel, pattern) && match(pattern.slice(towel.length), towels)
  );
}

export function part1(input: string) {
  const [rawTowels, rawPatterns] = input
    .split("\n\n");

  const towels = rawTowels.split(", ");
  const patterns = rawPatterns.split("\n").filter(Boolean);

  return patterns.filter((pattern) => match(pattern, towels)).length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
