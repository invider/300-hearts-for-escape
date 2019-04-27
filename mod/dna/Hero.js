'use strict'

// @depends(env/tuning)

const defaults = {
    health: env.tuning.startHealth,
    crystals: env.tuning.startCrystals,
    herbs: env.tuning.startHerbs,
}

const Hero = function(dat) {
    sys.augment(this, defaults)
    sys.augment(this, dat)
}

Hero.prototype.travelTo = function(town) {
    if (this.location === town) return
    const days = this.location.daysToTarget(town)
    env.day += days
    this.health -= days * env.tuning.travelHealth

    this.location = town
    lib.sfx(res.sfx.teleport, 0.1)
}

module.exports = Hero
