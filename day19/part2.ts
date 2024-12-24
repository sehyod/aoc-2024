function matchTowel(
  towel: string,
  pattern: string,
): boolean {
  return pattern.startsWith(towel);
}

const cache: Record<string, number> = {};
function match(
  pattern: string,
  towels: string[],
): number {
  if (pattern in cache) {
    return cache[pattern];
  }

  if (pattern.length === 0) {
    cache[pattern] = 1;
    return 1;
  }

  const res = towels.map((towel) =>
    matchTowel(towel, pattern) ? match(pattern.slice(towel.length), towels) : 0
  ).reduce((acc, cur) => acc + cur, 0);

  cache[pattern] = res;
  return res;
}

export function part2(input: string) {
  const [rawTowels, rawPatterns] = input
    .split("\n\n");

  const towels = rawTowels.split(", ");
  const patterns = rawPatterns.split("\n").filter(Boolean);

  return patterns.map((pattern) => match(pattern, towels)).reduce(
    (acc, cur) => acc + cur,
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
