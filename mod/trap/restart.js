'use strict'
module.exports = function() {

    function startWhenShipLeaves() {
        if (lab.hud.island.ship.x < 320) {
            setTimeout(startWhenShipLeaves, 300)
        } else {
            lab.detach('hero')
            lab.hud.detach()
            trap('start')
        }
    }

    setTimeout(() => {
        startWhenShipLeaves()
    }, 2000)
}
