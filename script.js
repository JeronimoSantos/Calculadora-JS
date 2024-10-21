const resultado = document.querySelector(".resultado");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operador = null;
let restart = false;

function updateResult(originClear = false) {
    resultado.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit (digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult();
}

function setOperator (newOperador) {
    if (currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operador = newOperador;
}

function calculate () {
    if (operador === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operador) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operador = null;
    firstOperand = null;
    restart = true;

    updateResult();
}

function clearCalculator () {
    currentNumber = "";
    firstOperand = null;
    operador = null;

    updateResult(true);
}

function setPorcentage () {
    let resultado = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operador)) {
        resultado = resultado * (firstOperand || 1);
    } 
    
    if (resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5).toString();
    }

    currentNumber = resultado.toString();
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "×", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1).toString();
                updateResult();
        } else if (buttonText === "%") {
            setPorcentage();
        }
    });
});
