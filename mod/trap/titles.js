'use strict'
module.exports = function() {

    // show the credits
    sys.spawn('text/scroll', {
        Z: 1001,
        name: 'titles',
        rx: 50,
        ry: 90,
        period: 1.5,
        time: 20,       // how long display each line
        fadein: 4,
        fadeout: 4,
        speed: -30,
        txt: res.txt.credits,
        font: '40px boo-city',
        color: '#90FF30',
    }, 'hud/island')
}
