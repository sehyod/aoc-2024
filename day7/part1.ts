export function part1(input: string) {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(": "))
    .map<[number, number[]]>((
      [value, numbers],
    ) => [parseInt(value), numbers.split(" ").map((n) => parseInt(n))])
    .filter(([value, numbers]) => {
      for (let i = 0; i < Math.pow(2, numbers.length - 1); i++) {
        const ops = i.toString(2).padStart(numbers.length - 1, "0");

        let res = numbers[0];

        [...ops].forEach((c, i) => {
          if (c == "1") {
            res *= numbers[i + 1];
          } else {
            res += numbers[i + 1];
          }
        });

        if (res == value) {
          return true;
        }
      }
      return false;
    })
    .reduce((sum, curr) => sum + curr[0], 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
