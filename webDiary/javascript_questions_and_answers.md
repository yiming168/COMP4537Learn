# Quiz 6: JavaScript misc 

## Question 1
**What could become the type of variable `v` after the execution of the JavaScript code snippet below?**

```js
let v = sessionStorage.getItem("key");
```

### Correct Answer
**string or null**

### Explanation
`sessionStorage.getItem("key")` returns:
- A **string** if the key exists.
- **null** if the key does not exist.

It never returns `undefined`.

---

## Question 2
**What is the correct way to write a JavaScript array?**

### Correct Answer
```js
let colors = ["red", "green", "blue"];
```

### Explanation
Arrays in JavaScript use **square brackets** with elements separated by commas.  
Other given options are invalid JavaScript syntax.

---

## Question 3
**What will the console log?**

```js
console.log(test);
let s = 1;
for (let i = 4; i < 40; ++i) {
    s = s * 2 + i;
}
var test = 1;
```

### Correct Answer
```
undefined
```

### Explanation
`var` declarations are **hoisted** to the top but initialized as `undefined`.  
When `console.log(test)` runs, the variable exists but has not yet been assigned `1`.

---

## Question 4
**Which one of these HTTP methods can be used to send an API request of size 1GB to a server?**

### Correct Answer
**POST**

### Explanation
- **GET** appends data to the URL, which has size limits (usually a few KB).
- **POST** sends data in the **request body**, making it suitable for large payloads.

---

## Question 5
**What will the console log?**

```js
setTimeout(function () {
    console.log(1);
    setTimeout(function () {
        console.log(3);
    }, 0);
    console.log(2);
}, 500);
console.log(4);
```

### Correct Answer
```
4
1
2
3
```

### Explanation
1. `console.log(4)` runs immediately (synchronous).
2. After 500ms, the first `setTimeout` runs: logs `1`, then schedules `3`.
3. Logs `2` next.
4. Finally, the inner `setTimeout` (0ms) logs `3`.

---

## Question 6
**The external JavaScript file (myJs.js) must contain the `<script>` tag.**

### Correct Answer
**False**

### Explanation
External JS files should **not** include `<script>` tags.  
They contain only JavaScript code and are linked via:

```html
<script src="myJs.js"></script>
```

---

## Question 7
**What will be logged on the console?**

```js
function hiGenerator(name) {
  return function () {
    console.log("Hi " + name);
  };
}
console.log(hiGenerator("Elan")());
```

### Correct Answer
```
Hi Elan
undefined
```

### Explanation
1. `hiGenerator("Elan")` returns a function that logs `"Hi Elan"`.
2. That function is immediately executed, logging `"Hi Elan"`.
3. The function itself returns `undefined`, which is then logged by the outer `console.log()`.


**Question 8:** What would be the value of the variable `counter` after the user has pressed the button five times?

```html
<input id="inputid" type="button"> click </input>
<script>
    let counter = 1;
    function foo() {
        counter++;
        console.log(counter);
    }
    document.getElementById('inputid').onclick = foo();
    console.log(counter);
</script>
```

*   **Answer:** The final value of `counter` will be **2**.
*   **Explanation:** The line `document.getElementById('inputid').onclick = foo();` contains a common mistake. The parentheses `()` after `foo` cause the function to be **executed immediately** when the script loads, not when the button is clicked. This increments `counter` from 1 to 2. The *return value* of `foo` (which is `undefined`) is then assigned to the `onclick` event handler. Because the handler is `undefined`, clicking the button does nothing. The value of `counter` remains 2, no matter how many times the button is pressed.


**Question 9:** An API request made by which one of these HTTP methods can be bookmarked?

*   GET
*   POST
*   POST and GET

*   **Answer:** **GET**
*   **Explanation:** GET requests include all necessary data in the URL's query parameters. Since a bookmark is just a saved URL, GET requests can be bookmarked and re-executed perfectly. POST requests send data in the request body, which is not part of the URL and cannot be bookmarked.


**Question 10:** What is the output of the code snippet below?

```javascript
<script>
    if (10 > 9) {
        let a = 999;
        a++;
    }
    console.log(a);
</script>
```

*   **Answer:** It will throw a **`ReferenceError`**.
*   **Explanation:** The `let` keyword creates a **block-scoped** variable. This means the variable `a` only exists within the curly braces `{}` of the `if` statement. The `console.log(a)` statement is outside of that block, so when it tries to access `a`, it cannot find it in its scope, resulting in a `ReferenceError: a is not defined`.

**Question 11:** What will the console log?

```javascript
setTimeout(function () {
    let a = 2;
    console.log(1);
    setTimeout(function () {
        console.log(2);
    }, 18849);
    console.log(3);
}, 18850);

if (a === 2) {
    console.log(4);
}

for (let i = 0; i < 100000; i++) {}
```

