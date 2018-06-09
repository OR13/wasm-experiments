const assert = require('assert');
const wasmAvailable = typeof WebAssembly !== 'undefined';
assert(wasmAvailable, 'The `WebAssembly` object is unavailable.');

const fs = require('fs');
const buf = fs.readFileSync('./out/main.wasm');

test('adds 1 + 2 to equal 3', async () => {
  let lib = await WebAssembly.instantiate(buf, {
    env: {
      sayHello: function() {
        console.log('Hello from WebAssembly!');
      },
      abort: function(msg, file, line, column) {
        console.error('abort called at main.ts:' + line + ':' + column);
      }
    }
  });
  console.log(lib);
});
