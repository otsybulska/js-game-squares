let $start = document.querySelector('.squares__start-btn')
let $game = document.querySelector('.squares__game')
let $time = document.querySelector('.squares__time')
let $result = document.querySelector('.squares__result')
let $timeHeader = document.querySelector('.squares__time-header')
let $resultHeader = document.querySelector('.squares__result-header')
let $gameTime = document.querySelector('#squares__game-time')

let colors = ['#E96D70', '#EBA86E', '#438B8E', '#5EBE59', '#B75693', '#7E78AD', '#6E87A3']
let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#ffffff'

    let interval = setInterval(function() {
        let time = parseFloat($time.textContent)
        
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 90)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    let randomColorIndex = getRandom(0, colors.length)

    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) +'px'
    box.style.left = getRandom(0, maxLeft) +'px'
    box.style.height = box.style.width = boxSize + 'px'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin' , box)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.style.backgroundColor = '#ffffff'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
}
