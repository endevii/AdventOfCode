const fs = require('fs');

function part1() {
  let data = fs.readFileSync('inp2.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\n');
  // console.log(arr);

  let games = {};
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let split = curr.split(':');
    let game = split[0].trim();
    let score = split[1].trim();
    if (games[game] === undefined) {
      games[game] = { str: score, spl: [] };
      let format = score.split(';');
      let vals = [];
      for (let j = 0; j < format.length; j++) {
        let curr_split = format[j].split(',');
        for (let k = 0; k < curr_split.length; k++) {
          vals.push(curr_split[k].trim());
        }
      }
      games[game]['spl'] = vals;
    }
  }

  let check = [12, 13, 14]; // red, green, blue

  let res = 0;
  let reslst = [];

  for (let key in games) {
    let curr = games[key];
    let vals = curr['spl'];
    let max_nums = [0, 0, 0];
    for (let i = 0; i < vals.length; i++) {
      let curr_split = vals[i].split(' ');
      if (curr_split.includes('red')) {
        max_nums[0] = Math.max(max_nums[0], parseInt(curr_split[0]));
      } else if (curr_split.includes('green')) {
        max_nums[1] = Math.max(max_nums[1], parseInt(curr_split[0]));
      } else if (curr_split.includes('blue')) {
        max_nums[2] = Math.max(max_nums[2], parseInt(curr_split[0]));
      }
    }
    games[key]['max'] = max_nums;
    if (max_nums[0] <= check[0] && max_nums[1] <= check[1] && max_nums[2] <= check[2]) {
      reslst.push(key.split(' ')[1]);
      res += parseInt(key.split(' ')[1]);
    }
  }

  console.log("Part 1:", res);
}

function part2() {
  let data = fs.readFileSync('inp2.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\n');
  // console.log(arr);

  let games = {};
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let split = curr.split(':');
    let game = split[0].trim();
    let score = split[1].trim();
    if (games[game] === undefined) {
      games[game] = { str: score, spl: [] };
      let format = score.split(';');
      let vals = [];
      for (let j = 0; j < format.length; j++) {
        let curr_split = format[j].split(',');
        for (let k = 0; k < curr_split.length; k++) {
          vals.push(curr_split[k].trim());
        }
      }
      games[game]['spl'] = vals;
    }
  }

  let res = 0;
  let reslst = [];
  for (let key in games) {
    let curr = games[key];
    let vals = curr['spl'];
    let max_nums = [0, 0, 0];
    for (let i = 0; i < vals.length; i++) {
      let curr_split = vals[i].split(' ');
      if (curr_split.includes('red')) {
        max_nums[0] = Math.max(max_nums[0], parseInt(curr_split[0]));
      } else if (curr_split.includes('green')) {
        max_nums[1] = Math.max(max_nums[1], parseInt(curr_split[0]));
      } else if (curr_split.includes('blue')) {
        max_nums[2] = Math.max(max_nums[2], parseInt(curr_split[0]));
      }
    }
    games[key]['max'] = max_nums;
    if (max_nums[0] > 0 && max_nums[1] > 0 && max_nums[2] > 0) {
      let val = max_nums[0] * max_nums[1] * max_nums[2];
      res += val;
      reslst.push(val);
    } else {
      reslst.push(0);
    }
  }

  // console.log(reslst);
  console.log("Part 2:", res);
}

part1();
part2();