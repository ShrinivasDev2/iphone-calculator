// Get references to HTML elements
const display = document.querySelector("#screen");
console.log(display);
const buttons = document.querySelectorAll(".calci");

// Initialize variables
let currentInput = "";
let currentOperator = "";
let previousInput = "";

// Add event listeners to the calculator buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Handle different button types
    if (button.id.match(/^\d$/)) {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (button.id === "clear") {
      clearCalculator();
    } else if (button.id === "delete") {
      deleteLastInput();
    } else if (button.id === "percentage") {
      handleCharacter("%");
    } else if (button.id === "divide") {
      handleOperator("÷");
    } else if (button.id === "multiply") {
      handleOperator("×");
    } else if (button.id === "subtract") {
      handleOperator("-");
    } else if (button.id === "add") {
      handleOperator("+");
    } else if (button.id === "equals") {
      calculateResult();
    } else if (value === ".") {
      handleCharacter(".");
    }
  });
});

// Function to update the display
function updateDisplay(value) {
  display.value = value;
}

// Function to handle number and decimal input
function handleCharacter(character) {
  if (character === "AC") {
    clearCalculator();
  } else if (character === ">>") {
    deleteLastInput();
  } else if (character === ".") {
    if (!currentInput.includes(".")) {
      currentInput += character;
      updateDisplay(currentInput);
    }
  }
}

// Function to handle operator input
function handleOperator(operator) {
  if (currentInput !== "") {
    if (previousInput !== "") {
      calculateResult();
    } else {
      previousInput = currentInput;
    }
    currentInput = "";
    currentOperator = operator;
  }
}

// Function to clear the calculator
function clearCalculator() {
  currentInput = "";
  currentOperator = "";
  previousInput = "";
  updateDisplay("0");
}

// Function to delete the last input
function deleteLastInput() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

// Function to calculate the result
function calculateResult() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    case "÷":
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        result = "Error";
      }
      break;
    case "%":
      result = (num1 * num2) / 100;
      break;
    default:
      result = currentInput;
  }

  updateDisplay(result);
  currentInput = result.toString();
  currentOperator = "";
  previousInput = "";
}

// Initialize the calculator with a clear display
clearCalculator();
