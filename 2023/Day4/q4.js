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
    let c_split = c[0].split(" ");
    c_split = c_split.filter((x) => x !== "");

    let str = `${c_split[0].trim()} ${c_split[1].trim()}`

    pairs[str] = { copies: 1, win: 0, change: [] };
    let winning = pair[0].split(" ");
    let potential = pair[1].split(" ");
    let total = 0;

    for (let num of potential) {
      if (winning.includes(num.trim()) && num !== '') {
        total += 1;
      }
    }

    pairs[str]["win"] = total;
    let indexes = [];
    for (let i = 1; i < total + 1; i++) {
      if (i === arr.length + 1) {
        break;
      }
      indexes.push(parseInt(str.split(" ")[1]) + i);
    }
    pairs[str]["change"] = indexes;
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