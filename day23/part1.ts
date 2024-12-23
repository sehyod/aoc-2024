export function part1(input: string) {
  const connections = input
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("-") as [string, string]);

  const computers: Record<string, Set<string>> = {};

  connections.forEach(([compA, compB]) => {
    if (!(compA in computers)) computers[compA] = new Set();
    if (!(compB in computers)) computers[compB] = new Set();

    computers[compA].add(compB);
    computers[compB].add(compA);
  });

  const clusters = new Set<string>();

  Object.entries(computers).filter(([c]) => c.startsWith("t")).forEach(
    ([comp, comps]) => {
      comps.forEach((compA) => {
        computers[compA].intersection(comps).forEach((compB) => {
          clusters.add([comp, compA, compB].toSorted().join());
        });
      });
    },
  );

  return clusters.size;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
