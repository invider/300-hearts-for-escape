'use strict'

const MIN_ANGLE = -0.075
const MAX_ANGLE = 0.075
const SPEED = 0.04
const SAIL_SPEED = 10

const Ship = function(dat) {
    this.name = 'ship'
    this.img = res.ship
    this.x = 239
    this.y = 111
    this.w = this.img.width
    this.h = this.img.height
    this.angle = MIN_ANGLE
    this.pendulum = SPEED

    sys.augment(this, dat)
}

Ship.prototype.leave = function() {
    this.leaving = true
}

Ship.prototype.evo = function(dt) {
    this.angle += this.pendulum * dt
    if (this.angle > MAX_ANGLE) {
        this.pendulum = -SPEED
    } else if (this.angle < MIN_ANGLE) {
        this.pendulum = SPEED
    }
    if (this.leaving) {
        this.x += SAIL_SPEED * dt
        if (this.x <= 270) this.y -= 2*dt
        if (this.x > 270) this.y += 3*dt
    }
}

Ship.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x + this.w/2, this.y + this.h - 4)
    ctx.rotate(this.angle)
    ctx.drawImage(this.img, -this.w/2, -this.h+4, this.w, this.h)
    ctx.restore()
}

module.exports = Ship
