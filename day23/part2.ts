export function part2(input: string) {
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

  function bronKerbosch(
    r: Set<string>,
    p: Set<string>,
    x: Set<string>,
  ): Set<string>[] {
    if (p.size === 0 && x.size === 0) {
      return [r];
    }

    const cliques: Set<string>[] = [];
    Array.from(p).forEach((v) => {
      const neighbours = computers[v];
      cliques.push(
        ...bronKerbosch(
          r.union(new Set([v])),
          p.intersection(neighbours),
          x.intersection(neighbours),
        ),
      );
      p.delete(v);
      x.add(v);
    });

    return cliques;
  }

  const cliques = bronKerbosch(
    new Set(),
    new Set(Object.keys(computers)),
    new Set(),
  );
  return Array.from(cliques.reduce(
    (clique, maxClique) => clique.size > maxClique.size ? clique : maxClique,
    new Set(),
  )).toSorted().join();
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
