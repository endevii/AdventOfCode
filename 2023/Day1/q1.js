const fs = require('fs');

function part1() {
  let data = fs.readFileSync('str.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\n');
  let numlst = [];

  var reg = /^\d+$/;
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let p1 = 0;
    let p2 = curr.length - 1;
    let found = [false, false];
    while (p1 <= p2) {
      if (reg.test(curr[p1]) === false) {
        p1++;
      } else {
        found = [true, found[1]];
        if (found[0] && found[1]) break;
      }
      if (reg.test(curr[p2]) === false) {
        p2--;
      } else {
        found = [found[0], true];
        if (found[0] && found[1]) break;
      }
    }
    // console.log(curr[p1], p1, curr[p2], p2, curr);
    numlst.push(parseInt(curr[p1] + curr[p2]));
  }
  // console.log(numlst);
  console.log("Part 1:", numlst.reduce((a, b) => a + b, 0));
}

function part2() {
  let data = fs.readFileSync('str.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\n');
  // let arr = ["two8sixbmrmqzrrb1seven", "7fvfourgkfkkbloneeightdrfscspgkdrmzzt1"]
  let numlst = [];
  let wordnums = { 3: ['one', 'two', 'six'], 4: ['four', 'five', 'nine'], 5: ['three', 'seven', 'eight', 'zero'] }
  let conversion = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'zero': 0 }

  let reg = /^\d+$/;
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let p1 = 0;
    let p2 = curr.length - 1;
    let found = [false, false];
    let num1 = 0;
    let num2 = 0;

    while (p1 <= p2) {
      if (found[0] !== true) {
        if (reg.test(curr[p1]) === false) {
          let space = curr.length - 1 - p1;
          if (space >= 3 && found[0] !== true) {
            let maxnum = Math.min(space, 5);
            for (let j = 3; j <= maxnum; j++) {
              let substr = curr.substring(p1, p1 + j);
              // console.log("space", space, j, substr);
              // console.log(wordnums[j], wordnums[j].includes(substr));
              if (wordnums[j].includes(substr)) {
                num1 = conversion[substr];
                found = [true, found[1]];
                break;
              }
            }
            if (found[0] && found[1]) break;
          }
          p1++;
        } else if (reg.test(curr[p1]) === true && found[0] !== true) {
          found = [true, found[1]];
          num1 = parseInt(curr[p1]);
          if (found[0] && found[1]) break;
        }
      } else {
        if (found[0] && found[1]) break;
      }

      if (found[1] !== true) {
        if (reg.test(curr[p2]) === false) {
          let space = curr.length - p2;
          if (space >= 3 && found[1] !== true) {
            let maxnum = Math.min(space, 5);
            for (let j = 3; j <= maxnum; j++) {
              let substr = curr.substring(p2, p2 + j);
              // console.log("space", space, j, substr);
              // console.log(wordnums[j], wordnums[j].includes(substr));
              if (wordnums[j].includes(substr)) {
                num2 = conversion[substr];
                found = [found[0], true];
                break;
              }
            }
          }
          if (found[0] && found[1]) break;
          p2--;
        } else if (reg.test(curr[p2]) === true && found[1] !== true) {
          found = [found[0], true];
          num2 = parseInt(curr[p2]);
          if (found[0] && found[1]) break;
        }
      } else {
        if (found[0] && found[1]) break;
      }
    }
    // console.log(num1, p1, num2, p2, curr);
    numlst.push(parseInt(num1.toString() + num2.toString()));
  }
  // console.log(numlst);
  console.log("Part 2:", numlst.reduce((a, b) => a + b, 0));
}

part1();
part2();