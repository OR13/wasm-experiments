declare function sayHello(x: i32): void;

let counter: i32 = 0;

sayHello(counter);

export function add(x: i32, y: i32): i32 {
  let sum = x + y;
  counter = counter + sum;
  sayHello(counter);
  return sum;
}
