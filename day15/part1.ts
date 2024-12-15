const DIR: Record<string, [number, number]> = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  "v": [1, 0],
};

export function part1(input: string) {
  const grid: string[][] = [];

  let pos: [number, number] | null = null;

  let [map, instr] = input.split("\n\n");
  instr = instr.replaceAll("\n", "");
  map.split("\n").forEach((line, i) => {
    const row: string[] = [];
    [...line].forEach((c, j) => {
      if (c === "@") {
        pos = [i, j];
        row.push(".");
      } else {
        row.push(c);
      }
    });
    grid.push(row);
  });

  [...instr].forEach((c) => {
    const [dx, dy] = DIR[c];
    const [x, y] = pos!;
    let i = 1;
    while (!"#.".includes(grid[x + i * dx][y + i * dy])) {
      i++;
    }
    if (grid[x + i * dx][y + i * dy] === "#") {
      return;
    }
    if (i > 1) {
      grid[x + dx][y + dy] = ".";
      grid[x + i * dx][y + i * dy] = "O";
    }
    pos = [x + dx, y + dy];
  });

  return grid
    .map((r, i) =>
      r
        .map((c, j) => c === "O" ? 100 * i + j : 0)
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
