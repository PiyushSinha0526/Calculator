const iconChange = document.querySelector('.theme')
const bgChange = document.querySelector('.container')

// + querySelectors
const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const clearAllBtn = document.querySelector('[data-clearAll]')
const nextText = document.querySelector('[data-next]')

// + Calculator class
class Calculator {
    constructor(nextText) {
        this.nextText = nextText;
        this.clear();
    }
    
    // > Clear all
    clear() {
        this.next = '';
    }

    // > delete last character
    delete() { 
        this.next = this.next.slice(0,-1);   
    }
    
    // > append number and period
    appendNumber(number) {
        if(this.next.length >= 28) { this.next = ''; return }
        let inputString = this.next.toString();
        // * Multiple Period fix
        if( number === '.' && (/[.]/.test(inputString.slice(-1)) || /\.[\d]{1,}$/.test(this.next))) {
            return
        }
        // * Multiple zeros
        if(number === '0' && inputString.slice(-1) === '0' && !/\.[0]{1,}$/.test(this.next)  ) {
            return
        }
        
        this.next = inputString + number.toString();
    }
    
    // > append Symbols
    appendOperator(operator) {
        if(this.next.length >= 28) { this.next = ''; return }
        let stringOp = operator.toString();
        let inputString = this.next.toString();
        // * Operator Check
        if(this.next == '' && /[+*%\/]/.test(stringOp)) return;
        if(/[.\-+*%\/]/.test(inputString.slice(-1)) && /[+*%\/]/.test(stringOp)){
            return;
        } else if (/[-.]/.test(inputString.slice(-1)) && /-/.test(stringOp)) {
            return;
        }
        this.next = inputString + stringOp;
    }
    
    // > update the Display
    update() {
        nextText.innerText = this.next;
    }

    // > equal key
    equal() {
        this.next = parseFloat(eval(nextText.innerText));
        let getNum = this.changeDisplayNumber(this.next);
        nextText.innerText = getNum;
    }

    // > Chnage Display Number to local format
    changeDisplayNumber(number) {
        const integerDigits = parseFloat(number.toString().split('.')[0]);
        const decimalDigits = number.toString().split('.')[1];
        let returnBack;
        if (isNaN(integerDigits)) {
          returnBack = '';
        } else {
            returnBack = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${returnBack}.${decimalDigits}`;
        } else {
            return returnBack;
        }
    }
}

const calculator = new Calculator(nextText);

// + EventListener
clearAllBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
})

numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.update();
    })
})

operatorBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendOperator(btn.innerText);
        calculator.update();
    })
})

equalsBtn.addEventListener('click', () => {
    if(nextText.innerText === "") return;
    calculator.equal();
})

// + Dark and light background
iconChange.addEventListener("click", () => {
    if(iconChange.children[0].classList.contains('fa-moon')) {
        bgChange.classList.toggle('change')
        iconChange.classList.toggle('light')
        iconChange.removeChild(iconChange.childNodes[0]);
        iconChange.innerHTML = `<i class="fas fa-sun"></i>`
    } else {
        bgChange.classList.toggle('change')
        iconChange.classList.toggle('light')
        iconChange.removeChild(iconChange.childNodes[0]);
        iconChange.innerHTML = `<i class="fas fa-moon"></i>`
    }
})