*   **Answer:** `uncaught ReferenceError: a is not defined`
*   **Explanation:** `setTimeout` is asynchronous. The JavaScript engine schedules the function to run later and immediately executes the next synchronous code, which is the `if (a === 2)` block. The variable `a` is declared with `let` *inside* the `setTimeout` callback, so it is not in scope where the `if` statement is. The script tries to access a non-existent variable and crashes with a `ReferenceError` before any timers can complete.

**Question 12:** What will the console log?

```javascript
function foo(n) {
    var s = 0;
    for (let i = 0; i < n; i++) {
        s += i;
    }
}

console.log(foo(3));
```

*   **Answer:** `undefined`
*   **Explanation:** The function `foo(3)` correctly calculates that the sum `s` is 3 (0 + 1 + 2). However, the function `foo` is missing a `return` statement. In JavaScript, a function that does not explicitly return a value implicitly returns `undefined`. Therefore, `console.log` prints `undefined`.

**Question 13:** What will the following code return?

```javascript
if (m = []) {
    console.log("Green");
} else {
    console.log("BLue");
}
var m = 10;
```

*   **Answer:** `Green`
*   **Explanation:**
    1.  **Hoisting:** The declaration `var m;` is hoisted to the top of the scope, so `m` is `undefined` when the `if` statement is evaluated.
    2.  **Assignment:** The condition `(m = [])` is an **assignment**, not a comparison. It assigns an empty array `[]` to `m`.
    3.  **Truthiness:** The value of an assignment expression is the value that was assigned. Therefore, the `if` statement becomes `if ([])`. In JavaScript, an empty array is an object, and all objects are "truthy".
    4.  Since the condition is true, the first block is executed, logging "Green".

**Question 14:** What will be logged on the console?

```html
<!DOCTYPE html>
<html>
<body>
<script>
function foo() {
    const a = 0;
    console.log(a);
    ++a;
}
</script>
</body>
</html>
```

*   **Answer:** Nothing will be logged on the console.
*   **Explanation:** The function `foo()` is **defined**, but it is never **called** or invoked anywhere in the script. Since the function is never executed, the code inside it, including `console.log(a)`, never runs.

**Question 15:** What is the correct JavaScript syntax to change the content of the HTML element `<p id="demo">This is a demonstration.</p>`?

*   `#demo.innerHTML = "Hello World!";`
*   `document.getElementsByName("p").innerHTML = "Hello World!";`
*   `document.getElement("p").innerHTML = "Hello World!";`
*   **`document.getElementById("demo").innerHTML = "Hello World!";`**

*   **Answer:** `document.getElementById("demo").innerHTML = "Hello World!";`
*   **Explanation:** This is the standard method for selecting a unique element by its `id` and then using the `.innerHTML` property to change its content. The other options use incorrect syntax or non-existent methods.


# Quiz 7: NodeJS, HTTP methods, fs, DB
**Question 1:** Which one of these modules is not a built-in module in Node.js?
*   http
*   url
*   **mysql**
*   fs

**Answer:** `mysql`. It's a third-party package that must be installed.

---

**Question 2:** Which one of these modules is used in Node.js for handling the file system?
*   os
*   path
*   file
*   **fs**

**Answer:** `fs` (File System).

**Question 3:** Which block of code will send the client 'You are connected!' when they connect to `http://localhost:8000`?

*   **Answer:**
    ```javascript
    const http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('You are connected!');
        res.end();
    }).listen(8000);
    ```
*   **Explanation:** This is the correct syntax. It uses the **response (`res`)** object to write the header and body, uses the correct status code (`200`), and listens on the correct port (`8000`). Other options incorrectly use the request (`req`) object, provide the port as the status code, or fail to specify a port in `.listen()`.

**Question 4:** Given `const address = "http://localhost:8000/admin.html?user=123";` and `const parsed = url.parse(address, true);`, what line of code will print out `/admin.html`?
*   `console.log(parsed.path)`
*   **`console.log(parsed.pathname)`**
*   `console.log(parsed.search)`
*   `host`

**Answer:** `console.log(parsed.pathname)`. The `pathname` property contains only the path portion of the URL, without the query string.

**Question 5:** Using a GET request to send over user credentials (username and password) to the server is considered safe and ok.
*   **Answer:** False.
*   **Explanation:** This is highly insecure because credentials appear in the URL, browser history, and server logs. Sensitive data should be sent in the body of a POST request over HTTPS.

---

**Question 6:** After creating a user profile, you want to edit your information. Which HTTP request is appropriate for this task?
*   **Answer:** PUT.
*   **Explanation:** `PUT` is the standard HTTP method for updating an existing resource.

**Question 7:** Which of the following statements is false?
*   There are no size limits in data for both GET and POST.
*   GET is used for requesting data and POST is for sending data from the server.
*   ...

*   **Answer:** Both statements listed are false.
*   **Explanation:** GET requests have a URL length limit (around 2000 characters). POST requests are for sending data **from the client to the server**, not the other way around.

