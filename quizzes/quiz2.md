# COMP 4537 - Quiz 2

## Q1. How many console logs will be printed in the following loops?

```
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log("Hello");
  }
}
```

- A) 0
- B) 3
- C) 6
- D) 9

- Answer: **D) 9**
- Explanation: The outer loop runs 3 times and each iteration runs the inner loop 3 times, resulting in 3 × 3 = 9 logs.

## Q2. What will the console print?

```
let num = 0;
for (let i = 0; i <= 2; i++) {
  num += 2;
}
console.log(num);
```

- A) 0
- B) 2
- C) 4
- D) 6

- Answer: **D) 6**
- Explanation: The loop executes for i = 0, 1, 2 (three runs). Each adds 2, so num becomes 6.

## Q3. How many console.log calls will run?

```
for (let i = 0; i <= 3; i++) {
  if (i === 2) {
    break;
  }
  console.log("Hello");
}
```

- A) 0
- B) 1
- C) 2
- D) 3

- Answer: **C) 2**
- Explanation: The loop prints when i = 0 and i = 1. At i = 2, the break exits before logging.

## Q4. Which of the following loops iterates backwards from 5 down to 0 (inclusive)?

- `A) for (let i = 5; i >= 0; i--) { console.log(i); }`
- `B) for (let i = 5; i > 0; i--) { console.log(i); }`
- `C) for (let i = 6; i > 0; i--) { console.log(i); }`
- D) Both A and C

- Answer: **A) for (let i = 5; i >= 0; i--) { console.log(i); }**
- Explanation: Using i >= 0 includes 0. Option C starts at 6 and stops at 1, so it does not match the requirement.

## Q5. What will the console print?

```
let arr = [1, 2, 3, 4, 5];
let total = 0;
for (let i = 0; i < arr.length; i++) {
  total += arr[i];
  if (i > 2) {
    break;
  }
}
console.log(total);
```

- A) 0
- B) 6
- C) 10
- D) 15

- Answer: **C) 10**
- Explanation: The loop adds 1, 2, 3, and 4. When i becomes 3, it breaks before adding 5. The logged total is 10.

## Q6. Which value does this code retrieve?

```
let arr = ["a", "b", "c", "d", "e", "f"];
console.log(arr[arr.length / 2]);
```

- A) "c"
- B) "d"
- C) "f"
- D) Error (index out of bounds)

- Answer: **B) "d"**
- Explanation: arr.length is 6, so arr.length / 2 is 3. arr[3] is "d".

## Q7. Which statement retrieves the middle value ("c") from the array?

```
let arr = ["a", "b", "c", "d", "e"];
```

- A) console.log(arr[arr.length - 3]);
- B) console.log(arr[arr.length - 2]);
- C) console.log(arr["c"]);
- D) None of the above

- Answer: **A) console.log(arr[arr.length - 3]);**
- Explanation: The middle index is 2. Since arr.length is 5, 5 - 3 gives 2.

## Q8. What will the console print?

```
let arr = [];
arr[1] = 1234;
console.log(arr[0]);
```

- A) 1233
- B) 1234
- C) undefined
- D) Error (cannot assign index 1 to empty array)

- Answer: **C) undefined**
- Explanation: Setting arr[1] creates a sparse array with index 0 empty. Accessing arr[0] yields undefined.

## Q9. How would you access the name "Dave" in the nested array?

```
let names = ["John", "Smith", ["Ted", "Dave"]];
```

- A) names[3][1]
- B) names[2[1]]
- C) names[2][1]
- D) names["Dave"]
- E) You cannot nest an array inside an array

- Answer: **C) names[2][1]**
- Explanation: names[2] accesses the inner array ["Ted", "Dave"]; index 1 of that array is "Dave".

## Q10. What will the console print?

```
let arr = ["a", "b", "c", "d", "e"];
arr.length = 4;
console.log(arr);
```

- A) ["a", "b", "c", "d", "e"]
- B) ["a", "b", "c", "d", undefined]
- C) ["a", "b", "c", "d"]
- D) Error (cannot reduce the length property)

- Answer: **C) ["a", "b", "c", "d"]**
- Explanation: Setting length = 4 truncates the array and removes the last element.

## Q11. Which expression grabs the letter "e"?

```
let arr = ["a", "b", "c", "d", "e", "f"];
```

- A) arr[arr.length]
- B) arr[arr.length - 1]
- C) arr[arr.length - 2]
- D) arr[5]

