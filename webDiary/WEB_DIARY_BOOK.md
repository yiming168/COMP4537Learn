# Web Computing Diary Book

Student: Yiming Zhu

Note: This file is a scaffold for your personal, student-authored diary/book. AI assistance is limited to layout, proofreading, and organization.

## Table of Contents

- About
- Milestone Checklist (≥35 topics)
 - Topics (Structured)
- Class Notes (Transcribed)
- Entries
- Hosted URLs
- Work Log
- Attribution

---

## About

Use this diary to collect your web computing notes, tips, code snippets, figures, and reflections. Write for a peer with basic HTML/CSS/JS knowledge. Feel free to be creative with structure and visuals.

---

<details class="note-group">
<summary>Milestone Checklist (≥35 topics)</summary>

- [ ] AI-powered security attacks
- [ ] Web security vulnerabilities
- [ ] Microservices “from zero to hero”
- [ ] From JavaScript to AI-powered drone control
- [ ] Web Computing for Games
- [ ] How I failed a web course yet I landed a software job at amazon :D
- [ ] Interview tips
- [ ] JS hoisting
- [ ] Closure
- [ ] Asynchronous programming
- [ ] Memory leak
- [ ] Classes in JS
- [ ] Web application architectural patterns
- [ ] Monolithic Architecture
- [ ] Layered (n-Tier) Architecture
- [ ] Microservices Architecture
- [ ] Event-Driven Architecture
- [ ] Serverless / Function-as-a-Service (FaaS)
- [ ] Model-View-Controller (MVC)
- [ ] Model-View-ViewModel (MVVM)
- [ ] Micro-Frontends
- [ ] Hexagonal Architecture (Ports & Adapters)
- [ ] Command Query Responsibility Segregation (CQRS)
- [ ] Tips on hosting pretrained AI models
- [ ] Promises, await, and async
- [ ] Fetch
- [ ] Defer
- [ ] Execution stack
- [ ] Public-key/private-key
- [ ] Content delivery network (CDN)
- [ ] Single sign-on
- [ ] Web push notifications
- [ ] HTML5 Canvas
- [ ] Cookies
- [ ] Session, JWT, httpOnly
- [ ] Local storage
- [ ] Web workers
- [ ] Injection attacks
- [ ] Web security best practices
- [ ] Encryption
- [ ] Hashing
- [ ] RDBMS
- [ ] CRUD
- [ ] 1:M
- [ ] M:M
- [ ] 1NF
- [ ] 2NF
- [ ] API-centric architectures
- [ ] Quick review of HTML/CSS/JavaScript
- [ ] ECMA 6 JavaScript, arrow functions, strict mode, ...
- [ ] Single threaded JS
- [ ] Hosting LLM models
- [ ] Choosing and maintaining hosting services
- [ ] Ajax calls in depth
- [ ] Creating secure RESTful APIs
- [ ] SSL public key/private key
- [ ] GET vs POST
 - [ ] oAuth and bearer token

</details>

---

## Class Notes (Transcribed)

<details class="note-group" open>
<summary>Week 1 &amp; 2 — Architecture foundations</summary>

- **Architecture**
  - Blueprints, plans, patterns, standards (easy for others to understand)
  - Think of maintenance, trade-offs, limitations (e.g., space)
  - Power consumption, efficiency, interaction between components, consistency, bottlenecks, compatibility
  - Metric: security, speed, reliability, modularity, scalability, resource management, UI friendly, cost (workforce, hosting, servers, database, licensing, downtime), robustness
  - Can use multiple architectural patterns for one system (or incorporate aspects from multiple patterns)
- **Service-Oriented Architecture (Microservice)**
  - Different services for different functionality
  - Communicate through APIs
  - Pro: modularity — don’t have to shut down everything to shut down one service
  - Separation of concerns
  - Easier to extend (don’t have to shut everything down)
- **RESTful APIs & Statelessness**
  - RESTful
  - Stateless → requests are independent; server does not send state of each request
  - Example: server responds pages of a book; can’t request “next page” because server doesn’t know previous stage
- **Web Storage overview**
  - Store object in file using serialization
  - File is string of characters
  - Convert object to JSON
- **Local storage basics**
  - Store in browser side (session object, cookies, cache)
- **Origin rules**
  - Origin, protocol, port number

</details>

<details class="note-group">
<summary>Week 3 — Web storage & review</summary>

- **Local storage**
  - Web storage → Local storage and Session storage
  - Web storages depend on the browser → max of ~10 MB across browsers
