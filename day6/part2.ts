function getVisited(
  guardPos: [number, number],
  grid: string[],
): Set<string> {
  let guardDir = [-1, 0];
  const visited = new Set<string>();
  visited.add(guardPos.join("-"));

  while (guardPos) {
    const newPos: [number, number] = [
      guardPos[0] + guardDir[0],
      guardPos[1] + guardDir[1],
    ];

    if (
      0 <= newPos[0] && newPos[0] < grid.length && 0 <= newPos[1] &&
      newPos[1] < grid[0].length
    ) {
      if (grid[newPos[0]][newPos[1]] !== "#") {
        visited.add(newPos.join("-"));
        guardPos = newPos;
      } else {
        guardDir = [
          guardDir[0] !== 0 ? 0 : guardDir[1],
          guardDir[1] !== 0 ? 0 : -guardDir[0],
        ];
      }
    } else {
      break;
    }
  }

  return visited;
}

function obstacleMakesLoop(
  pos: string,
  guardPos: [number, number],
  grid: string[],
): boolean {
  const obstaclePos = pos.split("-").map((p) => parseInt(p));
  let guardDir: [number, number] = [-1, 0];
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
        return true;
      } else if (
        grid[newPos[0]][newPos[1]] !== "#" &&
        (newPos[0] !== obstaclePos[0] || newPos[1] !== obstaclePos[1])
      ) {
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
      break;
    }
  }

  return false;
}

export function part2(input: string) {
  const grid: string[] = [];
  let guardPos: [number, number] | null = null;

  input.split("\n").filter(Boolean).forEach((line, index) => {
    grid.push(line);
    if (line.includes("^")) {
      guardPos = [index, line.indexOf("^")];
    }
  });

  const visited = getVisited(guardPos!, grid);

  return visited.values().filter((v) => v !== guardPos!.join("-")).filter((v) =>
    obstacleMakesLoop(v, guardPos!, grid)
  ).toArray().length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
