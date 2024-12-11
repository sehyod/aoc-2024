export function part1(input: string) {
  let stones = input
    .replace("\n", "")
    .split(" ")
    .map((s) => parseInt(s));

  new Array(25).fill(0).forEach((_) => {
    const updatedStones: number[] = [];
    stones.forEach((stone) => {
      if (stone === 0) {
        updatedStones.push(1);
        return;
      }

      const stoneStr = `${stone}`;
      if (stoneStr.length % 2 === 0) {
        updatedStones.push(
          parseInt(stoneStr.slice(0, Math.floor(stoneStr.length / 2))),
        );
        updatedStones.push(
          parseInt(stoneStr.slice(Math.floor(stoneStr.length / 2))),
        );
      } else {
        updatedStones.push(2024 * stone);
      }
    });
    stones = updatedStones;
  });

  return stones.length;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
