export function part1(
  input: string,
  width: number = 101,
  height: number = 103,
) {
  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;

  input.split("\n").filter(Boolean).forEach((l) => {
    const [rawP, rawV] = l.split(" ");
    const p = rawP.slice(2).split(",").map((p) => parseInt(p));
    const v = rawV.slice(2).split(",").map((v) => parseInt(v));

    const finalP = [(p[0] + v[0] * 100) % width, (p[1] + v[1] * 100) % height];
    if (finalP[0] < 0) {
      finalP[0] += width;
    }
    if (finalP[1] < 0) {
      finalP[1] += height;
    }

    const verticalLimit = Math.floor(width / 2);
    const horizontalLimit = Math.floor(height / 2);

    if (finalP[0] < verticalLimit) {
      if (finalP[1] < horizontalLimit) {
        topLeft++;
      } else if (finalP[1] > horizontalLimit) {
        bottomLeft++;
      }
    } else if (finalP[0] > verticalLimit) {
      if (finalP[1] < horizontalLimit) {
        topRight++;
      } else if (finalP[1] > horizontalLimit) {
        bottomRight++;
      }
    }
  });

  return topLeft * topRight * bottomLeft * bottomRight;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
