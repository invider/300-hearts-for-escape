'use strict'
module.exports = function() {

    const hero = sys.spawn('Hero', {
        name: 'hero',
    }, '')

    // create UI container
    const hud = sys.spawn('hud/Hud', {
        Z: 10,
        name: 'hud',
        hidden: true,
    })

    const island = sys.spawn('MapScreen', {
        Z: 11,
        name: 'island',
        background: res.island,
    }, 'hud')
    island.adjust()

    const market = sys.spawn('MarketScreen', {
        Z: 12,
        name: 'market',
    }, 'hud')
    market.adjust()
    market.hide()

    const popup = sys.spawn('PopupScreen', {
        Z: 14,
        name: 'popup'
    }, 'hud')
    popup.adjust()

    hero.arrived(island.townList[0])

    env.day = 1
    env.turn = 0
    env.gameover = false

    //lib.math._seed = Date.now()

    trap('fadein')

    //env.debug = {}
    //mod.debug.env.info = env.debug
    //mod.debug.hidden = true
}
