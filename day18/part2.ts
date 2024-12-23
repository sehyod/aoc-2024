interface Node {
  pos: [number, number];
  dist: number;
}

function getNeighbours(
  [i, j]: [number, number],
  size: number,
  obstacles: Set<string>,
) {
  const candidates: [number, number][] = [];
  for (const k of [-1, 1]) {
    candidates.push([i + k, j], [i, j + k]);
  }

  return candidates
    .filter(([k, l]) => 0 <= k && k < size && 0 <= l && l < size)
    .filter((pos) => !obstacles.has(pos.join(",")));
}

function dijkstra(
  start: [number, number],
  end: [number, number],
  size: number,
  obstacles: Set<string>,
) {
  const dist: Record<string, number> = {};
  dist[start.join(",")] = 0;
  const visited = new Set<string>();
  const preds: Record<string, Set<string>> = {};

  const queue: Node[] = [{ pos: start, dist: 0 }];

  let smallestDist = Infinity;

  while (queue.length > 0) {
    queue.sort(({ pos: posA }, { pos: posB }) =>
      dist[posA.join(",")] - dist[posB.join(",")]
    );
    const { pos, dist: nodeDist } = queue.shift()!;

    if (visited.has(pos.join(","))) {
      continue;
    }
    visited.add(pos.join(","));

    if (pos[0] === end[0] && pos[1] === end[1]) {
      smallestDist = Math.min(smallestDist, nodeDist);
    }

    const neighbours = getNeighbours(pos, size, obstacles);
    neighbours.forEach((neighbour) => {
      const newDist = nodeDist + 1;

      if (newDist > smallestDist) {
        return;
      }

      const maybeNeighbourDist = dist[neighbour.join(",")] ?? null;

      if (maybeNeighbourDist === null || newDist < maybeNeighbourDist) {
        dist[neighbour.join(",")] = newDist;
        preds[neighbour.join(",")] = new Set(
          [pos.join(",")],
        );
      } else if (newDist === maybeNeighbourDist) {
        preds[neighbour.join(",")].add(
          pos.join(","),
        );
      } else {
        return;
      }
      queue.push({ pos: neighbour, dist: newDist });
    });
  }

  return end.join(",") in preds ? preds : null;
}

function getPathFromPreds(
  end: string,
  preds: Record<string, Set<string>>,
): string[] {
  if (!(end in preds)) {
    return [end];
  }

  return getPathFromPreds(Array.from(preds[end])[0], preds).concat(end);
}

export function part2(input: string, size: number = 71, bytes: number = 1024) {
  const obstacles = input
    .split("\n")
    .filter(Boolean);

  const start: [number, number] = [0, 0];
  const end: [number, number] = [size - 1, size - 1];

  do {
    const preds = dijkstra(
      start,
      end,
      size,
      new Set(obstacles.slice(0, bytes)),
    );

    if (preds === null) {
      break;
    }

    const path: string[] = getPathFromPreds(end.join(","), preds);

    while (true) {
      const obstacle = obstacles[bytes];
      bytes++;
      if (path.includes(obstacle)) {
        break;
      }
    }
  } while (true);

  return obstacles[bytes - 1];
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
