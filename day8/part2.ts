export function part2(input: string) {
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

  function isPosValid(i: number, j: number) {
    return 0 <= i && i < antennas.length && 0 <= j && j < antennas[i].length;
  }

  const antinodes: Set<string> = new Set();

  Object.entries(nodes).forEach(([_antenna, positions]) => {
    if (positions.length > 1) {
      for (let a = 0; a < positions.length; a++) {
        for (let b = 0; b < positions.length; b++) {
          if (a === b) {
            continue;
          }
          const [i_a, j_a] = positions[a];
          const [i_b, j_b] = positions[b];
          const vec = [i_b - i_a, j_b - j_a];

          let k = 1;

          while (isPosValid(i_a + k * vec[0], j_a + k * vec[1])) {
            antinodes.add(`${i_a + k * vec[0]}-${j_a + k * vec[1]}`);
            k++;
          }
        }
      }
    }
  });

  return antinodes.size;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