**Question 8:** In order to retrieve information about the database, having the following code on the *client-side* is sufficient and is considered good practice.
```javascript
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});
// ...
```
*   **Answer:** False.
*   **Explanation:** This is extremely dangerous. Placing database credentials on the client-side would expose them to anyone viewing the page source. Database connections must always be handled on the server-side.

**Question 9:** Which block of code will successfully delete the file 'file.txt'?

*   **Answer:**
    ```javascript
    fs.unlink('file.txt', (err) => {
      if (err) throw err;
      console.log('file.txt was deleted');
    });
    ```
*   **Explanation:** The correct function in Node.js's native `fs` module for deleting a file is `fs.unlink()`. Other function names like `remove` or `delete` do not exist in the core module.

**Question 10:** Given a project with `index.js` in the root and `math.js` inside a `modules` folder, what statements can be used to import `math.js` into `index.js`?
*   **Answer:** Both `const math = require('./modules/math.js')` and `const math = require('./modules/math')` are correct.
*   **Explanation:** The `./` indicates a relative path. Node.js's `require` function can resolve the module with or without the `.js` extension.


# Quiz 8: Promise basic
**Question 1:** Select native async functions in Vanilla JS below.

1.  `setTimeout()`
2.  `setInterval()`
3.  `forEach()`
4.  `console.log()`

*   **Answer:** `1, 2`
*   **Explanation:** `setTimeout` and `setInterval` are asynchronous. They hand a task off to the browser's timer API and allow the rest of the JavaScript code to continue executing without waiting. `forEach` and `console.log` are synchronous; they block execution until they are complete.

**Question 2:** What is the correct output order?

```javascript
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

*   **Answer:** `1`, `start`, `success`
*   **Explanation:**
    1.  The function passed to the `new Promise` constructor (the "executor") runs **synchronously**. So, `console.log(1)` runs first.
    2.  `resolve('success')` fulfills the promise and queues the `.then()` callback to run later in the microtask queue.
    3.  Execution continues with the next synchronous line: `console.log('start')`.
    4.  After the main script finishes, the event loop processes the microtask queue, running the `.then()` callback and logging `success`.

**Question 3:** What is the correct output order?

```javascript
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

*   **Answer:** `1`, `2`, `5`
*   **Explanation:** The promise executor runs synchronously, logging `1` and `2`. However, `resolve()` is never called, so the promise remains in the **pending** state forever. The `.then()` callbacks are only executed when a promise is fulfilled, so they will never run. After the promise is created, the synchronous `console.log(5)` is executed.

**Question 4:** Which choice about Promise is incorrect?
*   A Promise is an object representing the eventual completion or failure of an asynchronous operation.
*   Essentially, a Promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
*   **A pending promise can not be fulfilled with a value or rejected with a reason (error).**
*   A Promise is always in one of the three states: I. pending, II. fulfilled, III. rejected.

*   **Answer:** The incorrect statement is "A pending promise can not be fulfilled with a value or rejected with a reason (error)".
*   **Explanation:** This is incorrect because the entire point of a promise being in the `pending` state is that it is waiting to be either fulfilled or rejected.


**Question 5:** What is the output of the code?

```javascript
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

*   **Answer:**
    ```
    Promise
    console.log
    Resolve 1
    Resolve 2
    ```
*   **Explanation:** The Promise executor runs synchronously (`Promise`). Then, the next synchronous code runs (`console.log`). Finally, after the main script is done, the chained `.then()` callbacks in the microtask queue are executed in order (`Resolve 1`, `Resolve 2`).

**Question 6:** Which is the correct output of the code?

```javascript
let promiseObj = new Promise((resolve, reject) => {
    resolve('hello 1');
    resolve('hello 2');
    resolve('hello 3');
    reject('error');
});

promiseObj.then((data) => console.log(data));
```

*   **Answer:** `hello 1`
*   **Explanation:** A promise can only be settled (fulfilled or rejected) **once**. The first call to `resolve('hello 1')` fulfills the promise. All subsequent calls to `resolve` and `reject` are ignored. The `.then()` handler therefore receives the first resolved value.

**Question 7:** What is the state of `promiseObj` after the code below gets executed?

```javascript
let promiseObj = new Promise((resolve, reject) => {
    resolve('hello 1');
    resolve('hello 2');
    resolve('hello 3');
    reject('error');
});

promiseObj.then((data) => console.log(data));
```

*   **Answer:** `fulfilled`
*   **Explanation:** A promise settles only once. The first call, `resolve('hello 1')`, immediately moves the promise's state from `pending` to `fulfilled`. All subsequent calls are ignored, so the final state remains `fulfilled`.

**Question 8:** Which function doesn't return a Promise?

```javascript
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

