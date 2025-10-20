
# JavaScript Asynchronous Programming and Core Concepts


## 1. Functions Returning Objects (The Factory Pattern)

A factory function is any function that is not a constructor but returns a new object. This is a powerful pattern for creating and configuring objects.

**Example Code:**
```javascript
function math() {
  return {
    add: function(x, y) {
      return x + y;
    },
    multiply: function(x, y) {
      return x * y;
    }
  };
}
```

**Q: What does this function return?**
A: It returns an `object` that contains two methods: `add` and `multiply`.

**Q: How would you use it to add two numbers?**
A: You first call `math()` to get the object, then call the `.add()` method on that object.

```javascript
// Call the factory, then the method on the returned object.
const result = math().add(5, 10); // result is 15
console.log(result);

// Alternatively, store the object in a variable for reuse.
const calculator = math();
const sum = calculator.add(2, 3);       // sum is 5
const product = calculator.multiply(4, 5); // product is 20
```

## 2. Why Asynchronous Operations are Complicated

Synchronous code runs top-to-bottom, blocking execution until a task is complete. Asynchronous code starts a task (e.g., a network request) and moves on immediately, running other code. The result of the async task arrives later.

This is complicated because it breaks the linear flow of code and requires special patterns to manage.

**Analogy: Ordering Coffee**
*   **Synchronous:** A vending machine. You wait, blocked, until you get your coffee.
*   **Asynchronous:** A barista. You order, get a buzzer (a "Promise"), and are free to do other things until the buzzer goes off (the Promise resolves).

## 3. The Evolution of Handling Asynchronicity

### 3.1 The Old Way: Callbacks & Callback Hell

A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

**Example: Sequential Asynchronous Tasks**
To guarantee that `f2` runs after `f1`, you must nest the call to `f2` inside the callback of `f1`.

```javascript
function async(callback) {
  setTimeout(callback, Math.random() * 1000);
}

// Nesting ensures f1 -> f2 -> f3
async(() => {
  console.log(1);
  // Start the next operation only after the first is done
  async(() => {
    console.log(2);
    // And the next...
    async(() => {
      console.log(3);
    });
  });
});
```
This deep nesting is known as **"Callback Hell"** or the "Pyramid of Doom" and is very difficult to read and maintain.

### 3.2 A Better Way: Promises

A `Promise` is an object representing the eventual completion (or failure) of an asynchronous operation. It acts as a placeholder for a future value.

#### The Golden Rule of Promises: One-Time Settlement
A promise can only be settled (fulfilled or rejected) **once**. After it's settled, its state is locked and will never change. Any further attempts to call `resolve()` or `reject()` are ignored.

**Example: `setInterval` and a Promise**
This code attempts to resolve a promise every 100ms.

```javascript
let promise = new Promise((res) => {
  setInterval(() => {
    res("Hi");
  }, 100);
});

promise.then((mes) => { console.log(mes) });
```
**Q: How many times will "Hi" be logged?**
A: **Only once.** The first time `res("Hi")` is called after 100ms, the promise becomes fulfilled. All subsequent calls to `res()` from the interval are ignored.

### 3.3 The Modern Way: `async/await`

`async/await` is syntactic sugar built on top of Promises. It lets you write asynchronous code that looks and behaves like synchronous code, making it much easier to read and reason about.

```javascript
// A function that returns a promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runInOrder() {
  console.log('Starting...');
  
  await delay(1000); // Pauses execution for 1 sec without blocking
  console.log(1);
  
  await delay(1000); // Pauses again
  console.log(2);
  
  await delay(1000); // And again
  console.log(3);
  
  console.log('Finished!');
}

runInOrder();
```

## 4. Deep Dive: The Event Loop

### 4.1 Microtasks vs. Macrotasks

The Event Loop manages how asynchronous code is executed. It uses two primary queues with different priorities:

*   **Microtask Queue (Higher Priority):** Holds callbacks from Promises (`.then`, `.catch`). The event loop will run **ALL** tasks in this queue until it's empty before moving on.
*   **Macrotask Queue (Lower Priority):** Holds callbacks from `setTimeout`, `setInterval`, I/O, user events. The event loop will only pick **ONE** task from this queue per "tick".

