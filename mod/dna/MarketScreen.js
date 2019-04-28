'use strict'

// @depends(dna/Screen)
const Screen = dna.Screen

const MarketScreen = function(dat) {
    this.background = res.ui.market_back
    sys.augment(dat) // don't know why, but need it to work
    Screen.call(this, dat)

    const market = this
    sys.spawn('ImageButton', {
        x: 40,
        y: 100,
        w: 200,
        h: 30,
        img: res.ui.buttonOK,
        onClick: function() {
            market.hide()
        }
    }, this)
}
MarketScreen.prototype = Object.create(Screen.prototype)

MarketScreen.prototype.adjust = function() {
    this.scale = lab.hud.island.scale

    this._w = this.background.width
    this._h = this.background.height
    this.w = this._w * this.scale
    this.h = this._h * this.scale

    this.x = (this.__.w - this.w)/2
    this.y = (this.__.h - this.h)/2

    this._ls.forEach(w => { if (sys.isFun(w.adjust)) w.adjust() })
}

MarketScreen.prototype.show = function() {
    this.hidden = false
    lab.hud.island.pause()
}

MarketScreen.prototype.hide = function() {
    if (this.hidden) return
    this.hidden = true
    lab.hud.island.resume()
}

module.exports = MarketScreen