*   **Answer:** `fn3`
*   **Explanation:** `fn1`, `fn2` (async functions always return promises), and `fn4` all explicitly return a promise. `fn3` creates a promise but **does not return it**. Since it has no `return` statement, it implicitly returns `undefined`.

**Question:** What is the correct order of the output?

```javascript
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

*   **Answer:** `2, 3, 4, 1`
*   **Explanation:**
    1.  `setTimeout` schedules a **macrotask**.
    2.  `console.log(2)` runs synchronously. Output: `2`.
    3.  The `Promise` executor runs synchronously. Output: `3`.
    4.  The `.then()` callback is scheduled as a **microtask**.
    5.  After the main script, the event loop runs all **microtasks** first. Output: `4`.
    6.  Finally, the event loop runs the **macrotasks**. Output: `1`.

**Question 10:** What is the correct output of the code below?

```javascript
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

*   **Answer:** `1000`
*   **Explanation:** `Promise.race()` resolves or rejects as soon as the **first** promise in the array settles. In this case, the two `timer(1000)` promises are the fastest. As soon as one of them resolves after 1000ms, the race is over, and the `.then()` block receives its value, `1000`.

**Question 11:** What type would this function return upon invocation?

```javascript
function fun() {
    new Promise(() => {
        return 'hello world';
    })
}
```

*   **Answer:** `undefined`
*   **Explanation:** The function `fun` creates a `Promise` but does not have a `return` statement for it. Functions in JavaScript that do not have an explicit `return` statement implicitly return `undefined`.

# Quiz 9: Web architecture pattern

**Question 1:** In the context of web application architecture, what is the primary focus?
*   **Answer:** Reliability, scalability, security, ease of implementation, and modularity.

**Question 2:** Which of the following is a direct benefit of studying architectural patterns?
*   **Answer:** Helps evaluate efficiency, robustness, security, and maintenance costs.

**Question 3:** A monolithic architecture is typically simple to build and deploy but can become hard to scale and maintain as complexity grows.
*   **Answer:** True.

**Question 4:** In a Microservice Architecture, how do services typically communicate with each other?
*   **Answer:** Via API calls.

**Question 5:** Large companies like Netflix or Discord often use a single, unchanging architectural pattern throughout their existence.
*   **Answer:** False.

**Question 6:** In a Microservice Architecture, if one service fails (e.g., the user profile service), what is a likely consequence for other services?
*   **Answer:** Other services can potentially continue operating if they don't depend on the failed one.

### Q26: Architectural Patterns

**Question 7:** In the API-centric architecture, what is the common format for data payloads in API responses?
*   **Answer:** JSON.

**Question 8:** Match the architectural pattern with its primary characteristic.
*   **Answer:**
    *   Trigger actions asynchronously via events â†’ **Event-Driven Architecture**
    *   System broken into small, independent services â†’ **Microservice Architecture**
    *   Enforces separation of concerns (UI, logic, data) â†’ **Layered Architecture**
    *   All components bundled in a single deployable unit â†’ **Monolithic Architecture**

**Question 9:** Which architecture is most suitable for a large-scale system like Netflix or Amazon that requires high scalability and independent team ownership?
*   **Answer:** Microservices Architecture.

**Question 10:** Select the advantages of a Microservice Architecture.
*   **Answer:**
    *   Enables adding new components without shutting down the entire system.
    *   Allows different teams to work on different services.
    *   Improves scalability and flexibility.

**Question 11:** Place the following architectural patterns in the order that a growing tech startup would typically adopt them, from earliest to latest.
*   **Answer:**
    1.  Monolithic
    2.  Layered
    3.  Microservices

**Question 12:** In a Layered (n-Tier) Architecture, what is the primary purpose of separating the data access layer from the business logic layer?
*   **Answer:** To ensure regulatory compliance, testability, and maintainability.

**Question 13:** The Model-View-Controller (MVC) pattern is best for web frameworks when...
*   **Answer:** the core business logic must be completely decoupled from all external systems.

**Question 14:** What is a key development benefit of an API-centric, service-based architecture?
*   **Answer:** It enables a new service to be written in a different technology stack (e.g., Node.js) and hooked up to an existing app (e.g., Django).

**Question 15:** In a monolithic architecture, adding a new feature often requires recompiling and redeploying the entire application.
*   **Answer:** True.

**Question:** What is the primary purpose of the Hexagonal Architecture (Ports & Adapters) pattern?
*   **Answer:** To decouple core business logic from external systems like databases and UIs.
*   **Explanation:** The goal of this pattern is to isolate the application's core logic from outside concerns (like the database, UI, or third-party APIs). This makes the core logic independent of technology choices, easier to test, and more maintainable.
# Quiz 5: Local Storage & JSON 

## Question 1
**Which is the correct method to access a value 'string' stored in localStorage with the key 'token'?**

- `window.localStorage.getItem('string');`
- `window.localStorage.getItem('token');`
- `window.localStorage.get('string');`
- `window.localStorage.get('token');`

