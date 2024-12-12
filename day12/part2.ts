function isPosValid(i: number, j: number, garden: ReadonlyArray<string>) {
  return 0 <= i && i < garden.length && 0 <= j && j < garden[0].length;
}

function neighbours(
  i: number,
  j: number,
  garden: ReadonlyArray<string>,
): [number, number][] {
  const candidates: [number, number][] = [[i - 1, j], [i + 1, j], [i, j - 1], [
    i,
    j + 1,
  ]];
  return candidates.filter(([k, l]) => isPosValid(k, l, garden));
}

function bfs(i: number, j: number, garden: ReadonlyArray<string>) {
  let sides = 0;
  let area = 0;
  const visited = new Set<string>();
  const queue: [number, number][] = [[i, j]];

  visited.add(`${i}-${j}`);

  while (queue.length > 0) {
    const [[k, l]] = queue.splice(0, 1);
    const currentPlant = garden[k].charAt(l);
    area += 1;

    const samePlantNeighbours = neighbours(k, l, garden)
      .filter(([m, n]) => garden[m].charAt(n) === currentPlant);

    [[1, 0], [0, -1], [-1, 0], [0, 1]].forEach(([di, dj], idx, arr) => {
      const [dk, dl] = arr[(idx + 1) % arr.length];

      if (
        (!isPosValid(k + di, l + dj, garden) ||
          garden[k + di].charAt(l + dj) !== currentPlant) &&
        (!isPosValid(k + dk, l + dl, garden) ||
          garden[k + dk].charAt(l + dl) !== currentPlant)
      ) {
        sides += 1;
      }
    });

    [[1, 1], [1, -1], [-1, -1], [-1, 1]].forEach(([di, dj]) => {
      if (
        isPosValid(k + di, l + dj, garden) &&
        garden[k + di].charAt(l + dj) !== currentPlant &&
        garden[k].charAt(l + dj) === currentPlant &&
        garden[k + di].charAt(l) === currentPlant
      ) {
        sides += 1;
      }
    });

    const nextNeighbours = samePlantNeighbours
      .filter(([k, l]) => !visited.has(`${k}-${l}`));

    nextNeighbours.forEach(([m, n]) => visited.add(`${m}-${n}`));

    queue.push(...nextNeighbours);
  }

  return { visited, sides, area };
}

export function part2(input: string) {
  const garden = input.split("\n").filter(Boolean);
  let visited = new Set<string>();
  let price = 0;

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[0].length; j++) {
      if (!visited.has(`${i}-${j}`)) {
        const { visited: bfsVisited, sides, area } = bfs(i, j, garden);
        visited = visited.union(bfsVisited);
        price += sides * area;
      }
    }
  }

  return price;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
