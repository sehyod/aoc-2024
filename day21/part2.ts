import { permutations } from "@elf/combinatorics";

const ROBOT_KEYPAD: Record<string, [number, number]> = {
  "^": [0, -1],
  "A": [0, 0],
  "<": [1, -2],
  "v": [1, -1],
  ">": [1, 0],
  forbidden: [0, -2],
};

const DOOR_KEYPAD: Record<string, [number, number]> = {
  "0": [0, -1],
  "A": [0, 0],
  "1": [-1, -2],
  "2": [-1, -1],
  "3": [-1, 0],
  "4": [-2, -2],
  "5": [-2, -1],
  "6": [-2, 0],
  "7": [-3, -2],
  "8": [-3, -1],
  "9": [-3, 0],
  forbidden: [0, -2],
};

const DIRS: Record<string, [number, number]> = {
  "^": [-1, 0],
  "v": [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

function paths(
  [i1, j1]: [number, number],
  [i2, j2]: [number, number],
  keypad: Record<string, [number, number]>,
): string[][] {
  const elem: string[] = [];

  if (i1 < i2) {
    elem.push(...new Array(i2 - i1).fill("v"));
  } else if (i1 > i2) {
    elem.push(...new Array(i1 - i2).fill("^"));
  }
  if (j1 < j2) {
    elem.push(...new Array(j2 - j1).fill(">"));
  } else if (j1 > j2) {
    elem.push(...new Array(j1 - j2).fill("<"));
  }

  const perm = permutations(elem);
  const perms = (perm[0] instanceof Array ? perm : [perm]) as string[][];
  return new Set(perms.map((p) => p.join("")))
    .values()
    .toArray()
    .map((p) => p.split(""))
    .filter((path) =>
      path.reduce<[number, number] | null>((a, b) => {
        if (a === null) {
          return null;
        }
        const dir = DIRS[b];
        const x = a[0] + dir[0];
        const y = a[1] + dir[1];
        if (x === keypad.forbidden[0] && y === keypad.forbidden[1]) {
          return null;
        }
        return [x, y];
      }, [i1, j1]) !== null
    ).map((p) => p.concat(["A"])) || ["A"];
}
const cache: Record<string, number> = {};
function dist(
  code: string,
  depth: number = 0,
): number {
  const key = `${code}:${depth}`;
  if (key in cache) {
    return cache[key];
  }

  const keypad = depth === 0 ? DOOR_KEYPAD : ROBOT_KEYPAD;
  let pos = keypad["A"];

  let l = 0;

  [...code].forEach((c) => {
    if (!(c in keypad)) {
      throw new Error(`wtf ${Object.keys(keypad)} ${c} ${code}`);
    }
    const newPos = keypad[c];
    const p = paths(pos, newPos, keypad);
    if (depth === 25) {
      l += p[0].length;
    } else {
      if (p.some((u) => u.join("") === "671A")) {
        throw new Error("wtf");
      }
      l += Math.min(...p.map((u) => dist(u.join(""), depth + 1)));
    }
    pos = newPos;
  });
  cache[key] = l;
  return l;
}
export function part2(input: string) {
  const codes = input.split("\n").filter(Boolean);

  return codes
    .map((code) => dist(code) * parseInt(code))
    .reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
