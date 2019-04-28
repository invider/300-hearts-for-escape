module.exports = function setup() {

    // create UI container
    const hud = sys.spawn('hud/Hud', {
        Z: 10,
        name: 'hud',
    })

    const island = sys.spawn('MapScreen', {
        Z: 11,
        name: 'island',
        background: res.island,
    }, 'hud')
    island.adjust()

    const hero = sys.spawn('Hero', {
        name: 'hero',
        location: lib.math.rnde(island.townList),
    }, '')
    hero.location.visited = true

    env.day = 1

    env.debug = {}
    mod.debug.env.info = env.debug
}
