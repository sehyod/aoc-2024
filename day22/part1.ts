const PRUNE_VALUE = 16777216;

function generateNextValue(initialValue: number, iterations: number) {
  if (iterations === 0) {
    return initialValue;
  }

  let secretValue = (initialValue ^ (initialValue * 64)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  secretValue = (secretValue ^ Math.floor(secretValue / 32)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  secretValue = (secretValue ^ (secretValue * 2048)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  return generateNextValue(secretValue, iterations - 1);
}

export function part1(input: string) {
  const initialValues = input
    .split("\n")
    .filter(Boolean)
    .map((n) => parseInt(n));

  return initialValues
    .map((initialValue) => generateNextValue(initialValue, 2000))
    .reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
