// const sum = require('./sum');
// const main = require('./main');

const fetch = require('node-fetch');

WebAssembly.instantiateStreaming(fetch('../out/main.wasm'), {
  env: {
    sayHello: function() {
      console.log('Hello from WebAssembly!');
    },
    abort: function(msg, file, line, column) {
      console.error('abort called at main.ts:' + line + ':' + column);
    }
  }
})
  .then(result => {
    const exports = result.instance.exports;
    document.getElementById('container').innerText =
      'Result: ' + exports.add(19, 23);
  })
  .catch(console.error);

  

test('adds 1 + 2 to equal 3', () => {
  console.log(main);
  // expect(sum(1, 2)).toBe(3);
});
