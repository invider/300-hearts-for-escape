'use strict'

module.exports = {
    Z: 0,

    draw: function() {
        ctx.fillStyle = env.style.base
        ctx.fillRect(0, 0, ctx.width, ctx.height)
    }
}
