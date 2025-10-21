// Promise chaining example
function double(x) { return x * 2; }
function addTenAsync(x) { return new Promise((resolve) => setTimeout(() => resolve(x + 10), 50)); }
function validate(x) { if (x > 25) throw new Error('Too big'); return x; }

function runChain(input) {
  return Promise.resolve(input)
    .then(double)          // sync return flows to next then
    .then(addTenAsync)     // returns a Promise; chain waits
    .then(validate)        // throws to reject chain
    .then((result) => ({ ok: true, result }))
    .catch((err) => ({ ok: false, error: err.message }))
    .finally(() => console.log('chain finished for', input));
}

runChain(5).then((r) => console.log('result(5):', r));   // { ok: true, result: 20 }
runChain(8).then((r) => console.log('result(8):', r));   // { ok: false, error: 'Too big' }

// .then returns a new Promise
const base = Promise.resolve(1);
const chained = base.then(v => v + 1);
console.log('then returns promise:', chained instanceof Promise);
