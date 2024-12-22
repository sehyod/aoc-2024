interface Node {
  pos: [number, number];
  dir: [number, number];
  dist: number;
}

const DIRS: [number, number][] = [[0, 1], [0, -1], [-1, 0], [1, 0]];

function getNeighbours(
  [i, j]: [number, number],
  [di, dj]: [number, number],
  maze: string[],
) {
  const candidates: Node[] = [{
    pos: [
      i + di,
      j + dj,
    ],
    dir: [di, dj],
    dist: 1,
  }];
  for (const k of [-1, 1]) {
    const di2 = di === 0 ? k : 0;
    const dj2 = dj === 0 ? k : 0;
    candidates.push({ pos: [i + di2, j + dj2], dir: [di2, dj2], dist: 1001 });
  }

  return candidates
    .filter(({ pos: [i, j] }) =>
      0 <= i && i < maze.length && 0 <= j && j < maze[0].length
    )
    .filter(({ pos: [i, j] }) => maze[i].charAt(j) !== "#");
}

function dijkstra(
  maze: string[],
  start: [number, number],
  end: [number, number],
) {
  const dist: Record<string, number> = {};
  dist[start.concat([0, 1]).join(",")] = 0;
  const preds: Record<string, Set<string>> = {};

  const queue: Node[] = [{ pos: start, dir: [0, 1], dist: 0 }];

  let smallestDist = Infinity;

  while (queue.length > 0) {
    queue.sort(({ pos: posA, dir: dirA }, { pos: posB, dir: dirB }) =>
      dist[posA.concat(dirA).join(",")] - dist[posB.concat(dirB).join(",")]
    );
    const { pos, dir, dist: nodeDist } = queue.shift()!;

    if (pos[0] === end[0] && pos[1] === end[1]) {
      smallestDist = Math.min(smallestDist, nodeDist);
    }

    const neighbours = getNeighbours(pos, dir, maze);
    neighbours.forEach(({ pos: neighbour, dir: neighbourDir, dist: d }) => {
      const newDist = nodeDist + d;

      if (newDist > smallestDist) {
        return;
      }

      const maybeNeighbourDist =
        dist[neighbour.concat(neighbourDir).join(",")] ?? null;

      if (maybeNeighbourDist === null || newDist < maybeNeighbourDist) {
        dist[neighbour.concat(neighbourDir).join(",")] = newDist;
        preds[neighbour.concat(neighbourDir).join(",")] = new Set(
          [pos.concat(dir).join(",")],
        );
      } else if (newDist === maybeNeighbourDist) {
        preds[neighbour.concat(neighbourDir).join(",")].add(
          pos.concat(dir).join(","),
        );
      } else {
        return;
      }
      queue.push({ pos: neighbour, dir: neighbourDir, dist: newDist });
    });
  }

  return preds;
}

export function part2(input: string) {
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

  const start: [number, number] = maybeStart;
  const end: [number, number] = maybeEnd;

  const preds = dijkstra(maze, start, end);

  const stack = DIRS.map((dir) => end.concat(dir).join(","));
  const nodes = new Set<string>();

  while (stack.length > 0) {
    const node = stack.pop()!;
    nodes.add(node.split(",").slice(0, 2).join(","));
    if (node in preds) {
      preds[node].forEach((n) => {
        stack.push(n);
      });
    }
  }

  return nodes.size;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
