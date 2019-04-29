'use strict'

const Town = function(dat) {
    this.Z = 1
    this.w = 0
    this.h = 0
    this.locked = true
    this.visited = false
    this.stats = lib.default.genParamsForTown();

    sys.augment(this, dat)

    this.img1 = res.town[this.tag + '1']
    this.img2 = res.town[this.tag + '2']
}

Town.prototype.unlock = function() {
    this.locked = false
}

Town.prototype.daysToTarget = function(target) {
    const d = lib.math.distance(this.x, this.y, target.x, target.y)
    return Math.ceil(d/env.tuning.travelSpeed)
}

Town.prototype.arrive = function(){
    this.stats = lib.default.genParamsForTown();
}

Town.prototype.departed = function(){
    
}

Town.prototype.onFocus = function() {}

Town.prototype.onMouseMove = function() {}

Town.prototype.onMouseDrag = function() {}

Town.prototype.onMouseEnter = function() {
    if (!this.locked) {
        lib.sfx(res.sfx.select, 0.4)
    }
}

Town.prototype.onMouseDown = function() {
    this.toggled = true
}

Town.prototype.onMouseUp = function() {
    this.toggled = false
}

Town.prototype.onClick = function() {
    if (!this.locked) {
        lab.hero.toMarket(this) // try to go to market
        lab.hero.travelTo(this) // try to travel
    }
}

Town.prototype.draw = function() {
    // fix size for now
    this.w = this.img1.width
    this.h = this.img1.height

    let f = 0
    let img = this.img1
    if (!this.locked) {
        if (this._captured && this._hover) {
            f = env.style.town.selectedScale
        } else if (this._hover) {
            f = env.style.town.hoverScale
            img = this.img2
        }
    }

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img,
        this.x-f, this.y-f,
        this.w+f*2, this.h+f*2)

    if (this.visited) {
        // draw city sign
        const img = res.sign
        ctx.drawImage(img,
            this.x + this.w/2 - img.width/2,
            this.y + this.h+ 1,
            img.width, img.height)

        ctx.font = env.style.font
        if (lab.hero.location === this) ctx.fillStyle = env.style.town.current
        else if (this.visited) ctx.fillStyle = env.style.town.visited
        else ctx.fillStyle = env.style.town.unknown
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.name,
            this.x + this.w/2,
            this.y + this.h + 5)
    }

    /*
    if (!this.locked && this._hover) {
        if (lab.hero.location === this) {
            ctx.font = env.style.hint.font
            ctx.fillStyle = env.style.hint.content
            ctx.fillText('(to the market)',
                this.x + this.w/2,
                this.y + this.h + 14)

        } else {
            // calculate and show days to travel
            let days = lab.hero.location.daysToTarget(this)

            ctx.font = env.style.hint.font
            ctx.fillStyle = env.style.hint.content
            ctx.fillText('(get in ' + days + ' days)',
                this.x + this.w/2,
                this.y + this.h + 14)
        }
    }
    */
    //ctx.lineWidth = 3
    //ctx.strokeStyle = '#ffff00'
    //ctx.strokeRect(this.x, this.y, this.w, this.h)
    
    // draw hero icon if needed
    if (lab.hero.location === this) {
        ctx.drawImage(res.person,
            this.x-2*f, this.y-2*f,
            res.person.width, res.person.height)
    }
}

module.exports = Town
