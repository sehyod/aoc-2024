const DIR_Y: Record<string, number> = {
  ">": 1,
  "<": -1,
};

function moveVertical(
  x: number,
  y: number,
  dx: -1 | 1,
  grid: string[][],
  dryRun: boolean = false,
): boolean {
  const posToCheck: [number, number][] = [[x, y]];
  switch (grid[x][y]) {
    case "]":
      posToCheck.push([x, y - 1]);
      break;
    case "[":
      posToCheck.push([x, y + 1]);
      break;
    default:
      break;
  }
  if (posToCheck.some(([x, y]) => grid[x][y] === "#")) {
    return false;
  }
  if (
    posToCheck.every(([x, y]) =>
      grid[x + dx][y] === "." ? true : moveVertical(x + dx, y, dx, grid, true)
    )
  ) {
    if (!dryRun) {
      posToCheck.forEach(([x, y]) => {
        if (grid[x + dx][y] !== ".") {
          moveVertical(x + dx, y, dx, grid);
        }
        grid[x + dx][y] = grid[x][y];
        grid[x][y] = ".";
      });
    }
    return true;
  } else {
    return false;
  }
}

export function part2(input: string) {
  const grid: string[][] = [];

  let pos: [number, number] | null = null;

  let [map, instr] = input.split("\n\n");
  instr = instr.replaceAll("\n", "");
  map.split("\n").forEach((line, i) => {
    const row: string[] = [];
    [...line].forEach((c, j) => {
      if (c === "@") {
        pos = [i, 2 * j];
        row.push(".", ".");
      } else if (c === "O") {
        row.push("[", "]");
      } else {
        row.push(c, c);
      }
    });
    grid.push(row);
  });

  [...instr].forEach((c) => {
    const [x, y] = pos!;
    if (c in DIR_Y) {
      const dy = DIR_Y[c];
      let i = 1;
      while (!"#.".includes(grid[x][y + i * dy])) {
        i++;
      }
      if (grid[x][y + i * dy] === "#") {
        return;
      }
      if (i > 1) {
        for (let j = i; j > 0; j--) {
          grid[x][y + j * dy] = grid[x][y + (j - 1) * dy];
        }
        grid[x][y] = ".";
      }
      pos = [x, y + dy];
    } else {
      const dx = c === "^" ? -1 : 1;
      if (moveVertical(x, y, dx, grid)) {
        pos = [x + dx, y];
      }
    }
  });

  return grid
    .map((r, i) =>
      r
        .map((c, j) => c === "[" ? 100 * i + j : 0)
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
