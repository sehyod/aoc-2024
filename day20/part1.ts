function getNeighbours(
  [i, j]: [number, number],
  maze: string[],
  cheat: boolean = false,
) {
  const candidates: [number, number][] = [[i - 1, j], [i + 1, j], [i, j - 1], [
    i,
    j + 1,
  ]];

  return candidates
    .filter(([k, l]) =>
      0 <= k && k < maze.length && 0 <= l && l < maze[0].length
    )
    .filter(([k, l]) => cheat || maze[k].charAt(l) !== "#");
}

export function part1(input: string, gain: number = 100) {
  const maze: string[] = [];
  let maybeStartPos: [number, number] | null = null;
  let maybeEndPos: [number, number] | null = null;

  input.split("\n").filter(Boolean).forEach((l, i) => {
    maze.push(l);
    if (l.includes("S")) {
      maybeStartPos = [i, l.indexOf("S")];
    }
    if (l.includes("E")) {
      maybeEndPos = [i, l.indexOf("E")];
    }
  });

  const dist: number[][] = new Array(maze.length).fill(0).map(() =>
    new Array(maze[0].length).fill(Infinity)
  );
  const startPos = maybeStartPos!;
  const endPos = maybeEndPos!;
  const visited = new Set<string>();
  const path: [number, number][] = [];

  let pos = endPos;
  let i = 0;

  while (pos[0] !== startPos[0] || pos[1] !== startPos[1]) {
    dist[pos[0]][pos[1]] = i;
    visited.add(pos.join("-"));
    path.splice(0, 0, pos);

    const neighbours = getNeighbours(pos, maze).filter((loc) =>
      !visited.has(loc.join("-"))
    );
    if (neighbours.length !== 1) {
      throw new Error("Unexpected neighbours.");
    }

    [pos] = neighbours;
    i++;
  }
  dist[pos[0]][pos[1]] = i;
  path.splice(0, 0, pos);

  const baseScore = dist[startPos[0]][startPos[1]];

  const t = path.map(([x, y], i) => {
    const neighbours = new Set(
      getNeighbours([x, y], maze, true)
        .flatMap((n) => getNeighbours(n, maze, true))
        .map((n) => n.join("-")),
    )
      .values()
      .toArray()
      .map<[number, number]>((s) =>
        s.split("-").map((n) => parseInt(n)) as [number, number]
      )
      .map(([nX, nY]) => dist[nX][nY]);

    return neighbours.map((d) => i + 2 + d).filter((d) => d <= baseScore - gain)
      .length;
  });
  return t.reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
