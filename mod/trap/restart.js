'use strict'
module.exports = function() {
    setTimeout(() => {
        lab.hud.detach()
        trap('start')
    }, 2000)
}
