// это для калькулятара
const numbers = document.querySelectorAll('.number'),
      operators = document.querySelectorAll('.operator'),
      clear = document.querySelector('.clear'),
      input = document.querySelector('.user-input'),
      evalBtn = document.querySelector('.evalBtn'),
      result = document.querySelector('.result'),
      plusminus = document.querySelector('.plusminus'),
      comma = document.querySelector('.comma')

// это для остального мусора пока
const header = document.querySelector('#landing-text')

// кнопки в header
const logo = document.querySelector('.logo')
const aboutMe =document.querySelector('#aboutMe')
const menu_2 =document.querySelector('#menu-item-2')
const menu_3 =document.querySelector('#menu-item-3')
const menu_4 =document.querySelector('#menu-item-4')

// скролл H1
document.addEventListener('scroll', () => {
    let value = window.scrollY

    header.style.marginTop = value*1.1 + 'px'
})

// Якоря
logo.addEventListener('click', () => {
    window.scrollTo({behavior: 'smooth',
                     top: 0,
                     left: 0})
})

aboutMe.addEventListener('click', () => {
    document.querySelector('.about-question').scrollIntoView({behavior: 'smooth'})
})
menu_2.addEventListener('click', () => {
    document.querySelector('.coding').scrollIntoView({behavior: 'smooth'})
})
menu_3.addEventListener('click', () => {
    document.querySelector('.gayming').scrollIntoView({behavior: 'smooth'})
})
menu_4.addEventListener('click', () => {
    document.querySelector('.travel').scrollIntoView({behavior: 'smooth'})
})
// вешаем обработчики Калькулятор
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







