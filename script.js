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
const burger = document.querySelector('.burg-menu')

// кнопки в header
const logo = document.querySelector('.logo')
const aboutMe =document.querySelectorAll('#aboutMe')
const menu_2 =document.querySelectorAll('#menu-item-2')
const menu_3 =document.querySelectorAll('#menu-item-3')
const menu_4 =document.querySelectorAll('#menu-item-4')
const calc =document.querySelectorAll('#calc')

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

Array.from(aboutMe).forEach((el) => {
    el.addEventListener('click', () => {
        document.querySelector('.about-question').scrollIntoView({behavior: 'smooth'})
    })
})
Array.from(menu_2).forEach((el) => {
    el.addEventListener('click', () => {
        document.querySelector('.goals').scrollIntoView({behavior: 'smooth'})
    })
})

Array.from(menu_3).forEach((el) => {
    el.addEventListener('click', () => {
        document.querySelector('.gayming').scrollIntoView({behavior: 'smooth'})
    })
})

Array.from(menu_4).forEach((el) => {
    el.addEventListener('click', () => {
        document.querySelector('.knowledge').scrollIntoView({behavior: 'smooth'})
    })
})

Array.from(calc).forEach((el) => {
    el.addEventListener('click', () => {
        document.querySelector('.calc-body').scrollIntoView({behavior: 'smooth'})
    })
})


// обоработчик показа меню
burger.addEventListener('click', () => {
    document.querySelector('.drop-menu').classList.toggle('close')
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
plusminus.addEventListener('click', operator)
comma.addEventListener('click', commaBtn)



        
// здесь начнём выполнение вычислений
let inputStr = ''
result.innerHTML = '0'
let arg = '0'
let op = ''
let isComma = false




// функции по нажатию кнопачек 
function number() {

    if (!inputStr || inputStr == '0') { // ЕСЛИ ПУСТО В СТРОКЕ ВВОДА либо 0
        inputStr = this.innerHTML
        input.innerHTML = inputStr
        console.log(`num | ${this.id}; inputStr: ${inputStr}`)
        return
    }
     
    if (input.textContent.endsWith('=')) { 
        inputStr = this.id
        input.innerHTML = inputStr
        result.innerHTML = ''
        console.log(`num | ${this.id}; inputStr: ${inputStr}`)
        return
    }
    // если оператор начинается с нуля, новые нули не нужны, 
    if (/\/|\+|\-|\*/.test(inputStr.slice(-2)) && inputStr.endsWith('0')) {
        if (this.id == '0') {
            return            //если нажали 0, то ничего не делаем 
        } else {
            inputStr = inputStr.slice(0, -1)
        }
    }
    
    inputStr += this.id
    input.innerHTML = inputStr

    console.log(`num | ${this.id}; inputStr: ${inputStr}`)
}

    

function clearAll() {

    console.log(this.innerHTML)
    inputStr = ''
    input.innerHTML = inputStr
    result.innerHTML = '0'
    arg = '0' // last argument
    op = ''
    isComma = false

}


function evaluate() {

    isComma = false
    
    // не добавлять "=" в inputStr (черновик)
    if (inputStr == '') { //если пусто
        inputStr = result.innerHTML
        input.innerHTML = inputStr + this.id
        return
    } 
    if (input.textContent.endsWith('=') && op) { //если в конце "=" и была операция какая либо- повторить эту операцию
        inputStr = result.innerHTML + op + arg
    }    
    if (/\/|\+|\-|\*/.test(input.textContent.slice(-1))) { // если выражение заканчивается на + - * / и нажали равно - повторить 
        // arg = inputStr.split(/\/|\+|\-|\*/)[0] //на отрицательных сломается при повторении операции
        arg = inputStr.slice(0, -1)
        op = inputStr.slice(-1)
        console.log(`arg: '${arg}'; op: '${op}'`)
        inputStr += arg
        input.innerHTML = inputStr + this.id
        result.innerHTML = edit(eval(inputStr.replace('--', '-'))) ////////////////
        return
    }
    arg = inputStr.split(/\-|\*|\+|\//).pop()
    if (inputStr.includes('--')) {arg = '-' + arg}
    result.innerHTML = edit(eval(inputStr.replace('--', '-')))///////////////////
    input.innerHTML = inputStr + this.id
    // inputStr
    
    console.log(`eval| ${this.id}; inputStr: '${inputStr}' arg: '${arg}'`)
}

function operator() { // если пусто, то 0 + нужный оператор
    isComma = false
    if (inputStr == '') {
        inputStr = arg + this.id
        input.innerHTML = inputStr
        return
    }
    if (/\/|\+|\-|\*/.test(inputStr.slice(-1))) {   // если выражение заканчивается на /*-+= меняем на другой знак
        console.log(`oper|  меняем на другой знак inputStr:'${inputStr}'`)
        inputStr = inputStr.slice(0,-1) + this.id
        input.innerHTML = inputStr
        return
    }
    result.innerHTML = edit(eval(inputStr.replace('--','-'))) ////////////////////
    inputStr = result.innerHTML + this.id
    input.innerHTML = inputStr 
    op = this.id
    console.log(`oper| ${this.innerHTML}; inputStr: '${inputStr}' op '${op}'`)
}


function commaBtn() {
    console.log(this.innerHTML)
    if (inputStr == '') { // если строка ввода пуста - вставить 0, потом запятую
        inputStr = '0.'
        input.innerHTML = inputStr
        isComma = true
        return
    } 
    if (isComma || input.textContent.slice(-1) == '=') { // если запятая уже введена, либо ток что нажали равно
        return
    }
    if (/\/|\+|\-|\*/.test(inputStr.slice(-1))) { // если ставим запятую после операнда
        inputStr += '0'
    }
    isComma = true
    inputStr += '.'
    input.innerHTML = inputStr

    console.log(`${this.innerHTML}; inputStr: ${inputStr}`)
}

function edit(input) { // обрабатываем введённое выражение
    console.log(`edit| type '${typeof input}' input '${input}'`)
    
    if (input % 1 !== 0) { //если  число с точкой
        return parseFloat(input.toFixed(8))
    } 
    return input
}







