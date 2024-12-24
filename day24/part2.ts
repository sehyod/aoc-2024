enum Op {
  AND = "AND",
  OR = "OR",
  XOR = "XOR",
}

export function part2(input: string) {
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
    if (result.startsWith("z")) {
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

  const cache: Record<string, number> = {};
  function getValue(name: string): number {
    if (name in register) {
      return register[name];
    }

    if (name in cache) {
      return cache[name];
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

    cache[name] = result;
    return result;
  }

  function getOutput(name: string): number {
    if (name.startsWith("z")) {
      return parseInt(name.slice(1));
    }

    return Object.keys(ops).filter((wireName) => {
      const [_, name1, name2] = ops[wireName];
      return name1 === name || name2 === name;
    }).map(getOutput).reduce((acc, cur) => Math.min(acc, cur));
  }

  const invalidOutputs = outputs.filter((output, i) =>
    (i !== outputs.length - 1 && ops[output][0] !== Op.XOR) ||
    (i === outputs.length - 1 && ops[output][0] !== Op.OR)
  );

  const invalidIntermediates: string[] = [];

  Object.entries(ops)
    .forEach(([name, [op, name1, name2]]) => {
      if (op === Op.XOR && !name.startsWith("z")) {
        if (
          !name1.startsWith("x") && !name1.startsWith("y") &&
          !name2.startsWith("x") && !name2.startsWith("y")
        ) {
          invalidIntermediates.push(name);
        }
      }
    });

  invalidIntermediates.forEach((wire) => {
    const output = "z" + `${(getOutput(wire) - 1)}`.padStart(2, "0");
    const temp = ops[output];
    ops[output] = ops[wire];
    ops[wire] = temp;
  });

  const x = parseInt(
    Object
      .keys(register)
      .filter((name) => name.startsWith("x")).toSorted()
      .toReversed()
      .map((name) => register[name])
      .join(""),
    2,
  );
  const y = parseInt(
    Object
      .keys(register)
      .filter((name) => name.startsWith("y")).toSorted()
      .toReversed()
      .map((name) => register[name])
      .join(""),
    2,
  );
  const z = parseInt(outputs.map(getValue).toReversed().join(""), 2);

  const diff = (x + y) ^ z;

  const invalidBit = Math.floor(Math.log2(diff));
  const wireIndex = `${invalidBit}`.padStart(2, "0");

  const invalidCarry = Object.keys(ops).filter((name) => {
    const [_, name1, name2] = ops[name];

    return name1.endsWith(wireIndex) && name2.endsWith(wireIndex);
  });

  return invalidOutputs.concat(invalidIntermediates).concat(invalidCarry)
    .toSorted().join();
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
