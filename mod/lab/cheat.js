'use strict'

const MAX_BUFFER = 1024
const MIN_BUFFER = 32

let keyBuffer = ''

let cheatCodes = {
    'unlock': function() {
        lab.hud.island.townList.forEach(t => t.unlock())
    },
    'visitall': function() {
        lab.hud.island.townList.forEach(t => t.known = true)
    },
    'disable': function() {
        lab.hud.island.townList.forEach(t => t.locked = true)
    },
    'morehealth': function() {
        lab.hero.health += 100
    },
    'bleed': function() {
        lab.hero.health -= 20
    },
    'suicide': function() {
        lab.hero.health = 0
        lab.hero.die()
    },
    'makeescape': function() {
        lab.hero.win()
    },
    'restart': function() {
        lab.hud.island.ship.leave()
        trap('restart')
    },
}

function match(code) {
    return keyBuffer.endsWith(code)
}

function tryToCheat() {
    Object.getOwnPropertyNames(cheatCodes).forEach(code => {
       if (match(code)) {
           log.out('cheat: [' + code + ']')
           cheatCodes[code]()
       }
    })
}

module.exports = {

    key: function(ch) {
        if (!ch || ch.length > 1) return

        keyBuffer += ch
        if (keyBuffer.length > MAX_BUFFER) {
            keyBuffer = keyBuffer.substring(
                keyBuffer.length - MIN_BUFFER,
                keyBuffer.length)
        }

        tryToCheat()
    }
}
