export function part1(input: string) {
  const antennas: string[] = [];
  const nodes: Record<string, [number, number][]> = {};

  input.split("\n").filter(Boolean).forEach((l, i) => {
    for (let j = 0; j < l.length; j++) {
      const c = l.charAt(j);
      if (c !== ".") {
        if (!(c in nodes)) {
          nodes[c] = [];
        }
        nodes[c].push([i, j]);
      }
    }

    antennas.push(l);
  });

  const antinodes: Set<string> = new Set();

  Object.entries(nodes).forEach(([_antenna, positions]) => {
    if (positions.length > 1) {
      for (let a = 0; a < positions.length - 1; a++) {
        for (let b = a + 1; b < positions.length; b++) {
          const [i_a, j_a] = positions[a];
          const [i_b, j_b] = positions[b];
          const anti_a = [2 * i_a - i_b, 2 * j_a - j_b];
          const anti_b = [2 * i_b - i_a, 2 * j_b - j_a];

          [anti_a, anti_b]
            .filter(([i, j]) =>
              0 <= i && i < antennas.length && 0 <= j && j < antennas[0].length
            )
            // .filter(([i, j]) => antennas[i].charAt(j) === ".")
            .forEach((antinode) => antinodes.add(antinode.join("-")));
        }
      }
    }
  });

  return antinodes.size;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