- **Cookies**
  - Cookies came before web storage; limited size (~4 kB)
  - Sent from client to website’s server with each request to that website
  - Cookies are popular for authentication
  - Cookies can be HTTP only → not available programmatically to JavaScript; only available to the browser
  - When you send a request, cookies are already included in the header
- **Security considerations**
  - Security: cookies or web storage — consider who can access
  - Web storages are only available to the same origin (same protocol, same port number, same domain)
- **Term project question**
  - Can AI agents make phone calls on your behalf using your voice? (is this feasible for the project)
- **JavaScript review**
  - Not defined and undefined are very different
  - `var` is function scoped; `let` and `const` are block scoped
  - 7 types: object, undefined, null, symbol, string, number, boolean [double check this]
  - Undefined is if you define a variable and do not give it a value (because JS can’t define a type based on value)
  - Can set something to null (means doesn’t have a valid value)
  - Bad practice to set something to undefined
  - Neither GET nor POST are inherently more secure than the other

</details>

<details class="note-group">
<summary>Week 4 — APIs, hosting, and Node.js</summary>

- **API server traits**
  - RESTful
  - Low cost, simpler, more secure, robust
  - Stateless → Request doesn’t depend on previous requests; all requests must be independent
  - Process at client side to make the server more lightweight
- **Interview tips**
  - Ask about what architecture they have used (because then you can share all your knowledge)
  - Think out loud
  - Put yourself in position of interviewers → try to come up with questions yourself
  - Always doubt
- **Hosting notes**
  - Hosting: Vercel, glowhost(?)
  - Server: A computer that can be accessed at any time (by internet)
  - Provides a service (e.g., email server)
- **Server-side scripting**
  - Server side scripting: JavaScript, Elixir, PHP, C#
  - JavaScript is good to focus on for job interview according to Amir and big companies won’t even care (except maybe SAP)
- **Node.js vs. browser JavaScript**
  - Can access files and database (Node.js)
  - JavaScript can’t make direct database requests
  - NodeJS is non-blocking → while NodeJS is running, it can let other applications run as well → non-blocking means asynchronous (equivalent)
- **GET and POST**
  - Body of POST is not in the history of browser and doesn’t get cached
  - You can technically use a GET request to store (not ideal)
  - Some things can only be done by POST because POST has no limit on data payload; GET has a limit (something below 1 MB)
- **Node.js tidbits**
  - `require` → imports all the exported functions from that module
  - `Content-Type`: "text/html"

</details>

<details class="note-group">
<summary>Week 5 — Asynchronous programming focus</summary>

- **Async mindset**
  - Asynchronous programming → How long will it take? No one knows
  - Define timeouts → enforces predictability on unpredictable functions
  - Need success and timeout responses for async actions
- **Real-time vs. regular systems**
  - Real-time: instantaneous (according to user), response time is calculated reliably, predictable, specific time constraint (even if that predictable is 2 minutes — so long)
- **Promise fundamentals**
  - In JavaScript, a function always returns something (returns undefined if no return value defined)
  - Async actions returning a Promise (of type object)
  - Promises invented to deal with async behaviour of internet
  - `async` keyword for function definition → boxes return value into a promise
  - `.then` after the function call to handle return function (not that old)
  - `await` to wait for response (modern)
  - There is a queue involved with async functions
- **ACID reminder**
  - ACID = Atomicity, Consistency, Isolations, Durability (important for payment transactions)
- **Memory management**
  - Memory management in JavaScript → garbage collection
  - How to create memory leaks in JavaScript: implicit global variables inside functions
- **Career and project notes**
  - Cracking code interviews
  - Term project → API service
  - AI: How to train a model; for a business
  - Security
  - Education → Current education system is not great

</details>

<details class="note-group">
<summary>Week 6 — AJAX, CORS, and networking</summary>

- **Timeline**
  - October 8, 2025
- **Sending data**
  - Long distance (e.g., here to Japan), we would send data in serial rather than parallel for synchronization
- **AJAX basics**
  - Asynchronous JavaScript and XML
  - Can be synchronous if you want it to, but that’s not what it’s meant for
  - Maybe you want to block a thread until a response is received (e.g., waiting for content to load on YouTube)
  - E.g., `Promise.all` (context note)
- **CORS**
  - CORS (Cross origin resource sharing)
  - Setting at the server side → server will only provide services to specific origins, set by developer
  - Does not block requests coming from address bar or PostMan, only from JavaScript
  - CORS regulations are set server side by the developer, executed by the browser
  - Browser knows because they are set in the header of the request
  - `Access-Control-Allow-Origin`: "*"
  - Prevent other origins from receiving service
  - With OPTIONS method we can read or retrieve the header response for the server
