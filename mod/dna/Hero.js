'use strict'

// @depends(env/tuning)

const defaults = {
    health: env.tuning.startHealth,
    herbs: env.tuning.startHerbs,
    crystals: env.tuning.startCrystals,
    potion: env.tuning.startPotion,
    gold: env.tuning.startGold,
}

const Hero = function(dat) {
    sys.augment(this, defaults)
    sys.augment(this, dat)
}

Hero.prototype.init = function() {
}

Hero.prototype.die = function() {
    this.health = 0
    lab.hud.island.ship.leave()
    lab.hud.popup.show(
        'You died!/'
        + ' / '
        + 'You survived for ' + env.day + ' days,/'
        + 'but desiase was stronger...')
    lab.hud.popup.postAction = function() {
        trap('restart')
    }
    lab.hud.island.stop()
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
    const bleeding = days * env.tuning.travelHealth
    env.day += days
    this.health -= days * bleeding 

    env.turn ++
    this.arrived(town)
    lib.sfx(res.sfx.arrived, 0.3)

    if (this.health <= 0) {
        this.die()
    } else {
        lab.hud.popup.show(
            '' + days + ' days passed. '
            + 'Lost ' + bleeding + ' health!\n'
            + town.stats.message)
    }
}

module.exports = Hero
