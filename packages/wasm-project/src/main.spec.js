const assert = require('assert');
const wasmAvailable = typeof WebAssembly !== 'undefined';
assert(wasmAvailable, 'The `WebAssembly` object is unavailable.');

const wasmProject = require('./wasm-project');

test('mod.instance.exports.add exists', async () => {
  let mod = await wasmProject('./src/main.wasm');
  expect(mod.instance.exports.add).toBeDefined();
});

test('mod.instance.exports.add works', async () => {
  let mod = await wasmProject('./src/main.wasm');
  expect(mod.instance.exports.add(19, 23)).toBe(42);
  console.log(mod)
});