- **Networking context**
  - Uses TCP (handshake)
  - Web is in application layer
- **AI goals**
  - Learn how to fine-tune a model
  - Learn how to train a model
  - MCP

</details>

<details class="note-group">
<summary>Week 7 — Promises revisited</summary>

- **Timeline**
  - October 15, 2025
  - Important note: Milestone 1 of the project is now moved a week later! Yay
- **GET vs POST**
  - Major difference: the size of the request is limited for GET request, but for POST there is no limitation (response sizes are not limited)
- **Promise recap**
  - A promise has 3 statuses: pending, fulfilled, rejected
  - Pending: once the promise has been made
  - Fulfilled and rejected are mutually exclusive; both are settled statuses
  - `Promise()` is an object in JavaScript
  - `res` → for resolving the promise
  - `rej` → for rejecting the promise
  - `res` and `rej` are executed asynchronously and mutually exclusive
  - Calling an async function involves two stages: putting the function in the queue; fetching it and executing it
  - `Promise.resolve()` resolves a promise
- **Promise methods**
  - `.then`
  - `.catch(handleError)` is the same as `.then(null, handleError)`
  - `.finally`
- **Example notes**
  - Example 7 → Why does 3 get executed first?
  - Summary: The Promise is an object which has a method called `then`. When we create a function, we pass the executor function which takes 2 parameters: the resolve action function, the reject function action. The resolve and reject functions get executed asynchronously and are mutually exclusive (if resolve is executed then reject is not and vice versa)
  - There are default definitions for resolve and reject → we will get an “Uncaught reject/resolve” error message if we do not define ourselves

</details>

---

## Topics (Structured)

Notes below are reorganized from your class notes. Headings are for navigation; bullet points quote or lightly proofread your original wording.

<details class="topic">
<summary>1. Architecture Basics</summary>
- Blueprints, plans, patterns, standards (easy for others to understand)
- Think of maintenance, trade-offs, limitations (e.g., space)
- Power consumption, efficiency, interaction between components, consistency, bottlenecks, compatibility
- Metrics: security, speed, reliability, modularity, scalability, resource management, UI friendly, cost (workforce, hosting, servers, database, licensing, downtime), robustness
- Can use multiple architectural patterns for one system (or incorporate aspects from multiple patterns)

</details>

<details class="topic">
<summary>2. Service-Oriented Architecture (Microservices)</summary>
- Different services for different functionality
- Communicate through APIs
- Pro: modularity — don’t have to shut down everything to shut down one service
- Separation of concerns
- Easier to extend (don’t have to shut everything down)

</details>

<details class="topic">
<summary>3. RESTful APIs and Statelessness</summary>
- RESTful
- Stateless → requests are independent; server does not send state of each request
- Example: server responds pages of a book; can’t request “next page” because server doesn’t know previous state

</details>

<details class="topic">
<summary>4. Web Storage Overview</summary>
- Store object in file using serialization
- File is string of characters; convert object to JSON
- Store in browser side (session object, cookies, cache)

</details>

<details class="topic">
<summary>5. Local Storage vs Session Storage</summary>
- Web storage → Local storage and Session storage
- Web storages are only available to the same origin (same protocol, same port number, same domain)
</details>

<details class="topic">
<summary>6. Cookies and HTTP-only</summary>
- Cookies came before web storage; limited size (~4 kB)
- Sent from client to website’s server with each request to that website
- Cookies are popular for authentication
- Cookies can be HTTP only → not available to JavaScript; only to the browser
- When you send a request, cookies are already included in the header

</details>

<details class="topic">
<summary>7. Same-Origin (Protocol, Domain, Port)</summary>
- Origin, protocol, port number

</details>

<details class="topic">
<summary>8. Hosting and Servers</summary>
- Hosting: Vercel, glowhost(?)
- Server: a computer that can be accessed at any time (by internet)
- Provides a service (e.g., email server)

</details>

<details class="topic">
<summary>9. Server-Side Scripting Languages</summary>
- Server side scripting: JavaScript, Elixir, PHP, C#

</details>

<details class="topic">
<summary>10. Node.js vs Browser JavaScript</summary>
- NodeJS vs JavaScript
- Can access files and database (Node.js)
- JavaScript can’t connect directly to a database
- NodeJS is non-blocking → while NodeJS is running, it can let other applications run as well → non-blocking means asynchronous (equivalent)

</details>