- Answer: **C) arr[arr.length - 2]**
- Explanation: arr.length is 6. Subtracting 2 targets index 4, which holds "e".

## Q12. What will the console print?

```
let num = 3;
for (let i = num; i >= 0; i--) {
  console.log(num - i);
}
```

- A) 3, 2, 1, 0
- B) 3, 2, 1
- C) 0, 1, 2, 3
- D) 0, 1, 2
- E) 2, 2, 2, 2

- Answer: **C) 0, 1, 2, 3**
- Explanation: As i counts down from 3 to 0, num - i produces 0, 1, 2, and 3.

## Q13. What will the console output?

```
let arr = ["a", "b", "c", "d", "e", "f", "g", "h"];
for (let i = arr.length / 2; i < arr.length; i++) {
  console.log(arr[i - 1]);
}
```

- A) a, a, a, a
- B) a, b, c, d
- C) d, e, f, g
- D) e, f, g, h
- E) e, e, e, e

- Answer: **C) d, e, f, g**
- Explanation: The loop starts at i = 4 and stops before i = 8. It prints arr[3] through arr[6], which are d, e, f, g.

## Q14. What is the value of num when logged?

```
let num = 4;
for (let i = 0; i < 3; i++) {
  num = num + i;
}
for (let j = num; j >= 0; j--) {
  num--;
}
console.log(num);
```

- A) 4
- B) 7
- C) 0
- D) -1
- E) The loop runs forever

- Answer: **D) -1**
- Explanation: After the first loop, num is 7. The second loop runs 8 times (from 7 down to 0) and decrements num each time, ending at -1.

## Q15. What will the console print?

```
let arr = [4, 3, 2, 1];
for (let i = arr[3]; i < arr[0]; i++) {
  console.log(arr[i]);
}
```

- A) 1, 2, 3, 4
- B) 1, 2, 3
- C) 4, 3, 2, 1
- D) 3, 2, 1
- E) Nothing prints

- Answer: **D) 3, 2, 1**
- Explanation: The loop starts at index 1 (value 3) and runs while i < 4. It prints indexes 1, 2, and 3 → 3, 2, 1.

## Q16. What is the value of num when logged?

```
let num = 5;
for (let i = 5; i > 0; i--) {
  num--;
}
for (let j = num; j < num * 2; j++) {
  j++;
}
console.log(num);
```

- A) 5
- B) 1
- C) 0
- D) -1
- E) The log is never reached

- Answer: **C) 0**
- Explanation: The first loop decrements num five times, leaving 0. The second loop modifies j only, so num stays 0.

## Q17. What will the console print?

```
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  let num = 0;
  for (let j = 0; j < arr.length; j++) {
    num = num + j;
  }
  console.log(num + arr[i]);
}
```

- A) 0, 0, 0
- B) 4, 4, 4
- C) 4, 5, 6
- D) 4, 8, 12
- E) 4, 9, 14

- Answer: **C) 4, 5, 6**
- Explanation: The inner loop sums 0 + 1 + 2 = 3. Adding each arr[i] (1, 2, 3) yields 4, 5, and 6.

## Q18. What will the console print?

```
let num = 4;
for (let i = 3; i > 0; i--) {
  for (let j = i; j < 0; j--) {
    num++;
  }
}
for (let k = 0; k < num / 2; k++) {
  console.log(num + k);
}
```

- A) 4, 5
- B) 4, 5, 6
- C) 6, 7
- D) 6, 7, 8
- E) The loops never finish

- Answer: **A) 4, 5**
- Explanation: The inner loop never runs because j < 0 is initially false, so num stays 4. The final loop prints 4 and 5.

## Q19. What will the console print?

```
let arr = [0, 1];
for (let i = 0; i < 2; i++) {
  for (let j = i; j < 2; j++) {
    arr[i] = i + j;
  }
}
console.log(arr);
```

- A) [0, 0]
- B) [0, 1]
- C) [1, 1]
- D) [1, 2]
- E) [2, 2]

- Answer: **D) [1, 2]**
- Explanation: The nested loops set arr[0] to 1 and arr[1] to 2 by summing indices.

## Q20. How many times does the console log run in total?

```
let i;
for (i = 0; i < 5; i++) {
  if (i < 2) {
    console.log(true);
  }
}
for (let j = 0; j <= 1; j++) {
  for (let k = i; k > 0; k--) {
    console.log(true);
  }
}
```

- A) 2
- B) 7
- C) 10
- D) 12
- E) Infinite