### Correct Answer
`window.localStorage.getItem('token');`

### Explanation
Use `localStorage.getItem(key)` to retrieve a value by its key. The key is `'token'`; `getItem` returns the stored string or `null` if missing. There is no `get()` method on `localStorage`.

---

## Question 2
**Which of the following methods is not a built-in method for parsing and/or converting values to JSON?**

- `JSON.parse()`
- `JSON.convert()`
- `JSON.stringify()`
- `None of the above`

### Correct Answer
`JSON.convert()`

### Explanation
The JSON API provides `JSON.parse()` (string -> object) and `JSON.stringify()` (object -> string). `JSON.convert()` does not exist.

---

## Question 3
**Which is the correct method to clear all data from local storage?**

- `window.localStorage.removeAll();`
- `window.localStorage.clearAll();`
- `window.localStorage.clear();`
- `window.localStorage.remove();`

### Correct Answer
`window.localStorage.clear();`

### Explanation
`clear()` removes all keys in the origin's local storage. To remove a single key, use `removeItem(key)`. Methods like `removeAll()`, `clearAll()`, or `remove()` do not exist.
emoveItem(key). Methods like 
emoveAll(), clearAll(), or 
emove() do not exist.

---

## Question 4
**What is the output of this code?**

```js
window.localStorage.setItem('value', 'string');
const str = window.localStorage.getItem('value');
console.log(str);
```

- `key`
- `string`
- `value`
- `undefined`

### Correct Answer
`string`

### Explanation
`getItem('value')` returns the stored string `'string'`. `getItem` never returns `undefined`; if the key is absent it returns `null`.

---

## Question 5
**Suppose the file `http://myDomain.com/write.html` writes into localStorage using `localStorage.setItem('something', 'some data')`. Which page(s) could access that content using `localStorage.getItem('something')`?**

- `http://myDomain.com/read.html` and `http://myDomain.com/fetch.html` and `http://myDomain.com/get.html`
- only `http://myDomain.com/read.html`
- `http://myDomain.com/read.html` and `https://myDomain.com/read.html`

### Correct Answer
`http://myDomain.com/read.html` and `http://myDomain.com/fetch.html` and `http://myDomain.com/get.html`

### Explanation
localStorage is scoped to the origin (scheme + host + port). All three pages share the same origin. Changing the scheme (HTTP vs HTTPS) changes the origin and cannot access the same storage.

---

## Question 6
**Where can you view Local Storage in Chrome DevTools?**

- Elements tab
- Memory tab
- Application tab
- Sources tab

### Correct Answer
Application tab

### Explanation
Open DevTools > Application > Storage > Local Storage to inspect keys and values per origin.

---

## Question 7
**Storing nested objects in JSON is allowed. This is valid JSON:**

```json
{"object": {"nestedObject": { "key": "value" }}}
```

- True
- False

### Correct Answer
True

### Explanation
JSON supports nested objects and arrays. Keys must be double-quoted, and the example follows valid JSON syntax.

---

## Question 8
**Data stored in localStorage is persistent between different browsers (e.g., data stored in Firefox is accessible in Chrome).**

- True
- False

### Correct Answer
False

### Explanation
localStorage is browser-specific and origin-specific. Data does not sync across different browsers.

---

## Question 9
**What is the output of the following code?**

```js
const key = 'key';
window.localStorage.setItem(key, 'string');
const value = window.localStorage.getItem(key);
window.localStorage.removeItem(key);
window.localStorage.setItem(key, 'newString');
console.log(value);
```

- `'string'`
- `'value'`
- `'key'`
- `'newString'`

### Correct Answer
'string'

### Explanation
`value` holds the result of the earlier `getItem` call, which is 'string'. Later removing or resetting the key doesn't change the existing variable.

---

## Question 10
**Suppose an item is stored in the local storage of `https://aaa.com/labs/1/index.html`. Which of the following can access it?**

- A: `https://lab.aaa.com/1/index.html`
- B: `https://aaa.com/labs/5/hello.html`
- C: `http://localhost:3000/labs/1/index.html`
- Both A and B

### Correct Answer
B: `https://aaa.com/labs/5/hello.html`

### Explanation
Only pages with the same origin (same scheme, host, and port) share localStorage. Subdomains like `lab.aaa.com` are a different origin; `http://localhost:3000` also differs in both host and scheme.

---

# Quiz 1: HTML & CSS 

## Question 1
**How would you select all `<div>` tags with a class of `container`?**

- `div.container {}`
- `.container {}`
- `div > .container {}`
- `div + .container {}`

### Correct Answer
`div.container {}`

### Explanation
`div.container` matches only `<div>` elements that have class `container`. `.container` matches any element with that class; the child (`>`) and adjacent sibling (`+`) combinators don’t mean “a div with this class”.

---

## Question 2
**Which of the following sizing declarations is invalid?**

