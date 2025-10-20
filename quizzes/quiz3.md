# Quiz 3: Older JavaScript Function Declarations

## Q1. What will the console print?

```
for (let i = 0; i < 5; i++) {
  for (let j = i; j < i; j++) {
    console.log(j);
  }
}
```

- Answer: **0, 0 1, 0 1 2, 0 1 2 3**
- Explanation: The inner loop prints all j values smaller than i. Each outer loop iteration starts from 0 up to i-1, producing the nested sequence.

## Q2. Which of the following correctly declares a named function?

- `function greet() {}`
- `let greet = function() {};`
- `const greet = () => {};`
- `greet() => {};`

- Answer: **function greet() {}**
- Explanation: function greet() {} is a named function declaration. The others are function expressions or invalid syntax.

## Q3. Which function type is hoisted in JavaScript?

- Function declaration
- Function expression
- Arrow function
- Anonymous callback

- Answer: **Function declaration**
- Explanation: Only function declarations are hoisted — they can be called before they appear in code.

## Q4. What will this print?

```
sayHello();
function sayHello() {
  console.log("Hi");
}
```

- Answer: **Hi**
- Explanation: sayHello is a hoisted function declaration, so it's available before its definition.

## Q5. What will this print?

```
sayHi();
const sayHi = function() {
  console.log("Hi");
}
```

- Answer: **Error — Cannot access 'sayHi' before initialization**
- Explanation: Function expressions assigned to const are not hoisted the same way as declarations.

## Q6. Which statement about function parameters is true?

- Parameters are local variables inside a function
- Parameters can be reassigned
- Parameters shadow outer variables with the same name
- All of the above

- Answer: **All of the above**
- Explanation: Function parameters behave like local variables — they can be reassigned and can shadow outer variables.

## Q7. What is the output?

```
function add(a, b = 5) {
  return a + b;
}
console.log(add(3));
```

- Answer: **8**
- Explanation: If a parameter isn't passed, the default value is used.

## Q8. What does this log?

```
function test() {
  console.log(a);
  var a = 10;
}
test();
```

- Answer: **undefined**
- Explanation: var is hoisted but not initialized, so a exists but is undefined until assignment.

## Q9. What is the output?

```
function foo() {
  bar();
  function bar() {
    console.log("bar");
  }
}
foo();
```

- Answer: **bar**
- Explanation: Inner functions are hoisted inside their scope, so bar is available within foo.

## Q10. What is the output?

```
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

- Answer: **10**
- Explanation: This demonstrates a closure — the inner function retains access to variables from the outer scope.

## Q11. Which statement correctly calls a function immediately after defining it?

- `function run() { console.log("Go"); }()`
- `(function run() { console.log("Go"); })();`
- `run = function() { console.log("Go"); }();`
- `(() => console.log("Go"))`

- Answer: **(function run() { console.log("Go"); })();**
- Explanation: An IIFE (Immediately Invoked Function Expression) is written as (function() { ... })();.

## Q12. What is the output?

```
function multiply(a, b) {
  return a * b;
}
console.log(typeof multiply);
```

- Answer: **function**
- Explanation: All declared functions have type "function" in JavaScript.

## Q13. Which of the following functions has an implicit return?

- `function sum(a, b) { return a + b; }`
- `const sum = (a, b) => a + b;`
- `const sum = (a, b) => { return a + b; }`

- Answer: **const sum = (a, b) => a + b;**
- Explanation: Arrow functions without braces automatically return the evaluated expression.

## Q14. What happens here?

```
console.log(square(3));
function square(n) {
  return n * n;
}
```

- Answer: **9**
- Explanation: square is hoisted and works before its declaration.

## Q15. Which of these is a function expression, not a declaration?

- `function greet() {}`
- `const greet = function() {};`
- `const greet = () => {};`
- Both B and C

- Answer: **Both B and C**
- Explanation: Function expressions are assigned to variables, while declarations use the function keyword directly.

