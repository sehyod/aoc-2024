const PRUNE_VALUE = 16777216;

function generateNextValues(
  initialValue: number,
  iterations: number,
  seq: number[] = [],
): number[] {
  if (iterations === 0) {
    return seq;
  }

  let secretValue = (initialValue ^ (initialValue * 64)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  secretValue = (secretValue ^ Math.floor(secretValue / 32)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  secretValue = (secretValue ^ (secretValue * 2048)) % PRUNE_VALUE;
  if (secretValue < 0) secretValue += PRUNE_VALUE;

  return generateNextValues(
    secretValue,
    iterations - 1,
    seq.concat([secretValue % 10]),
  );
}

export function part2(input: string) {
  const initialValues = input
    .split("\n")
    .filter(Boolean)
    .map((n) => parseInt(n));

  const seqs = initialValues
    .map((initialValue) =>
      generateNextValues(initialValue, 2000, [initialValue % 10])
    );

  const derivatives = seqs
    .map((seq) =>
      seq.slice(1).map<[number, number]>((v, i) => [v - seq[i], v])
    );

  const bananas = derivatives.map((der) => {
    const bananas: Record<string, number> = {};

    for (let i = 0; i < der.length - 4; i++) {
      const seq = new Array(4)
        .fill(0)
        .map((_, j) => der[i + j][0])
        .join();

      if (!(seq in bananas)) {
        bananas[seq] = der[i + 3][1];
      }
    }

    return bananas;
  });

  const total: Record<string, number> = {};

  bananas
    .forEach((b) => {
      Object.entries(b).forEach(([seq, bananasCount]) => {
        if (!(seq in total)) {
          total[seq] = 0;
        }
        total[seq] += bananasCount;
      });
    });

  return Math.max(...Object.values(total));
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
