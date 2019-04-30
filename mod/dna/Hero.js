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
            + 'but desiase was stronger...',
        () => trap('restart'))
    lab.hud.island.stop()
}

Hero.prototype.win = function() {
    lab.hud.island.ship.leave()
    lab.hud.popup.show(
            'You have escaped!/'
            + '/'
            + 'The escape took ' + env.day + ' days/'
            + 'and ' + env.turn + ' moves')
        // do not do restart on win
        //() => trap('restart'))
    lab.hud.island.stop()
}

Hero.prototype.rob = function() {
    this.herbs = Math.floor(this.herbs * Math.random())
    this.crystals = Math.floor(this.crystals * Math.random())
    this.potion = Math.floor(this.potion * Math.random())
    this.gold = Math.floor(this.gold * Math.random())
}

Hero.prototype.hit = function() {
    this.health -= Math.floor((this.health/2) * Math.random())
}


Hero.prototype.toMarket = function(town) {
    if (town && this.location !== town) return
    lab.hud.market.show()
}

Hero.prototype.arrived = function(town) {
    this.location = town
    this.location.arrive()
}

Hero.prototype.travelTo = function(town) {
    if (!town || this.location === town) return

    const days = this.location.daysToTarget(town)
    const bleeding = Math.round(days * (env.tuning.travelHealth + env.tuning.desieseFactor*env.day))
    env.day += days
    this.health -= bleeding 

    env.turn ++
    this.arrived(town)

    if (this.health <= 0) {
        this.die()
    } else if (this.health >= env.tuning.winHealth
            && this.location.name === env.tuning.winTown) {
        this.win()
    } else {
        const hero = this
        let afterPopup = function() {
            hero.toMarket();
        }
        if (sys.isFun(town.stats.ok)) afterPopup = town.stats.ok

        lab.hud.popup.show(
            'In ' + days + " days you've lost " + bleeding + ' hearts!\n'
            + town.stats.message, afterPopup)
        lib.sfx(res.sfx.arrived, 0.6)
    }
}

module.exports = Hero
