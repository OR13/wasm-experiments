var memory = new WebAssembly.Memory({ initial: 1, maximum: 1 });

new Uint32Array(memory.buffer)[0] = 42;

let WASM_EXPERIMENTS = {};
window.WASM_EXPERIMENTS = WASM_EXPERIMENTS;

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function logMemory() {
  return bufferToHex(memory.buffer).substring(0, 128);
}

WASM_EXPERIMENTS.onClick = () => {
  let result = WASM_EXPERIMENTS.exports.add(19, 23);
  document.getElementById('container').innerText = 'Result: ' + result;
  console.log(result);
};

WebAssembly.instantiateStreaming(fetch('./main.wasm'), {
  memory,
  env: {
    sayHello: function(data) {
      console.log('Hello from WebAssembly!', data, logMemory());
    },
    abort: function(msg, file, line, column) {
      console.error('abort called at main.ts:' + line + ':' + column);
    }
  }
})
  .then(result => {
    WASM_EXPERIMENTS.exports = result.instance.exports;
    console.log(WASM_EXPERIMENTS);
  })
  .catch(console.error);
