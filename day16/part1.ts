function getNeighbours(
  [i, j]: [number, number],
  [di, dj]: [number, number],
  maze: string[],
) {
  const candidates: [[number, number], [number, number], number][] = [[
    [
      i + di,
      j + dj,
    ],
    [di, dj],
    1,
  ]];
  for (const k of [-1, 1]) {
    const di2 = di === 0 ? k : 0;
    const dj2 = dj === 0 ? k : 0;
    candidates.push([[i + di2, j + dj2], [di2, dj2], 1001]);
  }

  return candidates
    .filter(([[i, j]]) =>
      0 <= i && i < maze.length && 0 <= j && j < maze[0].length
    )
    .filter(([[i, j]]) => maze[i].charAt(j) !== "#");
}

function dijkstra(
  maze: string[],
  start: [number, number],
  end: [number, number],
) {
  const dist: Record<string, number> = {};
  const visited = new Set<string>();
  dist[start.join(",")] = 0;

  const queue: [[number, number], [number, number]][] = [[start, [0, 1]]];

  while (queue.length > 0) {
    queue.sort(([posA], [posB]) => dist[posA.join(",")] - dist[posB.join(",")]);
    const [pos, dir] = queue.shift()!;

    visited.add(pos.join(","));

    const neighbours = getNeighbours(pos, dir, maze);
    neighbours.forEach(([neighbour, neighbourDir, d]) => {
      const strNeighbour = neighbour.join(",");
      if (!visited.has(strNeighbour)) {
        queue.push([neighbour, neighbourDir]);
        const newDist = dist[pos.join(",")] + d;
        if (!(strNeighbour in dist) || newDist < dist[strNeighbour]) {
          dist[strNeighbour] = newDist;
        }
        if (neighbour[0] === end[0] && neighbour[1] === end[1]) {
          return newDist;
        }
      }
    });
  }

  return dist[end.join(",")];
}

export function part1(input: string) {
  const maze = input.split("\n").filter(Boolean);
  let maybeStart: [number, number] | null = null;
  let maybeEnd: [number, number] | null = null;

  maze.forEach((row, i) => {
    [...row].forEach((c, j) => {
      if (c === "S") {
        maybeStart = [i, j];
      }
      if (c === "E") {
        maybeEnd = [i, j];
      }
    });
  });

  if (maybeStart === null || maybeEnd === null) {
    throw new Error("Could not find start and end positions");
  }

  const start = maybeStart;
  const end = maybeEnd;

  return dijkstra(maze, start, end);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
