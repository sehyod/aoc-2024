const cache: Record<string, number> = {};

function score(stone: number, iterations: number = 75): number {
  const key = `${stone}-${iterations}`;

  if (key in cache) {
    return cache[key];
  }

  if (iterations === 0) {
    cache[key] = 1;
    return 1;
  }

  const stoneStr = `${stone}`;

  let res: number;

  if (stone === 0) {
    res = score(1, iterations - 1);
  } else if (stoneStr.length % 2 === 0) {
    res = score(
      parseInt(stoneStr.slice(0, Math.floor(stoneStr.length / 2))),
      iterations - 1,
    ) +
      score(
        parseInt(stoneStr.slice(Math.floor(stoneStr.length / 2))),
        iterations - 1,
      );
  } else {
    res = score(2024 * stone, iterations - 1);
  }

  cache[key] = res;
  return res;
}

export function part2(input: string) {
  const stones = input
    .replace("\n", "")
    .split(" ")
    .map((s) => parseInt(s));

  return stones.map((s) => score(s)).reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
