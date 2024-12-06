export function part1(input: string) {
  const grid: string[] = [];
  let guardPos: [number, number] | null = null;
  let guardDir = [-1, 0];
  const visited = new Set<string>();

  input.split("\n").filter(Boolean).forEach((line, index) => {
    grid.push(line);
    if (line.includes("^")) {
      guardPos = [index, line.indexOf("^")];
      visited.add(guardPos.join("-"));
    }
  });

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

  return visited.size;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
