let btn = document.querySelector('#button')
let input = document.querySelector('#input')
let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let result = [] //结果

function init() {

    //生成随机数
    function randomNum(min, max) {
        return parseInt(Math.random() * (max - min) + min)
    }

    //生成颜色（0 ~ 255）
    function randomColor(min, max) {
        let red = randomNum(min, max)
        let green = randomNum(min, max)
        let blue = randomNum(min, max)
        return `rgb(${red},${green},${blue})`
    }


    //绘制随机背景颜色
    ctx.fillStyle = randomColor(180, 230)
    ctx.fillRect(0, 0, 200, 80)

    //生成内容
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 4; i++) {
        let content = string[randomNum(0, string.length)] //内容
        result.push(content)
        let fs = randomNum(40, 70) //字体大小
        let deg = randomNum(-30, 30) //旋转角度
        ctx.font = fs + 'px Simhei'
        ctx.textBaseline = 'top' //基线
        ctx.fillStyle = randomColor(80, 150)
        ctx.save()
        ctx.translate(40 * i + 30, 15)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(content, 0, 0)
        ctx.restore() //恢复，否则样式叠加
    }

    //生成线干扰
    for (let j = 0; j < 5; j++) {
        ctx.beginPath()
        ctx.moveTo(randomNum(0, 200), randomNum(0, 80))
        ctx.lineTo(randomNum(0, 200), randomNum(0, 80))
        ctx.lineWidth = randomNum(0, 4);
        ctx.strokeStyle = randomColor(100, 150)
        ctx.closePath()
        ctx.stroke()
    }

    //生成点干扰
    for (let k = 0; k < 10; k++) {
        ctx.beginPath()
        ctx.arc(randomNum(0, 200), randomNum(0, 80), randomNum(1, 5), 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
    }

}

//重置
function reset() {
    input.value = ''
    result = []
    init()
}

//验证码点击
canvas.addEventListener('click', () => {
    reset()
})

//按钮点击
btn.addEventListener('click', () => {
    if (input.value !== result.join('')) {
        alert('输入验证码有误')
        reset()
    } else {
        alert('验证成功')
        reset()
    }
})

//初始化
init()