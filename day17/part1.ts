export function part1(input: string) {
  const [registers, rawProgram] = input.split("\n\n");
  let [a, b, c] = registers.split("\n").map((reg) =>
    parseInt(reg.split(": ")[1])
  );
  const OPERANDS: Record<number, () => number> = {
    0: () => 0,
    1: () => 1,
    2: () => 2,
    3: () => 3,
    4: () => a,
    5: () => b,
    6: () => c,
  };
  const program = rawProgram
    .trim()
    .split(": ")[1]
    .split(",").map((n) => parseInt(n));

  const res: number[] = [];

  let i = 0;
  while (i < program.length - 1) {
    const opcode = program[i];
    const operand = program[i + 1];

    if (opcode === 0) {
      a = Math.floor(a / Math.pow(2, OPERANDS[operand]()));
    } else if (opcode === 1) {
      b = b ^ operand;
    } else if (opcode === 2) {
      b = OPERANDS[operand]() % 8;
    } else if (opcode === 3) {
      if (a !== 0) {
        i = operand - 2;
      }
    } else if (opcode === 4) {
      b = b ^ c;
    } else if (opcode === 5) {
      res.push(OPERANDS[operand]() % 8);
    } else if (opcode === 6) {
      b = Math.floor(a / Math.pow(2, OPERANDS[operand]()));
    } else if (opcode === 7) {
      c = Math.floor(a / Math.pow(2, OPERANDS[operand]()));
    }

    i += 2;
  }

  return res.join(",");
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
