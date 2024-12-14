function computePos(
  p: [number, number],
  v: [number, number],
  width: number,
  height: number,
  time: number,
): [number, number] {
  const finalP: [number, number] = [
    (p[0] + v[0] * time) % width,
    (p[1] + v[1] * time) % height,
  ];
  if (finalP[0] < 0) {
    finalP[0] += width;
  }
  if (finalP[1] < 0) {
    finalP[1] += height;
  }

  return finalP;
}

function getSafetyFactor(
  robots: [number, number][],
  verticalLimit: number,
  horizontalLimit: number,
) {
  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;

  robots.forEach((r) => {
    if (r[0] < verticalLimit) {
      if (r[1] < horizontalLimit) {
        topLeft++;
      } else if (r[1] > horizontalLimit) {
        bottomLeft++;
      }
    } else if (r[0] > verticalLimit) {
      if (r[1] < horizontalLimit) {
        topRight++;
      } else if (r[1] > horizontalLimit) {
        bottomRight++;
      }
    }
  });

  return topLeft * topRight * bottomLeft * bottomRight;
}

export function part2(
  input: string,
  width: number = 101,
  height: number = 103,
) {
  const verticalLimit = Math.floor(width / 2);
  const horizontalLimit = Math.floor(height / 2);
  const robots = input.split("\n").filter(Boolean).map<
    [[number, number], [number, number]]
  >(
    (l) => {
      const [rawP, rawV] = l.split(" ");
      const p = rawP.slice(2).split(",").map((p) => parseInt(p)) as [
        number,
        number,
      ];
      const v = rawV.slice(2).split(",").map((v) => parseInt(v)) as [
        number,
        number,
      ];
      return [p, v];
    },
  );
  let i = 0;
  let min = Number.POSITIVE_INFINITY;
  while (true) {
    i++;
    const pos: [number, number][] = robots
      .map(([p, v]) => computePos(p, v, width, height, i))
      .map(([x, y]) => [Math.abs(x), Math.abs(y)]);
    const strPos = pos.map((p) => `${p[0]}-${p[1]}`).reduce<Set<string>>(
      (s: Set<string>, p) => s.add(p),
      new Set(),
    );

    const safetyFactor = getSafetyFactor(pos, verticalLimit, horizontalLimit);
    if (safetyFactor < min) {
      min = safetyFactor;
      for (let i = 0; i < height; i++) {
        let line = "";
        for (let j = 0; j < width; j++) {
          if (strPos.has(`${j}-${i}`)) {
            line += "#";
          } else {
            line += ".";
          }
        }
        console.log(line);
      }
      if (prompt() === "y") {
        break;
      }
    }
  }
  return i;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
