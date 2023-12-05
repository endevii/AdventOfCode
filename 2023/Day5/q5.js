const fs = require("fs");

let testing = false;

function part1() {
  let arr = fs
    .readFileSync(testing === true ? "example.txt" : "inp5.txt", "utf8")
    .toString()
    .split("\n")
    .filter((x) => x !== "");
  let res = 0;

  let seeds = [];
  for (let seed of arr[0].split(" ")) {
    if (seed === "seeds:") continue;
    seeds.push(seed);
  }

  console.log(seeds);

  console.log("Part 1:", res);
}

function part2() {
  let arr = fs
    .readFileSync(testing == true ? "example.txt" : "inp5.txt", "utf8")
    .toString()
    .split("\r\n");
  let res = 0;

  console.log("Part 2:", res);
}

part1();
// part2();
