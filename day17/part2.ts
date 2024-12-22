function reverseProg(values: number[], a: number = 0): number[] {
  if (values.length === 0) {
    return [a];
  }

  const candidates = new Array(8)
    .fill(0)
    .map((_, i) => i);

  const validCandidates = candidates.filter((candidate) => {
    let b = candidate ^ 1;
    const c = Math.floor((a * 8 + candidate) / Math.pow(2, b));
    b = b ^ 5;
    b = b ^ c;
    b = b % 8;
    if (b < 0) b += 8;
    return (b % 8) === values[0];
  });

  return validCandidates.flatMap((c) =>
    reverseProg(values.slice(1), a * 8 + c)
  );
}

export function part1(input: string) {
  const [_registers, rawProgram] = input.split("\n\n");
  const program = rawProgram
    .trim()
    .split(": ")[1]
    .split(",").map((n) => parseInt(n));

  return Math.min(...reverseProg(program.toReversed()));
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
