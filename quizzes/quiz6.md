# Quiz 6: JavaScript Misc

## Q1. What could become the type of variable v after the execution of the JavaScript code snippet below?

```
let v = sessionStorage.getItem("key");
```

- Answer: **string or null**
- Explanation: sessionStorage.getItem("key") returns:

## Q2. What is the correct way to write a JavaScript array?

```
let colors = ["red", "green", "blue"];
```

- Answer: **square brackets**
- Explanation: Arrays in JavaScript use <strong>square brackets</strong> with elements separated by commas.

## Q3. What will the console log?

```
console.log(test);
let s = 1;
for (let i = 4; i < 40; ++i) {
    s = s * 2 + i;
}
var test = 1;
```

- Answer: **hoisted**
- Explanation: var declarations are <strong>hoisted</strong> to the top but initialized as undefined.

## Q4. Which one of these HTTP methods can be used to send an API request of size 1GB to a server?

- Answer: **POST**
- Explanation: <div class="explanation-title">💡 Explanation

## Q5. What will the console log?

```
setTimeout(function () {
    console.log(1);
    setTimeout(function () {
        console.log(3);
    }, 0);
    console.log(2);
}, 500);
console.log(4);
```

- Explanation: <div class="explanation-title">💡 Explanation

## Q6. The external JavaScript file (myJs.js) must contain the <script> tag.

```
<script src="myJs.js"></script>
```

- Answer: **False**
- Explanation: External JS files should <strong>not</strong> include <script> tags.

## Q7. What will be logged on the console?

```
function hiGenerator(name) {
  return function () {
    console.log("Hi " + name);
  };
}
console.log(hiGenerator("Elan")());
```

- Explanation: <div class="explanation-title">💡 Explanation

## Q8. What would be the value of the variable counter after the user has pressed the button five times?

```
<input id="inputid" type="button" value="click">
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

- Answer: **The final value of counter will be 2.**
- Explanation: The line document.getElementById('inputid').onclick = foo(); contains a common mistake. The parentheses () after foo cause the function to be <strong>executed immediately</strong> when the script loads, not when the button is clicked. This increments counter from 1 to 2. The <em>return value</em> of foo (which is undefined) is then assigned to the onclick event handler. Because the handler is undefined, clicking the button does nothing. The value of counter remains 2, no matter how many times the button is pressed.

## Q9. An API request made by which one of these HTTP methods can be bookmarked?

- GET
- POST
- POST and GET

- Answer: **GET**
- Explanation: GET requests include all necessary data in the URL's query parameters. Since a bookmark is just a saved URL, GET requests can be bookmarked and re-executed perfectly. POST requests send data in the request body, which is not part of the URL and cannot be bookmarked.

## Q10. What is the output of the code snippet below?

```
<script>
    if (10 > 9) {
        let a = 999;
        a++;
    }
    console.log(a);
</script>
```

- Answer: **It will throw a ReferenceError.**
- Explanation: The let keyword creates a <strong>block-scoped</strong> variable. This means the variable a only exists within the curly braces {} of the if statement. The console.log(a) statement is outside of that block, so when it tries to access a, it cannot find it in its scope, resulting in a ReferenceError: a is not defined.

## Q11. What will the console log?

```
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

- Answer: **uncaught ReferenceError: a is not defined**
- Explanation: setTimeout is asynchronous. The JavaScript engine schedules the function to run later and immediately executes the next synchronous code, which is the if (a === 2) block. The variable a is declared with let <em>inside</em> the setTimeout callback, so it is not in scope where the if statement is. The script tries to access a non-existent variable and crashes with a ReferenceError before any timers can complete.

## Q12. What will the console log?

```
function foo(n) {
    var s = 0;
    for (let i = 0; i < n; i++) {
        s += i;
    }
}

console.log(foo(3));
```

- Answer: **undefined**
- Explanation: The function foo(3) correctly calculates that the sum s is 3 (0 + 1 + 2). However, the function foo is missing a return statement. In JavaScript, a function that does not explicitly return a value implicitly returns undefined. Therefore, console.log prints undefined.

## Q13. What will the following code return?

```
if (m = []) {
    console.log("Green");
} else {
    console.log("BLue");
}
var m = 10;
```

- Answer: **Green**
- Explanation: <div class="explanation-title">💡 Explanation

## Q14. What will be logged on the console?

```
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

- Answer: **Nothing will be logged on the console.**
- Explanation: The function foo() is <strong>defined</strong>, but it is never <strong>called</strong> or invoked anywhere in the script. Since the function is never executed, the code inside it, including console.log(a), never runs.

## Q15. What is the correct JavaScript syntax to change the content of the HTML element <p id="demo">This is a demonstration.</p>?

- #demo.innerHTML = "Hello World!";
- document.getElementsByName("p").innerHTML = "Hello World!";
- document.getElement("p").innerHTML = "Hello World!";
- document.getElementById("demo").innerHTML = "Hello World!";

- Answer: **document.getElementById("demo").innerHTML = "Hello World!";**
- Explanation: This is the standard method for selecting a unique element by its id and then using the .innerHTML property to change its content. The other options use incorrect syntax or non-existent methods.

