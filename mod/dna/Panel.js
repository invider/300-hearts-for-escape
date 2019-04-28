'use strict'

const Panel = function(dat) {
    this.Z = 11
    this.name = 'panel'
    sys.augment(this, dat)
}

Panel.prototype.adjust = function() {
    this.x = 0
    this.w = this.__._w
    this.h = res.ui.back.height
    this.y = this.__._h - this.h
}

Panel.prototype.drawImage = function(img, baseX, direction) {
    const iw = img.width
    const ih = img.height
    const baseY = this.y + (this.h - ih)/2

    if (direction < 0) {
        ctx.drawImage(img, baseX-iw, baseY, iw, ih)
        return -iw
    } else {
        ctx.drawImage(img, baseX, baseY, iw, ih)
        return iw
    }
}

Panel.prototype.drawText = function(text, baseX, direction) {
    const baseY = this.y + this.h/2
    ctx.font = env.style.panel.font
    const tw = ctx.measureText(text).width

    ctx.fillStyle = env.style.panel.content
    if (direction < 0) {
        ctx.textAlign = 'right'
    } else if (direction > 0) {
        ctx.textAlign = 'left'
    } else {
        ctx.textAlign = 'center'
    }
    ctx.textBaseline = 'center'
    ctx.fillText(text, baseX, baseY)

    return tw * direction
}

Panel.prototype.draw = function() {
    if (this.__.paused) return
    const img = res.ui.back

    ctx.drawImage(img, this.x, this.y, this.w, this.h)

    // inventory
    const tab = env.style.panel.textSpacing
    const baseX = env.style.panel.itemBase
    let curX = baseX
    curX += this.drawImage(res.ui.heart, curX, 1) + tab
    curX += this.drawText('' + Math.ceil(lab.hero.health), curX, 1)

    this.drawText('Day ' + env.day, this.w/2, 0)

    curX = this.w - baseX
    curX += this.drawText('' + Math.floor(lab.hero.crystals), curX, -1) - tab
    curX += this.drawImage(res.goods.crystals, curX, -1) - env.style.panel.itemSpacing

    curX += this.drawText('' + Math.floor(lab.hero.herbs), curX, -1) - tab
    curX += this.drawImage(res.goods.herbs, curX, -1)
}

module.exports = Panel
