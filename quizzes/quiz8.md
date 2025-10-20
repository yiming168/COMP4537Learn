# Quiz 8: Promise Basic

## Q1. Select native async functions in Vanilla JS below.

- 1. setTimeout()
- 2. setInterval()
- 3. forEach()
- 4. console.log()

- Answer: **1, 2**
- Explanation: setTimeout and setInterval are asynchronous. They hand a task off to the browser's timer API and allow the rest of the JavaScript code to continue executing without waiting. forEach and console.log are synchronous; they block execution until they are complete.

## Q2. What is the correct output order?

```
const fn1 = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve('success');
    });

fn1().then((res) => {
    console.log(res);
});

console.log('start');
```

- Answer: **synchronously**
- Explanation: <div class="explanation-title">💡 Explanation

## Q3. What is the correct output order?

```
const promise = new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
});

promise
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(4);
    });
console.log(5);
```

- Answer: **pending**
- Explanation: The promise executor runs synchronously, logging 1 and 2. However, resolve() is never called, so the promise remains in the <strong>pending</strong> state forever. The .then() callbacks are only executed when a promise is fulfilled, so they will never run. After the promise is created, the synchronous console.log(5) is executed.

## Q4. Which choice about Promise is incorrect?

- A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- Essentially, a Promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
- `<span class="highlight">A pending promise can not be fulfilled with a value or rejected with a reason (error).</span>`
- A Promise is always in one of the three states: I. pending, II. fulfilled, III. rejected.

- Answer: **The incorrect statement is "A pending promise can not be fulfilled with a value or rejected with a reason (error)".**
- Explanation: This is incorrect because the entire point of a promise being in the pending state is that it is waiting to be either fulfilled or rejected.

## Q5. What is the output of the code?

```
new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve();
})
.then(function () {
    console.log('Resolve 1');
})
.then(function () {
    console.log('Resolve 2');
});
console.log('console.log');
```

- Explanation: The Promise executor runs synchronously (Promise). Then, the next synchronous code runs (console.log). Finally, after the main script is done, the chained .then() callbacks in the microtask queue are executed in order (Resolve 1, Resolve 2).

## Q6. Which is the correct output of the code?

```
let promiseObj = new Promise((resolve, reject) => {
    resolve('hello 1');
    resolve('hello 2');
    resolve('hello 3');
    reject('error');
});

promiseObj.then((data) => console.log(data));
```

- Answer: **hello 1**
- Explanation: A promise can only be settled (fulfilled or rejected) <strong>once</strong>. The first call to resolve('hello 1') fulfills the promise. All subsequent calls to resolve and reject are ignored. The .then() handler therefore receives the first resolved value.

## Q7. What is the state of promiseObj after the code below gets executed?

```
let promiseObj = new Promise((resolve, reject) => {
    resolve('hello 1');
    resolve('hello 2');
    resolve('hello 3');
    reject('error');
});

promiseObj.then((data) => console.log(data));
```

- Answer: **fulfilled**
- Explanation: A promise settles only once. The first call, resolve('hello 1'), immediately moves the promise's state from pending to fulfilled. All subsequent calls are ignored, so the final state remains fulfilled.

## Q8. Which function doesn't return a Promise?

```
// Option 1
function fn1() {
    return Promise.resolve('hello world');
}

// Option 2
async function fn2() {
    return 'hello world';
}

// Option 3
function fn4() {
    return new Promise((resolve, reject) => {
        reject('hello world');
    });
}

// Option 4
function fn3() {
    new Promise(() => {
        return 'hello world';
    });
}
```

- Answer: **fn3**
- Explanation: fn1, fn2 (async functions always return promises), and fn4 all explicitly return a promise. fn3 creates a promise but <strong>does not return it</strong>. Since it has no return statement, it implicitly returns undefined.

## Q9. What is the correct order of the output?

```
setTimeout(() => {
    console.log(1);
}, 1);

console.log(2);

new Promise((resolve) => {
    console.log(3);
    resolve();
}).then(() => {
    console.log(4);
});
```

- Answer: **macrotask**
- Explanation: <div class="explanation-title">💡 Explanation

## Q10. What is the correct output of the code below?

```
function timer(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}

const timers = [timer(1000), timer(1000), timer(3000), timer(4000)];

Promise.race(timers).then((res) => {
    console.log(res);
});
```

- Answer: **1000**
- Explanation: Promise.race() resolves or rejects as soon as the <strong>first</strong> promise in the array settles. In this case, the two timer(1000) promises are the fastest. As soon as one of them resolves after 1000ms, the race is over, and the .then() block receives its value, 1000.

## Q11. What type would this function return upon invocation?

```
function fun() {
    new Promise(() => {
        return 'hello world';
    })
}
```

- Answer: **undefined**
- Explanation: The function fun creates a Promise but does not have a return statement for it. Functions in JavaScript that do not have an explicit return statement implicitly return undefined.

