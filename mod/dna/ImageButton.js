'use strict'

const Button = dna.hud.gadget.Button

const defaults = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
}

const ImageButton = function(dat) {
    sys.supplement(this, defaults)
    Button.call(this, dat)
    this.adjust()
}
ImageButton.prototype = Object.create(Button.prototype)

ImageButton.prototype.adjust = function() {
    this.w = this.img.width
    this.h = this.img.height
}

ImageButton.prototype.draw = function() {
    const st = this.getState()
    let sh = 0
    if (this.toggled) sh = -1
    else if (this._hover) sh = 1
    ctx.drawImage(this.img, this.x-sh, this.y-sh, this.w+sh*2, this.h+sh*2)
}

module.exports = ImageButton
