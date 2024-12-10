function neighbours(
  i: number,
  j: number,
  map: ReadonlyArray<string>,
): [number, number][] {
  const candidates: [number, number][] = [[i - 1, j], [i + 1, j], [i, j - 1], [
    i,
    j + 1,
  ]];
  return candidates.filter(([k, l]) =>
    0 <= k && k < map.length && 0 <= l && l < map[0].length
  );
}

function destinations(
  i: number,
  j: number,
  map: ReadonlyArray<string>,
  height: number = 0,
): Set<string> {
  const accessibleNeighbours = neighbours(i, j, map)
    .filter(([k, l]) => parseInt(map[k].charAt(l)) === height + 1);

  if (height === 8) {
    return new Set(accessibleNeighbours.map(([k, l]) => `${k}-${l}`));
  }

  return accessibleNeighbours
    .map(([k, l]) => destinations(k, l, map, height + 1))
    .reduce((a, b) => b.union(a), new Set());
}

export function part1(input: string) {
  const map = input.split("\n").filter(Boolean);

  return map.flatMap((row, i) =>
    [...row]
      .map((c, j) => [parseInt(c), j]).filter(([h, _j]) => h === 0)
      .map(([_h, j]) => destinations(i, j, map).size)
  ).reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