<details class="topic">
<summary>11. Non-Blocking and Concurrency</summary>
- Do things at the same time for async workflows (concurrency)
</details>

<details class="topic">
<summary>12. GET vs POST</summary>
- Body of POST is not in the history of browser and doesn’t get cached
- You can technically use a GET request to store (not ideal)
- Some things can only be done by POST because POST has no limit on data payload; GET has a limit (something below 1 MB)
- Neither GET nor POST is inherently “more secure”

- PUT and idempotency:
  - Idempotent means repeating the same request leaves the resource state unchanged beyond the first application.
  - PUT replaces the resource at the target URI with the sent representation; repeating the same PUT doesn’t create duplicates or additional changes.
  - Safe to retry: clients can retry a failed/suspect PUT without extra side effects.
  - Not “safe”: the first PUT modifies state. GET is safe; PUT is not, but it is idempotent.
  - Contrast: POST is not idempotent; repeating POST may create multiple resources or repeat actions.
  - Nuance: responses can differ (e.g., first 201 Created, later 200/204). PATCH may or may not be idempotent depending on the operation.

</details>

<details class="topic">
<summary>13. Content-Type</summary>
- Content-Type: "text/html"

</details>

<details class="topic">
<summary>14. Asynchronous Programming Basics</summary>
- How long will it take? No one knows → asynchronous
- We should define timeouts → enforces predictability on unpredictable functions
- We need two types of responses for async actions: success and timeout
- In JavaScript, a function always returns something (returns undefined if no return value defined)

</details>

<details class="topic">
<summary>15. Real-Time vs Regular Systems</summary>
- Real-time system: instantaneous (according to user), response time is calculated reliably, predictable, and specific time constraint (even if 2 minutes — so long)

</details>

<details class="topic">
<summary>16. Promises: Concept</summary>
- Async actions returning a Promise (of type object)
- Promises invented to deal with async behaviour of internet

```js
// Your own Promise example goes here.
// Keep it short (5–12 lines) and annotate briefly.
// Example idea: create a Promise and consume it with then/await.
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

Note — Microtasks vs setTimeout
- `.then/.catch/.finally` callbacks run in the microtask queue.
- `setTimeout(fn, 0)` runs in the macrotask (task) queue.
- Microtasks run before the next macrotask, so `.then` runs before `setTimeout(…,0)`.

```js
console.log('A');
Promise.resolve().then(() => console.log('microtask'));
setTimeout(() => console.log('macrotask'), 0);
console.log('B');
// Order: A, B, microtask, macrotask
```

Note — Promise.resolve return value and timing
- `Promise.resolve(10)` returns a Promise already fulfilled with value `10` (not the number itself).
- Access the value via `.then(...)` or `await`.
- Handlers run on the microtask queue, after current synchronous code.
- Identity/flattening: if you pass a Promise, it returns the same Promise; thenables are assimilated.

```js
const p = Promise.resolve(10);
p.then(v => console.log('resolved to:', v)); // 10 (async)
console.log('sync first');                    // prints before the then above

const existing = Promise.resolve('x');
console.log('same reference:', Promise.resolve(existing) === existing); // true

// Thenable assimilation
Promise.resolve({ then(r){ r(99); } })
  .then(v => console.log('thenable:', v)); // 99

// Using await
(async () => {
  const v = await Promise.resolve(10);
  console.log('await value:', v); // 10
})();
```

</details>

<details class="topic">
<summary>17. Promises: States and Flow</summary>
- A promise has 3 statuses: pending, fulfilled, rejected
- Fulfilled and rejected are mutually exclusive; both are settled statuses
- There are default definitions for resolve and reject → “Uncaught reject/resolve” if not defined

</details>

<details class="topic">
<summary>18. Promises: Methods</summary>
- async keyword (function definition) → boxes return value into a promise
- .then after the function call to handle return
- await to wait for response (modern)
- .catch → .catch(handleError) is the same as .then(null, handleError)
 - .finally
 - Promise.resolve (static):
   - Static method on the Promise constructor (not on instances).
   - Normalizes any value/thenable into a Promise and flattens nested Promises.
   - Different from the executor’s `resolve` parameter in `new Promise((resolve, reject) => ...)`.
   - Great for starting a chain: `Promise.resolve(x).then(...)`.
   - Equivalent but heavier: `new Promise(r => r(x))`.
   - Quick checks: `typeof Promise.resolve === 'function'`; there is no `p.resolve` on a promise instance.

```js
// Promise.resolve examples (normalize & flatten)
Promise.resolve(42).then(v => console.log('value:', v));                        // 42
Promise.resolve(Promise.resolve(5)).then(v => console.log('flattened:', v));    // 5

