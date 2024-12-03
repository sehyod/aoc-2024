export function part2(input: string) {
  const matches = input.match(/(mul\(\d{1,3},\d{1,3}\))|(do(n't)?\(\))/g)!;

  let sum = 0;
  let enabled = true;

  matches.forEach((instr) => {
    const m = instr.match(/(?<a>\d{1,3}),(?<b>\d{1,3})/);
    if (m) {
      if (enabled) {
        sum += parseInt(m.groups!.a) * parseInt(m.groups!.b);
      }
    } else {
      enabled = !!instr.match(/do\(\)/);
    }
  });

  return sum;
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}
if (import.meta.main) {
  await main();
}
