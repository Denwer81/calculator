const calculator = document.querySelector('.calculator');
const calcScreen = calculator.querySelector('.calculator__screen-main');
const calcSecondScreen = calculator.querySelector('.calculator__screen-additional_operand');
const calcOperationScreen = calculator.querySelector('.calculator__screen-additional_operation');
const calcPads = calculator.querySelector('.calculator__pad-container');
let firstNumber = '';
let secondNumber = '';
let operation = '';
let historyOperation = '';

calcPads.addEventListener('click', (evt) => {
  const currentButton = evt.target;

  handleButton(currentButton);
});

function handleButton(currentButton) {
  if (currentButton.classList.contains('calculator__btn_type_digital')) {
    handleDigital(currentButton);
  }

  if (currentButton.classList.contains('calculator__btn_type_operation')) {
    handleOperation(currentButton);
  }
}

function handleDigital(currentButton) {
  let buttonValue = currentButton.textContent;
  let correctNumber = isCorrectNumber(buttonValue);

  if (correctNumber) {
    if (firstNumber[0] == 0 && buttonValue != '.' && firstNumber.length < 2) {
      firstNumber = '';
      calcScreen.textContent = firstNumber;
    }
    firstNumber += buttonValue;
    calcScreen.textContent = firstNumber;
  }
}

function isCorrectNumber(buttonValue) {
  if (firstNumber == Infinity || isNaN(firstNumber)) {
    return false;  
  }

  if (buttonValue == 0 && firstNumber[0] == 0 && firstNumber.length === 1) {
    return false;
  }

  if (buttonValue === '.' && firstNumber.includes('.')) {
    return false;
  }

  if (firstNumber.length > 9) {
    return false;
  }

  return true;
}

function handleOperation(currentButton) {
  let buttonValue = currentButton.textContent;

  switch (buttonValue) {
    case 'AC':
      clear();
      break;

    case '+/-':
      switchSing();
      break;

    case '%':
      handleMathOperation(buttonValue);
      break;

    case '/':
      handleMathOperation(buttonValue);
      break;

    case 'X':
      handleMathOperation(buttonValue);
      break;

    case '-':
      handleMathOperation(buttonValue);
      break;

    case '+':
      handleMathOperation(buttonValue);
      break;

    case '=':
      executeMathOperation();
      getCorrectNumberScreen();
      calcScreen.textContent = firstNumber;
      operation = '';
      break;
  }
}

function handleMathOperation(buttonValue) {
  if (operation != "") {
    executeMathOperation(buttonValue);
    renderAfterOperation(buttonValue);
  } else {
    renderAfterOperation(buttonValue);
  }
}

function renderAfterOperation(buttonValue) {
  if (firstNumber == Infinity || secondNumber == Infinity || isNaN(firstNumber) || isNaN(secondNumber)) {
    calcScreen.textContent = 'ошибка';
    setTimeout(() => clear(), 500);
  } else {
    getCorrectNumberScreen();
    historyOperation += `${firstNumber} ${operation} ${secondNumber}</br>`;
    secondNumber = firstNumber;
    firstNumber = '0';
    operation = buttonValue;
    calcScreen.textContent = '0';
    calcSecondScreen.innerHTML = historyOperation;
    calcOperationScreen.textContent = buttonValue;
  }
}

function clear() {
  firstNumber = '0';
  secondNumber = '';
  operation = '';
  historyOperation = '';
  calcScreen.textContent = '0';
  calcSecondScreen.textContent = '';
  calcOperationScreen.textContent = 'AC';
  setTimeout(() => calcOperationScreen.textContent = '', 500);
}

function switchSing() {
  firstNumber = String(0 - firstNumber);
  calcScreen.textContent = firstNumber;
}

function executeMathOperation() {
  switch (operation) {
    case '%':
      firstNumber = +secondNumber / 100 * +firstNumber;
      break;

    case '/':
      firstNumber = secondNumber / firstNumber;
      break;

    case 'X':
      firstNumber = secondNumber * firstNumber;
      break;

    case '-':
      firstNumber = secondNumber - firstNumber;
      break;

    case '+':
      firstNumber = +secondNumber + +firstNumber;
      break;
  }
}

function getCorrectNumberScreen() {
  firstNumber = String(+Number(firstNumber).toFixed(7));

  if (firstNumber.length > 10) {
    firstNumber = (Number(firstNumber) + 0.000001).toExponential(6);
  }
}