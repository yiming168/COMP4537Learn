# Quiz 4: Review Basic JS Objects Hosting

## Q1. How would you invoke the startCar method from outside the car object?

```
let car = {
  doors: 4,
  year: 2019,
  startCar: function() {
    console.log('Car started');
  }
};
```

- A) car.startCar();
- B) startCar();
- C) startCar(car);
- D) startCar = car();
- E) This method is out of scope

- Answer: **car.startCar();**
- Explanation: Object methods are invoked with dot notation. car.startCar(); correctly calls the method defined on the car object; the other options either reference undefined identifiers or have invalid syntax.

## Q2. Which of the following will <strong>not</strong> point to the number 5?

```
let obj = {
  firstNum: 26,
  moreNums: {
    highNum: 1204,
    lowNum: 14,
    evenMoreNums: {
      five: 5
    }
  }
};
```

- A) obj["moreNums"]["evenMoreNums"]["five"];
- B) obj.moreNums.evenMoreNums.five;
- C) obj["moreNums"].evenMoreNums["five"];
- D) obj.[moreNums].evenMoreNums.[five];
- E) All of the above will work

- Answer: **obj.[moreNums].evenMoreNums.[five];**
- Explanation: Bracket notation requires a string or variable inside the brackets. Writing obj.[moreNums] is invalid syntax, so this expression fails; the other references correctly navigate to the nested value of 5.

## Q3. Which is the correct way to create a DOM button element in memory?

- Answer: **let btn = document.createElement("button");**
- Explanation: document.createElement() constructs a new DOM node that you can later append to the document with methods such as appendChild().

## Q4. Using the following constructor, how would you instantiate a person named Elon Musk?

```
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
```

- Answer: **let elon = new Person("Elon", "Musk");**
- Explanation: Constructor functions are invoked with the new keyword to create an object instance. Passing "Elon" and "Musk" assigns those values to the new person's properties.

## Q5. What will the console print?

```
let obj = { a: 1, b: 2, c: 3 };
console.log(obj["1"]);
```

- A) 1
- B) "a"
- C) undefined
- D) Uncaught ReferenceError

- Answer: **undefined**
- Explanation: The object keys are "a", "b", and "c". Looking up obj["1"] queries a key named "1", which is absent, so JavaScript returns undefined.

## Q6. In the following example, sandwich is an example of a(n) ______.

```
let sandwich = { meat: "chicken", bread: "white" };
```

- Document Object Model
- Object Method
- Object Literal
- Object Constructor

- Answer: **Object Literal**
- Explanation: An object literal is defined with curly braces and key–value pairs. The sandwich variable is created directly via literal syntax.

## Q7. Which option describes the requirements you need to consider when choosing a hosting service for your assignments?

- A) Host multiple Node.js apps at the same time
- B) Provide SSL and deliver pages in under 15 seconds
- C) Support MySQL or another SQL database
- D) Keep multiple web apps running for the entire semester
- E) Offer terminal access for installing Node.js modules
- F) Provide DB admin access to manage user permissions
- G) All options

- Answer: **All options**
- Explanation: Each requirement impacts your ability to deploy coursework: hosting multiple apps, ensuring SSL and performance, using SQL databases, maintaining uptime, installing dependencies, and managing database permissions.

## Q8. What will the console print?

```
function isAboveFive(num) {
  if (num > 5) {
    return true;
  }
  console.log(num + " is less than or equal to 5");
}

console.log(isAboveFive(10));
```

- A) 10
- B) true
- `C) true, <em>10 is less than or equal to 5</em>`
- D) 10 is less than or equal to 5

- Answer: **true**
- Explanation: Since 10 > 5, the function returns true and exits before the console.log statement runs. The outer log prints the returned value.

## Q9. Which of the following will print David's GPA?

```
function Student(name, major, gpa) {
  this.name = name;
  this.major = major;
  this.gpa = gpa;
}

let arr = [
  new Student("Emma", "Comp Sci", 3.9),
  new Student("David", "Mathematics", 4.0)
];
```

- A) console.log(arr[1]["gpa"]);
- B) console.log(arr[1].gpa);
- C) console.log(arr[1][gpa]);
- D) All of the above
- E) Only A and B will work

- Answer: **Only A and B will work**
- Explanation: arr[1] is David's student object, so both dot and bracket notation can access the gpa property. The expression arr[1][gpa] fails because gpa is treated as an undefined variable.

## Q10. What will the console print?

```
let arr = [1, 2, 3];
console.log(typeof arr);
```

- A) "object"
- B) "array"
- C) "number"
- D) "undefined"

- Answer: **"object"**
- Explanation: typeof reports arrays as "object" because arrays are specialized objects in JavaScript. Use Array.isArray() to differentiate them from other objects.

