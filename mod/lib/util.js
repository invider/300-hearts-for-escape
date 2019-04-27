'use strict'

module.exports = {

    scaleFont: function(font, scale) {
        const e = font.split(' ')
        const size = parseInt(e[0]) * scale
        return '' + size + 'px ' + e[1]
    }
}
