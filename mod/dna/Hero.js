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
            + 'and ' + env.turn + ' moves',
        function() {
            trap('titles')
        })
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

    const origin = this.location
    const days = origin.daysToTarget(town)
    const time = days * env.tuning.travelDayTime
    const bleeding = Math.round(days * (env.tuning.travelHealth + env.tuning.desieseFactor*env.day))

    const hero = this
    function onArrived() {
        env.day += days
        hero.health -= bleeding 
        env.turn ++
        hero.arrived(town)

        if (hero.health <= 0) {
            hero.die()
        } else if (hero.health >= env.tuning.winHealth
                && origin.name === env.tuning.winTown) {
            hero.win()
        } else {
            let afterPopup = function() {
                hero.toMarket();
            }
            if (sys.isFun(town.stats.ok)) afterPopup = town.stats.ok

            lab.hud.popup.show(
                'In ' + days + " days you've lost " + bleeding + ' hearts!\n'
                + res.txt.loc.welcomeTo + ' ' + town.name + '!\n'
                + town.stats.message, afterPopup)
            lib.sfx(res.sfx.arrived, 0.6)
        }
    }

    this.travel = {
        days: days,
        time: time,
        origin: origin,
        destination: town,
        dx: (origin.x - town.x)/time,
        dy: (origin.y - town.y)/time,
        onArrived: onArrived,
    }
    hero.location = false
}

Hero.prototype.evo = function(dt) {
    if (this.travel) {
        this.travel.time -= dt
        if (this.travel.time <= 0) {
            this.travel.onArrived()
            this.travel = false
        }
    }
}

module.exports = Hero
