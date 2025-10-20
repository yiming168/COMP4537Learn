# Quiz 7: NodeJS, HTTP methods, fs, DB

## Q1. Which one of these modules is not a built-in module in Node.js?

- http
- url
- `<span class="highlight">mysql</span>`
- fs

- Answer: **mysql**
- Explanation: It's a third-party package that must be installed.

## Q2. Which one of these modules is used in Node.js for handling the file system?

- os
- path
- file
- `<span class="highlight">fs</span>`

- Answer: **fs (File System)**

## Q3. Which block of code will send the client 'You are connected!' when they connect to http://localhost:8000?

```
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('You are connected!');
    res.end();
}).listen(8000);
```

- Answer: **response (res)**
- Explanation: This is the correct syntax. It uses the <strong>response (res)</strong> object to write the header and body, uses the correct status code (200), and listens on the correct port (8000). Other options incorrectly use the request (req) object, provide the port as the status code, or fail to specify a port in .listen().

## Q4. Given const address = "http://localhost:8000/admin.html?user=123"; and const parsed = url.parse(address, true);, what line of code will print out /admin.html?

- console.log(parsed.path)
- console.log(parsed.pathname)
- console.log(parsed.search)
- host

- Answer: **console.log(parsed.pathname)**
- Explanation: The pathname property contains only the path portion of the URL, without the query string.

## Q5. Using a GET request to send over user credentials (username and password) to the server is considered safe and ok.

- Answer: **False**
- Explanation: This is highly insecure because credentials appear in the URL, browser history, and server logs. Sensitive data should be sent in the body of a POST request over HTTPS.

## Q6. After creating a user profile, you want to edit your information. Which HTTP request is appropriate for this task?

- Answer: **PUT**
- Explanation: PUT is the standard HTTP method for updating an existing resource.

## Q7. Which of the following statements is false?

- There are no size limits in data for both GET and POST.
- GET is used for requesting data and POST is for sending data from the server.

- Answer: **Both statements listed are false.**
- Explanation: GET requests have a URL length limit (around 2000 characters). POST requests are for sending data <strong>from the client to the server</strong>, not the other way around.

## Q8. In order to retrieve information about the database, having the following code on the <em>client-side</em> is sufficient and is considered good practice.

```
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});
// ...
```

- Answer: **False**
- Explanation: This is extremely dangerous. Placing database credentials on the client-side would expose them to anyone viewing the page source. Database connections must always be handled on the server-side.

## Q9. Which block of code will successfully delete the file 'file.txt'?

```
fs.unlink('file.txt', (err) => {
  if (err) throw err;
  console.log('file.txt was deleted');
});
```

- Explanation: The correct function in Node.js's native fs module for deleting a file is fs.unlink(). Other function names like remove or delete do not exist in the core module.

## Q10. Given a project with index.js in the root and math.js inside a modules folder, what statements can be used to import math.js into index.js?

- Explanation: The ./ indicates a relative path. Node.js's require function can resolve the module with or without the .js extension.

