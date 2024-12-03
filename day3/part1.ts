export function part1(input: string) {
  const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g)!;

  const mulResults = matches.map((m) => {
    const { groups } = m.match(/(?<a>\d{1,3}),(?<b>\d{1,3})/)!;
    return parseInt(groups!.a) * parseInt(groups!.b);
  });

  return mulResults.reduce((sum, value) => sum + value, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
