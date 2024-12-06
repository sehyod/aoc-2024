import { progress } from "@ryweal/progress";

function visit(
  guardPos: [number, number],
  grid: string[],
  isPosAvailable: (pos: [number, number]) => boolean,
): { visited: string[]; loop: boolean } {
  let guardDir = [-1, 0];
  const visited: Record<string, string[]> = {};
  visited[guardPos.join("-")] = [guardDir.join("-")];

  while (true) {
    const newPos: [number, number] = [
      guardPos[0] + guardDir[0],
      guardPos[1] + guardDir[1],
    ];

    if (
      0 <= newPos[0] && newPos[0] < grid.length && 0 <= newPos[1] &&
      newPos[1] < grid[0].length
    ) {
      if (
        newPos.join("-") in visited &&
        visited[newPos.join("-")].includes(guardDir.join("-"))
      ) {
        return { visited: Object.keys(visited), loop: true };
      } else if (isPosAvailable(newPos)) {
        if (!(newPos.join("-") in visited)) visited[newPos.join("-")] = [];
        visited[newPos.join("-")].push(guardDir.join("-"));
        guardPos = newPos;
      } else {
        guardDir = [
          guardDir[0] !== 0 ? 0 : guardDir[1],
          guardDir[1] !== 0 ? 0 : -guardDir[0],
        ];
      }
    } else {
      return { visited: Object.keys(visited), loop: false };
    }
  }
}

// deno-lint-ignore no-explicit-any
export function part2(input: string, progress: any) {
  const grid: string[] = [];
  let guardPos: [number, number] | null = null;

  input.split("\n").filter(Boolean).forEach((line, index) => {
    grid.push(line);
    if (line.includes("^")) {
      guardPos = [index, line.indexOf("^")];
    }
  });

  const { visited } = visit(
    guardPos!,
    grid,
    (pos) => grid[pos[0]][pos[1]] !== "#",
  );

  const p = progress(
    "Tested obstacles | [[bar]] | [[count]]/[[total]] [[rate]] [[eta]]\n",
    { total: visited.length - 1 },
  );

  return visited
    .filter((v) => v !== guardPos!.join("-"))
    .filter(
      (v) => {
        const obstaclePos = v.split("-").map((p) => parseInt(p));
        const { loop } = visit(
          guardPos!,
          grid,
          (pos) =>
            grid[pos[0]][pos[1]] !== "#" &&
            (pos[0] !== obstaclePos[0] || pos[1] !== obstaclePos[1]),
        );
        p.next();
        return loop;
      },
    ).length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input, progress));
}

if (import.meta.main) {
  await main();
}
