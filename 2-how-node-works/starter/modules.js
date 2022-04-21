// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

//Exports
const {add, multiply, devide} = require('./test-module-2');
console.log(add(8, 8));
console.log(multiply(8, 8));
console.log(devide(8, 8));


//Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