- Answer: **D) 12**
- Explanation: The first loop logs twice (for i = 0 and 1). Afterwards i equals 5. The nested loops log 5 times for each j (2 iterations), adding 10 more → 12 total.

## Q21. What will the console print?

```
for (let i = 0; i < 5; i++) {
  for (let j = i; j < i; j++) {
    console.log(j);
  }
}
```

- A) 0, 1, 2, 3, 4
- B) 1, 2, 3, 4, 5
- C) 0, 1, 2, 3
- D) 1, 2, 3, 4
- E) Nothing prints

- Answer: **E) Nothing prints**
- Explanation: The inner loop condition j < i is false on entry because j starts equal to i, so the body never executes.

## Q22. What will the console print?

```
console.log(parseInt("Hello123"));
```

- A) 123
- B) Hello123
- C) undefined
- D) NaN
- E) SyntaxError

- Answer: **D) NaN**
- Explanation: parseInt stops immediately when the first character is non-numeric. With "Hello123", it returns NaN.

## Q23. Which condition lets the loop visit every element?

```
let arr = [1, 2, 3, 4, 5, 6];
for (let i = 0; ________; i++) {
  console.log(arr[i]);
}
```

- `A) i < arr.length;`
- `B) i < arr.length - 1;`
- `C) i <= arr.length;`
- D) All of the above
- E) None of the above

- Answer: **A) i < arr.length;**
- Explanation: Valid indexes are 0 through arr.length - 1. The other conditions either skip the last element or go out of bounds.

## Q24. Which keyword exits the loop when i === 5?

```
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    _______
  }
}
```

- A) continue;
- B) break;
- C) Both A and B
- D) None of the above

- Answer: **B) break;**
- Explanation: break exits the loop immediately. continue merely skips the rest of the current iteration.

## Q25. Which condition lets the loop visit only the middle three items ("b", "c", "d")?

```
let arr = ["a", "b", "c", "d", "e"];
for (let i = 1; ________; i++) {
  console.log(arr[i]);
}
```

- `A) < 3`
- `B) i <= arr.length - 1`
- `C) i <= 4`
- D) All of the above
- E) None of the above

- Answer: **E) None of the above**
- Explanation: To stop after index 3, the condition should be i < 4, which is not listed.

## Q26. Which increment visits every second item ("a", "c", "e", "g")?

```
let arr = ["a", "b", "c", "d", "e", "f", "g"];
for (let i = 0; i < arr.length; ________) {
  console.log(arr[i]);
}
```

- A) i++
- B) ++i
- C) i += 2
- D) i *= 2
- E) None of the above

- Answer: **C) i += 2**
- Explanation: Incrementing by 2 visits indexes 0, 2, 4, and 6, which correspond to "a", "c", "e", "g".

## Q27. Which line removes the last two elements from arr?

```
function removeTwo(arr) {
  __________
}
```

- A) arr.length -= 2;
- B) arr = arr.length - 2;
- C) arr.length--;
- D) --arr.length;

- Answer: **A) arr.length -= 2;**
- Explanation: Reducing the length property trims elements from the end. Subtracting 2 removes the last two items in place.

## Q28. Which index expression fills the array with [1, 2, 3, 4]?

```
let arr = [];
for (let i = 1; i < 5; i++) {
  arr[___] = i;
}
```

- A) i
- B) i - 1
- C) i--
- D) Both B and C

- Answer: **B) i - 1**
- Explanation: To start filling at index 0, subtract 1 from i, so the array becomes [1, 2, 3, 4].

## Q29. Which expression multiplies each value by the previous value, producing [1, 2, 6, 24]?

```
let arr = [1, 2, 3, 4];
for (let i = 1; i < arr.length; i++) {
  arr[i] *= ________;
}
```

- A) i - 1
- B) --i
- C) arr[i - 1]
- D) arr[--i]

- Answer: **C) arr[i - 1]**
- Explanation: Multiplying by the previous element accumulates factorial-like values: 1, 2, 6, 24.

## Q30. Which expression builds the Fibonacci sequence?

```
let arr = [0, 1];
for (let i = 2; i < 10; i++) {
  arr[i] = ________;
}
```

- A) arr[i] + arr[i - 1]
- B) arr[i - 1] + arr[i - 2]
- C) arr[i] - arr[i + 1]
- D) arr[i + 1] - arr[i + 2]

- Answer: **B) arr[i - 1] + arr[i - 2]**
- Explanation: Each Fibonacci number is the sum of the previous two numbers. Filling arr[i] this way produces the sequence up to 34.

