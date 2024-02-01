const numbers = document.querySelectorAll('.number'),
      operators = document.querySelectorAll('.operator'),
      clear = document.querySelector('.clear'),
      input = document.querySelector('.user-input'),
      evalBtn = document.querySelector('.evalBtn'),
      result = document.querySelector('.result'),
      plusminus = document.querySelector('.plusminus'),
      comma = document.querySelector('.comma')
      
// вешаем обработчики 
Array.from(numbers).forEach((el) => {
    el.addEventListener('click', number)
})

Array.from(operators).forEach((el) => {
    el.addEventListener('click', operator)
})
        
evalBtn.addEventListener('click', evaluate)
clear.addEventListener('click', clearAll)
plusminus.addEventListener('click', operator),
comma.addEventListener('click', commaBtn)

        
// здесь начнём выполнение вычислений
let inputStr = ''
result.innerHTML = '0'
let arg = ''
let op = ''




// функции по нажатию кнопачек 
function number() {

    if (!inputStr) { // ЕСЛИ ПУСТО В СТРОКЕ ВВОДА - ДОБАВЛЯЕМ СИМВОЛ
        inputStr += this.innerHTML
        input.innerHTML = inputStr
        return
    }
    if (inputStr == '0') { // ЕСЛИ В СТРОКЕ НОЛЬ -  НОВЫЙ НОЛЬ НЕ ДОПИСЫВАЕМ
        if (this.id == 0) {
            return
        } else {
            inputStr = this.id
            input.innerHTML = inputStr
            return
        }
    } 
    if (inputStr.endsWith('=')) {
        inputStr = this.id
        input.innerHTML = inputStr
        result.innerHTML = ''
        return
    }
    
    inputStr += this.id
    input.innerHTML = inputStr

    console.log(`${this.id}; inputStr: ${inputStr}`)
}

    

function clearAll() {

    console.log(this.innerHTML)
    inputStr = ''
    input.innerHTML = inputStr
    result.innerHTML = '0'
    arg = '0'
    op = ''
}


function evaluate() {
    
    
    if (inputStr == '') { //если пусто
        
        inputStr = result.innerHTML + this.id
        input.innerHTML = inputStr
        return
    } 
    if (inputStr.endsWith('=')) { //если в конце "=" - повторить предыдущее
        arg = inputStr.slice(0,-1).split(/\-|\=|\*\+\//).pop()
        console.log('arg: ' + arg)
        // arg = result.textContent
        if (!op) { // последнего действия нет 
            inputStr = result.textContent
        } else { inputStr = result.textContent + op + arg}
        console.log('op ' + op + ' arg ' + arg)
    }    

    if (/\/|\+|\-|\*/.test(inputStr.slice(-1))) { // если выражение заканчивается на + - * / 
        arg = inputStr.split(/\/|\+|\-|\*/)[0]
        op = inputStr.slice(-1)
        console.log(arg)


    }
    result.innerHTML = eval(inputStr)
    input.innerHTML = inputStr + this.id
    inputStr += this.id
    
    console.log(`${this.id}; inputStr: ${inputStr}`)
}

function operator() {
    if (inputStr == '') {
        inputStr = 'arg' + this.id
        input.innerHTML = inputStr
        return
    }
    if (/\/|\+|\=|\-|\*/.test(inputStr.slice(-1))) {   // если выражение заканчивается на /*-+= меняем на другой знак
        console.log( result.textContent + /\/|\+|\=|\-|\*/)
        inputStr = inputStr.slice(0,-1) 
        input.innerHTML = eval(inputStr) + this.id
        return
    }
    inputStr = eval(inputStr) + this.id
    input.innerHTML = inputStr
    console.log(`${this.innerHTML}; inputStr: ${inputStr} op ${op}`)
    op = this.id
}

function commaBtn() {
    console.log(this.innerHTML)
    if (inputStr == '') {
        inputStr = '0,'
        input.innerHTML = inputStr
    } else {
        inputStr += '.'
        input.innerHTML = inputStr
    }
    console.log(`${this.innerHTML}; inputStr: ${inputStr}`)
}







