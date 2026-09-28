let num1 = "";
let num2 = "";
let oper = "";
let justCalculated = false;

const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display")

function add(a, b) {
    return a + b
}
function sub(a, b) {
    return a - b
}
function mul(a, b) {
    return a * b
}
function div(a, b) {
    return a / b
}


function operate(num1, oper, num2) {
    switch (oper) {
        case '+':
            return add(num1, num2)
        case '-':
            return sub(num1, num2)
        case '*':
            return mul(num1, num2)
        case '/':
            return div(num1, num2)

        default:
            alert("Invalid Operation")
            break;
    }
}

function handleButtonClick(value) {
    if (value >= "0" && value <= "9") {
        if (justCalculated) {
            num1 = value;
            justCalculated = false;
            display.textContent = num1;
        }
        else if (oper === "") {
            num1 += value;
            display.textContent = num1;
        }
        else {
            num2 += value;
            display.textContent = num1 + oper + num2;
        }
    }
    else if (value === "+" || value === "-" || value === "*" || value === "/") {
        if (num1 !== "" && num2 !== "" && oper !== "") {
            const res = operate(Number(num1), oper, Number(num2));
            num1 = res;
            num2 = "";
            oper = value;
        }
        else {
            oper = value;
        }
        display.textContent = num1 + oper;
    }
    else if (value === "=" && num1 !== "" && num2 !== "" && oper !== "") {
        const res = operate(Number(num1), oper, Number(num2));
        display.textContent = res;
        num1 = res;
        num2 = "";
        oper = "";
        justCalculated = true;
    }
    else if (value === "AC") {
        num1 = "";
        num2 = "";
        oper = "";
        justCalculated = false;
        display.textContent = "0";
    }
    else if (value == "DEL") {
        justCalculated = false;
        if (num2 !== "") {
            num2 = num2.slice(0, -1);
            display.textContent = num1 + oper + num2;
        }
        else if (oper !== "") {
            oper = "";
            display.textContent = num1 + oper + num2;
            
        }
        else {
            num1 = num1.slice(0, -1)
            display.textContent = num1 + oper + num2;
        }
    }
  
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        handleButtonClick(value);
    });
});