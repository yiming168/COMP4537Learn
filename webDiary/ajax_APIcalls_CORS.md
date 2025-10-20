

### **Part 1: The Foundation - Asynchronous JavaScript and XML (AJAX)**

AJAX allows a web page to communicate with a server in the background without reloading. This is achieved using the `XMLHttpRequest` (XHR) object.

#### **1.1. The AJAX Lifecycle: `readyState` and `status`**

When you make a request, it goes through several stages. The `onreadystatechange` event fires at each stage.

*   **`readyState`**: Tells you the current stage of the request.
    *   **`0` (UNSENT):** The XHR object is created.
    *   **`1` (OPENED):** `open()` has been called.
    *   **`2` (HEADERS_RECEIVED):** `send()` was called, and response headers are received.
    *   **`3` (LOADING):** The response body is being downloaded. Can fire multiple times.
    *   **`4` (DONE):** The operation is complete.
*   **`status`**: Once `readyState` is 4, this HTTP status code from the server tells you if it was successful.
    *   **`200 OK`**: The request was successful.
    *   **`404 Not Found`**: The server couldn't find the requested URL.
    *   **`500 Internal Server Error`**: The server had an unexpected error.

**Code Example: Basic Structure**

This code checks if the request is finished (`readyState == 4`) and was successful (`status == 200`) before using the response.

```javascript
// This is the function that will handle the response
xhttp.onreadystatechange = function() {
  // Check if the request is complete AND successful
  if (this.readyState == 4 && this.status == 200) {
    // Access the server's response text and do something with it
    document.getElementById("demo").innerHTML = this.responseText;
  }
};
```

---

### **Part 2: Sending Data - `GET` vs. `POST` Requests**

#### **2.1. `GET` Request: Retrieving Data**

`GET` requests are used to ask the server for data. All parameters are sent in the URL as a "query string".

**Client-Side Code (`ajaxPostGet.html`)**

```html
<!-- Client sends data in the URL -->
<script>
  // Function to handle the GET request
  function getAll() {
    const xhr = new XMLHttpRequest();
    const endPointRoot = "http://localhost:8888/API/v1/";
    const resource = "patients";
    // 1. Parameters are formatted as a query string starting with "?"
    let params = "?name=John&age=23";

    // 2. The final URL includes the endpoint, resource, and params
    const url = endPointRoot + resource + params;

    xhr.open("GET", url, true); // The full URL is used here

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    
    // 3. send() is called with no arguments for a GET request.
    xhr.send();
  }
</script>
```

**Server-Side Code (Node.js)**

The server extracts the parameters directly from the requested URL.

```javascript
// In serverPostGet.js
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    // 1. The 'url' module parses the request URL. 'true' creates a query object.
    const q = url.parse(req.url, true);

    // 2. Access the 'name' parameter from the parsed query object.
    const name = q.query['name']; // This will be "John"

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`Hello ${name}, we received your GET request!`);
  }
}).listen(8888);
```

#### **2.2. `POST` Request: Sending Data to Create/Update**

`POST` requests are used to send data to the server. The data is sent in the request body, not the URL.

**Client-Side Code (`POST client side` image)**

```html
<script>
  function sendRequest() {
    const name = document.getElementById("name").value;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000");

    // 1. CRITICAL: Set the Content-Type header. This tells the server how
    // to interpret the data in the body. 'x-www-form-urlencoded' means
    // the body is formatted like a query string (key=value&key2=value2).
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
      // 'onload' is a simpler way to handle a successful response (readyState 4, status 200-299)
      let response = xhr.responseText;
      document.getElementById("result").innerHTML = response;
    };

    // 2. The data is passed as an argument to send(). This puts it in the request body.
    xhr.send("name=" + name);
  }
</script>
```

**Server-Side Code (Node.js) - Handling Data in Chunks**

The server must handle the request body as a **stream**, because it could be very large. It arrives in one or more "chunks".

```javascript
// In POST server side image
const http = require('http');
const { URLSearchParams } = require('url'); // Used to parse the body

const server = http.createServer(function(req, res) {
  if (req.method === "POST") {
    let body = "";

    // 1. Listen for the 'data' event. This fires for each chunk of data that arrives.
    req.on("data", function(chunk) {
      // Append the chunk to our body variable.
      body += chunk;
    });

    // 2. Listen for the 'end' event. This fires once ALL chunks have arrived.
    req.on("end", function() {
      // Now the 'body' variable contains the complete data (e.g., "name=John")
      
      // 3. Parse the url-encoded body string.
      const params = new URLSearchParams(body);
      const name = params.get("name");

      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Access-Control-Allow-Origin", "*"); // For CORS
      res.write("Hello " + name);
      res.end();
    });
  }
});

server.listen(3000, function() {
  console.log("Server is running on port 3000");
});
```

---

### **Part 3: Security - Same-Origin Policy (SOP) & CORS**

#### **3.1. The Problem: Same-Origin Policy (SOP)**
A security feature in browsers that prevents a script on `http://my-site.com` from making an AJAX request to `http://api.com` because their **origins** (protocol, domain, port) do not match.

#### **3.2. The Solution: Cross-Origin Resource Sharing (CORS)**
CORS is the mechanism that allows a server to relax the SOP. It's **configured on the server** but **enforced by the browser**.

#### **3.3. The Preflight Request (`OPTIONS`)**
For "non-simple" requests (e.g., `DELETE`, `PUT`, or requests with custom headers like `Authorization` or `Content-Type: application/json`), the browser performs a safety check first.

1.  **Browser sends an `OPTIONS` request** asking for permission.
2.  **Server responds** with headers indicating what methods and headers are allowed.
3.  **If permitted, the browser sends the actual request** (e.g., `DELETE`).

**Server-Side Code (Node.js) - Handling a Preflight Request**

This code specifically checks for the `OPTIONS` method (the preflight) and responds with the necessary permission headers without trying to process any data.

```javascript
// From POST server side image (simplified)
const server = http.createServer(function(req, res) {

  // --- PREFLIGHT REQUEST HANDLING ---
  // Check if the request is an OPTIONS preflight request.
  if (req.method === "OPTIONS") {
    // Respond with permission headers.
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allow these methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow this header
    res.writeHead(204); // 204 No Content is the standard for preflight responses
    res.end();
    return; // Stop processing further
  }

  // --- ACTUAL POST REQUEST HANDLING ---
  if (req.method === "POST") {
    // ... (code to handle chunks as shown in section 2.2) ...
    // IMPORTANT: The actual response ALSO needs the Allow-Origin header!
    res.setHeader("Access-Control-Allow-Origin", "*");
    // ... (rest of the POST handling) ...
  }
});
```

### **Part 4: Common Questions & Summary**

*   **Why does Postman work when my browser fails?**
    *   Tools like Postman and `curl` are simple HTTP clients, not web browsers. They **do not enforce the Same-Origin Policy**. They will show you whatever response the server sends. A CORS error is a browser-specific security feature.
*   **Is CORS for "secure communication"?**
    *   No, this is misleading. **HTTPS (SSL/TLS)** provides secure, encrypted communication. **CORS** is an **authorization policy** that tells a browser which external websites are permitted to *read* a response.

---

## Acknowledgement

This page was authored by Carol. Many thanks for her contribution.
