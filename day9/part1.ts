class File {
  idx: number;
  size: number;

  constructor(idx: number, size: number) {
    this.idx = idx;
    this.size = size;
  }
}

class FS {
  free_spaces: number[][];
  files: File[];

  constructor() {
    this.free_spaces = [];
    this.files = [];
  }

  size(): number {
    return this.free_spaces.length +
      this.files.map((f) => f.size).reduce((a, b) => a + b, 0);
  }
}

export function part1(input: string) {
  const fs = new FS();
  [...input.replace("\n", "")].forEach((c, i) => {
    const value = parseInt(c);
    if (i % 2 === 0) { // File
      fs.files.push(new File(Math.floor(i / 2), value));
    } else {
      const free_spaces = [];
      for (let i = 0; i < value; i++) {
        free_spaces.push(fs.size());
      }
      fs.free_spaces.push(free_spaces);
    }
  });

  let i = 0;
  const blocks: number[] = [];
  const stack: number[] = [];

  while (i < fs.files.length) {
    for (let _i = 0; _i < fs.files[i].size; _i++) {
      blocks.push(fs.files[i].idx);
    }
    for (const _i of fs.free_spaces[i]) {
      if (stack.length === 0) {
        const f = fs.files.pop()!;
        for (let _j = 0; _j < f.size; _j++) {
          stack.push(f.idx);
        }
      }

      blocks.push(stack.pop()!);
    }
    i++;
  }
  while (stack.length) {
    blocks.push(stack.pop()!);
  }

  return blocks.map((c, i) => i * c).reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part1(input));
}

if (import.meta.main) {
  await main();
}
