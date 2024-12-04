function matchWord(
  lines: ReadonlyArray<string>,
  [i, j]: [number, number],
  [di, dj]: [number, number],
  word: string,
) {
  const n = word.length - 1;

  if (
    i + n * di < 0 || i + n * di >= lines.length || j + n * dj < 0 ||
    j + n * dj >= lines[0].length
  ) {
    return false;
  }

  for (let k = 0; k <= n; k++) {
    if (lines[i + k * di].charAt(j + k * dj) !== word.charAt(k)) {
      return false;
    }
  }
  return true;
}

export function part1(input: string) {
  const lines = input.split("\n").filter(Boolean);

  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      for (let di = -1; di < 2; di++) {
        for (let dj = -1; dj < 2; dj++) {
          if (
            (di !== 0 || dj !== 0) && matchWord(lines, [i, j], [di, dj], "XMAS")
          ) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
