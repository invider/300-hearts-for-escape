'use strict'

// @depends(dna/Screen)
const Screen = dna.Screen

const MarketScreen = function(dat) {
    this.background = res.ui.market_back
    sys.augment(dat) // don't know why, but need it to work
    Screen.call(this, dat)

    const market = this
    sys.spawn('ImageButton', {
        name: 'close',
        img: res.ui.buttonClose,

        onClick: function() {
            market.hide()
        }
    }, this)
    sys.spawn('ImageButton', {
        name: 'complete',
        img: res.ui.buttonTrade,

        onClick: function() {
            market.closeTrade()
        }
    }, this)

    this.layout = {
        baseY: {}
    }

    let baseY = 30
    baseY += this.spawnResPair('herbs', baseY)
    baseY += this.spawnResPair('crystals', baseY)
}
MarketScreen.prototype = Object.create(Screen.prototype)

MarketScreen.prototype.buy = function(rs) {
    const stock = lab.hero.location.stats.resources[rs]
    if (this.trade[rs] < 0 || this.trade[rs] < stock) this.trade[rs] ++
}

MarketScreen.prototype.sell = function(rs) {
    const own = lab.hero[rs]
    if (this.trade[rs] > 0 || this.trade[rs] > -own) this.trade[rs] --
}

MarketScreen.prototype.tradeTotal = function() {
    let total = 0

    const price = lab.hero.location.stats.prices
    Object.keys(this.trade).forEach(rs => {
        total += this.trade[rs] * price[rs]
    })
    return -total
}

MarketScreen.prototype.closeTrade = function() {
    const total = this.tradeTotal()
    if (total < 0 && lab.hero.health < -total) return

    const price = lab.hero.location.stats.prices
    Object.keys(this.trade).forEach(rs => {
        const q = this.trade[rs]
        const p = q * price[rs]
        if (q !== 0) {
            // sell
            lab.hero[rs] += q
            lab.hero.health -= p
            lab.hero.location.stats.resources[rs] -= q
        }
    })
    this.hide()
}

MarketScreen.prototype.spawnResPair = function(resource, baseY) {
    const market = this
    this.layout.baseY[resource] = baseY

    sys.spawn('ImageButton', {
        name: 'buy_' + resource,
        img: res.ui.buttonLeft,
        x: 50,
        y: baseY,
        onClick: function() {
            market.buy(resource)
        }
    }, this)
    sys.spawn('ImageButton', {
        name: 'sell_' + resource,
        img: res.ui.buttonRight,
        x: 85,
        y: baseY,
        onClick: function() {
            market.sell(resource)
        }
    }, this)

    return env.style.market.lineStep
}

MarketScreen.prototype.adjust = function() {
    this.scale = lab.hud.island.scale

    this._w = this.background.width
    this._h = this.background.height
    this.w = this._w * this.scale
    this.h = this._h * this.scale

    this.x = (this.__.w - this.w)/2
    this.y = (this.__.h - this.h)/2

    this._ls.forEach(w => { if (sys.isFun(w.adjust)) w.adjust() })

    const axis = this._w/2
    const shift = 15
    this.close.x = axis - shift - this.close.w
    this.close.y = this._h - this.close.h - 8

    this.complete.x = axis + shift
    this.complete.y = this._h - this.complete.h - 8
}

MarketScreen.prototype.show = function() {
    this.trade = {
        herbs: 0,
        crystals: 0,
    }
    this.hidden = false
    lab.hud.island.pause()
}

MarketScreen.prototype.hide = function() {
    if (this.hidden) return
    this.hidden = true
    lab.hud.island.resume()
}

MarketScreen.prototype.drawResourceLine = function(rs, stats) {
    let own = lab.hero[rs]
    if (this.trade[rs] < 0) own += this.trade[rs]
    const price = stats.prices[rs]
    let stock = stats.resources[rs]
    if (this.trade[rs] > 0) stock -= this.trade[rs]

    const baseY = this.layout.baseY[rs]
    const axisY = env.style.market.lineStep/2 + baseY

    const img = res.goods[rs]
    ctx.drawImage(img, 10, baseY, img.width, img.height)
    let rX = this._w-img.width-8
    ctx.drawImage(img, rX, baseY, img.width, img.height)

    ctx.font = env.style.market.font
    ctx.fillStyle = env.style.market.content
    ctx.textAlign = 'left'
    ctx.textBaseline = 'center'

    ctx.fillText('' + own, 25, axisY)

    ctx.textAlign = 'center'
    ctx.fillText('' + this.trade[rs], 75, axisY)

    ctx.textAlign = 'left'
    ctx.fillText('' + price, 115, axisY)

    rX -= 2
    ctx.textAlign = 'right'
    ctx.fillText('' + stock, rX, axisY)
}

MarketScreen.prototype.drawTotalLine = function(baseY) {
    const img = res.ui.heart
    const axisY = baseY + img.height/2 - 2

    ctx.drawImage(img, 4, baseY, img.width, img.height)
    ctx.drawImage(img, 54, baseY, img.width, img.height)

    ctx.font = env.style.market.font
    ctx.fillStyle = env.style.market.content
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    ctx.fillText('' + lab.hero.health, 20, axisY)
    ctx.fillText('' + this.tradeTotal(), 70, axisY)


    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('total', 75, baseY-5)
}

MarketScreen.prototype.drawComponents = function() {
    Screen.prototype.drawComponents.call(this)

    const stats = lab.hero.location.stats
    this.drawResourceLine('herbs', stats)
    this.drawResourceLine('crystals', stats)

    this.drawTotalLine(130)
}

module.exports = MarketScreen