- `width: 50px;`
- `width: 50%;`
- `width: 50em;`
- These are all valid

### Correct Answer
These are all valid

### Explanation
`px`, `%`, and `em` are valid CSS units; each declaration is syntactically correct.

---

## Question 3
**Which of the following needs an opening AND closing tag?**

- `<hr>`
- `<br>`
- `<img>`
- `<table>`

### Correct Answer
`<table>`

### Explanation
`<table>` is a non-void element that requires a closing tag. `<hr>`, `<br>`, and `<img>` are void elements.

---

## Question 4
**Which of the following is a block-level element?**

- `<div></div>`
- `<span></span>`
- `<a href="#"></a>`
- `<button></button>`

### Correct Answer
`<div></div>`

### Explanation
`<div>` is block-level by default. `<span>` and `<a>` are inline; `<button>` is typically inline (often rendered inline-block).

---

## Question 5
**How would you change the background color of a `<div>`?**

- `div { color: green; }`
- `div { background-color: green; }`
- `div { backgroundColor: green; }`

### Correct Answer
`div { background-color: green; }`

### Explanation
CSS property names use kebab-case (e.g., `background-color`). CamelCase is used in JavaScript style APIs, not in CSS.

---

## Question 6
**Image tags are assigned a source file using which attribute?**

- `<img source="" />`
- `<img src="" />`
- `<image source="" />`
- `<image src="" />`

### Correct Answer
`<img src="" />`

### Explanation
The `<img>` element uses the `src` attribute for the image resource. `<image>` is not a standard HTML element.

---

## Question 7
**Which of the following is a valid use of quotation marks in HTML?**

- `<a href="#"></a>`
- `<a href='#'></a>`
- Both of the above
- None of the above

### Correct Answer
Both of the above

### Explanation
HTML allows either double or single quotes for attribute values as long as they’re balanced and properly escaped when necessary.

---

## Question 8
**Which is the correct document type declaration?**

- `<document type="html" />`
- `<document> <html></html> </document>`
- `<!DOCTYPE html>`
- `<DOCTYPE="html" />`

### Correct Answer
`<!DOCTYPE html>`

### Explanation
The HTML5 doctype triggers standards mode and is written exactly as `<!DOCTYPE html>`.

---

## Question 9
**Which tag is used to add an external stylesheet to your HTML?**

- `<a></a>`
- `<link>`
- `<style></style>`
- `<external></external>`

### Correct Answer
`<link>`

### Explanation
Use `<link rel="stylesheet" href="styles.css">` in the document `<head>` to include external CSS.

---

## Question 10
**Which of the following is the correct way to group the following selectors?**

- `h1 h2 p { color: red; }`
- `h1 + h2 + p { color: red; }`
- `h1, h2, p { color: red; }`
- `h1 > h2 > p { color: red; }`

### Correct Answer
`h1, h2, p { color: red; }`

### Explanation
A comma-separated selector list applies the same declarations to multiple selectors. The others describe relationships (descendant, adjacent sibling, direct child), not grouping.

---

## Question 11
**Which of the following is the correct use of inline styling?**

- `<h1 color="red">Heading 1</h1>`
- `<h1 style="color:red;">Heading 1</h1>`
- `<h1 style="color='red'">Heading 1</h1>`

### Correct Answer
`<h1 style="color:red;">Heading 1</h1>`

### Explanation
Inline CSS must be written in the `style` attribute. `color` is not a standalone HTML attribute.

---

## Question 12
**Colors in HTML/CSS can be used with:**

- `a) <p style="color: rgb(0,0,0);">RGB Values</p>`
- `b) <p style="color: rgba(0,0,0,0);">RGBA Values</p>`
- `c) <p style="color: #992345;">Hexadecimal Values</p>`
- `d) <p style="color: #e6f;">Shorthand Hexadecimal Values</p>`
- `e) All of the above are valid`
- `f) Only A and C are valid`

### Correct Answer
All of the above are valid

### Explanation
Modern CSS supports `rgb()`, `rgba()`, six-digit hex, and three-digit shorthand hex color notations.

---

## Question 13
**Given the following HTML, which styling would align the text in the center?**

- `#container { text-align: center; }`
- `#text { text-align: center; }`
- Both would work
- Neither would work

### Correct Answer
Both would work

### Explanation
`text-align` controls inline content alignment inside the element. Applying it to the container or the text element itself centers the inline text.

---

## Question 14
**The tree-like structure of an HTML document is called the ______**

- HTML Tree
- HTML Document Structure
- Document Tree Model
- Document Object Model

### Correct Answer
Document Object Model

### Explanation
The DOM represents the document as a tree of nodes that programs can read and manipulate.

---

## Question 15
**What happens if text is not inside a specific text-related tag (e.g., placed loosely inside the body)?**

```html
<body>
TEXT
</body>
```

