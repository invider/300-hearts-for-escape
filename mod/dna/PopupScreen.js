'use strict'

// @depends(dna/Screen)
const Screen = dna.Screen

const MAX_LINES = 4

const PopupScreen = function(dat) {
    this.text = ''
    this.background = res.ui.alert_back
    sys.augment(dat) // don't know why, but need it to work
    Screen.call(this, dat)

    const popup = this
    sys.spawn('ImageButton', {
        name: 'close',
        img: res.ui.buttonClose,

        show: function() {
            if (this.hidden) {
                this.__.next.hide()
                this.hidden = false
                this.__.captureFocus(this)
            }
        },
        hide: function() {
            if (!this.hidden) {
                this.hidden = true
                this.__.releaseFocus(this)
            }
        },
        onFocus: function() {},
        onClick: function() {
            lib.sfx(res.sfx.click, 0.6)
            popup.hide()
            if (sys.isFun(popup.postAction)) popup.postAction()
        },
        onKeyDown: function(e) {
            if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
                this.onClick()
            }
        },
    }, this)

    sys.spawn('ImageButton', {
        name: 'next',
        img: res.ui.buttonOK,
        hidden: true,

        show: function() {
            this.__.close.hide()
            this.hidden = false
            this.__.captureFocus(this)
        },
        hide: function() {
            if (!this.hidden) {
                this.hidden = true
                this.__.releaseFocus(this)
            }
        },
        onFocus: function() {},
        onClick: function() {
            popup.cursor += popup.nextBatch
            lib.sfx(res.sfx.click, 0.6)
        },
        onKeyDown: function(e) {
            if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
                this.onClick()
            }
        },
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
    this.y = (this.__.h - this.h)/2 - 50

    this._ls.forEach(w => { if (sys.isFun(w.adjust)) w.adjust() })

    const axis = this._w/2
    this.close.x = axis - this.close.w/2
    this.close.y = this._h - this.close.h - 8
    this.next.x = axis - this.close.w/2
    this.next.y = this._h - this.close.h - 8

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
    // normalize to remove trailing empty line
    if (text[text.length-1] === '') text.pop()
    this.lines = text
}

PopupScreen.prototype.show = function(text, postAction) {
    this.text = text
    this.postAction = postAction
    this.cursor = 0
    this.hidden = false
    this.close.hidden = true
    this.next.hidden = true
    this.__.moveOnTop(this.__._ls.indexOf(this))
    lab.hud.island.pause()
}

PopupScreen.prototype.hide = function() {
    if (this.hidden) return
    this.hidden = true
    this.close.hide()
    this.next.hide()
    lab.hud.island.resume()
}

PopupScreen.prototype.drawText = function() {
    this.formatText()

    const linesLeft = this.lines.length - this.cursor
    const linesToShow = Math.min(linesLeft, MAX_LINES)
    const h = linesToShow * env.style.popup.lineSpacing

    const baseX = env.style.popup.margin
    let curY = (this._h - h)/2

    ctx.font = env.style.popup.font
    ctx.fillStyle = env.style.popup.content
    ctx.textAlign = 'left'
    ctx.textBaseline = 'bottom'

    const limit = this.cursor + linesToShow
    for (let i = this.cursor; i < limit; i++) {
        let l = this.lines[i]
        ctx.fillText(l, baseX, curY)
        curY += env.style.popup.lineSpacing
    }
    if (limit < this.lines.length) {
        this.nextBatch = linesToShow
        this.next.show()
    } else {
        this.close.show()
    }
}

PopupScreen.prototype.drawComponents = function() {
    this.drawText()
    Screen.prototype.drawComponents.call(this)
}

module.exports = PopupScreen