// Start a chain from a value
Promise.resolve(10)
  .then(v => v * 2)
  .then(v => v + 1)
  .then(v => console.log('chain:', v));                                         // 21

// Equivalent but heavier than Promise.resolve
new Promise(r => r(7)).then(v => console.log('new Promise:', v));               // 7
```

</details>

<details class="topic">
<summary>19. Event Loop and Queue</summary>
- There is a queue involved with async functions
- Calling an async function involves two stages: putting the function in the queue; fetching it and executing it

</details>

<details class="topic">
<summary>20. AJAX</summary>
- AJAX: Asynchronous JavaScript and XML
- Can be synchronous if you want it to, but that’s not what it’s meant for
- Maybe you want to block a thread until a response is received (e.g., waiting for content to load on YouTube)

</details>

<details class="topic">
<summary>21. CORS: Purpose and Enforcement</summary>
- CORS (Cross-Origin Resource Sharing)
- Setting at the server side → server will only provide services to specific origins, set by developer
- Does not block requests coming from address bar or Postman, only from JavaScript (browser-enforced)

</details>

<details class="topic">
<summary>22. CORS: Browser vs Postman</summary>
- CORS does not block requests coming from the address bar or Postman
- CORS restrictions apply to browser-executed JavaScript

</details>

<details class="topic">
<summary>23. CORS: Headers and OPTIONS</summary>
- Browser knows because headers are in the response
- Header: Access-Control-Allow-Origin: "*"
- Prevent other origins from receiving service
- With OPTIONS method we can read or retrieve the header response for the server (preflight)

</details>

<details class="topic">
<summary>24. TCP and Application Layer</summary>
- Uses TCP (handshake)
- Web is in the application layer

</details>

<details class="topic">
<summary>25. Sending Data: Serial vs Parallel</summary>
- Long distance (e.g., here to Japan), send data in serial rather than parallel for synchronization

</details>

<details class="topic">
<summary>26. Memory Management and Garbage Collection</summary>
- Memory management in JavaScript → garbage collection

</details>

<details class="topic">
<summary>27. Memory Leaks</summary>
- How to create memory leaks in JavaScript: implicit global variables inside functions

</details>

<details class="topic">
<summary>28. RDBMS and ACID</summary>
- ACID = Atomicity, Consistency, Isolation, Durability
- Important for payment transactions

</details>

<details class="topic">
<summary>29. Security Considerations</summary>
- Security: cookies or web storage — consider who can access

</details>

<details class="topic">
<summary>30. Interview Tips</summary>
- Ask about what architecture they have used
- Think out loud
- Put yourself in position of interviewers → try to come up with questions yourself
- Always doubt

</details>

<details class="topic">
<summary>31. Term Project Ideas</summary>
- Can AI agents make phone calls on your behalf using your voice? (feasibility question)
- Term project → API service

</details>

<details class="topic">
<summary>32. Hosting Platforms Mentioned</summary>
- Vercel, glowhost(?)

</details>

<details class="topic">
<summary>33. Server Definition</summary>
- A server provides a service and is accessible (by internet) 

</details>

<details class="topic">
<summary>34. JavaScript Types and Scope</summary>
- var is function-scoped; let and const are block-scoped
- 7 types: object, undefined, null, symbol, string, number, boolean [double check]

</details>

<details class="topic">
<summary>35. Undefined vs Null</summary>
  - Undefined: variable defined without a value
  - Null: set to no valid value; bad practice to set something to undefined

</details>

## Entries

Write your entries below (diary-style or thematic). Use any structure you like. A suggested pattern is provided; feel free to change it.

### Topic Title
- Summary: <your words>
- Key concepts: <bullets>
- Example/snippet: <your own code>
- Pitfalls/tips: <bullets>
- Cross-links: <related topics>

### Topic Title
- Summary: <your words>
- Key concepts: <bullets>
- Example/snippet: <your own code>
- Pitfalls/tips: <bullets>
- Cross-links: <related topics>

---

## Hosted URLs

- Main book URL (if hosted as a site): https://yiming168.github.io/COMP4537Learn/
- Any related demos: <https://...>

---

## Work Log

- <Oct. 18, 2025> — Set up scaffold and outline
- <Date> — Added entries and figures
- <Date> — Proofread and formatted

---

## Attribution

- Proofreading/layout assistance only: ChatGPT (https://chat.openai.com/)
