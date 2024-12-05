function parseInput(input: string) {
  const dependencies: Record<number, number[]> = {};
  const pages: number[][] = [];

  input.split("\n").forEach((line) => {
    if (line.includes("|")) {
      const [a, b] = line.split("|").map((n) => parseInt(n));
      if (!(b in dependencies)) {
        dependencies[b] = [];
      }
      dependencies[b].push(a);
    } else if (line) {
      pages.push(line.split(",").map((n) => parseInt(n)));
    }
  });

  return { dependencies, pages };
}

function compareArrays<T>(arr1: T[], arr2: T[]) {
  return arr1.length === arr2.length &&
    arr1.every((value, index) => arr2[index] === value);
}

export function part2(input: string) {
  const { dependencies, pages } = parseInput(input);

  return pages
    .filter((line) =>
      !compareArrays(
        line,
        line.toSorted((a, b) => (dependencies[b] || []).includes(a) ? -1 : 1),
      )
    )
    .map((line) =>
      line.toSorted((a, b) => (dependencies[b] || []).includes(a) ? -1 : 1)
    )
    .map((line) => line[Math.floor(line.length / 2)])
    .reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
