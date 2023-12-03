const fs = require('fs');

function part1() {
  let data = fs.readFileSync('inp3.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\r\n');

  let matrix = [];

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let split = curr.split('');
    matrix.push(split);
  }

  let res = 0;

  let reg = /^\d+$/;

  let rows = [];

  for (let i = 0; i < matrix.length; i++) {
    let curr = matrix[i];
    let digits = [];
    let gathered = "";
    let found = false;
    for (let j = 0; j < curr.length; j++) {
      let curr_char = curr[j];
      if (reg.test(curr_char)) {
        gathered += curr_char;
        // above
        if (i > 0 && j === 0) {
          for (let k = 0; k < 2; k++) {
            if (reg.test(matrix[i - 1][j + k]) === false && matrix[i - 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        } else if (i > 0 && (j > 0 && j < curr.length - 1)) {
          for (let k = -1; k < 2; k++) {
            if (reg.test(matrix[i - 1][j + k]) === false && matrix[i - 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        } else if (i > 0 && j === matrix.length - 1) {
          for (let k = -1; k < 1; k++) {
            if (reg.test(matrix[i - 1][j + k]) === false && matrix[i - 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        }

        // left and right
        if (j > 0 && j < matrix.length - 1) {
          if (reg.test(matrix[i][j - 1]) === false && matrix[i][j - 1] !== '.') {
            found = true;
          } else if (reg.test(matrix[i][j + 1]) === false && matrix[i][j + 1] !== '.') {
            found = true;
          }
        }

        // below
        if (i < matrix.length - 1 && j === 0) {
          for (let k = 0; k < 2; k++) {
            if (reg.test(matrix[i + 1][j + k]) === false && matrix[i + 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        } else if (i < matrix.length - 1 && (j > 0 && j < curr.length - 1)) {
          for (let k = -1; k < 2; k++) {
            if (reg.test(matrix[i + 1][j + k]) === false && matrix[i + 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        } else if (i < matrix.length - 1 && j === curr.length - 1) {
          for (let k = -1; k < 1; k++) {
            if (reg.test(matrix[i + 1][j + k]) === false && matrix[i + 1][j + k] !== '.') {
              found = true;
              break;
            }
          }
        }

      } else {
        if (gathered.length > 0) {
          digits.push({ digit: gathered, found: found });
          if (found === true) {
            res += parseInt(gathered);
          }
        }
        found = false;
        gathered = "";
      }
      if (j === curr.length - 1) {
        if (gathered.length > 0) {
          digits.push({ digit: gathered, found: found });
          if (found === true) {
            res += parseInt(gathered);
          }
        }
        found = false;
        gathered = "";
      }
    }
    rows.push(digits);
  }

  console.log("Part 1:", res);
}

function part2() {
  let data = fs.readFileSync('inp3.txt', 'utf8');
  let str = data.toString();

  let arr = str.split('\r\n');

  let matrix = [];

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let split = curr.split('');
    matrix.push(split);
  }

  let res = 0;

  let reg = /^\d+$/;

  let rows = [];

  let gears = {};

  for (let i = 0; i < matrix.length; i++) {
    let curr = matrix[i];
    let digits = [];
    let gathered = "";
    let gear_indexes = [];

    for (let j = 0; j < curr.length; j++) {
      let curr_char = curr[j];
      if (reg.test(curr_char)) {
        gathered += curr_char;
        // above
        if (i > 0 && j === 0) {
          for (let k = 0; k < 2; k++) {
            if (matrix[i - 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i - 1}:${j + k}`)) {
                gear_indexes.push(`${i - 1}:${j + k}`)
              }
            }
          }
        } else if (i > 0 && (j > 0 && j < curr.length - 1)) {
          for (let k = -1; k < 2; k++) {
            if (matrix[i - 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i - 1}:${j + k}`)) {
                gear_indexes.push(`${i - 1}:${j + k}`)
              }
            }
          }
        } else if (i > 0 && j === matrix.length - 1) {
          for (let k = -1; k < 1; k++) {
            if (matrix[i - 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i - 1}:${j + k}`)) {
                gear_indexes.push(`${i - 1}:${j + k}`)
              }
            }
          }
        }

        // left and right
        if (j > 0 && j < matrix.length - 1) {
          if (matrix[i][j - 1] === "*") {
            found = true;
            if (!gear_indexes.includes(`${i}:${j - 1}`)) {
              gear_indexes.push(`${i}:${j - 1}`)
            }
          } else if (matrix[i][j + 1] === "*") {
            found = true;
            if (!gear_indexes.includes(`${i}:${j + 1}`)) {
              gear_indexes.push(`${i}:${j + 1}`)
            }
          }
        }

        // below
        if (i < matrix.length - 1 && j === 0) {
          for (let k = 0; k < 2; k++) {
            if (matrix[i + 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i + 1}:${j + k}`)) {
                gear_indexes.push(`${i + 1}:${j + k}`)
              }
            }
          }
        } else if (i < matrix.length - 1 && (j > 0 && j < curr.length - 1)) {
          for (let k = -1; k < 2; k++) {
            if (matrix[i + 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i + 1}:${j + k}`)) {
                gear_indexes.push(`${i + 1}:${j + k}`)
              }
            }
          }
        } else if (i < matrix.length - 1 && j === curr.length - 1) {
          for (let k = -1; k < 1; k++) {
            if (matrix[i + 1][j + k] === "*") {
              found = true;
              if (!gear_indexes.includes(`${i + 1}:${j + k}`)) {
                gear_indexes.push(`${i + 1}:${j + k}`)
              }
            }
          }
        }
      } else {
        if (gathered.length > 0) {
          digits.push({ digit: gathered, found: found });
          if (found === true) {
            for (let k = 0; k < gear_indexes.length; k++) {
              if (!gears[gear_indexes[k]]) {
                gears[gear_indexes[k]] = [];
              }
              gears[gear_indexes[k]].push(gathered);
            }
          }
        }
        found = false;
        gathered = "";
        gear_indexes = [];
      }
      if (j === curr.length - 1) {
        if (gathered.length > 0) {
          digits.push({ digit: gathered, found: found });
          if (found === true) {
            for (let k = 0; k < gear_indexes.length; k++) {
              if (!gears[gear_indexes[k]]) {
                gears[gear_indexes[k]] = [];
              }
              gears[gear_indexes[k]].push(gathered);
            }
          }
        }
        found = false;
        gathered = "";
        gear_indexes = [];
      }
    }
    rows.push(digits);
  }

  for (let gear in gears) {
    let nums = gears[gear];
    if (nums.length === 2) {
      res += (parseInt(nums[0]) * parseInt(nums[1]))
    }
  }

  console.log("Part 2:", res);
}

part1();
part2();