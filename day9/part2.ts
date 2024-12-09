class File {
  idx: number;
  size: number;

  constructor(idx: number, size: number) {
    this.idx = idx;
    this.size = size;
  }
}

class FS {
  free_spaces: number[];
  files: File[];

  constructor() {
    this.free_spaces = [];
    this.files = [];
  }

  size(): number {
    return this.free_spaces.reduce((a, b) => a + b, 0) +
      this.files.map((f) => f.size).reduce((a, b) => a + b, 0);
  }
}

export function part2(input: string) {
  const fs = new FS();
  [...input.replace("\n", "")].forEach((c, i) => {
    const value = parseInt(c);
    if (i % 2 === 0) { // File
      fs.files.push(new File(Math.floor(i / 2), value));
    } else {
      fs.free_spaces.push(value);
    }
  });

  const originalFreeSpaces = fs.free_spaces.slice();
  const blocks = new Array(fs.size()).fill(0);

  fs.files.toReversed().forEach((file, i) => {
    const candidateIndex = fs.free_spaces.slice(0, file.idx).findIndex((
      free_space,
    ) => free_space >= file.size);
    let start: number;
    if (candidateIndex >= 0) {
      start = fs.files.slice(0, candidateIndex + 1).reduce((a, b) =>
        a + b.size, 0) +
        originalFreeSpaces.slice(0, candidateIndex + 1).reduce(
          (a, b) => a + b,
          0,
        ) - fs.free_spaces[candidateIndex];
      fs.free_spaces[candidateIndex] -= file.size;
    } else {
      const idx = fs.files.length - 1 - i;
      start = fs.files.slice(0, idx).reduce((a, b) => a + b.size, 0) +
        originalFreeSpaces.slice(0, idx).reduce((a, b) => a + b, 0);
    }
    for (let j = start; j < start + file.size; j++) {
      blocks[j] = file.idx;
    }
  });

  return blocks.map((c, i) => i * c).reduce((a, b) => a + b, 0);
}

async function main() {
  const input = await Deno.readTextFile("./input");
  console.log(part2(input));
}

if (import.meta.main) {
  await main();
}
