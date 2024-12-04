function dist([a, b]: [number, number], [c, d]: [number, number]) {
  return Math.sqrt(Math.pow(a - c, 2) + Math.pow(b - d, 2));
}

export function part2(input: string) {
  const lines = input.split("\n").filter(Boolean);

  let count = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      if (lines[i].charAt(j) === "A") {
        const mPos: [number, number][] = [];
        let sCount = 0;
        for (const di of [-1, 1]) {
          for (const dj of [-1, 1]) {
            const char = lines[i + di].charAt(j + dj);

            switch (char) {
              case "M":
                mPos.push([i + di, j + dj]);
                break;
              case "S":
                sCount++;
                break;
              default:
                break;
            }
          }
        }

        if (
          mPos.length == 2 && sCount == 2 &&
          Math.abs(dist(mPos[0], mPos[1]) - 2) <= Number.EPSILON
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}
if (import.meta.main) {
  await main();
}
