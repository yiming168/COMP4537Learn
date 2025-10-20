# Quiz 5: Local Storage & JSON

## Q1. Which is the correct method to access a value 'string' stored in localStorage with the key 'token'?

- window.localStorage.getItem('string');
- window.localStorage.getItem('token');
- window.localStorage.get('string');
- window.localStorage.get('token');

- Answer: **window.localStorage.getItem('token');**
- Explanation: Use localStorage.getItem(key) to retrieve a value by its key. The key is 'token'; getItem returns the stored string (or null if it doesn't exist). There is no get() method on localStorage.

## Q2. Which of the following methods is not a built-in method for parsing and/or converting values to JSON?

- JSON.parse()
- JSON.convert()
- JSON.stringify()
- None of the above

- Answer: **JSON.convert()**
- Explanation: The JSON API provides JSON.parse() (string → object) and JSON.stringify() (object → string). JSON.convert() does not exist.

## Q3. Which is the correct method to clear all data from local storage?

- window.localStorage.removeAll();
- window.localStorage.clearAll();
- window.localStorage.clear();
- window.localStorage.remove();

- Answer: **window.localStorage.clear();**
- Explanation: clear() removes all keys in the origin's local storage. To remove a single key, use removeItem(key). Methods like removeAll(), clearAll(), or remove() do not exist.

## Q4. What is the output of this code?

```
window.localStorage.setItem('value', 'string');
const str = window.localStorage.getItem('value');
console.log(str);
```

- key
- string
- value
- undefined

- Answer: **string**
- Explanation: getItem('value') returns the stored string 'string'. getItem never returns undefined; if the key is absent it returns null.

## Q5. Suppose the file http://myDomain.com/write.html writes into localStorage using localStorage.setItem('something', 'some data'). Which page(s) could access that content using localStorage.getItem('something')?

- http://myDomain.com/read.html and http://myDomain.com/fetch.html and http://myDomain.com/get.html
- only http://myDomain.com/read.html
- http://myDomain.com/read.html and https://myDomain.com/read.html

- Answer: **http://myDomain.com/read.html and http://myDomain.com/fetch.html and http://myDomain.com/get.html**
- Explanation: localStorage is scoped to the <strong>origin</strong> (<em>scheme + host + port</em>). All three pages share the same origin. Changing the scheme (HTTP vs HTTPS) changes the origin and cannot access the same storage.

## Q6. Where can you view Local Storage in Chrome DevTools?

- Elements tab
- Memory tab
- Application tab
- Sources tab

- Answer: **Application tab**
- Explanation: Open DevTools > Application > Storage > Local Storage to inspect keys and values per origin.

## Q7. Storing nested objects in JSON is allowed. This is valid JSON:

```
{"object": {"nestedObject": { "key": "value" }}}
```

- True
- False

- Answer: **True**
- Explanation: JSON supports nested objects and arrays. Keys must be double-quoted, and the example follows valid JSON syntax.

## Q8. Data stored in localStorage is persistent between different browsers (e.g., data stored in Firefox is accessible in Chrome).

- True
- False

- Answer: **False**
- Explanation: localStorage is <strong>browser-specific</strong> and <strong>origin-specific</strong>. Data does not sync across different browsers.

## Q9. What is the output of the following code?

```
const key = 'key';
window.localStorage.setItem(key, 'string');
const value = window.localStorage.getItem(key);
window.localStorage.removeItem(key);
window.localStorage.setItem(key, 'newString');
console.log(value);
```

- 'string'
- 'value'
- 'key'
- 'newString'

- Answer: **'string'**
- Explanation: value holds the result of the earlier getItem call, which is 'string'. Later removing or resetting the key doesn't change the existing variable.

## Q10. Suppose an item is stored in the local storage of https://aaa.com/labs/1/index.html. Which of the following can access it?

- A: https://lab.aaa.com/1/index.html
- B: https://aaa.com/labs/5/hello.html
- C: http://localhost:3000/labs/1/index.html
- Both A and B

- Answer: **B: https://aaa.com/labs/5/hello.html**
- Explanation: Only pages with the <strong>same origin</strong> (same scheme, host, and port) share localStorage. Subdomains like lab.aaa.com are a different origin; http://localhost:3000 also differs in both host and scheme.

