'use strict'

let nx = 30
let ny = 90

module.exports = function(e) {
    log.out('done')
    if (e.repeat) return
        
    sys.spawn('hud/gadget/Explorer', {
        x: nx,
        y: ny,
        w: 250,
        h: 400,
    }, 'hud')

    nx += 50
    ny += 50
}
