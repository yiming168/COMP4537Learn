# Quiz 1: HTML & CSS

## Q1. How would you select all <div> tags with a class of "container"?

- `div.container {}`
- `.container {}`
- `div > .container {}`
- `div + .container {}`

- Answer: **div.container {}**
- Explanation: div.container matches only <div> elements with class container. .container matches any element with that class; the child (>) and adjacent sibling (+) combinators do not express "divs that have this class".

## Q2. Which of the following sizing declarations is invalid?

- width: 50px;
- width: 50%;
- width: 50em;
- These are all valid

- Answer: **These are all valid**
- Explanation: px, %, and em are all valid CSS units. The declarations are syntactically correct.

## Q3. Which of the following needs an opening AND closing tag?

- `<hr>`
- `<br>`
- `<img>`
- `<table>`

- Answer: **<table>**
- Explanation: <table> is non-void and must be closed. <hr>, <br>, and <img> are void elements and do not have closing tags.

## Q4. Which of the following is a block-level element?

- `<div></div>`
- `<span></span>`
- `<a href="#"></a>`
- `<button></button>`

- Answer: **<div></div>**
- Explanation: <div> is block-level by default. <span> and <a> are inline; <button> is typically inline/inline-block by default in user-agent styles.

## Q5. How would you change the background color of a <div>?

- `div { color: green; }`
- `div { background-color: green; }`
- `div { backgroundColor: green; }`

- Answer: **div { background-color: green; }**
- Explanation: In CSS, property names are kebab-case like background-color. The camelCase form is used in JavaScript DOM style APIs, not in CSS.

## Q6. Image tags are assigned a source file using which attribute?

- `<img source="" />`
- `<img src="" />`
- `<image source="" />`
- `<image src="" />`

- Answer: **<img src="" />**
- Explanation: The <img> element uses the src attribute to specify the image resource. There is no <image> element in HTML.

## Q7. Which of the following is a valid use of quotation marks in HTML?

- `<a href="#"></a>`
- `<a href='#'></a>`
- Both of the above
- None of the above

- Answer: **Both of the above**
- Explanation: HTML allows either double or single quotes for attribute values, as long as they are properly balanced and escaped when needed.

## Q8. Which is the correct document type declaration?

- `<document type="html" />`
- `<document> <html></html> </document>`
- `<!DOCTYPE html>`
- `<DOCTYPE="html" />`

- Answer: **<!DOCTYPE html>**
- Explanation: The HTML5 doctype is a short declaration that triggers standards mode in browsers.

## Q9. Which tag is used to add an external stylesheet to your HTML?

- `<a></a>`
- `<link>`
- `<style></style>`
- `<external></external>`

- Answer: **<link>**
- Explanation: Use <link rel="stylesheet" href="styles.css"> in the <head> to attach an external CSS file.

## Q10. Which of the following is the correct way to group the following selectors?

- `h1 h2 p { color: red; }`
- `h1 + h2 + p { color: red; }`
- `h1, h2, p { color: red; }`
- `h1 > h2 > p { color: red; }`

- Answer: **h1, h2, p { color: red; }**
- Explanation: A comma-separated list applies the same declarations to multiple selectors. The other selectors represent relationships (descendant, adjacent sibling, direct child) and are not grouping.

## Q11. Which of the following is the correct use of inline styling?

- `<h1 color="red">Heading 1</h1>`
- `<h1 style="color:red;">Heading 1</h1>`
- `<h1 style="color='red'">Heading 1</h1>`

- Answer: **<h1 style="color:red;">Heading 1</h1>**
- Explanation: Inline CSS must be placed in the style attribute. The color attribute does not exist; mixing single quotes inside double-quoted attribute values must still form valid CSS.

## Q12. Colors in HTML/CSS can be used with which of the following?

- `<p style="color: rgb(0,0,0);">RGB Values</p>`
- `<p style="color: rgba(0,0,0,0);">RGBA Values</p>`
- `<p style="color: #992345;">Hexadecimal Values</p>`
- `<p style="color: #e6f;">Shorthand Hexadecimal Values</p>`
- All of the above are valid
- Only A and C are valid

- Answer: **All of the above are valid**
- Explanation: Modern CSS supports rgb(), rgba(), 6-digit hex, and 3-digit shorthand hex color notations.

## Q13. Given the following HTML, which styling would align the text in the center?

- `#container { text-align: center; }`
- `#text { text-align: center; }`
- Both would work
- Neither would work

- Answer: **Both would work**
- Explanation: text-align controls inline content alignment within the element. Applying it to the container or the text element itself centers the text content.

## Q14. The tree-like structure of an HTML document is called the ______.

- HTML Tree
- HTML Document Structure
- Document Tree Model
- Document Object Model

- Answer: **Document Object Model**
- Explanation: The DOM is a programming interface that represents the document as a tree of nodes.

## Q15. What happens if text is not inside a specific text-related tag and is placed directly inside <body>?

- The browser will display the text anyway
- The browser will not display the text, but will not throw an error
- The browser will throw an error and crash

- Answer: **The browser will display the text anyway**
- Explanation: Text nodes are valid in the body's flow. Browsers render them according to the document flow even without a wrapping text tag.

## Q16. In the following HTML tag, the "alt" and "src" are referred to as _____

```
<img src="" alt="" />
```

- Elements
- Attributes
- Properties
- Selectors

- Answer: **Attributes**
- Explanation: Attributes modify elements by providing additional information such as sources, alt text, IDs, classes, etc.

## Q17. Which are the two child elements of the <html> tag?

- `<header></header> and <footer></footer>`
- `<head></head> and <body></body>`
- `<header></header> and <body></body>`
- `<head></head> and <footer></footer>`

- Answer: **<head> and <body>**
- Explanation: The root <html> contains exactly two direct children in standard documents: <head> and <body>.

## Q18. What is the proper way to assign an element with two classes?

- `<p class="one" class="two">Text</p>`
- `<p classes="one, two">Text</p>`
- `<p classes="[one, two]">Text</p>`
- `<p class="one two">Text</p>`

- Answer: **<p class="one two">Text</p>**
- Explanation: Multiple classes are space-separated within a single class attribute.

## Q19. Which is the correct order of the CSS Box Model (inside to outside)?

- margin, padding, border, content
- margin, padding, content, border
- content, margin, border, padding
- content, padding, border, margin

- Answer: **content, padding, border, margin**
- Explanation: The box model flows outward from the content box to padding, then border, then margin.