- The browser will display the text anyway
- The browser will not display the text, but will not throw an error
- The browser will throw an error and crash

### Correct Answer
The browser will display the text anyway

### Explanation
Text nodes are valid children of `<body>`; browsers render them in normal document flow.

---

## Question 16
**In the following HTML tag, the `alt` and `src` are referred to as _____**

```html
<img src="" alt="" />
```

- Elements
- Attributes
- Properties
- Selectors

### Correct Answer
Attributes

### Explanation
Attributes provide additional information about elements (e.g., `src`, `alt`, `id`, `class`).

---

## Question 17
**Which are the two child elements of the `<html>` tag?**

- `<header></header>` and `<footer></footer>`
- `<head></head>` and `<body></body>`
- `<header></header>` and `<body></body>`
- `<head></head>` and `<footer></footer>`

### Correct Answer
`<head></head>` and `<body></body>`

### Explanation
The root `<html>` element contains exactly `<head>` and `<body>` as its direct children in standard HTML documents.

---

## Question 18
**What is the proper way to assign an element with two classes?**

- `<p class="one" class="two">Text</p>`
- `<p classes="one, two">Text</p>`
- `<p classes="[one, two]">Text</p>`
- `<p class="one two">Text</p>`

### Correct Answer
`<p class="one two">Text</p>`

### Explanation
Multiple classes are space-separated within a single `class` attribute.

---

## Question 19
**Which is the correct order of the CSS Box Model (inside to outside)?**

- margin, padding, border, content
- margin, padding, content, border
- content, margin, border, padding
- content, padding, border, margin

### Correct Answer
content, padding, border, margin

### Explanation
From the innermost to the outermost boxes: content → padding → border → margin.

---


# Quiz 4: Review Basic JS Objects Hosting 

## Question 1
**How would you select all <div> tags with a class of container?**

- div.container {}
- .container {}
- div > .container {}
- div + .container {}

### Correct Answer
div.container {}

### Explanation
div.container matches only <div> elements that have the class container. .container matches any element with that class, while > and + target child or adjacent sibling elements, not specifically <div>s.

---

## Question 2
**Which of the following sizing declarations is invalid?**

- width: 50px;
- width: 50%;
- width: 50em;
- These are all valid

### Correct Answer
These are all valid

### Explanation
All three — px, %, and em — are valid CSS units. There is no invalid syntax here.

---

## Question 3
**Which of the following needs both an opening and closing tag?**

- <hr>
- <br>
- <img>
- <table>

### Correct Answer
<table>

### Explanation
<table> is a container element and must have a closing tag. Tags like <hr>, <br>, and <img> are void (self-closing) elements.

---

## Question 4
**Which tag is used to add an external stylesheet to your HTML?**

- <a></a>
- <link>
- <style></style>
- <external></external>

### Correct Answer
<link>

### Explanation
Use <link rel="stylesheet" href="style.css"> in the <head> section to attach an external CSS file.

---

## Question 5
**What is the correct way to group these selectors together?**

- h1 h2 p { color: red; }
- h1 + h2 + p { color: red; }
- h1, h2, p { color: red; }
- h1 > h2 > p { color: red; }

### Correct Answer
h1, h2, p { color: red; }

### Explanation
Commas group multiple selectors so they share the same style rule. Other combinators (space, +, >) describe relationships instead.

---

## Question 6
**Which of the following is the correct use of inline styling?**

- <h1 color="red">Heading</h1>
- <h1 style="color:red;">Heading</h1>
- <h1 style="color='red'">Heading</h1>

### Correct Answer
<h1 style="color:red;">Heading</h1>

### Explanation
Inline styles must use the style attribute and valid CSS syntax: property, colon, value.

---

## Question 7
**Colors in HTML can be defined using which of the following?**

- a) RGB values
- b) RGBA values
- c) Hexadecimal values
- d) Shorthand hexadecimal
- e) All of the above

### Correct Answer
All of the above

### Explanation
All listed color formats — gb(), gba(), #rrggbb, and #rgb — are valid ways to define colors in CSS.

---

## Question 8
**Which styling would center the text in the <p> tag below?**

`html
<div id="container"><p id="text">Centered Text</p></div>
`

- #container { text-align: center; }
- #text { text-align: center; }
- Both would work
- Neither would work

### Correct Answer
Both would work

### Explanation
Text can be centered either by applying 	ext-align: center to the paragraph or to its parent container.

---

## Question 9
**The tree-like structure of an HTML document is called the ______.**

- HTML Tree
- HTML Document Structure
- Document Tree Model
- Document Object Model

### Correct Answer
Document Object Model

### Explanation
HTML is parsed into a DOM — a tree of objects representing the document structure that JavaScript can manipulate.

---

## Question 10
**Which is the proper way to assign multiple classes to a single element?**

- <p class="one" class="two">Text</p>
- <p classes="one, two">Text</p>
- <p class="one two">Text</p>
- <p class="[one, two]">Text</p>

