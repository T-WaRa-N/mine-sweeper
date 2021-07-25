// @flow

export function nestedArray(row, col) {   //grid formation
  let outerArray = [];
  for (let i = 0; i < row; i++) {
    let innerArray  = [];            //  setting rows
    for (let j = 0; j < col; j++) {
      innerArray.push("");          // setting colomns of the row
    }
    outerArray.push(innerArray);    // out Array of row of rows
  }
  return outerArray;  // Matrix on an empty entries 
}
export function populateNestedArray(nestedArray, val, count) {  // populating the Array of arrays ie. the Matrix
  let rows = nestedArray.length;      // number of rows
  let cols = nestedArray[0].length;   // number of columns
  while (count) {
    let y = floorRand(rows);       // Choosing a random entry in  a row
    let x = floorRand(cols);        // choosing a random entry in a column
    if (!nestedArray[y][x]) {
      nestedArray[y][x] = val;    // checking for empty entry to populate a mine
      count--;                    // count down while populating
    }
  }
  return nestedArray;              // returning a matrix populated with mines only
}

export function valsAdjacentCounts(nestedArray, val) {  // adding a number adjecent to a mine indicating how many mines attached to it
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[0].length; j++) {
      if (nestedArray[i][j] === val) {
        nestedArray = addOneNestedArrAdjacents(nestedArray, i, j, val)   // function to add numbers indicating how many mines attached to it
      }
    }
  }
  return nestedArray;   // array populated with mines and numbers indicating the number of mines attached to it
}

function addOneNestedArrAdjacents(nestedArray, i, j, val){
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (nestedArray[a]) {
      for (let b of jList) {
        if (nestedArray[a][b] !== undefined && nestedArray[a][b] !== val) {
          if (typeof nestedArray[a][b] !== "number") nestedArray[a][b] = 0  // setting the entry to zero if it not s number or bomb
          nestedArray[a][b]++  // incrementing the entry
        }
      }
    }
  }
  return nestedArray; // array populated with mines and numbers indicating the number of mines attached to it
}
function floorRand(scale) {
  return Math.floor(Math.random() * scale);  // returning a random number of the mstric entry
}
