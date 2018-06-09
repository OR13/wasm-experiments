const fs = require('fs');

module.exports = async somePath => {
  const buf = fs.readFileSync(somePath);
  let mod = await WebAssembly.instantiate(buf, {
    env: {
      sayHello: function() {
        console.log('Hello from WebAssembly!');
      },
      abort: function(msg, file, line, column) {
        console.error('abort called at main.ts:' + line + ':' + column);
      }
    }
  });
  return mod;
};
