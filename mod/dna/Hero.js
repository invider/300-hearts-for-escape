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

Hero.prototype.init = function() {
}

Hero.prototype.toMarket = function(town) {
    if (this.location !== town) return
    lab.hud.market.show()
}

Hero.prototype.arrived = function(town) {
    this.location = town
    this.location.visited = true
    this.location.arrive()
}

Hero.prototype.travelTo = function(town) {
    if (!town || this.location === town) return
    const days = this.location.daysToTarget(town)
    env.day += days
    this.health -= days * env.tuning.travelHealth

    env.turn ++
    this.arrived(town)
    lib.sfx(res.sfx.teleport, 0.1)

    lab.hud.popup.show(town.stats.message)
}

module.exports = Hero
