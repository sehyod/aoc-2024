export function part2(input: string) {
  const machines: [[number, number], [number, number], [number, number]][] = [];
  const lines = input
    .split("\n")
    .filter(Boolean);

  let i = 0;
  let machine = [];
  while (i < lines.length) {
    const l = lines[i];
    const [[x], [y]] = l.matchAll(/\d+/g);
    machine.push([parseInt(x), parseInt(y)]);
    if (machine.length === 3) {
      machines.push(
        machine as [[number, number], [number, number], [number, number]],
      );
      machine = [];
    }

    i += 1;
  }

  return machines
    .map(([[xa, ya], [xb, yb], [x, y]]) => {
      x += 10000000000000;
      y += 10000000000000;
      const inverseDet = xa * yb - ya * xb;
      const a = yb * x - xb * y;
      const b = xa * y - ya * x;

      if (a % inverseDet == 0 && b % inverseDet == 0) {
        return [a / inverseDet, b / inverseDet];
      } else {
        return null;
      }
    })
    .filter<number[]>((v) => !!v)
    .reduce((s, [a, b]) => s + 3 * a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
