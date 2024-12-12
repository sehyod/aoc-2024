function neighbours(
  i: number,
  j: number,
  garden: ReadonlyArray<string>,
): [number, number][] {
  const candidates: [number, number][] = [[i - 1, j], [i + 1, j], [i, j - 1], [
    i,
    j + 1,
  ]];
  return candidates
    .filter(([k, l]) =>
      0 <= k && k < garden.length && 0 <= l && l < garden[0].length
    );
}

function bfs(i: number, j: number, garden: ReadonlyArray<string>) {
  let perimeter = 0;
  let area = 0;
  const visited = new Set<string>();
  const queue: [number, number][] = [[i, j]];

  visited.add(`${i}-${j}`);

  while (queue.length > 0) {
    const [[k, l]] = queue.splice(0, 1);
    area += 1;

    const samePlantNeighbours = neighbours(k, l, garden)
      .filter(([m, n]) => garden[m].charAt(n) === garden[k].charAt(l));

    perimeter += 4 - samePlantNeighbours.length;

    const nextNeighbours = samePlantNeighbours
      .filter(([k, l]) => !visited.has(`${k}-${l}`));

    nextNeighbours.forEach(([m, n]) => visited.add(`${m}-${n}`));

    queue.push(...nextNeighbours);
  }

  return { visited, perimeter, area };
}

export function part1(input: string) {
  const garden = input.split("\n").filter(Boolean);
  let visited = new Set<string>();
  let price = 0;

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[0].length; j++) {
      if (!visited.has(`${i}-${j}`)) {
        const { visited: bfsVisited, perimeter, area } = bfs(i, j, garden);
        visited = visited.union(bfsVisited);
        price += perimeter * area;
      }
    }
  }

  return price;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
