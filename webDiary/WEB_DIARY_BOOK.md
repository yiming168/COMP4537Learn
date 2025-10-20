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

## Milestone Checklist (≥35 topics)

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

---

## Topics (Structured)

Notes below are reorganized from your class notes. Headings are for navigation; bullet points quote or lightly proofread your original wording.

### 1. Architecture Basics
- Blueprints, plans, patterns, standards (easy for others to understand)
- Think of maintenance, trade-offs, limitations (e.g., space)
- Power consumption, efficiency, interaction between components, consistency, bottlenecks, compatibility
- Metrics: security, speed, reliability, modularity, scalability, resource management, UI friendly, cost (workforce, hosting, servers, database, licensing, downtime), robustness
- Can use multiple architectural patterns for one system (or incorporate aspects from multiple patterns)

### 2. Service-Oriented Architecture (Microservices)
- Different services for different functionality
- Communicate through APIs
- Pro: modularity — don’t have to shut down everything to shut down one service
- Separation of concerns
- Easier to extend (don’t have to shut everything down)

### 3. RESTful APIs and Statelessness
- RESTful
- Stateless → requests are independent; server does not send state of each request
- Example: server responds pages of a book; can’t request “next page” because server doesn’t know previous state

### 4. Web Storage Overview
- Store object in file using serialization
- File is string of characters; convert object to JSON
- Store in browser side (session object, cookies, cache)

### 5. Local Storage vs Session Storage
- Web storage → Local storage and Session storage
- Web storages are only available to the same origin (same protocol, same port number, same domain)

### 6. Cookies and HTTP-only
- Cookies came before web storage; limited size (~4 kB)
- Sent from client to website’s server with each request to that website
- Cookies are popular for authentication
- Cookies can be HTTP only → not available to JavaScript; only to the browser
- When you send a request, cookies are already included in the header

### 7. Same-Origin (Protocol, Domain, Port)
- Origin, protocol, port number

### 8. Hosting and Servers
- Hosting: Vercel, glowhost(?)
- Server: a computer that can be accessed at any time (by internet)
- Provides a service (e.g., email server)

### 9. Server-Side Scripting Languages
- Server side scripting: JavaScript, Elixir, PHP, C#

### 10. Node.js vs Browser JavaScript
- NodeJS vs JavaScript
- Can access files and database (Node.js)
- JavaScript can’t connect directly to a database
- NodeJS is non-blocking → while NodeJS is running, it can let other applications run as well → non-blocking means asynchronous (equivalent)

### 11. Non-Blocking and Concurrency
- Do things at the same time for async workflows (concurrency)

### 12. GET vs POST
- Body of POST is not in the history of browser and doesn’t get cached
- You can technically use a GET request to store (not ideal)
- Some things can only be done by POST because POST has no limit on data payload; GET has a limit (something below 1 MB)
- Neither GET nor POST is inherently “more secure”

### 13. Content-Type
- Content-Type: "text/html"

### 14. Asynchronous Programming Basics
- How long will it take? No one knows → asynchronous
- We should define timeouts → enforces predictability on unpredictable functions
- We need two types of responses for async actions: success and timeout
- In JavaScript, a function always returns something (returns undefined if no return value defined)

### 15. Real-Time vs Regular Systems
- Real-time system: instantaneous (according to user), response time is calculated reliably, predictable, and specific time constraint (even if 2 minutes — so long)

### 16. Promises: Concept
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

### 17. Promises: States and Flow
- A promise has 3 statuses: pending, fulfilled, rejected
- Fulfilled and rejected are mutually exclusive; both are settled statuses
- There are default definitions for resolve and reject → “Uncaught reject/resolve” if not defined

### 18. Promises: Methods
- async keyword (function definition) → boxes return value into a promise
- .then after the function call to handle return
- await to wait for response (modern)
- .catch → .catch(handleError) is the same as .then(null, handleError)
- .finally
- What does Promise.resolve() do? It resolves a promise

### 19. Event Loop and Queue
- There is a queue involved with async functions
- Calling an async function involves two stages: putting the function in the queue; fetching it and executing it

### 20. AJAX
- AJAX: Asynchronous JavaScript and XML
- Can be synchronous if you want it to, but that’s not what it’s meant for
- Maybe you want to block a thread until a response is received (e.g., waiting for content to load on YouTube)

### 21. CORS: Purpose and Enforcement
- CORS (Cross-Origin Resource Sharing)
- Setting at the server side → server will only provide services to specific origins, set by developer
- Does not block requests coming from address bar or Postman, only from JavaScript (browser-enforced)

### 22. CORS: Browser vs Postman
- CORS does not block requests coming from the address bar or Postman
- CORS restrictions apply to browser-executed JavaScript

### 23. CORS: Headers and OPTIONS
- Browser knows because headers are in the response
- Header: Access-Control-Allow-Origin: "*"
- Prevent other origins from receiving service
- With OPTIONS method we can read or retrieve the header response for the server (preflight)

### 24. TCP and Application Layer
- Uses TCP (handshake)
- Web is in the application layer

### 25. Sending Data: Serial vs Parallel
- Long distance (e.g., here to Japan), send data in serial rather than parallel for synchronization

### 26. Memory Management and Garbage Collection
- Memory management in JavaScript → garbage collection

### 27. Memory Leaks
- How to create memory leaks in JavaScript: implicit global variables inside functions

### 28. RDBMS and ACID
- ACID = Atomicity, Consistency, Isolation, Durability
- Important for payment transactions

### 29. Security Considerations
- Security: cookies or web storage — consider who can access

### 30. Interview Tips
- Ask about what architecture they have used
- Think out loud
- Put yourself in position of interviewers → try to come up with questions yourself
- Always doubt

### 31. Term Project Ideas
- Can AI agents make phone calls on your behalf using your voice? (feasibility question)
- Term project → API service

### 32. Hosting Platforms Mentioned
- Vercel, glowhost(?)

### 33. Server Definition
- A server provides a service and is accessible (by internet) 

### 34. JavaScript Types and Scope
- var is function-scoped; let and const are block-scoped
- 7 types: object, undefined, null, symbol, string, number, boolean [double check]

### 35. Undefined vs Null
- Undefined: variable defined without a value
- Null: set to no valid value; bad practice to set something to undefined

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

- Main book URL (if hosted as a site): <https://...>
- Any related demos: <https://...>

---

## Work Log

- <Oct. 18, 2025> — Set up scaffold and outline
- <Date> — Added entries and figures
- <Date> — Proofread and formatted

---

## Attribution

- Proofreading/layout assistance only: ChatGPT (https://chat.openai.com/)
