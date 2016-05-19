var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var centerX = canvas.width / 2
var centerY = canvas.height / 2

var date = new Date()
var text
var seconds = date.getSeconds()
var minutes = date.getMinutes()
var hours = date.getHours()

if (hours > 11)
    hours -= 12

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    drawHand(200, (2 * Math.PI / 60) * seconds, "#E26357")
    
    drawHand(150, (2 * Math.PI / 60) * minutes, "#B4DC66")
    
    drawHand(100, (2 * Math.PI / 12) * hours, "black")

    if (seconds == 59) {
        seconds = 0
        if (minutes == 59) {
            minutes = 0
            hours = (hours == 11) ? 0 : hours + 1
        } else {
            minutes = minutes + 1
        }
    } else {
        seconds = seconds + 1
    }

    text = getTime(hours, minutes, seconds)

    ctx.font = "40px Orbitron, Arial, sans-serif"
    ctx.fillStyle = "#4E0B24"
    ctx.fillText(text, 140, 100)
    
}

function drawHand(radius, theta, color, width) {
    width = width || 35
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 3 * Math.PI / 2, (3 * Math.PI / 2) + theta)
    ctx.lineTo(centerX + (radius + width) * Math.cos((Math.PI / 2) - theta), centerY - (radius + width) * Math.sin((Math.PI / 2) - theta))
    ctx.arc(centerX, centerY, radius + width, (3 * Math.PI / 2) + theta, 3 * Math.PI / 2, true)
    ctx.closePath()

    ctx.fillStyle = color
    ctx.fill()
}

function getTime(hours, minutes, seconds) {
    var currentTime

    if (hours < 10)
        currentTime = "0" + hours
    else
        currentTime = hours
    if (minutes < 10)
        currentTime += ":0" + minutes
    else
        currentTime += ":" + minutes
    if (seconds < 10)
        currentTime += ":0" + seconds
    else
        currentTime += ":" + seconds
    return currentTime
}

setInterval(draw, 1000)
