'use strict'

const Town = function(dat) {
    this.Z = 1
    this.w = 0
    this.h = 0

    sys.augment(this, dat)

    this.img1 = res.town[this.tag + '1']
    this.img2 = res.town[this.tag + '2']
}

Town.prototype.daysToTarget = function(target) {
    const d = lib.math.distance(this.x, this.y, target.x, target.y)
    return Math.ceil(d/env.tuning.travelSpeed)
}

Town.prototype.onMouseMove = function() {}

Town.prototype.onMouseEnter = function() {
    lib.sfx(res.sfx.select, 0.4)
}

Town.prototype.onClick = function() {
    lab.hero.travelTo(this)
}

Town.prototype.draw = function() {
    // fix size for now
    this.w = this.img1.width
    this.h = this.img1.height

    let f = 0
    let img = this.img1
    if (this._hover) {
        f = 1
        img = this.img2
    }

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img,
        this.x-f, this.y-f,
        this.w+f*2, this.h+f*2)

    ctx.font = env.style.font
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = env.style.content
    ctx.fillText(this.name,
        this.x + this.w/2,
        this.y + this.h + 5)

    if (this._hover && lab.hero.location !== this) {
        // calculate and show days to travel
        let days = lab.hero.location.daysToTarget(this)

        ctx.font = env.style.hint.font
        ctx.fillStyle = env.style.hint.content
        ctx.fillText('(get in ' + days + ' days)',
            this.x + this.w/2,
            this.y + this.h + 14)
    }
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
