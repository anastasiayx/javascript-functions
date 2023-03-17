function seed() {
  // return [...arguments];
  return Array.prototype.slice.call(arguments);
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some((c) => same(c, cell));
}

const printCell = (cell, state) => {
  // if (contains.call(state, cell)) {
  //   return `\u25A3`;
  // } else {
  //   return `\u25A2`;
  // }
  return contains.call(state, cell) ? `\u25A3` : `\u25A2`;
};

const corners = (state = []) => {
  // if (state === []) {
  if (state.length === 0) {
    return { topRight: [0, 0], bottomLeft: [0, 0] };
  } else {
    const xs = state.map(([x, _]) => x);
    const ys = state.map(([_, y]) => y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    return { bottomLeft: [minX, minY], topRight: [maxX, maxY] };
  }
};

const printCells = (state) => {
  // const [minX, minY] = corners(state).bottomLeft;
  // const [maxX, maxY] = corners(state).topRight;
  // let result = '';
  // let count = 0;
  // for (let j = maxY; j >= minY; j--) {
  //   for (let i = minX; i <= maxX; i++) {
  //     if (count % 3 === 0) {
  //       result += `\n`;
  //     }
  //     result += printCell([i, j], state) + ' ';
  //     count++;
  //   }
  // }
  // return result;
  const { bottomLeft, topRight } = corners(state);
  let accumulator = '';
  for (let y = topRight[1]; y >= bottomLeft[1]; y--) {
    let row = [];
    for (let x = bottomLeft[0]; x <= topRight[0]; x++) {
      row.push(printCell([x, y], state));
    }
    accumulator += row.join(' ') + '\n';
  }
  return accumulator;
};

const getNeighborsOf = ([x, y]) => {
  const maxY = y + 1;
  const minY = y - 1;
  const maxX = x + 1;
  const minX = x - 1;
  let result = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      result.push([x, y]);
    }
  }
  return result;
};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2],
  ],
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log('Usage: node js/gameoflife.js rpentomino 50');
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;