### Correct Answer
<p class="one two">Text</p>

### Explanation
Multiple classes are separated by spaces in a single class attribute.

---

## Question 11
**Which is the correct order of the CSS box model (inside → outside)?**

- margin, padding, border, content
- margin, padding, content, border
- content, padding, border, margin
- content, margin, border, padding

### Correct Answer
content, padding, border, margin

### Explanation
The CSS box model layers are arranged from the center outward: content → padding → border → margin.

---
# Quiz 6: JavaScript misc 

# Quiz 3: Older JavaScript Function Declarations

## Question 1
**What will the console print?**

```js
for (let i = 0; i < 5; i++) {
  for (let j = i; j < i; j++) {
    console.log(j);
  }
}
```

### Correct Answer
0, 0 1, 0 1 2, 0 1 2 3

### Explanation
The inner loop prints all j values smaller than i. Each outer loop iteration starts from 0 up to i-1, producing the nested sequence.

---

## Question 2
**Which of the following correctly declares a named function?**

- `function greet() {}`
- `let greet = function() {};`
- `const greet = () => {};`
- `greet() => {};`

### Correct Answer
function greet() {}

### Explanation
`function greet() {}` is a named function declaration. The others are function expressions or invalid syntax.

---

## Question 3
**Which function type is hoisted in JavaScript?**

- Function declaration
- Function expression
- Arrow function
- Anonymous callback

### Correct Answer
Function declaration

### Explanation
Only function declarations are hoisted — they can be called before they appear in code.

---

## Question 4
**What will this print?**

```js
sayHello();
function sayHello() {
  console.log("Hi");
}
```

### Correct Answer
Hi

### Explanation
`sayHello` is a hoisted function declaration, so it’s available before definition.

---

## Question 5
**What will this print?**

```js
sayHi();
const sayHi = function() {
  console.log("Hi");
}
```

### Correct Answer
Error — Cannot access 'sayHi' before initialization

### Explanation
Function expressions assigned to `const` are not hoisted the same way as declarations.

---

## Question 6
**Which statement about function parameters is true?**

- Parameters are local variables inside a function
- Parameters can be reassigned
- Parameters shadow outer variables with the same name
- All of the above

### Correct Answer
All of the above

### Explanation
Function parameters behave like local variables — they can be reassigned and can shadow outer scope variables.

---

## Question 7
**What is the output?**

```js
function add(a, b = 5) {
  return a + b;
}
console.log(add(3));
```

### Correct Answer
8

### Explanation
If a parameter isn’t passed, the default value (5) is used.

---

## Question 8
**What does this log?**

```js
function test() {
  console.log(a);
  var a = 10;
}
test();
```

### Correct Answer
undefined

### Explanation
`var` is hoisted but not initialized, so `a` exists but is `undefined` until assignment.

---

## Question 9
**What is the output?**

```js
function foo() {
  bar();
  function bar() {
    console.log("bar");
  }
}
foo();
```

### Correct Answer
bar

### Explanation
Inner functions are hoisted inside their scope, so `bar` is available within `foo`.

---

## Question 10
**What is the output?**

```js
function outer() {
  let x = 10;
  function inner() {
    console.log(x);
  }
  return inner;
}
let fn = outer();
fn();
```

### Correct Answer
10

### Explanation
This demonstrates a closure — the inner function retains access to variables from the outer scope.

---

## Question 11
**Which statement correctly calls a function immediately after defining it?**

- `function run() { console.log("Go"); }()`
- `(function run() { console.log("Go"); })();`
- `run = function() { console.log("Go"); }();`
- `(() => console.log("Go"))`

### Correct Answer
(function run() { console.log("Go"); })();

### Explanation
An IIFE (Immediately Invoked Function Expression) is written as `(function() { ... })();`.

---

## Question 12
**What is the output?**

```js
function multiply(a, b) {
  return a * b;
}
console.log(typeof multiply);
```

### Correct Answer
function

### Explanation
All declared functions have type "function" in JavaScript.

---

## Question 13
**Which of the following functions has an implicit return?**

- `function sum(a, b) { return a + b; }`
- `const sum = (a, b) => a + b;`
- `const sum = (a, b) => { return a + b; }`

### Correct Answer
const sum = (a, b) => a + b;

### Explanation
Arrow functions without `{}` automatically return the evaluated expression.

---

## Question 14
**What happens here?**

```js
console.log(square(3));
function square(n) {
  return n * n;
}
```

### Correct Answer
9

### Explanation
`square` is hoisted and works before its declaration.

---

## Question 15
**Which of these is a function expression, not a declaration?**

- `function greet() {}`
- `const greet = function() {};`
- `function sayHello() {}`

### Correct Answer
const greet = function() {};

### Explanation
A function expression is assigned to a variable; it’s not hoisted like a declaration.

---
