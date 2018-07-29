const path = require('path');

const N = 1e7;
const pow = 1e7;

function useParseInt() {
  for(let i = 0; i < N; i++) {
    parseInt(Math.random() * pow);
  }
}

function useShiftOperator() {
  for(let i = 0; i < N; i++) {
    Math.random() * pow >> 0;
  }
}

function useMath() {
  for(let i = 0; i < N; i++) {
    Math.floor(Math.random() * pow);
  }
}

console.time('parseInt');
useParseInt();
console.timeEnd('parseInt');


console.time('shiftOperator');
useShiftOperator();
console.timeEnd('shiftOperator');


console.time('Math.floor');
useMath();
console.timeEnd('Math.floor');

