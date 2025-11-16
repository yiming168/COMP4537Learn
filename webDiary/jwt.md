# JWT Explained

A JWT (JSON Web Token), often pronounced "jot," is a compact and self-contained way to securely send information between two parties as a JSON object.

Think of it like a secure, self-verifying ID card. Instead of a server having to look up your details in a database every time you try to access something, you just show this ID card. The card itself contains all the necessary information (like who you are and what you're allowed to do), and it's protected by a special signature that proves it's real and hasn't been faked.

This is most commonly used for authorization. Once you log in to a website, the server gives you a JWT. You then send this JWT with every future request (e.g., to load your profile page) to prove you are who you say you are.

## The Structure of a JWT

A JWT looks like a long string of random characters, but it's actually three distinct parts separated by dots (.):

```
xxxxx.yyyyy.zzzzz
```

- Header: The first part.
- Payload: The second part.
- Signature: The third part.

Here’s what each part does:

### 1) Header

This part contains metadata about the token itself. It's a JSON object that typically includes:

- `typ` (Type): The type of token, which is JWT.
- `alg` (Algorithm): The signing algorithm used to create the signature, such as HS256 (HMAC-SHA256) or RS256 (RSA).

Example Header (JSON):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This JSON is Base64Url encoded to form the first part of the JWT (xxxxx).

### 2) Payload

This part contains the claims, which are statements about you (the user) and other data. This is the information the server wants to send. There are three types of claims:

- Registered Claims: Standard, recommended claims like `iss` (issuer), `exp` (expiration time), and `sub` (subject, often the user ID).
- Public Claims: Custom claims defined by you, but they should be named carefully to avoid conflicts.
- Private Claims: Custom claims created to share information between specific parties.

Example Payload (JSON):

```json
{
  "sub": "1234567890",
  "name": "Jane Doe",
  "admin": true,
  "iat": 1516239022
}
```

Like the header, this payload is Base64Url encoded to form the second part of the JWT (yyyyy).

Important: The payload is encoded, not encrypted. Anyone can decode it and read the information. Therefore, you should never put sensitive data like passwords in the payload.

### 3) Signature

This is the security part. To create the signature, the server takes:

- The encoded Header
- The encoded Payload
- A secret key (known only to the server)

It combines them and signs them using the algorithm specified in the header (`alg`).

Example Signature (Pseudocode):

```
HMACSHA256(encodedHeader + "." + encodedPayload, secretKey)
```

This signature (zzzzz) ensures that the token wasn't tampered with. If a user tries to change their payload (e.g., changing `"admin": false` to `"admin": true`), the signature will no longer be valid, and the server will reject the token.

## How JWT Authentication Works (Step-by-Step)

Here is the most common workflow for using JWTs to protect an application or API.

1. User Logs In: The user sends their username and password from a client (like a web browser or mobile app) to the server.
2. Server Verifies Credentials: The server checks if the username and password are correct.
3. Server Creates JWT: If the credentials are valid, the server creates a JWT. It puts the user's ID and other non-sensitive data (like their name or roles) into the payload and then signs the token using its secret key.
4. Server Sends JWT to Client: The server sends the newly created JWT back to the client as part of the login response.
5. Client Stores JWT: The client stores this JWT securely. In a web browser, this is typically in the Authorization header (as a "Bearer token") for all future requests.
6. Client Sends JWT with Requests: When the user tries to access a protected part of the site (like `/api/profile`), the client attaches the JWT to the request.
7. Server Verifies JWT: When the server receives the request, it looks at the JWT. It performs two key checks:
   - Verifies the Signature: It uses its own secret key to verify that the signature is valid. This proves the token is authentic and wasn't changed.
   - Checks Claims: It checks claims like `exp` to make sure the token hasn't expired.
8. Server Grants Access: If the signature is valid and the claims are acceptable, the server trusts the token. It processes the request (e.g., retrieves the user's profile data) and sends the response back to the client.

This process is stateless. The server doesn't need to store a list of active tokens in its database. It just needs to check the signature, making JWTs very fast and efficient for modern applications.

## Node.js Practice Example

I followed a YouTube tutorial to get a hands-on feel for JWTs in Node.js. The example uses two tiny Express servers: one for issuing tokens (`authServer.js`) and one for serving protected data (`server.js`). Requests are tested with a VS Code REST client file (`request.rest`).

`server.js`

```js
require('dotenv').config()

const express = require("express")
const app = express()

const posts = [
    {
        username: "Kyle",
        title:" Post 1"
    },
    {
        username: "Jim",
        title:" Post 2"
    }
]

const jwt = require("jsonwebtoken")
app.use(express.json())

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403)
        req.user =user
        next()
    })
}

app.listen(3000)
```

`authServer.js`

```js
require('dotenv').config()

const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())

app.post('/login', (req,res) => {
    // Autenticate user

    const username = req.body.username
    const user = {name:username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({
        accessToken: accessToken
    })
})

app.listen(4000)
```

`request.rest`

```
### Login to get a fresh token
# @name login
POST http://localhost:4000/login
Content-Type: application/json

{
  "username": "Jim"
}

### Use the token from login in Authorization header
GET http://localhost:3000/posts
Authorization: Bearer {{login.response.body.accessToken}}
```
