/**
 * Calculator
 * Created by Nikola Ilievski
 * Version: 1.0.1
 */

const firstDisplay = document.querySelector('[cOperation]');
const secondDisplay = document.querySelector('[cText]');

const clearBtn = document.querySelector('[clear]');
const backBtn = document.querySelector('[backBtn]');
const operatorBtns = document.querySelectorAll('[operator]');
const numberBtns = document.querySelectorAll('[number]');
const decimalBtn = document.querySelector('[decimal]');
const equalsBtn = document.querySelector('[equals]');

let num1 = '';
let num2 = '';
let currentAction = null;
let reset = false;

equalsBtn.addEventListener('click', equals);
backBtn.addEventListener('click', deleteNumber);
clearBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', addDecimal);

numberBtns.forEach((button) =>
  button.addEventListener('click', () => connectNumbers(button.textContent)));

operatorBtns.forEach((button) =>
  button.addEventListener('click', () => selectOperator(button.textContent)));

/**
 * A function that changes the text on the screen when the page loads
 */
window.onload = function () {
  firstDisplay.textContent = '0';
  secondDisplay.textContent = '';
};

/**
 * A function that resets the calculator after a calculation has been performed
 */
function clear() {
  firstDisplay.textContent = '0';
  secondDisplay.textContent = '';
  num1 = '';
  num2 = '';
  currentAction = null;
};

/**
 * A function that takes in a
 * @param {number} number as an argument and checks if the display number is too large if so
 * @returns the error message
 */
function connectNumbers(number) {
  if (secondDisplay.textContent === '0' || reset)
    reseting();

  if (firstDisplay.textContent.includes('Number is too large!') || secondDisplay.textContent.includes('Error!'))
    return;

  if (secondDisplay.textContent.replace('.', '').length >= 12) {
    firstDisplay.textContent = 'Number is too large!';
    secondDisplay.textContent = 'Error!';
    return;
  };

  secondDisplay.textContent += number;
};

/**
 * A function that selects an
 * @param {string} operator for a math operation. It first checks if there is a current action and
 * if so, it runs the equals() function.
 */
function selectOperator(operator) {
  if (currentAction != null) {
    equals();
  };
  num1 = secondDisplay.textContent;
  currentAction = operator;
  firstDisplay.textContent = `${num1} ${currentAction}`;
  reset = true;
};

/**
 * A function that is used to print the result of the math problem and
 * @returns an error message if divided by 0
 */
function equals() {
  if (!currentAction) {
    return;
  };
  num2 = secondDisplay.textContent;
  const result = operate(currentAction, num1, num2);
  if (result === null) {
    clear();
    secondDisplay.textContent = "Can't divide by 0";
    return;
  };
  secondDisplay.textContent = formatResult(result);
  firstDisplay.textContent = `${num1} ${currentAction} ${num2} =`;
  currentAction = null;
};

/**
 * A function that is used to reset the second display
 */
function reseting() {
  secondDisplay.textContent = '';
  reset = false;
};

/**
 * A function that adds a decimal point and
 * @returns the value
 */
function addDecimal() {
  if (reset) {
    reseting();
  };
  if (!secondDisplay.textContent) {
    secondDisplay.textContent = '0';
  };
  if (secondDisplay.textContent.includes('.')) {
    return;
  };
  secondDisplay.textContent += '.';
};

/**
 * A function that deletes the last number
 */
function deleteNumber() {
  secondDisplay.textContent = secondDisplay.textContent.slice(0, -1);
};

/**
 * A function that takes in three parameters
 * @param {string} operator 
 * @param {number} a 
 * @param {number} b and
 * @returns the result rounded to 3 decimals
 */
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return substract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      if (b != 0) return divide(a, b);
      else return null;
  };

  return parseFloat(result.toFixed(3));
};

/**
 * A function that takes in a
 * @param {number} result and checks if the result is not a number and if it is not it
 * @returns the result rounded to 3 decimals
 */
function formatResult(result) {
  if (result % 1 !== 0) {
    return result.toFixed(3);
  };
  return result.toString();
};

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;