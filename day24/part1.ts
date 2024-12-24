enum Op {
  AND,
  OR,
  XOR,
}

export function part1(input: string) {
  const [vars, rawOps] = input
    .split("\n\n");

  const register: Record<string, number> = {};
  vars.split("\n").forEach((line) => {
    const [name, value] = line.split(": ");
    register[name] = parseInt(value);
  });

  const ops: Record<string, [Op, string, string]> = {};
  const outputs: string[] = [];
  rawOps.split("\n").filter(Boolean).forEach((line) => {
    const [op, result] = line.split(" -> ");
    if (result.includes("z")) {
      outputs.push(result);
    }
    if (op.includes("AND")) {
      const [var1, var2] = op.split(" AND ");
      ops[result] = [Op.AND, var1, var2];
    } else if (op.includes("XOR")) {
      const [var1, var2] = op.split(" XOR ");
      ops[result] = [Op.XOR, var1, var2];
    } else if (op.includes("OR")) {
      const [var1, var2] = op.split(" OR ");
      ops[result] = [Op.OR, var1, var2];
    }
  });
  outputs.sort();

  function getValue(name: string): number {
    if (name in register) {
      return register[name];
    }

    const [op, var1, var2] = ops[name];
    const val1 = getValue(var1);
    const val2 = getValue(var2);

    let result: number;

    switch (op) {
      case Op.AND:
        result = val1 & val2;
        break;
      case Op.OR:
        result = val1 | val2;
        break;
      case Op.XOR:
        result = val1 ^ val2;
        break;
      default:
        throw new Error(`Unknown op: ${op}`);
    }

    register[name] = result;
    return result;
  }

  return parseInt(outputs.map(getValue).toReversed().join(""), 2);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
