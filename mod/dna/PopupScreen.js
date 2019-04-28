'use strict'

// @depends(dna/Screen)
const Screen = dna.Screen

const PopupScreen = function(dat) {
    this.text = ''
    this.background = res.ui.alert_back
    sys.augment(dat) // don't know why, but need it to work
    Screen.call(this, dat)

    const popup = this
    sys.spawn('ImageButton', {
        name: 'close',
        img: res.ui.buttonClose,

        onClick: function() {
            popup.hide()
        }
    }, this)

    this.hidden = true
}
PopupScreen.prototype = Object.create(Screen.prototype)

PopupScreen.prototype.adjust = function() {
    this.scale = lab.hud.island.scale

    this._w = this.background.width
    this._h = this.background.height
    this.w = this._w * this.scale
    this.h = this._h * this.scale

    this.x = (this.__.w - this.w)/2
    this.y = (this.__.h - this.h)/2

    this._ls.forEach(w => { if (sys.isFun(w.adjust)) w.adjust() })

    const axis = this._w/2
    this.close.x = axis - this.close.w/2
    this.close.y = this._h - this.close.h - 8

    this.formatText()
}

PopupScreen.prototype.formatText = function() {
    const paragraphs = this.text.split(/[\n/]+/)
    const textWidth = this._w - env.style.popup.margin*2
    ctx.font = env.style.popup.font

    const text = []
    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ')
        let curLine = ''
        words.forEach(w => {
            let nextLine
            if (curLine.length === 0) nextLine = w
            else nextLine = curLine + ' ' + w

            const tw = ctx.measureText(nextLine).width
            if (tw > textWidth) {
                text.push(curLine)
                curLine = w
            } else {
                curLine = nextLine
            }
        })
        text.push(curLine)
    })
    this.lines = text
}

PopupScreen.prototype.show = function(text) {
    this.text = text
    this.hidden = false
    // lab.hud.island.pause()
}

PopupScreen.prototype.hide = function() {
    if (this.hidden) return
    this.hidden = true
    //lab.hud.island.resume()
}

PopupScreen.prototype.drawText = function() {
    this.formatText()
    const h = this.lines.length * env.style.popup.lineSpacing

    const baseX = env.style.popup.margin
    let curY = (this._h - h)/2

    ctx.font = env.style.popup.font
    ctx.fillStyle = env.style.popup.content
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    this.lines.forEach(l => {
        ctx.fillText(l, baseX, curY)
        curY += env.style.popup.lineSpacing
    })
}

PopupScreen.prototype.drawComponents = function() {
    this.drawText()
    Screen.prototype.drawComponents.call(this)
}

module.exports = PopupScreen
