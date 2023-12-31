const fs = require('fs');

function part1() {
  let data = fs.readFileSync('inp4.txt', 'utf8');
  let str = data.toString();
  let arr = str.split('\r\n');
  let res = 0;

  for (let card of arr) {
    let c = card.split(":");
    let pair = c[1].split("|");
    let winning = pair[0].split(" ");
    let potential = pair[1].split(" ");
    let total = 0;

    for (let num of potential) {
      if (winning.includes(num.trim()) && num !== '') {
        if (total === 0) {
          total = 1;
        } else {
          total = total * 2;
        }
      }
    }
    res += total;
  }

  console.log("Part 1:", res);
}

function part2() {
  let data = fs.readFileSync('inp4.txt', 'utf8');
  let str = data.toString();
  let arr = str.split('\r\n');
  let pairs = {};
  let res = 0;

  for (let card of arr) {
    let c = card.split(":");
    let pair = c[1].split("|");
    let str = c[0].split(" ").filter((x) => x !== "").join(" ");

    pairs[str] = { copies: 1, win: 0, change: [] };
    let winning = pair[0].split(" ");
    let potential = pair[1].split(" ");

    for (let num of potential) {
      if (winning.includes(num.trim()) && num !== '') {
        pairs[str]["win"] += 1;
      }
    }

    let i = 1;
    while (i < pairs[str]["win"] + 1 && i < arr.length + 1) {
      pairs[str]["change"].push(parseInt(str.split(" ")[1]) + i);
      i += 1;
    }
  }

  for (let card in pairs) {
    let curr_card = pairs[card];
    res += curr_card["copies"];
    for (let num of curr_card["change"]) {
      pairs[`Card ${num}`]["copies"] += curr_card["copies"];
    }
  }

  console.log("Part 2:", res);
}

part1();
part2();