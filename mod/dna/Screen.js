'use strict'

const Container = dna.hud.Container

const defaults = {
    Z: 10,
    keepZ: true,

    x: 0,
    y: 0,
    w: 320,
    h: 200,
    border: 0,
}

const Screen = function(dat) {
    sys.augment(this, defaults)
    Container.call(this, dat)
}
Screen.prototype = Object.create(Container.prototype)

Screen.prototype.adjust = function() {
    // calculate scale
    const aspect = this.background.width/this.background.height
    const hscale = this.__.w/(this.background.width + this.border*2)
    const vscale = this.__.h/(this.background.height + this.border*2)
    let scale = hscale
    if (hscale > vscale) scale = vscale

    this._w = this.background.width
    this._h = this.background.height
    this.w = this._w * scale
    this.h = this._h * scale

    this.x = (this.__.w - this.w)/2
    this.y = (this.__.h - this.h)/2
    this.scale = scale

    this._ls.forEach(w => { if (sys.isFun(w.adjust)) w.adjust() })
}

Screen.prototype.drawBackground = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.background, 0, 0, this.background.width, this.background.height)
    //ctx.strokeStyle = '#ffff00'
    //ctx.strokeRect(0, 0, this.w, this.h)
}

Screen.prototype.draw = function() {
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.rect(0, 0, this.w, this.h)
    ctx.clip()
    ctx.scale(this.scale, this.scale)

    this.drawBackground()
    this.drawComponents()

    ctx.restore()
}

Screen.prototype.onClick = function(x, y, e) {
    Container.prototype.onClick.call(this, x/this.scale, y/this.scale, e)
}

Screen.prototype.onDblClick = function(x, y, e) {
    Container.prototype.onDblClick.call(this, x/this.scale, y/this.scale, e)
}

Screen.prototype.onMouseDown = function(x, y, b, e) {
    Container.prototype.onMouseDown.call(this, x/this.scale, y/this.scale, b, e)
}

Screen.prototype.onMouseUp = function(x, y, b, e) {
    Container.prototype.onMouseUp.call(this, x/this.scale, y/this.scale, b, e)
}

Screen.prototype.onMouseMove = function(x, y, e) {
    env.debug.Mouse = '' + Math.round(x/this.scale) + 'x' + Math.round(y/this.scale)
    Container.prototype.onMouseMove.call(this, x/this.scale, y/this.scale, e)
}

module.exports = Screen