**The Order of Operations:**
1.  Run all synchronous code on the Call Stack.
2.  Process the **entire** Microtask Queue.
3.  Process **one** task from the Macrotask Queue.
4.  Repeat from step 2.

### 4.2 Event Loop Code Puzzles

#### Puzzle 1
```javascript
Promise.resolve().then(() => console.log(1));
console.log(2);
```
**Output:** `2`, then `1`
**Reasoning:** `console.log(2)` is synchronous and runs first. The promise's `.then()` is a microtask and runs only after the synchronous script is finished.

#### Puzzle 2
```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(0).then(() => console.log(2));
Promise.resolve().then(() => console.log(3)).then(() => console.log(1));
console.log(4);
```
**Output:** `4`, `3`, `1`, `2`
**Reasoning:**
1.  `console.log(4)` is synchronous.
2.  `console.log(3)` is the first microtask. Its completion schedules `console.log(1)` as another microtask.
3.  The microtask queue must be fully cleared, so `console.log(1)` runs next.
4.  Finally, the `setTimeout(resolve, 0)` callback (a macrotask) runs. This resolves the `wait` promise, which in turn schedules `console.log(2)` as a microtask for the *next* tick of the event loop.

## 5. Practical Application: Sequential AJAX Calls

**Goal:** Get data from Server A, and only then use that data to send an update to Server B.

### 5.1 The Callback Approach

This uses the original `XMLHttpRequest` object and nests the second call inside the success handler of the first.

```javascript
function getAndUpdateScore() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Step 1: First request succeeded.
      const score = parseInt(this.responseText);
      
      // Step 2: Now, start the second request.
      const xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log('Score updated successfully!');
        }
      };
      xhttp2.open("PATCH", "http://serverB.com/updatescore", true);
      xhttp2.send(`score=${score}`);
    }
  };
  xhttp.open("GET", "http://serverA.com/getscore", true);
  xhttp.send();
}
```

### 5.2 The Modern `async/await` Approach

This uses the modern, promise-based `fetch` API for cleaner, flatter code.

```javascript
async function getAndUpdateScoreModern() {
  try {
    // Step 1: Get the score from Server A
    const responseA = await fetch("http://serverA.com/getscore");
    const scoreData = await responseA.json(); // Assuming JSON response
    
    // Step 2: Update the score on Server B
    const responseB = await fetch("http://serverB.com/updatescore", {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: scoreData.score })
    });
    
    const result = await responseB.text();
    console.log(result);
    
  } catch (error) {
    console.error("Failed to get or update score:", error);
  }
}
```

## 6. Practical Application: Measuring AJAX Request Timings

We can use `performance.now()` for high-resolution timestamps to measure different phases of a request.

#### Q1: Total Round-trip Time
Measure from just before `.send()` to when `readyState` is 4 (DONE).

```javascript
function measureTotalRequestTime() {
  const xhttp = new XMLHttpRequest();
  let startTime;

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) { // DONE
      const totalTime = performance.now() - startTime;
      console.log(`Total request time: ${totalTime.toFixed(2)} ms`);
    }
  };

  xhttp.open("GET", "https://api.github.com/users/octocat", true);
  startTime = performance.now();
  xhttp.send();
}
```

#### Q2: Body Download Time
Measure from when `readyState` is 2 (HEADERS_RECEIVED) to when `readyState` is 4 (DONE).

```javascript
function measureBodyDownloadTime() {
  const xhttp = new XMLHttpRequest();
  let headerTime;

  xhttp.onreadystatechange = function() {
    if (this.readyState === 2) { // HEADERS_RECEIVED
      headerTime = performance.now();
    }
    if (this.readyState === 4) { // DONE
      const downloadTime = performance.now() - headerTime;
      console.log(`Body download time: ${downloadTime.toFixed(2)} ms`);
    }
  };

  xhttp.open("GET", "https://api.github.com/users/octocat", true);
  xhttp.send();
}
```